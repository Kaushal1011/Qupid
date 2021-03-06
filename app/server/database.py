import motor.motor_asyncio
from bson.objectid import ObjectId

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.qupid

users_collection = database.get_collection("users_collection")
wishusers_collection = database.get_collection("wishusers_collection")


def user_helper(user) -> dict:
    return{
        "id": str(user["_id"]),
        "fullname": user["fullname"],
        "email": user["email"],
        "role": user["role"],
        "specialities": user["specialities"],
        "organisation": user["organisation"],
        "pipelined": user["pipelined"]
    }


def wishuser_helper(user) -> dict:
    return{
        "id": str(user["_id"]),
        "role": user["role"],
        "specialities": user["specialities"],
        "organisation": user["organisation"],
    }


async def retrieve_users():
    users = []
    async for user in users_collection.find():
        users.append(user_helper(user))
    return users


async def add_user(user_data: dict) -> dict:
    user = await users_collection.insert_one(user_data)
    new_user = await users_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)


async def add_wishuser(wishuser_data: dict) -> dict:
    wishuser = await wishusers_collection.insert_one(wishuser_data)
    wishnew_user = await wishusers_collection.find_one({"_id": wishuser.inserted_id})
    return wishuser_helper(wishnew_user)


async def retrieve_wishusers():
    wishusers = []
    async for wishuser in wishusers_collection.find():
        wishusers.append(wishuser_helper(wishuser))
    return wishusers


async def retrieve_wishuser(id: str) -> dict:
    wishuser = await wishusers_collection.find_one({"_id": ObjectId(id)})
    if wishuser:
        return wishuser_helper(wishuser)


async def retrieve_users_pipeline():
    users = []
    async for user in users_collection.find({"pipelined": 0}):
        users.append(user_helper(user))
        if user:
            await users_collection.update_one(
                {
                    "_id": ObjectId(user_helper(user)["id"])
                },
                {
                    "$set": {
                        "pipelined": 1
                    }
                }
            )
    return users


async def retrieve_user(id: str) -> dict:
    user = await users_collection.find_one({"_id": ObjectId(id)})
    if user:
        return user_helper(user)


# Update a user with a matching ID
async def update_user(id: str, data: dict):
    # Return false if an empty request body is sent.
    print(id)
    if len(data) < 1:
        return False
    user = await users_collection.find_one({"_id": ObjectId(id)})
    if user:

        updated_user = await users_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_user:
            return True
        return False


# Delete a user from the database
async def delete_user(id: str):
    user = await users_collection.find_one({"_id": ObjectId(id)})
    if user:
        await users_collection.delete_one({"_id": ObjectId(id)})
        return True
