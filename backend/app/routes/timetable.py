from fastapi import APIRouter
from app.ai.generator import generate_timetable
from app.ai.generator import auto_fix_conflicts
from app.ai.data_loader import load_all_data
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Timetable

router = APIRouter()

@router.post("/generate-timetable")
def generate(db: Session = Depends(get_db)):
    result = generate_timetable()

    if result["status"] != "success":
        return result

    # Clear old
    db.query(Timetable).delete()

    # Save new
    for e in result["timetable"]:
        row = Timetable(**e)
        db.add(row)

    db.commit()

    return result

@router.post("/auto-fix")
def auto_fix(payload: dict):
    schedule = payload["timetable"]
    data = load_all_data()
    fixed = auto_fix_conflicts(schedule, data)
    return {"status": "success", "timetable": fixed}


from sqlalchemy import text

@router.get("/timetable/load")
def load_timetable(db: Session = Depends(get_db)):
    query = text("""
        SELECT 
            te.id,
            s.name AS subject,
            t.name AS teacher,
            r.name AS room,
            c.name AS class_name,
            d.name AS day,
            ts.start_time,
            ts.end_time,
            te.day_id,
            te.slot_id,
            te.subject_id,
            te.teacher_id,
            te.room_id,
            te.class_id
        FROM timetables te
        JOIN subjects s ON te.subject_id = s.id
        JOIN teachers t ON te.teacher_id = t.id
        JOIN rooms r ON te.room_id = r.id
        JOIN classes c ON te.class_id = c.id
        JOIN days d ON te.day_id = d.id
        JOIN time_slots ts ON te.slot_id = ts.id
    """)
    rows = db.execute(query).mappings().all()
    return [dict(row) for row in rows]


@router.post("/timetable/save")
def save_timetable(entries: list, db: Session = Depends(get_db)):
    db.query(Timetable).delete()

    for e in entries:
        db.add(Timetable(**e))

    db.commit()
    return {"status": "saved"}
