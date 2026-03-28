from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.teacher_preference import TeacherPreference
from app.schemas.teacher_preference import (
    TeacherPreferenceCreate,
    TeacherPreferenceUpdate,
    TeacherPreferenceResponse
)
from app.dependencies import get_db

router = APIRouter(prefix="/teacher-preferences", tags=["Teacher Preferences"])

# CREATE Teacher Preference

@router.post("/", response_model=TeacherPreferenceResponse)
def create_preference(pref: TeacherPreferenceCreate, db: Session = Depends(get_db)):
    new_pref = TeacherPreference(
        teacher_id=pref.teacher_id,
        preferred_day_id=pref.preferred_day_id,
        preferred_slot_id=pref.preferred_slot_id,
        priority=pref.priority
    )
    db.add(new_pref)
    db.commit()
    db.refresh(new_pref)
    return new_pref

# GET All Preferences

@router.get("/", response_model=list[TeacherPreferenceResponse])
def get_preferences(db: Session = Depends(get_db)):
    return db.query(TeacherPreference).all()

# GET Preference by ID

@router.get("/{pref_id}", response_model=TeacherPreferenceResponse)
def get_preference(pref_id: int, db: Session = Depends(get_db)):
    pref = db.query(TeacherPreference).filter(TeacherPreference.id == pref_id).first()
    if not pref:
        raise HTTPException(status_code=404, detail="Preference not found")
    return pref

# UPDATE Preference

@router.put("/{pref_id}", response_model=TeacherPreferenceResponse)
def update_preference(pref_id: int, updated: TeacherPreferenceUpdate, db: Session = Depends(get_db)):
    pref = db.query(TeacherPreference).filter(TeacherPreference.id == pref_id).first()

    if not pref:
        raise HTTPException(status_code=404, detail="Preference not found")

    pref.preferred_day_id = updated.preferred_day_id
    pref.preferred_slot_id = updated.preferred_slot_id
    pref.priority = updated.priority

    db.commit()
    db.refresh(pref)
    return pref

# DELETE Preference

@router.delete("/{pref_id}")
def delete_preference(pref_id: int, db: Session = Depends(get_db)):
    pref = db.query(TeacherPreference).filter(TeacherPreference.id == pref_id).first()

    if not pref:
        raise HTTPException(status_code=404, detail="Preference not found")

    db.delete(pref)
    db.commit()
    return {"message": "Preference deleted successfully"}