from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
)


class CustomerBase(BaseModel):
    code: str

    name: str

    customer_type: str

    status: str

    phone: str | None = None

    mobile: str | None = None

    email: EmailStr | None = None

    address: str | None = None

    governorate: str | None = None

    city: str | None = None

    latitude: float | None = None

    longitude: float | None = None

    notes: str | None = None

    representative_id: int | None = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    code: str | None = None

    name: str | None = None

    customer_type: str | None = None

    status: str | None = None

    phone: str | None = None

    mobile: str | None = None

    email: EmailStr | None = None

    address: str | None = None

    governorate: str | None = None

    city: str | None = None

    latitude: float | None = None

    longitude: float | None = None

    notes: str | None = None

    representative_id: int | None = None


class CustomerResponse(CustomerBase):
    id: int

    representative_name: str | None = None

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )