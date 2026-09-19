"""add user fields

Revision ID: 9943e9ae0701
Revises: b79b436229ca
Create Date: 2026-07-29 16:28:48.117921

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "9943e9ae0701"
down_revision: Union[str, Sequence[str], None] = "b79b436229ca"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "users",
        sa.Column(
            "role",
            sa.String(length=50),
            server_default="user",
            nullable=False,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "email",
            sa.String(length=150),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "phone",
            sa.String(length=30),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )

def downgrade() -> None:
    op.drop_column("users", "updated_at")
    op.drop_column("users", "phone")
    op.drop_column("users", "email")
    op.drop_column("users", "role")