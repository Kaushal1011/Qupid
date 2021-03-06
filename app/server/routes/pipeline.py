from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from gensim.models import Word2Vec
import numpy as np
from os import path
import pandas as pd
import random
import pickle
import requests
import os
import json
import re
from .model.train import retrain_model
from server.database import (retrieve_users_pipeline, retrieve_users)
from server.database import retrieve_wishuser
from server.models.User import (
    ErrorResponseModel,
    ResponseModel,
)
from server.models.Pipeline import (Recommend, RecommendResponse)


# what routes go here

# Primary
# dataset update done tested
# find recommendation done tested

# Settings calls
# retrain word2vec model on new words
# refresh pipeline
# maintain pipeline (combine above both operation)

# Pipeline Misc
# add to words list in database
# init pipeline train logic (adding initial words to db and training once)

router = APIRouter()


@router.get("/updateds", response_description="trigger pipeline data update")
async def dataset_update():
    users = await retrieve_users_pipeline()
    new_model = Word2Vec.load('model.bin')
    if users:
        if path.exists("qupiddf.pickle"):
            qupid_df = pd.read_pickle("qupiddf.pickle")
            for user in users:
                try:
                    rolevec = new_model[user["role"]]
                except:
                    rolevec = np.ones(100, dtype="float32")
                    try:
                        update_wordlist(user["role"])
                    except:
                        pass
                try:
                    sp1 = new_model[user["specialities"][0]]
                except:
                    sp1 = np.ones(100, dtype="float32")
                    try:
                        update_wordlist(user["specialities"][0])
                    except:
                        pass
                try:
                    sp2 = new_model[user["specialities"][1]]
                except:
                    sp2 = np.ones(100, dtype="float32")
                    try:
                        update_wordlist(user["specialities"][1])
                    except:
                        pass
                try:
                    sp3 = new_model[user["specialities"][2]]
                except:
                    sp3 = np.ones(100, dtype="float32")
                    try:
                        update_wordlist(user["specialities"][2])
                    except:
                        pass
                lennow = len(qupid_df.index)
                print(user)
                qupid_df = qupid_df.append(pd.Series(), ignore_index=True)
                qupid_df.at[lennow, "_id"] = user["id"]
                qupid_df.at[lennow, "fullname"] = user["fullname"]
                qupid_df.at[lennow, "email"] = user["email"]
                qupid_df.at[lennow, "role"] = user["role"]
                qupid_df.at[lennow, "specialities"] = user["specialities"]
                qupid_df.at[lennow, "organisation"] = user["organisation"]
                qupid_df.at[lennow, "rolevec"] = rolevec
                qupid_df.at[lennow, "sp1"] = sp1
                qupid_df.at[lennow, "sp2"] = sp2
                qupid_df.at[lennow, "sp3"] = sp3
                print(qupid_df)
            qupid_df.to_pickle("qupiddf.pickle")
        else:
            qupid_df = pd.DataFrame(columns=[
                                    "_id", "fullname", "email", "role", "specialities", "organisation", "rolevec", "sp1", "sp2", "sp3"])
            for user in users:
                try:
                    rolevec = new_model[user["role"]]
                except:
                    rolevec = np.ones(100, dtype="float32")
                    try:
                        update_wordlist(user["role"])
                    except:
                        pass
                try:
                    sp1 = new_model[user["specialities"][0]]
                except:
                    sp1 = np.ones(100, dtype="float32")
                    try:
                        update_wordlist(user["specialities"][0])
                    except:
                        pass
                try:
                    sp2 = new_model[user["specialities"][1]]
                except:
                    sp2 = np.ones(100, dtype="float32")
                    try:
                        update_wordlist(user["specialities"][1])
                    except:
                        pass
                try:
                    sp3 = new_model[user["specialities"][2]]
                except:
                    sp3 = np.ones(100, dtype="float32")
                    try:
                        update_wordlist(user["specialities"][2])
                    except:
                        pass
                qupid_df.loc[len(qupid_df.index)] = [user["id"], user["fullname"], user["email"], user["role"], user["specialities"], user["organisation"],
                                                     rolevec, sp1, sp2, sp3]
            qupid_df.to_pickle("qupiddf.pickle")
        return ResponseModel(users, "Updated pipeline dataframe successfully")
    else:
        return ResponseModel(users, "Nothing to update")


@router.post("/recommend", response_description="endpoint that recommends team based on settings and artifical profile")
async def recommend(data: Recommend):
    teamresponse = {}
    hashtab = {}
    tempres = {}
    teamresponse["metadata"] = data
    qupid_df = pd.read_pickle("qupiddf.pickle")
    new_model = Word2Vec.load('model.bin')
    for wuserid in data.wishuserids:
        try:
            wuser = await retrieve_wishuser(wuserid)
        except:
            continue
        wwuser = wuser
        print(wwuser)
        try:
            wwuser["rolevec"] = new_model[wwuser["role"]]
        except:
            wwuser["rolevec"] = np.ones(100, dtype="float32")
            try:
                update_wordlist(wwuser["role"])
            except:
                pass
        try:
            wwuser["sp1"] = new_model[wwuser["specialities"][0]]
        except:
            wwuser["sp1"] = np.ones(100, dtype="float32")
            try:
                update_wordlist(wwuser["specialities"][0])
            except:
                pass
        try:
            wwuser["sp2"] = new_model[wwuser["specialities"][1]]
        except:
            wwuser["sp2"] = np.ones(100, dtype="float32")
            try:
                update_wordlist(wwuser["specialities"][1])
            except:
                pass
        try:
            wwuser["sp3"] = new_model[wwuser["specialities"][2]]
        except:
            wwuser["sp3"] = np.ones(100, dtype="float32")
            try:
                update_wordlist(wwuser["specialities"][2])
            except:
                pass
        qupid_df = computesim(qupid_df, wwuser)
        qupid_df.to_pickle("qupiddf.pickle")
        columns = ["_id", "fullname", "email",
                   "role", "specialities", "organisation"]
        # not*nom n largest to makes sure theres always enough members to create mutually exclusive sets for members
        tempres[wuserid] = qupid_df.nlargest(
            data.numberofteams*data.numberofmem, columns=["sim"+wwuser["id"]])[columns].to_dict(orient="records")
        # change balance logic
        # if data.balance:
        #     random.shuffle(tempres[wuserid])

    rearrs = []
    for i in range(1, data.numberofteams+1):
        teamresponse["team"+str(i)] = []
        rearrs.append([])
    upperindex = -1
    # print(tempres)
    for key in tempres.keys():
        index = 1
        upperindex += 1
        for i in tempres[key]:
            # print(i)
            try:
                if i['_id'] not in hashtab:
                    rearrs[upperindex].append(i)
                    hashtab[i['_id']] = i
                    index += 1
                if index > data.numberofteams:
                    break
            except Exception as e:
                print("passed excepting here ", e)
    # print(rearrs)
    if data.balance:
        for elem in rearrs:
            random.shuffle(elem)
    for i in range(1, data.numberofteams+1):
        for elem in rearrs:
            try:
                teamresponse["team"+str(i)].append(elem[i-1])
            except Exception as e:
                print("some expect here:", e)
    # print(teamresponse)
    return RecommendResponse(teamresponse, "Here are your built teams!")


@router.get("/retrain", response_description="retrains word2vec model from tweet data")
async def retrain_ds():
    return ResponseModel(retrain_model(True), "Retrain done with new tweets")


@router.get("/retrainnotwts", response_description="retrains word2vec model without tweet data")
async def retrain_ds():
    return ResponseModel(retrain_model(False), "Retrain done without tweets")


@router.get("/refresh", response_description="refresh the complete dataset in pipeline")
async def refresh_pipeline():
    try:
        os.remove("qupiddf.pickle")
    except:
        print("file didnt exist: irregular functioning detected")
    res = await refresh_pipe()
    return ResponseModel(res, "did refresh")


@router.get("/maintain", response_description="retrain the model with new tweets pulledin and refresh the complete dataset in pipeline")
async def maintain_pipeline():
    res1 = retrain_model(True)
    res = await refresh_pipe()
    return ResponseModel(res, "did maintainance on pipeline")

# Suporting functions


async def refresh_pipe():
    users = await retrieve_users()
    new_model = Word2Vec.load('model.bin')
    qupid_df = pd.DataFrame(columns=[
        "_id", "fullname", "email", "role", "specialities", "organisation", "rolevec", "sp1", "sp2", "sp3"])
    for user in users:
        try:
            rolevec = new_model[user["role"]]
        except:
            rolevec = np.ones(100, dtype="float32")
            try:
                update_wordlist(user["role"])
            except:
                pass
        try:
            sp1 = new_model[user["specialities"][0]]
        except:
            sp1 = np.ones(100, dtype="float32")
            try:
                update_wordlist(user["specialities"][0])
            except:
                pass
        try:
            sp2 = new_model[user["specialities"][1]]
        except:
            sp2 = np.ones(100, dtype="float32")
            try:
                update_wordlist(user["specialities"][1])
            except:
                pass
        try:
            sp3 = new_model[user["specialities"][2]]
        except:
            sp3 = np.ones(100, dtype="float32")
            try:
                update_wordlist(user["specialities"][2])
            except:
                pass
        qupid_df.loc[len(qupid_df.index)] = [user["id"], user["fullname"], user["email"], user["role"], user["specialities"], user["organisation"],
                                             rolevec, sp1, sp2, sp3]
    qupid_df.to_pickle("qupiddf.pickle")
    return True


def computesim(df, artfuser):
    """
    This function is responsible for finding cosine similarity between user vector and supplied artificial vector
    cs->cosine similarity
    uses algorithm
    siml=(role*1.3+sp1+sp2+0.7*sp3)/4
    """
    import numpy as np
    mag = np.linalg.norm
    # df["sim"+artfuser["_id"]]=np.NaN
    if str("sim"+artfuser["id"]) in df:
        for index, row in df.iterrows():
            if row["sim"+artfuser["id"]] == np.NaN:
                df.at[index, "sim"+artfuser["id"]] = (1.3*(row["rolevec"]@artfuser["rolevec"])/(mag(row["rolevec"])*mag(artfuser["rolevec"])) +
                                                      row["sp1"]@artfuser["sp1"]/(mag(row["sp1"])*mag(artfuser["sp1"])) +
                                                      row["sp2"]@artfuser["sp2"]/(mag(row["sp2"])*mag(artfuser["sp2"])) +
                                                      0.7*(row["sp3"]@artfuser["sp3"])/(mag(row["sp3"])*mag(artfuser["sp3"])))/4
    else:
        for index, row in df.iterrows():
            df.at[index, "sim"+artfuser["id"]] = (1.3*(row["rolevec"]@artfuser["rolevec"])/(mag(row["rolevec"])*mag(artfuser["rolevec"])) +
                                                  row["sp1"]@artfuser["sp1"]/(mag(row["sp1"])*mag(artfuser["sp1"])) +
                                                  row["sp2"]@artfuser["sp2"]/(mag(row["sp2"])*mag(artfuser["sp2"])) +
                                                  0.7*(row["sp3"]@artfuser["sp3"])/(mag(row["sp3"])*mag(artfuser["sp3"])))/4
    return df


def update_wordlist(word):
    """
    Function responsible to update wordlist everytime a word is not found in vocabulary of our trained model
    """
    with open('wordlist.pickle', 'rb') as f:
        mynewlist = pickle.load(f)
    if word not in mynewlist:
        mynewlist.append(word)
    with open('wordlist.pickle', 'wb') as f:
        pickle.dump(mynewlist, f)
    return mynewlist
