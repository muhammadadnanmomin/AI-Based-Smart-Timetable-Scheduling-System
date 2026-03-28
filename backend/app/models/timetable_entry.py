from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from app.database import Base

class TimetableEntry(Base):
    __tablename__ = "timetable_entries"

    id = Column(Integer, primary_key=True, index=True)
    timetable_id = Column(Integer, ForeignKey("timetables.id", ondelete="CASCADE"))
    class_id = Column(Integer, ForeignKey("classes.id", ondelete="CASCADE"))
    subject_id = Column(Integer, ForeignKey("subjects.id", ondelete="CASCADE"))
    teacher_id = Column(Integer, ForeignKey("teachers.id", ondelete="CASCADE"))
    room_id = Column(Integer, ForeignKey("rooms.id", ondelete="CASCADE"))
    day_id = Column(Integer, ForeignKey("days.id", ondelete="CASCADE"))
    time_slot_id = Column(Integer, ForeignKey("time_slots.id", ondelete="CASCADE"))

    __table_args__ = (
        UniqueConstraint("teacher_id", "day_id", "time_slot_id", name="uq_teacher_slot"),
        UniqueConstraint("room_id", "day_id", "time_slot_id", name="uq_room_slot"),
        UniqueConstraint("class_id", "day_id", "time_slot_id", name="uq_class_slot"),
    )
