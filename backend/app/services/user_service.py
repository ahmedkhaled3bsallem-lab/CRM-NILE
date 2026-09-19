from sqlalchemy.orm import Session

from app.auth.hashing import hash_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class UserService:

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(User)
            .order_by(User.id)
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        user_id: int,
    ):
        return (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        data: UserCreate,
    ):

        exists = (
            db.query(User)
            .filter(User.username == data.username)
            .first()
        )

        if exists:
            raise ValueError("Username already exists")

        user = User(
            username=data.username,
            full_name=data.full_name,
            password_hash=hash_password(data.password),
            email=data.email,
            phone=data.phone,
            role=data.role,
            is_active=True,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def update(
        db: Session,
        user: User,
        data: UserUpdate,
    ):

        values = data.model_dump(exclude_unset=True)

        if "password" in values:
            user.password_hash = hash_password(values.pop("password"))

        for key, value in values.items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def delete(
        db: Session,
        user: User,
    ):

        user.is_active = False

        db.commit()

        return user