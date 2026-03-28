from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Constraint(Base):
    __tablename__ = "constraints"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(100), nullable=False)
    value = Column(String(255), nullable=False)
    description = Column(Text)
