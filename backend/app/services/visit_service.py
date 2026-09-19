from app.models.visit import Visit

from app.repositories.visit_repository import (
    VisitRepository,
)

from app.schemas.visit import (
    VisitCreate,
    VisitUpdate,
)


class VisitService:

    @staticmethod
    def get_all(db):
        return VisitRepository.get_all(db)

    @staticmethod
    def get_by_id(
        db,
        visit_id: int,
    ):
        return VisitRepository.get_by_id(
            db,
            visit_id,
        )

    @staticmethod
    def create(
        db,
        data: VisitCreate,
    ):
        existing = VisitRepository.get_by_code(
            db,
            data.code,
        )

        if existing:
            raise ValueError(
                "Visit code already exists"
            )

        visit = Visit(
            code=data.code,
            visit_plan_id=data.visit_plan_id,
            representative_id=data.representative_id,
            customer_id=data.customer_id,
            visit_date=data.visit_date,
            check_in_time=data.check_in_time,
            check_out_time=data.check_out_time,
            latitude=data.latitude,
            longitude=data.longitude,
            visit_status=data.visit_status,
            visit_result=data.visit_result,
            notes=data.notes,
            order_exists=data.order_exists,
            order_amount=data.order_amount,
            order_notes=data.order_notes,
            collection_exists=data.collection_exists,
            collection_amount=data.collection_amount,
            payment_method=data.payment_method,
            collection_notes=data.collection_notes,
            need_follow_up=data.need_follow_up,
            next_visit_date=data.next_visit_date,
        )

        return VisitRepository.create(
            db,
            visit,
        )

    @staticmethod
    def update(
        db,
        visit: Visit,
        data: VisitUpdate,
    ):
        values = data.model_dump(
            exclude_unset=True
        )

        for key, value in values.items():
            setattr(
                visit,
                key,
                value,
            )

        return VisitRepository.update(
            db,
            visit,
        )

    @staticmethod
    def delete(
        db,
        visit: Visit,
    ):
        VisitRepository.delete(
            db,
            visit,
        )