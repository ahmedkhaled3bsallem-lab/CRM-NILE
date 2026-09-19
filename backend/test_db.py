from sqlalchemy import text

from app.database.session import engine

try:
    with engine.connect() as connection:
        version = connection.execute(text("SELECT version();")).scalar()

    print("✅ Database connected successfully!")
    print(version)

except Exception as e:
    print("❌ Database connection failed!")
    print(e)