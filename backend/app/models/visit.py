from datetime import date, datetime, time

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    Time,
    func,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.database.base import Base


class Visit(Base):
    __tablename__ = "visits"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    code: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False,
        index=True,
    )

    visit_plan_id: Mapped[int] = mapped_column(
        ForeignKey("visit_plans.id"),
        nullable=False,
    )

    representative_id: Mapped[int] = mapped_column(
        ForeignKey("representatives.id"),
        nullable=False,
    )

    customer_id: Mapped[int] = mapped_column(
        ForeignKey("customers.id"),
        nullable=False,
    )

    visit_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    check_in_time: Mapped[time | None] = mapped_column(
        Time,
        nullable=True,
    )

    check_out_time: Mapped[time | None] = mapped_column(
        Time,
        nullable=True,
    )

    latitude: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    longitude: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    visit_status: Mapped[str] = mapped_column(
        String(30),
        default="Planned",
        nullable=False,
    )

    visit_result: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    order_exists: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    order_amount: Mapped[float | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    order_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    collection_exists: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    collection_amount: Mapped[float | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    payment_method: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    collection_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    need_follow_up: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    next_visit_date: Mapped[date | None] = mapped_column(
        Date,
        nullable=True,
    )

    visit_plan = relationship(
        "VisitPlan",
        back_populates="visits",
    )

    representative = relationship(
        "Representative",
        back_populates="visits",
    )

    customer = relationship(
        "Customer",
        back_populates="visits",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
    )