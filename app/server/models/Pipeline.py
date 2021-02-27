from typing import Optional

from pydantic import BaseModel


class Recommend(BaseModel):
    numberofmem: int
    numberofteams: int
    balance: Optional[bool] = False
    wishuserids: list


def RecommendResponse(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }
