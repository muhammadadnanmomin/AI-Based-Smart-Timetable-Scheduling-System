from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.class_model import Class
from app.schemas.class_schema import ClassCreate, ClassUpdate, ClassResponse
from app.dependencies import get_db

router = APIRouter(prefix="/classes", tags=["Classes"])

# CREATE Class

@router.post("/", response_model=ClassResponse)
def create_class(class_data: ClassCreate, db: Session = Depends(get_db)):
    new_class = Class(
        name=class_data.name,
        department=class_data.department,
        semester=class_data.semester,
        total_students=class_data.total_students
    )
    db.add(new_class)
    db.commit()
    db.refresh(new_class)
    return new_class

# GET All Classes

@router.get("/", response_model=list[ClassResponse])
def get_classes(db: Session = Depends(get_db)):
    return db.query(Class).all()

# GET Class by ID

@router.get("/{class_id}", response_model=ClassResponse)
def get_class(class_id: int, db: Session = Depends(get_db)):
    class_obj = db.query(Class).filter(Class.id == class_id).first()
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")
    return class_obj

# UPDATE Class

@router.put("/{class_id}", response_model=ClassResponse)
def update_class(class_id: int, updated: ClassUpdate, db: Session = Depends(get_db)):
    class_obj = db.query(Class).filter(Class.id == class_id).first()

    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")

    class_obj.name = updated.name
    class_obj.department = updated.department
    class_obj.semester = updated.semester
    class_obj.total_students = updated.total_students

    db.commit()
    db.refresh(class_obj)
    return class_obj

# DELETE Class

@router.delete("/{class_id}")
def delete_class(class_id: int, db: Session = Depends(get_db)):
    class_obj = db.query(Class).filter(Class.id == class_id).first()

    if not class_obj:
        raise HTTPException(status_code=404, detail="Class not found")

    db.delete(class_obj)
    db.commit()
    return {"message": "Class deleted successfully"}