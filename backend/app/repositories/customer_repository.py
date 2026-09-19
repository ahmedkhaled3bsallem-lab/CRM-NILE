from sqlalchemy.orm import (
    Session,
    joinedload,
)

from app.models.customer import Customer


class CustomerRepository:

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(Customer)
            .options(
                joinedload(Customer.representative)
            )
            .order_by(Customer.id)
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        customer_id: int,
    ):
        return (
            db.query(Customer)
            .options(
                joinedload(Customer.representative)
            )
            .filter(Customer.id == customer_id)
            .first()
        )

    @staticmethod
    def get_by_code(
        db: Session,
        code: str,
    ):
        return (
            db.query(Customer)
            .filter(Customer.code == code)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        customer: Customer,
    ):
        db.add(customer)
        db.commit()
        db.refresh(customer)
        return customer

    @staticmethod
    def update(
        db: Session,
        customer: Customer,
    ):
        db.commit()
        db.refresh(customer)
        return customer

    @staticmethod
    def delete(
        db: Session,
        customer: Customer,
    ):
        db.delete(customer)
        db.commit()