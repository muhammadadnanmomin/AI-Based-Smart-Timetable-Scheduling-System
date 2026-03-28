from sqlalchemy import Column, Integer, String, Enum
from app.database import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    capacity = Column(Integer)
    type = Column(Enum("lecture", "lab"), nullable=False)
    building = Column(String(100))
