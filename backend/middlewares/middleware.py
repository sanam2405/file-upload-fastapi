from fastapi.middleware.cors import CORSMiddleware
from constants import constants


def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=constants.origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
