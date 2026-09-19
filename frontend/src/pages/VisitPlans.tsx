import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import visitPlanService, {
  type VisitPlan,
} from "../services/visitPlanService";

import representativeService, {
  type Representative,
} from "../services/representativeService";

import customerService, {
  type Customer,
} from "../services/customerService";

import type { VisitPlanForm } from "../validation/visitPlanSchema";

import VisitPlanHeader from "../components/visit-plans/VisitPlanHeader";
import VisitPlanStats from "../components/visit-plans/VisitPlanStats";
import VisitPlanFilters from "../components/visit-plans/VisitPlanFilters";
import VisitPlansTable from "../components/visit-plans/VisitPlansTable";
import VisitPlanDialog from "../components/visit-plans/VisitPlanDialog";
import DeleteVisitPlanDialog from "../components/visit-plans/DeleteVisitPlanDialog";

export default function VisitPlans() {
  const [visitPlans, setVisitPlans] = useState<VisitPlan[]>([]);

  const [representatives, setRepresentatives] =
    useState<Representative[]>([]);

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedVisitPlan, setSelectedVisitPlan] =
    useState<VisitPlan | null>(null);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [priority, setPriority] =
    useState("");

  useEffect(() => {
    loadVisitPlans();
    loadRepresentatives();
    loadCustomers();
  }, []);

  async function loadVisitPlans() {
    try {
      setLoading(true);

      const data =
        await visitPlanService.getAll();

      setVisitPlans(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadRepresentatives() {
    try {
      const data =
        await representativeService.getRepresentatives();

      setRepresentatives(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCustomers() {
    try {
      const data =
        await customerService.getCustomers();

      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredVisitPlans = useMemo(() => {
    return visitPlans.filter((plan) => {
      const matchesSearch =
        plan.code
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (plan.customer_name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (plan.representative_name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "" ||
        plan.status === status;

      const matchesPriority =
        priority === "" ||
        plan.priority === priority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    visitPlans,
    search,
    status,
    priority,
  ]);

  const totalPlans =
    visitPlans.length;

  const plannedPlans =
    visitPlans.filter(
      (x) => x.status === "Planned"
    ).length;

  const completedPlans =
    visitPlans.filter(
      (x) => x.status === "Completed"
    ).length;

  const cancelledPlans =
    visitPlans.filter(
      (x) => x.status === "Cancelled"
    ).length;
      function handleAdd() {
    setSelectedVisitPlan(null);

    setDialogOpen(true);
  }

  function handleEdit(
    visitPlan: VisitPlan
  ) {
    setSelectedVisitPlan(
      visitPlan
    );

    setDialogOpen(true);
  }

  function handleDelete(
    visitPlan: VisitPlan
  ) {
    setSelectedVisitPlan(
      visitPlan
    );

    setDeleteOpen(true);
  }

  async function handleSave(
    visitPlan: VisitPlanForm
  ) {
    try {
      if (selectedVisitPlan) {
        await visitPlanService.update(
          selectedVisitPlan.id,
          visitPlan
        );
      } else {
        await visitPlanService.create(
          visitPlan
        );
      }

      await loadVisitPlans();

      setDialogOpen(false);

      setSelectedVisitPlan(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmDelete() {
    if (!selectedVisitPlan)
      return;

    try {
      await visitPlanService.delete(
        selectedVisitPlan.id
      );

      await loadVisitPlans();

      setDeleteOpen(false);

      setSelectedVisitPlan(null);
    } catch (error) {
      console.error(error);
    }
  }
    return (
    <Box sx={{ width: "100%" }}>
      <VisitPlanHeader
        onAdd={handleAdd}
      />

      <VisitPlanStats
        totalPlans={totalPlans}
        plannedCount={plannedPlans}
        completedCount={completedPlans}
        cancelledCount={cancelledPlans}
      />

      <VisitPlanFilters
        search={search}
        status={status}
        priority={priority}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onRefresh={loadVisitPlans}
      />

      <VisitPlansTable
        rows={filteredVisitPlans}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <VisitPlanDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedVisitPlan(null);
        }}
        onSave={handleSave}
        representatives={representatives}
        customers={customers}
        initialData={
          selectedVisitPlan
            ? {
                code:
                  selectedVisitPlan.code,

                representative_id:
                  selectedVisitPlan.representative_id,

                customer_id:
                  selectedVisitPlan.customer_id,

                visit_date:
                  selectedVisitPlan.visit_date,

                planned_time:
                  selectedVisitPlan.planned_time,

                priority:
                  selectedVisitPlan.priority,

                status:
                  selectedVisitPlan.status,

                notes:
                  selectedVisitPlan.notes ?? "",
              }
            : null
        }
      />

      <DeleteVisitPlanDialog
          open={deleteOpen}
          visitPlanCode={selectedVisitPlan?.code ?? ""}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedVisitPlan(null);
          } }
          onConfirm={confirmDelete} loading={false}      />
    </Box>
  );
}
  
