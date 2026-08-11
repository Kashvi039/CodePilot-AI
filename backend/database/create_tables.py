from database.database import engine, Base
from models.analysis import Analysis

Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully!")