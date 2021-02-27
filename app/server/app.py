from server.routes.user import router as UserRouter
from server.routes.wishuser import router as WishUserRouter
from server.routes.pipeline import router as PipelineRouter
from fastapi import FastAPI


app = FastAPI(debug=True)

app.include_router(UserRouter, tags=["User"], prefix="/user")

app.include_router(WishUserRouter, tags=["WishUser"], prefix="/wishuser")

app.include_router(PipelineRouter, tags=["Pipleline"], prefix="/data")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Qupid app!"}
