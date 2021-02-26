from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    add_wishuser,
    retrieve_wishusers
)
from server.models.User import (
    ErrorResponseModel,
    ResponseModel,
)
from server.models.WishedUser import WishedUserSchema


router = APIRouter()


@router.post("/", response_description="WishUser data added into the database")
async def add_wishuser_data(wishuser: WishedUserSchema = Body(...)):
    print(wishuser)
    wishuser = jsonable_encoder(wishuser)
    wishnew_user = await add_wishuser(wishuser)
    return ResponseModel(wishnew_user, "wish user added successfully.")


@router.get("/", response_description="wishusers retrieved")
async def get_wishusers():
    wishusers = await retrieve_wishusers()
    if wishusers:
        return ResponseModel(wishusers, "wishusers data retrieved successfully")
    return ResponseModel(wishusers, "Empty list returned")
