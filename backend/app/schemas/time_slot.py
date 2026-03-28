from pydantic import BaseModel
from datetime import time

class TimeSlotCreate(BaseModel):
    start_time: time
    end_time: time
    slot_order: int

class TimeSlotUpdate(BaseModel):
    start_time: time
    end_time: time
    slot_order: int

class TimeSlotResponse(BaseModel):
    id: int
    start_time: time
    end_time: time
    slot_order: int

    class Config:
        orm_mode = True
