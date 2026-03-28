from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.constraint import Constraint
from app.schemas.constraint import ConstraintCreate, ConstraintUpdate, ConstraintResponse
from app.dependencies import get_db

router = APIRouter(prefix="/constraints", tags=["Constraints"])

# CREATE Constraint

@router.post("/", response_model=ConstraintResponse)
def create_constraint(constraint: ConstraintCreate, db: Session = Depends(get_db)):
    new_constraint = Constraint(
        type=constraint.type,
        value=constraint.value,
        description=constraint.description
    )
    db.add(new_constraint)
    db.commit()
    db.refresh(new_constraint)
    return new_constraint

# GET All Constraints

@router.get("/", response_model=list[ConstraintResponse])
def get_constraints(db: Session = Depends(get_db)):
    return db.query(Constraint).all()

# GET Constraint by ID

@router.get("/{constraint_id}", response_model=ConstraintResponse)
def get_constraint(constraint_id: int, db: Session = Depends(get_db)):
    constraint = db.query(Constraint).filter(Constraint.id == constraint_id).first()
    if not constraint:
        raise HTTPException(status_code=404, detail="Constraint not found")
    return constraint

# UPDATE Constraint

@router.put("/{constraint_id}", response_model=ConstraintResponse)
def update_constraint(constraint_id: int, updated: ConstraintUpdate, db: Session = Depends(get_db)):
    constraint = db.query(Constraint).filter(Constraint.id == constraint_id).first()

    if not constraint:
        raise HTTPException(status_code=404, detail="Constraint not found")

    constraint.type = updated.type
    constraint.value = updated.value
    constraint.description = updated.description

    db.commit()
    db.refresh(constraint)
    return constraint

# DELETE Constraint

@router.delete("/{constraint_id}")
def delete_constraint(constraint_id: int, db: Session = Depends(get_db)):
    constraint = db.query(Constraint).filter(Constraint.id == constraint_id).first()

    if not constraint:
        raise HTTPException(status_code=404, detail="Constraint not found")

    db.delete(constraint)
    db.commit()
    return {"message": "Constraint deleted successfully"}