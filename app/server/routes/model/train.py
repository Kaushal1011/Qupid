from matplotlib import pyplot
from sklearn.decomposition import PCA
import shutil
import re
import json
import os
import requests
import pickle
import random
import pandas as pd
from os import path
import numpy as np
from gensim.models import Word2Vec
import nltk
from nltk.corpus import stopwords
from sklearn.cluster import KMeans
import shutil
stop_words = set(stopwords.words('english'))


def pull_tweets():
    try:
        shutil.rmtree("./twitterscrap")
        os.mkdir("./twitterscrap")
        with open('wordlist.pickle', 'rb') as f:
            terms = pickle.load(f)

        # init pull from twitter with 10 tweets
        for i in terms:
            print(i)
            bearer_token = auth()
            url = create_url(i)
            headers = create_headers(bearer_token)
            try:
                json_response = connect_to_endpoint(url, headers)
            except:
                json_response = {
                    "meta": {'failed': 'ouch'}
                }
        #     print(json.dumps(json_response, indent=4, sort_keys=True))
            if "data" in json_response.keys():
                with open("./twitterscrap/"+i+'_data.json', 'a') as f:
                    json.dump(json_response["data"], f)

        print("pullmoredata")
        i = 0
        # pull more data
        next_token = [i for i in terms]
        iters = 5
        for j in range(iters):
            k = 0
            for i in terms:
                bearer_token = auth()
                if(j != 0):
                    url = create_url_more(i, next_token[k])
                else:
                    url = create_url_more(i, None)
                headers = create_headers(bearer_token)
                try:
                    json_response = connect_to_endpoint(url, headers)
                except:
                    json_response = {
                        "meta": {'failed': 'ouch'}
                    }
                if "next_token" in json_response["meta"].keys():
                    next_token[k] = json_response["meta"]["next_token"]
                k += 1
                try:
                    with open("./twitterscrap/"+i+"_data.json", "r+") as file:
                        data = json.load(file)
                        if "data" in json_response.keys():
                            data.extend(json_response["data"])
                        file.seek(0)
                        json.dump(data, file)
                except Exception as e:
                    print(e)
    except Exception as e:
        print(e, "error in pulling tweets")


def retrain_model(pull):
    try:
        # read terms
        # start cleaning data
        with open('wordlist.pickle', 'rb') as f:
            terms = pickle.load(f)
        if(pull == True):
            pull_tweets()
        for i in terms:
            try:
                with open("./twitterscrap/"+i+"_data.json", "r+") as file:
                    data = json.load(file)
                    arr = []
                    for k in data:
                        # add clean up line here and saved cleaned data somewhere
                        final_cleaned = ' '.join(
                            [word for word in k["text"].split() if word not in stop_words])
                        final_cleaned = str(
                            re.sub(r"[^a-zA-Z0-9]+", ' ', final_cleaned))

                        arr.append(final_cleaned)
                    file2 = open("./twitterscrap/"+i+"_cleaned.json", "w+")
                    json.dump(arr, file2)
            except Exception as e:
                print(e)
        # create dataframe, tokenize it, train gensim model
        text_db = []

        all_text_df = pd.DataFrame()
        for i in terms:
            try:
                with open("./twitterscrap/"+i+"_cleaned.json", "r+") as file:
                    data = json.load(file)
                    for k in data:
                        text_db.append(k)
            except Exception as e:
                print(e)
        all_text_df["text"] = text_db
        all_text_df['tokenized'] = all_text_df.apply(
            lambda row: nltk.word_tokenize(row['text']), axis=1)
        model = Word2Vec(all_text_df["tokenized"], min_count=1)
        shutil.copy("model.bin", "oldmodel.bin")
        model.save('model.bin')
        print("retrained model")
        generate_model_insights(model)
        return "Retrained Model"
    except Exception as e:
        print(str(e))
        print("Some shit occured")


def generate_model_insights(model):
    terms = ["Programmer", "Coding", "Deep", "Learning", "Cloud", "Computing", "Javascript", "Backend", "Frontend", "Data", "Science", "Dribbble", "Github", "Machine", "Learning",
             "Engineer", "Figma", "Sketch", "Blender", "Mathematician", "Audio", "Programming", "ReactJS", "VueJS", "CSS", "Design", "Engineer", "Operating", "System",
             "Linux", "Scripting", "Shell", "Script", "Leader", "Nodejs", "Django", "Web", "google", "java", "Flutter", "material", "bootstrap", "Rust", "Julia", "Engine", "html", "open", "source", "aws", "media", "apple", "logic"]
    terms = [x.lower() for x in terms]
    X = model[terms]
    kmeans = KMeans(n_clusters=3, random_state=0).fit(X)
    # Twitter Related functions
    pca = PCA(n_components=2)

    result = pca.fit_transform(X)

    colordict = {
        0: "red",
        1: "green",
        2: "blue",
        3: "orange",
        4: "magenta",
        5: "black"
    }

    width, height = 15, 15
    pyplot.figure(figsize=(width, height))
    pyplot.scatter(result[:, 0], result[:, 1])
    words = list(terms)
    for i, word in enumerate(words):
        pyplot.annotate(word, xy=(result[i, 0], result[i, 1]),
                        color=colordict[kmeans.labels_[i]])
    shutil.copy("currentmodelinsight.png", "oldmodelinsight.png")
    pyplot.savefig("currentmodelinsight.png")


def create_headers(bearer_token):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    return headers


def connect_to_endpoint(url, headers):
    response = requests.request("GET", url, headers=headers)
    print(response.status_code)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def create_url(query):
    # Tweet fields are adjustable.
    # Options include:
    # attachments, author_id, context_annotations,
    # conversation_id, created_at, entities, geo, id,
    # in_reply_to_user_id, lang, non_public_metrics, organic_metrics,
    # possibly_sensitive, promoted_metrics, public_metrics, referenced_tweets,
    # source, text, and withheld
    #     tweet_fields = "tweet.fields=author_id"
    # max_results=100
    url = "https://api.twitter.com/2/tweets/search/recent?query={}&max_results=10".format(
        query
    )
    return url


def create_url_more(query, next_token):
    # Tweet fields are adjustable.
    # Options include:
    # attachments, author_id, context_annotations,
    # conversation_id, created_at, entities, geo, id,
    # in_reply_to_user_id, lang, non_public_metrics, organic_metrics,
    # possibly_sensitive, promoted_metrics, public_metrics, referenced_tweets,
    # source, text, and withheld
    #     tweet_fields = "tweet.fields=author_id"
    # max_results=100
    if next_token:
        url = "https://api.twitter.com/2/tweets/search/recent?query={}&max_results=100&next_token={}".format(
            query, next_token
        )
    else:
        url = "https://api.twitter.com/2/tweets/search/recent?query={}&max_results=100".format(
            query
        )
    return url


def auth():
    return "AAAAAAAAAAAAAAAAAAAAAC6vMwEAAAAA5uumFGxBM1e4Kfyfr8E5TJseEZw%3DHV6mjkDp1QrpVm1bpi2yZrvAEkpqhxCK91fGkjl5gevPwtLScM"


if __name__ == "__main__":
    retrain_model(True)
