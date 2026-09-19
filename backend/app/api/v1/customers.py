from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies.database import get_db

from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse,
    CustomerUpdate,
)

from app.services.customer_service import CustomerService

router = APIRouter(
    prefix="/api/v1/customers",
    tags=["Customers"],
)


@router.get(
    "/",
    response_model=list[CustomerResponse],
)
def get_customers(
    db: Session = Depends(get_db),
):
    customers = CustomerService.get_all(db)

    result = []

    for customer in customers:
        result.append(
            CustomerResponse(
                id=customer.id,
                code=customer.code,
                name=customer.name,
                customer_type=customer.customer_type,
                status=customer.status,
                phone=customer.phone,
                mobile=customer.mobile,
                email=customer.email,
                address=customer.address,
                governorate=customer.governorate,
                city=customer.city,
                latitude=customer.latitude,
                longitude=customer.longitude,
                notes=customer.notes,
                representative_id=customer.representative_id,
                representative_name=(
                    customer.representative.name
                    if customer.representative
                    else None
                ),
                created_at=customer.created_at,
                updated_at=customer.updated_at,
            )
        )

    return result


@router.get(
    "/{customer_id}",
    response_model=CustomerResponse,
)
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = CustomerService.get_by_id(
        db,
        customer_id,
    )

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    return CustomerResponse(
        id=customer.id,
        code=customer.code,
        name=customer.name,
        customer_type=customer.customer_type,
        status=customer.status,
        phone=customer.phone,
        mobile=customer.mobile,
        email=customer.email,
        address=customer.address,
        governorate=customer.governorate,
        city=customer.city,
        latitude=customer.latitude,
        longitude=customer.longitude,
        notes=customer.notes,
        representative_id=customer.representative_id,
        representative_name=(
            customer.representative.name
            if customer.representative
            else None
        ),
        created_at=customer.created_at,
        updated_at=customer.updated_at,
    )


@router.post(
    "/",
    response_model=CustomerResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_customer(
    data: CustomerCreate,
    db: Session = Depends(get_db),
):
    try:
        customer = CustomerService.create(
            db,
            data,
        )

        return CustomerResponse(
            id=customer.id,
            code=customer.code,
            name=customer.name,
            customer_type=customer.customer_type,
            status=customer.status,
            phone=customer.phone,
            mobile=customer.mobile,
            email=customer.email,
            address=customer.address,
            governorate=customer.governorate,
            city=customer.city,
            latitude=customer.latitude,
            longitude=customer.longitude,
            notes=customer.notes,
            representative_id=customer.representative_id,
            representative_name=(
                customer.representative.name
                if customer.representative
                else None
            ),
            created_at=customer.created_at,
            updated_at=customer.updated_at,
        )

    except ValueError as ex:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ex),
        )


@router.put(
    "/{customer_id}",
    response_model=CustomerResponse,
)
def update_customer(
    customer_id: int,
    data: CustomerUpdate,
    db: Session = Depends(get_db),
):
    customer = CustomerService.get_by_id(
        db,
        customer_id,
    )

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    customer = CustomerService.update(
        db,
        customer,
        data,
    )

    return CustomerResponse(
        id=customer.id,
        code=customer.code,
        name=customer.name,
        customer_type=customer.customer_type,
        status=customer.status,
        phone=customer.phone,
        mobile=customer.mobile,
        email=customer.email,
        address=customer.address,
        governorate=customer.governorate,
        city=customer.city,
        latitude=customer.latitude,
        longitude=customer.longitude,
        notes=customer.notes,
        representative_id=customer.representative_id,
        representative_name=(
            customer.representative.name
            if customer.representative
            else None
        ),
        created_at=customer.created_at,
        updated_at=customer.updated_at,
    )


@router.delete(
    "/{customer_id}",
)
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = CustomerService.get_by_id(
        db,
        customer_id,
    )

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    CustomerService.delete(
        db,
        customer,
    )

    return {
        "message": "Customer deleted successfully",
    }