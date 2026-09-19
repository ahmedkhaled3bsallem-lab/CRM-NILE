from sqlalchemy.orm import Session

from app.auth.hashing import verify_password
from app.auth.jwt import create_access_token
from app.repositories.user_repository import UserRepository
from app.schemas.auth import LoginRequest


class AuthService:

    @staticmethod
    def login(
        db: Session,
        data: LoginRequest,
    ) -> str:

        user = UserRepository.get_by_username(
            db,
            data.username,
        )

        if user is None:
            raise ValueError("Invalid username or password")

        if not verify_password(
            data.password,
            user.password_hash,
        ):
            raise ValueError("Invalid username or password")

        if not user.is_active:
            raise ValueError("User is inactive")

        token = create_access_token(
            {
                "sub": user.username,
                "user_id": user.id,
            }
        )

        return token