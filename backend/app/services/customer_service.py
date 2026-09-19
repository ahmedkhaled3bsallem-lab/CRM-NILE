from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.repositories.customer_repository import CustomerRepository
from app.schemas.customer import (
    CustomerCreate,
    CustomerUpdate,
)


class CustomerService:

    @staticmethod
    def get_all(db: Session):
        return CustomerRepository.get_all(db)

    @staticmethod
    def get_by_id(
        db: Session,
        customer_id: int,
    ):
        return CustomerRepository.get_by_id(
            db,
            customer_id,
        )

    @staticmethod
    def create(
        db: Session,
        data: CustomerCreate,
    ):
        exists = CustomerRepository.get_by_code(
            db,
            data.code,
        )

        if exists:
            raise ValueError(
                "Customer code already exists"
            )

        customer = Customer(
            code=data.code,
            name=data.name,
            customer_type=data.customer_type,
            status=data.status,
            phone=data.phone,
            mobile=data.mobile,
            email=data.email,
            address=data.address,
            governorate=data.governorate,
            city=data.city,
            latitude=data.latitude,
            longitude=data.longitude,
            notes=data.notes,
            representative_id=data.representative_id,
        )

        return CustomerRepository.create(
            db,
            customer,
        )

    @staticmethod
    def update(
        db: Session,
        customer: Customer,
        data: CustomerUpdate,
    ):
        values = data.model_dump(
            exclude_unset=True,
        )

        for key, value in values.items():
            setattr(
                customer,
                key,
                value,
            )

        return CustomerRepository.update(
            db,
            customer,
        )

    @staticmethod
    def delete(
        db: Session,
        customer: Customer,
    ):
        CustomerRepository.delete(
            db,
            customer,
        )