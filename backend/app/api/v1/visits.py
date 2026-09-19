from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.dependencies.database import get_db

from app.schemas.visit import (
    VisitCreate,
    VisitResponse,
    VisitUpdate,
)

from app.services.visit_service import (
    VisitService,
)

router = APIRouter(
    prefix="/api/v1/visits",
    tags=["Visits"],
)
@router.get(
    "/",
    response_model=list[VisitResponse],
)
def get_visits(
    db: Session = Depends(get_db),
):
    visits = VisitService.get_all(db)

    result = []

    for visit in visits:
        result.append(
            VisitResponse(
                id=visit.id,
                code=visit.code,
                visit_plan_id=visit.visit_plan_id,
                representative_id=visit.representative_id,
                representative_name=(
                    visit.representative.name
                    if visit.representative
                    else None
                ),
                customer_id=visit.customer_id,
                customer_name=(
                    visit.customer.name
                    if visit.customer
                    else None
                ),
                visit_date=visit.visit_date,
                check_in_time=visit.check_in_time,
                check_out_time=visit.check_out_time,
                latitude=visit.latitude,
                longitude=visit.longitude,
                visit_status=visit.visit_status,
                visit_result=visit.visit_result,
                notes=visit.notes,
                order_exists=visit.order_exists,
                order_amount=visit.order_amount,
                order_notes=visit.order_notes,
                collection_exists=visit.collection_exists,
                collection_amount=visit.collection_amount,
                payment_method=visit.payment_method,
                collection_notes=visit.collection_notes,
                need_follow_up=visit.need_follow_up,
                next_visit_date=visit.next_visit_date,
                created_at=visit.created_at,
                updated_at=visit.updated_at,
            )
        )

    return result
@router.get(
    "/{visit_id}",
    response_model=VisitResponse,
)
def get_visit(
    visit_id: int,
    db: Session = Depends(get_db),
):
    visit = VisitService.get_by_id(
        db,
        visit_id,
    )

    if visit is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit not found",
        )

    return VisitResponse(
        id=visit.id,
        code=visit.code,
        visit_plan_id=visit.visit_plan_id,
        representative_id=visit.representative_id,
        representative_name=(
            visit.representative.name
            if visit.representative
            else None
        ),
        customer_id=visit.customer_id,
        customer_name=(
            visit.customer.name
            if visit.customer
            else None
        ),
        visit_date=visit.visit_date,
        check_in_time=visit.check_in_time,
        check_out_time=visit.check_out_time,
        latitude=visit.latitude,
        longitude=visit.longitude,
        visit_status=visit.visit_status,
        visit_result=visit.visit_result,
        notes=visit.notes,
        order_exists=visit.order_exists,
        order_amount=visit.order_amount,
        order_notes=visit.order_notes,
        collection_exists=visit.collection_exists,
        collection_amount=visit.collection_amount,
        payment_method=visit.payment_method,
        collection_notes=visit.collection_notes,
        need_follow_up=visit.need_follow_up,
        next_visit_date=visit.next_visit_date,
        created_at=visit.created_at,
        updated_at=visit.updated_at,
    )
@router.post(
    "/",
    response_model=VisitResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_visit(
    data: VisitCreate,
    db: Session = Depends(get_db),
):
    try:
        visit = VisitService.create(
            db,
            data,
        )

        return VisitResponse(
            id=visit.id,
            code=visit.code,
            visit_plan_id=visit.visit_plan_id,
            representative_id=visit.representative_id,
            representative_name=(
                visit.representative.name
                if visit.representative
                else None
            ),
            customer_id=visit.customer_id,
            customer_name=(
                visit.customer.name
                if visit.customer
                else None
            ),
            visit_date=visit.visit_date,
            check_in_time=visit.check_in_time,
            check_out_time=visit.check_out_time,
            latitude=visit.latitude,
            longitude=visit.longitude,
            visit_status=visit.visit_status,
            visit_result=visit.visit_result,
            notes=visit.notes,
            order_exists=visit.order_exists,
            order_amount=visit.order_amount,
            order_notes=visit.order_notes,
            collection_exists=visit.collection_exists,
            collection_amount=visit.collection_amount,
            payment_method=visit.payment_method,
            collection_notes=visit.collection_notes,
            need_follow_up=visit.need_follow_up,
            next_visit_date=visit.next_visit_date,
            created_at=visit.created_at,
            updated_at=visit.updated_at,
        )

    except ValueError as ex:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ex),
        )
@router.put(
    "/{visit_id}",
    response_model=VisitResponse,
)
def update_visit(
    visit_id: int,
    data: VisitUpdate,
    db: Session = Depends(get_db),
):
    visit = VisitService.get_by_id(
        db,
        visit_id,
    )

    if visit is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit not found",
        )

    visit = VisitService.update(
        db,
        visit,
        data,
    )

    return VisitResponse(
        id=visit.id,
        code=visit.code,
        visit_plan_id=visit.visit_plan_id,
        representative_id=visit.representative_id,
        representative_name=(
            visit.representative.name
            if visit.representative
            else None
        ),
        customer_id=visit.customer_id,
        customer_name=(
            visit.customer.name
            if visit.customer
            else None
        ),
        visit_date=visit.visit_date,
        check_in_time=visit.check_in_time,
        check_out_time=visit.check_out_time,
        latitude=visit.latitude,
        longitude=visit.longitude,
        visit_status=visit.visit_status,
        visit_result=visit.visit_result,
        notes=visit.notes,
        order_exists=visit.order_exists,
        order_amount=visit.order_amount,
        order_notes=visit.order_notes,
        collection_exists=visit.collection_exists,
        collection_amount=visit.collection_amount,
        payment_method=visit.payment_method,
        collection_notes=visit.collection_notes,
        need_follow_up=visit.need_follow_up,
        next_visit_date=visit.next_visit_date,
        created_at=visit.created_at,
        updated_at=visit.updated_at,
    )
@router.delete(
    "/{visit_id}",
)
def delete_visit(
    visit_id: int,
    db: Session = Depends(get_db),
):
    visit = VisitService.get_by_id(
        db,
        visit_id,
    )

    if visit is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit not found",
        )

    VisitService.delete(
        db,
        visit,
    )

    return {
        "message": "Visit deleted successfully",
    }