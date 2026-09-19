from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.customer import Customer
from app.models.representative import Representative
from app.models.visit_plan import VisitPlan

from app.schemas.visit_plan import (
    VisitPlanCreate,
    VisitPlanUpdate,
)


class VisitPlanService:

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(VisitPlan)
            .options(
                joinedload(
                    VisitPlan.customer
                ),
                joinedload(
                    VisitPlan.representative
                ),
            )
            .order_by(
                VisitPlan.visit_date.desc(),
                VisitPlan.planned_time.asc(),
            )
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        visit_plan_id: int,
    ):
        return (
            db.query(VisitPlan)
            .options(
                joinedload(
                    VisitPlan.customer
                ),
                joinedload(
                    VisitPlan.representative
                ),
            )
            .filter(
                VisitPlan.id == visit_plan_id
            )
            .first()
        )

    @staticmethod
    def get_by_code(
        db: Session,
        code: str,
    ):
        return (
            db.query(VisitPlan)
            .filter(
                VisitPlan.code == code
            )
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        data: VisitPlanCreate,
    ):
        exists = VisitPlanService.get_by_code(
            db,
            data.code,
        )

        if exists:
            raise ValueError(
                "Visit Plan code already exists."
            )

        representative = (
            db.query(Representative)
            .filter(
                Representative.id
                == data.representative_id
            )
            .first()
        )

        if representative is None:
            raise ValueError(
                "Representative not found."
            )

        customer = (
            db.query(Customer)
            .filter(
                Customer.id
                == data.customer_id
            )
            .first()
        )

        if customer is None:
            raise ValueError(
                "Customer not found."
            )

        visit = VisitPlan(
            code=data.code,
            representative_id=data.representative_id,
            customer_id=data.customer_id,
            visit_date=data.visit_date,
            planned_time=data.planned_time,
            priority=data.priority,
            status=data.status,
            notes=data.notes,
        )

        db.add(visit)

        db.commit()

        db.refresh(visit)

        return visit

    @staticmethod
    def update(
        db: Session,
        visit: VisitPlan,
        data: VisitPlanUpdate,
    ):
        values = data.model_dump(
            exclude_unset=True
        )

        if (
            "code" in values
            and values["code"] != visit.code
        ):
            exists = VisitPlanService.get_by_code(
                db,
                values["code"],
            )

            if exists:
                raise ValueError(
                    "Visit Plan code already exists."
                )

        for key, value in values.items():
            setattr(
                visit,
                key,
                value,
            )

        db.commit()

        db.refresh(visit)

        return visit

    @staticmethod
    def delete(
        db: Session,
        visit: VisitPlan,
    ):
        db.delete(visit)

        db.commit()