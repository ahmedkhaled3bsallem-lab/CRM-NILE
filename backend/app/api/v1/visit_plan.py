from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.dependencies.database import get_db

from app.schemas.visit_plan import (
    VisitPlanCreate,
    VisitPlanResponse,
    VisitPlanUpdate,
)

from app.services.visit_plan_service import (
    VisitPlanService,
)

router = APIRouter(
    prefix="/api/v1/visit-plans",
    tags=["Visit Plans"],
)


@router.get(
    "/",
    response_model=list[VisitPlanResponse],
)
def get_visit_plans(
    db: Session = Depends(get_db),
):
    visit_plans = VisitPlanService.get_all(db)

    result = []

    for visit in visit_plans:
        result.append(
            VisitPlanResponse(
                id=visit.id,
                code=visit.code,
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
                planned_time=visit.planned_time,
                priority=visit.priority,
                status=visit.status,
                notes=visit.notes,
                created_at=visit.created_at,
                updated_at=visit.updated_at,
            )
        )

    return result


@router.get(
    "/{visit_plan_id}",
    response_model=VisitPlanResponse,
)
def get_visit_plan(
    visit_plan_id: int,
    db: Session = Depends(get_db),
):
    visit = VisitPlanService.get_by_id(
        db,
        visit_plan_id,
    )

    if visit is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit Plan not found",
        )

    return VisitPlanResponse(
        id=visit.id,
        code=visit.code,
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
        planned_time=visit.planned_time,
        priority=visit.priority,
        status=visit.status,
        notes=visit.notes,
        created_at=visit.created_at,
        updated_at=visit.updated_at,
    )


@router.post(
    "/",
    response_model=VisitPlanResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_visit_plan(
    data: VisitPlanCreate,
    db: Session = Depends(get_db),
):
    try:
        visit = VisitPlanService.create(
            db,
            data,
        )

        return VisitPlanResponse(
            id=visit.id,
            code=visit.code,
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
            planned_time=visit.planned_time,
            priority=visit.priority,
            status=visit.status,
            notes=visit.notes,
            created_at=visit.created_at,
            updated_at=visit.updated_at,
        )

    except ValueError as ex:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ex),
        )


@router.put(
    "/{visit_plan_id}",
    response_model=VisitPlanResponse,
)
def update_visit_plan(
    visit_plan_id: int,
    data: VisitPlanUpdate,
    db: Session = Depends(get_db),
):
    visit = VisitPlanService.get_by_id(
        db,
        visit_plan_id,
    )

    if visit is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit Plan not found",
        )

    visit = VisitPlanService.update(
        db,
        visit,
        data,
    )

    return VisitPlanResponse(
        id=visit.id,
        code=visit.code,
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
        planned_time=visit.planned_time,
        priority=visit.priority,
        status=visit.status,
        notes=visit.notes,
        created_at=visit.created_at,
        updated_at=visit.updated_at,
    )


@router.delete(
    "/{visit_plan_id}",
)
def delete_visit_plan(
    visit_plan_id: int,
    db: Session = Depends(get_db),
):
    visit = VisitPlanService.get_by_id(
        db,
        visit_plan_id,
    )

    if visit is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visit Plan not found",
        )

    VisitPlanService.delete(
        db,
        visit,
    )

    return {
        "message": "Visit Plan deleted successfully",
    }