from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.dependencies.database import get_db

from app.schemas.representative import (
    RepresentativeCreate,
    RepresentativeUpdate,
    RepresentativeResponse,
)

from app.services.representative_service import (
    RepresentativeService,
)

router = APIRouter(
    prefix="/api/v1/representatives",
    tags=["Representatives"],
)


@router.get(
    "/",
    response_model=list[RepresentativeResponse],
)
def get_representatives(
    db: Session = Depends(get_db),
):
    return RepresentativeService.get_all(db)


@router.get(
    "/{representative_id}",
    response_model=RepresentativeResponse,
)
def get_representative(
    representative_id: int,
    db: Session = Depends(get_db),
):
    representative = RepresentativeService.get_by_id(
        db,
        representative_id,
    )

    if representative is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Representative not found",
        )

    return representative


@router.post(
    "/",
    response_model=RepresentativeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_representative(
    data: RepresentativeCreate,
    db: Session = Depends(get_db),
):
    try:
        return RepresentativeService.create(
            db,
            data,
        )

    except ValueError as ex:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ex),
        )


@router.put(
    "/{representative_id}",
    response_model=RepresentativeResponse,
)
def update_representative(
    representative_id: int,
    data: RepresentativeUpdate,
    db: Session = Depends(get_db),
):
    representative = RepresentativeService.get_by_id(
        db,
        representative_id,
    )

    if representative is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Representative not found",
        )

    try:
        return RepresentativeService.update(
            db,
            representative,
            data,
        )

    except ValueError as ex:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ex),
        )


@router.delete(
    "/{representative_id}",
)
def delete_representative(
    representative_id: int,
    db: Session = Depends(get_db),
):
    representative = RepresentativeService.get_by_id(
        db,
        representative_id,
    )

    if representative is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Representative not found",
        )

    RepresentativeService.delete(
        db,
        representative,
    )

    return {
        "message": "Representative deleted successfully",
    }