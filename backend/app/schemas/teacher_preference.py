from pydantic import BaseModel

class TeacherPreferenceCreate(BaseModel):
    teacher_id: int
    preferred_day_id: int | None = None
    preferred_slot_id: int | None = None
    priority: int = 1

class TeacherPreferenceUpdate(BaseModel):
    preferred_day_id: int | None = None
    preferred_slot_id: int | None = None
    priority: int

class TeacherPreferenceResponse(BaseModel):
    id: int
    teacher_id: int
    preferred_day_id: int | None
    preferred_slot_id: int | None
    priority: int

    class Config:
        orm_mode = True
