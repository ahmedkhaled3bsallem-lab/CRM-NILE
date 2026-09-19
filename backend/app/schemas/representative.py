from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
)


class RepresentativeBase(BaseModel):
    code: str

    name: str

    phone: str | None = None

    email: EmailStr | None = None

    address: str | None = None

    is_active: bool = True


class RepresentativeCreate(RepresentativeBase):
    pass


class RepresentativeUpdate(BaseModel):
    code: str | None = None

    name: str | None = None

    phone: str | None = None

    email: EmailStr | None = None

    address: str | None = None

    is_active: bool | None = None


class RepresentativeResponse(RepresentativeBase):
    id: int

    customers_count: int = 0

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )