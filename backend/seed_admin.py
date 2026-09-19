from app.auth.hashing import hash_password
from app.database.session import SessionLocal
from app.models.user import User

db = SessionLocal()

try:
    exists = (
        db.query(User)
        .filter(User.username == "admin")
        .first()
    )

    if exists:
        print("Admin already exists.")
    else:
        admin = User(
            username="admin",
            full_name="System Administrator",
            password_hash=hash_password("123456"),
            is_active=True,
        )

        db.add(admin)
        db.commit()

        print("Admin created successfully.")

finally:
    db.close()