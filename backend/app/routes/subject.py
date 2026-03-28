from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.subject import Subject
from app.schemas.subject import SubjectCreate, SubjectUpdate, SubjectResponse
from app.dependencies import get_db

router = APIRouter(prefix="/subjects", tags=["Subjects"])

# CREATE Subject (POST)

@router.post("/", response_model=SubjectResponse)
def create_subject(subject: SubjectCreate, db: Session = Depends(get_db)):
    new_subject = Subject(
        name=subject.name,
        code=subject.code,
        weekly_lectures=subject.weekly_lectures,
        is_lab=subject.is_lab,
        lab_duration=subject.lab_duration
    )
    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)
    return new_subject

# GET All Subjects

@router.get("/")
def get_subjects(db: Session = Depends(get_db)):
    return db.query(Subject).all()

# GET Subject by ID

@router.get("/{subject_id}", response_model=SubjectResponse)
def get_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    return subject

# UPDATE Subject

@router.put("/{subject_id}", response_model=SubjectResponse)
def update_subject(subject_id: int, updated: SubjectUpdate, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    subject.name = updated.name
    subject.code = updated.code
    subject.weekly_lectures = updated.weekly_lectures
    subject.is_lab = updated.is_lab
    subject.lab_duration = updated.lab_duration

    db.commit()
    db.refresh(subject)
    return subject

# DELETE Subject

@router.delete("/{subject_id}")
def delete_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    db.delete(subject)
    db.commit()
    return {"message": "Subject deleted successfully"}
