from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.teacher import Teacher
from app.schemas.teacher import TeacherCreate, TeacherUpdate, TeacherResponse
from app.dependencies import get_db

router = APIRouter(prefix="/teachers", tags=["Teachers"])

# CREATE Teacher (POST)

@router.post("/", response_model=TeacherResponse)
def create_teacher(teacher: TeacherCreate, db: Session = Depends(get_db)):
    new_teacher = Teacher(
        user_id=teacher.user_id,
        name=teacher.name,
        department=teacher.department,
        max_lectures_per_day=teacher.max_lectures_per_day
    )
    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)
    return new_teacher

# GET All Teachers

@router.get("/")
def get_teachers(db: Session = Depends(get_db)):
    return db.query(Teacher).all()

# GET Teacher by ID

@router.get("/{teacher_id}", response_model=TeacherResponse)
def get_teacher(teacher_id: int, db: Session = Depends(get_db)):
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

# UPDATE Teacher

@router.put("/{teacher_id}", response_model=TeacherResponse)
def update_teacher(teacher_id: int, updated: TeacherUpdate, db: Session = Depends(get_db)):
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")

    teacher.name = updated.name
    teacher.department = updated.department
    teacher.max_lectures_per_day = updated.max_lectures_per_day

    db.commit()
    db.refresh(teacher)
    return teacher

# DELETE Teacher

@router.delete("/{teacher_id}")
def delete_teacher(teacher_id: int, db: Session = Depends(get_db)):
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")

    db.delete(teacher)
    db.commit()
    return {"message": "Teacher deleted successfully"}

