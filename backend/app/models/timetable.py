from sqlalchemy import Column, Integer
from app.database import Base

class Timetable(Base):
    __tablename__ = "timetables"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, nullable=False)
    subject_id = Column(Integer, nullable=False)
    class_id = Column(Integer, nullable=False)
    room_id = Column(Integer, nullable=False)
    day_id = Column(Integer, nullable=False)
    slot_id = Column(Integer, nullable=False)
