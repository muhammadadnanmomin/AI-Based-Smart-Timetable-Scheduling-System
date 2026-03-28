from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.time_slot import TimeSlot
from app.schemas.time_slot import TimeSlotCreate, TimeSlotUpdate, TimeSlotResponse
from app.dependencies import get_db

router = APIRouter(prefix="/time-slots", tags=["Time Slots"])

# CREATE TimeSlot

@router.post("/", response_model=TimeSlotResponse)
def create_time_slot(slot: TimeSlotCreate, db: Session = Depends(get_db)):
    new_slot = TimeSlot(
        start_time=slot.start_time,
        end_time=slot.end_time,
        slot_order=slot.slot_order
    )
    db.add(new_slot)
    db.commit()
    db.refresh(new_slot)
    return new_slot

# GET All TimeSlots

@router.get("/", response_model=list[TimeSlotResponse])
def get_time_slots(db: Session = Depends(get_db)):
    return db.query(TimeSlot).all()

# GET TimeSlot by ID

@router.get("/{slot_id}", response_model=TimeSlotResponse)
def get_time_slot(slot_id: int, db: Session = Depends(get_db)):
    slot = db.query(TimeSlot).filter(TimeSlot.id == slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Time slot not found")
    return slot

# UPDATE TimeSlot

@router.put("/{slot_id}", response_model=TimeSlotResponse)
def update_time_slot(slot_id: int, updated: TimeSlotUpdate, db: Session = Depends(get_db)):
    slot = db.query(TimeSlot).filter(TimeSlot.id == slot_id).first()

    if not slot:
        raise HTTPException(status_code=404, detail="Time slot not found")

    slot.start_time = updated.start_time
    slot.end_time = updated.end_time
    slot.slot_order = updated.slot_order

    db.commit()
    db.refresh(slot)
    return slot

# DELETE TimeSlot

@router.delete("/{slot_id}")
def delete_time_slot(slot_id: int, db: Session = Depends(get_db)):
    slot = db.query(TimeSlot).filter(TimeSlot.id == slot_id).first()

    if not slot:
        raise HTTPException(status_code=404, detail="Time slot not found")

    db.delete(slot)
    db.commit()
    return {"message": "Time slot deleted successfully"}