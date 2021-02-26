from server.routes.user import router as UserRouter
# from server.routes.wishuser import router as WishUserRouter
from fastapi import FastAPI

app = FastAPI(debug=True)


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this Qupis app!"}


app = FastAPI()

app.include_router(UserRouter, tags=["User"], prefix="/user")

# app.include_router(WishUserRouter, tags=["WishUser"], prefix="/wishuser")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this Qupid app!"}
