from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from database.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)

    feature = Column(String(50))
    language = Column(String(50))

    code = Column(Text)
    response = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)