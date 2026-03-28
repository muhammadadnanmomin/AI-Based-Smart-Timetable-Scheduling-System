from sqlalchemy.orm import Session
from app.ai_engine.data_loader import load_all_data
from app.ai_engine.genetic import evolve
from app.models.timetable import Timetable
from app.models.timetable_entry import TimetableEntry

def generate_timetable(db: Session):
    data = load_all_data(db)
    best_timetable = evolve(data, data["preferences"])

    timetable_record = Timetable(name="Auto Generated", fitness_score=0)
    db.add(timetable_record)
    db.commit()
    db.refresh(timetable_record)

    for entry in best_timetable:
        db_entry = TimetableEntry(
            timetable_id=timetable_record.id,
            class_id=entry["class_id"],
            subject_id=entry["subject_id"],
            teacher_id=entry["teacher_id"],
            room_id=entry["room_id"],
            day_id=entry["day_id"],
            time_slot_id=entry["slot_id"]
        )
        db.add(db_entry)

    db.commit()
    return timetable_record.id
