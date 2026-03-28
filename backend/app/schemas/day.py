from pydantic import BaseModel

class DayCreate(BaseModel):
    name: str  # Monday, Tuesday, ...

class DayUpdate(BaseModel):
    name: str

class DayResponse(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
