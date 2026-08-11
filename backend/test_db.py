from database.database import engine

try:
    conn = engine.connect()
    print("✅ Connected to PostgreSQL!")
    conn.close()
except Exception as e:
    print(e)