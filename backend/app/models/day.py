from sqlalchemy import Column, Integer, Enum
from app.database import Base

class Day(Base):
    __tablename__ = "days"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(Enum(
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ), unique=True)
