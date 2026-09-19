from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.representative import Representative

from app.schemas.representative import (
    RepresentativeCreate,
    RepresentativeUpdate,
)


class RepresentativeService:

    @staticmethod
    def get_all(db: Session):
        results = (
            db.query(
                Representative,
                func.count(Customer.id).label(
                    "customers_count"
                ),
            )
            .outerjoin(
                Customer,
                Representative.id
                == Customer.representative_id,
            )
            .group_by(Representative.id)
            .order_by(Representative.name.asc())
            .all()
        )

        representatives = []

        for representative, customers_count in results:
            representative.customers_count = customers_count
            representatives.append(representative)

        return representatives

    @staticmethod
    def get_by_id(
        db: Session,
        representative_id: int,
    ):
        result = (
            db.query(
                Representative,
                func.count(Customer.id).label(
                    "customers_count"
                ),
            )
            .outerjoin(
                Customer,
                Representative.id
                == Customer.representative_id,
            )
            .filter(
                Representative.id == representative_id
            )
            .group_by(Representative.id)
            .first()
        )

        if result is None:
            return None

        representative, customers_count = result

        representative.customers_count = customers_count

        return representative

    @staticmethod
    def get_by_code(
        db: Session,
        code: str,
    ):
        return (
            db.query(Representative)
            .filter(
                Representative.code == code
            )
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        data: RepresentativeCreate,
    ):
        exists = RepresentativeService.get_by_code(
            db,
            data.code,
        )

        if exists:
            raise ValueError(
                "Representative code already exists."
            )

        representative = Representative(
            code=data.code,
            name=data.name,
            phone=data.phone,
            email=data.email,
            address=data.address,
            is_active=data.is_active,
        )

        db.add(representative)
        db.commit()
        db.refresh(representative)

        representative.customers_count = 0

        return representative

    @staticmethod
    def update(
        db: Session,
        representative: Representative,
        data: RepresentativeUpdate,
    ):
        values = data.model_dump(
            exclude_unset=True
        )

        if (
            "code" in values
            and values["code"] != representative.code
        ):
            exists = RepresentativeService.get_by_code(
                db,
                values["code"],
            )

            if exists:
                raise ValueError(
                    "Representative code already exists."
                )

        for key, value in values.items():
            setattr(
                representative,
                key,
                value,
            )

        db.commit()
        db.refresh(representative)

        representative.customers_count = (
            db.query(func.count(Customer.id))
            .filter(
                Customer.representative_id
                == representative.id
            )
            .scalar()
        )

        return representative

    @staticmethod
    def delete(
        db: Session,
        representative: Representative,
    ):
        db.delete(representative)
        db.commit()