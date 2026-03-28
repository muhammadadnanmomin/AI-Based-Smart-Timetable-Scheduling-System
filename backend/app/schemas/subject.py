from pydantic import BaseModel

class SubjectCreate(BaseModel):
    name: str
    code: str | None = None
    weekly_lectures: int
    is_lab: bool = False
    lab_duration: int = 1

class SubjectUpdate(BaseModel):
    name: str
    code: str | None = None
    weekly_lectures: int
    is_lab: bool
    lab_duration: int

class SubjectResponse(BaseModel):
    id: int
    name: str
    code: str | None
    weekly_lectures: int
    is_lab: bool
    lab_duration: int

    class Config:
        orm_mode = True
