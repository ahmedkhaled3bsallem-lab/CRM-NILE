from datetime import (
    date,
    datetime,
    time,
)

from pydantic import BaseModel, ConfigDict


class VisitPlanBase(BaseModel):
    code: str

    representative_id: int

    customer_id: int

    visit_date: date

    planned_time: time

    priority: str = "Medium"

    status: str = "Planned"

    notes: str | None = None


class VisitPlanCreate(VisitPlanBase):
    pass


class VisitPlanUpdate(BaseModel):
    code: str | None = None

    representative_id: int | None = None

    customer_id: int | None = None

    visit_date: date | None = None

    planned_time: time | None = None

    priority: str | None = None

    status: str | None = None

    notes: str | None = None


class VisitPlanResponse(VisitPlanBase):
    id: int

    representative_name: str | None = None

    customer_name: str | None = None

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )