from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import (
    auth,
    user,
    teacher,
    subject,
    class_route,
    room,
    time_slot,
    day,
    teacher_preference,
    constraint,
    timetable
)

app = FastAPI(title="Smart Timetable System")

# CORS FIRST
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(teacher.router)
app.include_router(subject.router)
app.include_router(class_route.router)
app.include_router(room.router)
app.include_router(time_slot.router)
app.include_router(day.router)
app.include_router(teacher_preference.router)
app.include_router(constraint.router)
app.include_router(timetable.router)

@app.get("/")
def home():
    return {"message": "FastAPI + MySQL connected successfully!"}
