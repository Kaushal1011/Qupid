# Qupid
Qupid is a matchmaking service that is responsible for creating efficient teams for workplaces and classes.

Requires:

- Python & all listed requirements : FastAPI, Gensim, Matplotlib, Scikit-Learn, Pandas, Numpy, etc.
- MongoDB

## How to run

- Make sure you add you own twitter api key in `settings.env` as `"TW_KEY":"your_key_here"` in folder `app/server/routes/model/` 

### backend

```
python app/main.py
```
> Spins up a fastapi server. To see what routes the backend offers visit http://localhost:8000/docs. features database and pipeline related functions(train model, refresh model, etc). 

### frontend

```
cd frontend/qupid
npm start
```
> Simple React + Material UI frontend 

## How to Use ? 

### Find team recommendations

#### Team Settings 

![team1](screens/recommend1.png)

#### Wish for certain kind of profiles

![team2](screens/recommend2.png)

#### Get Teams

![team3](screens/teams.png)

### Perform Pipeline realted functionality

![pipeline](screens/pipelinesettings.png)

### Add users to user database

![adduser](screens/addusersdb.png)

### Recommendation System

## Pipeline 

![pipeline](AOBDDataPipelineModel.png)

## Current Core Word2Vec Model Insight

![modelisight](currentmodelinsight.png)

## Algorithm

![algorithm](AOBDAlgorithm.png)
