from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.visit import Visit


class VisitRepository:

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(Visit)
            .options(
                joinedload(Visit.visit_plan),
                joinedload(Visit.representative),
                joinedload(Visit.customer),
            )
            .order_by(Visit.id)
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        visit_id: int,
    ):
        return (
            db.query(Visit)
            .options(
                joinedload(Visit.visit_plan),
                joinedload(Visit.representative),
                joinedload(Visit.customer),
            )
            .filter(Visit.id == visit_id)
            .first()
        )

    @staticmethod
    def get_by_code(
        db: Session,
        code: str,
    ):
        return (
            db.query(Visit)
            .filter(Visit.code == code)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        visit: Visit,
    ):
        db.add(visit)
        db.commit()
        db.refresh(visit)
        return visit

    @staticmethod
    def update(
        db: Session,
        visit: Visit,
    ):
        db.commit()
        db.refresh(visit)
        return visit

    @staticmethod
    def delete(
        db: Session,
        visit: Visit,
    ):
        db.delete(visit)
        db.commit()