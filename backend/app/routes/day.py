from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.day import Day
from app.schemas.day import DayCreate, DayUpdate, DayResponse
from app.dependencies import get_db

router = APIRouter(prefix="/days", tags=["Days"])

# CREATE Day

@router.post("/", response_model=DayResponse)
def create_day(day: DayCreate, db: Session = Depends(get_db)):
    existing = db.query(Day).filter(Day.name == day.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Day already exists")

    new_day = Day(name=day.name)
    db.add(new_day)
    db.commit()
    db.refresh(new_day)
    return new_day

# GET All Days

@router.get("/", response_model=list[DayResponse])
def get_days(db: Session = Depends(get_db)):
    return db.query(Day).all()

# GET Day by ID

@router.get("/{day_id}", response_model=DayResponse)
def get_day(day_id: int, db: Session = Depends(get_db)):
    day = db.query(Day).filter(Day.id == day_id).first()
    if not day:
        raise HTTPException(status_code=404, detail="Day not found")
    return day

# UPDATE Day

@router.put("/{day_id}", response_model=DayResponse)
def update_day(day_id: int, updated: DayUpdate, db: Session = Depends(get_db)):
    day = db.query(Day).filter(Day.id == day_id).first()

    if not day:
        raise HTTPException(status_code=404, detail="Day not found")

    day.name = updated.name
    db.commit()
    db.refresh(day)
    return day

# DELETE Day

@router.delete("/{day_id}")
def delete_day(day_id: int, db: Session = Depends(get_db)):
    day = db.query(Day).filter(Day.id == day_id).first()

    if not day:
        raise HTTPException(status_code=404, detail="Day not found")

    db.delete(day)
    db.commit()
    return {"message": "Day deleted successfully"}