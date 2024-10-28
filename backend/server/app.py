from fastapi import FastAPI
from middlewares.middleware import add_cors_middleware
from routes.api import router


def create_app(cors: bool, api: bool) -> FastAPI:
    app = FastAPI()

    if cors:
        add_cors_middleware(app)

    if api:
        app.include_router(router)

    @app.get("/")
    def read_root():
        return {"Hello": "World"}

    return app
