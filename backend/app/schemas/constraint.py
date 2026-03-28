from pydantic import BaseModel

class ConstraintCreate(BaseModel):
    type: str
    value: str
    description: str | None = None

class ConstraintUpdate(BaseModel):
    type: str
    value: str
    description: str | None = None

class ConstraintResponse(BaseModel):
    id: int
    type: str
    value: str
    description: str | None

    class Config:
        orm_mode = True
