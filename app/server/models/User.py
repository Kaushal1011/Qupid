from typing import Optional

from pydantic import BaseModel, SecretStr, EmailStr, Field


class UserSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)
    password: SecretStr = Field(...)
    role: str = Field(...)
    specialities: list = Field(...)
    organisation: str = Field(...)
    pipelined: int = Field(...)

    # 0 entry not in pipeline 1 entry in pipeline

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Kaushal Patil",
                "email": "kaushalpatil10@gmail.com",
                "password": "password123@",
                "role": "fullstack",
                "specialities": ["python", "javascript", "backend", "frontend", "deeplearning"],
                "organisation": "Ahmedabad University",
                "pipelined": 0,
            }
        }


class UpdateUserSchema(BaseModel):
    fullname: Optional[str]
    email: Optional[EmailStr]
    password: Optional[SecretStr]
    role: Optional[str]
    specialities: Optional[list]
    organisation: Optional[str]
    pipelined: Optional[int]

    class Config:
        schema_extra = {
            "example": {
                "fullname": "Kaushal Patil",
                "email": "kaushalpatil10@gmail.com",
                "password": "password123@",
                "role": "fullstack",
                "specialities": ["python", "javascript", "backend", "frontend", "deeplearning"],
                "organisation": "Ahmedabad University",
                "pipelined": 1,
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}
