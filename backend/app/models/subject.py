from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    code = Column(String(20), unique=True)
    weekly_lectures = Column(Integer, nullable=False)
    is_lab = Column(Boolean, default=False)
    lab_duration = Column(Integer, default=1)
