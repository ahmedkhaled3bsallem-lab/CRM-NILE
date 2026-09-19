from logging.config import fileConfig

from alembic import context
from sqlalchemy import pool

from app.core.config import settings
from app.database.base import Base
from app.database.session import engine

# استيراد جميع الـ Models
from app.models import *

config = context.config

# تحديث رابط قاعدة البيانات من ملف .env
config.set_main_option(
    "sqlalchemy.url",
    str(engine.url)
)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline():
    context.configure(
        url=str(engine.url),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()