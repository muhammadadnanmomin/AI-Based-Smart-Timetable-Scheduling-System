from pydantic import BaseModel

class TeacherCreate(BaseModel):
    user_id: int | None = None
    name: str
    department: str | None = None
    max_lectures_per_day: int = 4

class TeacherUpdate(BaseModel):
    name: str
    department: str | None = None
    max_lectures_per_day: int

class TeacherResponse(BaseModel):
    id: int
    user_id: int | None
    name: str
    department: str | None
    max_lectures_per_day: int

    class Config:
        orm_mode = True
