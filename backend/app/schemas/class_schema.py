from pydantic import BaseModel

class ClassCreate(BaseModel):
    name: str
    department: str | None = None
    semester: int | None = None
    total_students: int | None = None

class ClassUpdate(BaseModel):
    name: str
    department: str | None = None
    semester: int | None = None
    total_students: int | None = None

class ClassResponse(BaseModel):
    id: int
    name: str
    department: str | None
    semester: int | None
    total_students: int | None

    class Config:
        orm_mode = True
