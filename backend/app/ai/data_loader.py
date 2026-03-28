from app.database import SessionLocal
from app.models import (
    Teacher, Subject, Class, Room, Day,
    TimeSlot, TeacherPreference, Constraint
)

def load_all_data():
    db = SessionLocal()
    try:
        return {
            "teachers": db.query(Teacher).all(),
            "subjects": db.query(Subject).all(),
            "classes": db.query(Class).all(),
            "rooms": db.query(Room).all(),
            "days": db.query(Day).all(),
            "slots": db.query(TimeSlot).all(),
            "preferences": db.query(TeacherPreference).all(),
            "constraints": db.query(Constraint).all(),
        }
    finally:
        db.close()
