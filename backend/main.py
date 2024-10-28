from server.app import create_app


app = create_app(cors=True, api=True)
