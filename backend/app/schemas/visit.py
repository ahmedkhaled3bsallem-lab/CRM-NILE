from datetime import date, datetime, time
from typing import Optional

from pydantic import BaseModel, ConfigDict


class VisitBase(BaseModel):
    code: str

    visit_plan_id: int

    representative_id: int

    customer_id: int

    visit_date: date

    check_in_time: Optional[time] = None

    check_out_time: Optional[time] = None

    latitude: Optional[float] = None

    longitude: Optional[float] = None

    visit_status: str = "Planned"

    visit_result: Optional[str] = None

    notes: Optional[str] = None

    order_exists: bool = False

    order_amount: Optional[float] = None

    order_notes: Optional[str] = None

    collection_exists: bool = False

    collection_amount: Optional[float] = None

    payment_method: Optional[str] = None

    collection_notes: Optional[str] = None

    need_follow_up: bool = False

    next_visit_date: Optional[date] = None


class VisitCreate(VisitBase):
    pass


class VisitUpdate(BaseModel):
    code: Optional[str] = None

    visit_plan_id: Optional[int] = None

    representative_id: Optional[int] = None

    customer_id: Optional[int] = None

    visit_date: Optional[date] = None

    check_in_time: Optional[time] = None

    check_out_time: Optional[time] = None

    latitude: Optional[float] = None

    longitude: Optional[float] = None

    visit_status: Optional[str] = None

    visit_result: Optional[str] = None

    notes: Optional[str] = None

    order_exists: Optional[bool] = None

    order_amount: Optional[float] = None

    order_notes: Optional[str] = None

    collection_exists: Optional[bool] = None

    collection_amount: Optional[float] = None

    payment_method: Optional[str] = None

    collection_notes: Optional[str] = None

    need_follow_up: Optional[bool] = None

    next_visit_date: Optional[date] = None


class VisitResponse(VisitBase):
    id: int

    representative_name: str

    customer_name: str

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )