from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base

class TeacherPreference(Base):
    __tablename__ = "teacher_preferences"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id", ondelete="CASCADE"))
    preferred_day_id = Column(Integer, ForeignKey("days.id", ondelete="SET NULL"))
    preferred_slot_id = Column(Integer, ForeignKey("time_slots.id", ondelete="SET NULL"))
    priority = Column(Integer, default=1)
