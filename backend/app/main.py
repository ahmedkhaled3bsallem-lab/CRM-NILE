from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.customers import router as customers_router
from app.api.v1.representatives import  router as representatives_router
from app.api.v1.visit_plan import router as visit_plan_router
from app.api.v1.visits import router as visits_router


app = FastAPI(
    title="Pharma CRM API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(users_router)
app.include_router(customers_router)
app.include_router(representatives_router)
app.include_router(visit_plan_router)
app.include_router(visits_router)


@app.get("/")
def root():
    return {
        "message": "Pharma CRM API Running",
    }