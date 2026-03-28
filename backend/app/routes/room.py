from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.room import Room
from app.schemas.room import RoomCreate, RoomUpdate, RoomResponse
from app.dependencies import get_db

router = APIRouter(prefix="/rooms", tags=["Rooms"])

# CREATE Room

@router.post("/", response_model=RoomResponse)
def create_room(room: RoomCreate, db: Session = Depends(get_db)):
    new_room = Room(
        name=room.name,
        capacity=room.capacity,
        type=room.type,
        building=room.building
    )
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room

# GET All Rooms

@router.get("/", response_model=list[RoomResponse])
def get_rooms(db: Session = Depends(get_db)):
    return db.query(Room).all()

# GET Room by ID

@router.get("/{room_id}", response_model=RoomResponse)
def get_room(room_id: int, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

# UPDATE Room

@router.put("/{room_id}", response_model=RoomResponse)
def update_room(room_id: int, updated: RoomUpdate, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()

    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    room.name = updated.name
    room.capacity = updated.capacity
    room.type = updated.type
    room.building = updated.building

    db.commit()
    db.refresh(room)
    return room

# DELETE Room

@router.delete("/{room_id}")
def delete_room(room_id: int, db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()

    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    db.delete(room)
    db.commit()
    return {"message": "Room deleted successfully"}