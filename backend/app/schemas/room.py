from pydantic import BaseModel

class RoomCreate(BaseModel):
    name: str
    capacity: int | None = None
    type: str  # lecture or lab
    building: str | None = None

class RoomUpdate(BaseModel):
    name: str
    capacity: int | None = None
    type: str
    building: str | None = None

class RoomResponse(BaseModel):
    id: int
    name: str
    capacity: int | None
    type: str
    building: str | None

    class Config:
        orm_mode = True
