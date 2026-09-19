from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

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
    ) -> User | None:
        return (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    @staticmethod
    def get_by_username(
        db: Session,
        username: str,
    ) -> User | None:
        return (
            db.query(User)
            .filter(User.username == username)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        user: User,
    ) -> User:

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def save(
        db: Session,
        user: User,
    ) -> User:

        db.commit()
        db.refresh(user)

        return user