from sqlalchemy import Column, Integer, String
from app.database import Base

class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    department = Column(String(100))
    semester = Column(Integer)
    total_students = Column(Integer)
