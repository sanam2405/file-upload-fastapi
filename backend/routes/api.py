from fastapi import APIRouter, UploadFile, File, Form

router = APIRouter()


@router.post("/file-upload")
async def create_upload_file(
    file: UploadFile = File(...),
    username: str = Form(...),
):
    print("Name of the file is ", file.filename)
    print("Name of the user is ", username)
    return {"filename": file.filename, "username": username}
