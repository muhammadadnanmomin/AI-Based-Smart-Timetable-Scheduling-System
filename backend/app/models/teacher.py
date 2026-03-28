from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), unique=True)
    name = Column(String(100), nullable=False)
    department = Column(String(100))
    max_lectures_per_day = Column(Integer, default=4)
