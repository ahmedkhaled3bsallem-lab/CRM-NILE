import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import visitService, {
  type Visit,
} from "../services/visitService";

import visitPlanService, {
  type VisitPlan,
} from "../services/visitPlanService";

import representativeService, {
  type Representative,
} from "../services/representativeService";

import customerService, {
  type Customer,
} from "../services/customerService";

import type { VisitForm } from "../validation/visitSchema";

import VisitHeader from "../components/visits/VisitHeader";
import VisitStats from "../components/visits/VisitStats";
import VisitFilters from "../components/visits/VisitFilters";
import VisitsTable from "../components/visits/VisitsTable";
import VisitDialog from "../components/visits/VisitDialog";
import DeleteVisitDialog from "../components/visits/DeleteVisitDialog";

export default function Visits() {
  const [visits, setVisits] =
    useState<Visit[]>([]);

  const [visitPlans, setVisitPlans] =
    useState<VisitPlan[]>([]);

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

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [selectedVisit, setSelectedVisit] =
    useState<Visit | null>(null);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [
        visitsData,
        plansData,
        repsData,
        customersData,
      ] = await Promise.all([
        visitService.getAll(),
        visitPlanService.getAll(),
        representativeService.getRepresentatives(),
        customerService.getCustomers(),
      ]);

      setVisits(visitsData);

      setVisitPlans(plansData);

      setRepresentatives(repsData);

      setCustomers(customersData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
    const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const matchesSearch =
        visit.code
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (visit.customer_name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (visit.representative_name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "" ||
        visit.visit_status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    visits,
    search,
    status,
  ]);

  const totalVisits =
    visits.length;

  const completedVisits =
    visits.filter(
      (v) =>
        v.visit_status ===
        "Completed"
    ).length;

  const pendingVisits =
    visits.filter(
      (v) =>
        v.visit_status ===
        "Pending"
    ).length;

  const cancelledVisits =
    visits.filter(
      (v) =>
        v.visit_status ===
        "Cancelled"
    ).length;

  function handleAdd() {
    setSelectedVisit(null);
    setDialogOpen(true);
  }

  function handleEdit(
    visit: Visit
  ) {
    setSelectedVisit(visit);
    setDialogOpen(true);
  }

  function handleDelete(
    visit: Visit
  ) {
    setSelectedVisit(visit);
    setDeleteOpen(true);
  }

  async function handleSave(
    data: VisitForm
  ) {
    try {
      if (selectedVisit) {
        await visitService.update(
          selectedVisit.id,
          data as any
        );
      } else {
        await visitService.create(
          data as any
        );
      }

      await loadData();

      setDialogOpen(false);

      setSelectedVisit(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmDelete() {
    if (!selectedVisit) return;

    try {
      setDeleteLoading(true);

      await visitService.delete(
        selectedVisit.id
      );

      await loadData();

      setDeleteOpen(false);

      setSelectedVisit(null);
    } finally {
      setDeleteLoading(false);
    }
  }
    return (
    <Box sx={{ width: "100%" }}>
      <VisitHeader
        onAdd={handleAdd}
      />

      <VisitStats
        totalVisits={totalVisits}
        completedVisits={completedVisits}
        pendingVisits={pendingVisits}
        cancelledVisits={cancelledVisits}
      />

      <VisitFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onRefresh={loadData}
      />

      <VisitsTable
        rows={filteredVisits}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <VisitDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedVisit(null);
        }}
        onSave={handleSave}
        representatives={representatives}
        customers={customers}
        visitPlans={visitPlans}
        visits={visits}
        initialData={
          selectedVisit
            ? {
                code: selectedVisit.code,

                visit_plan_id:
                  selectedVisit.visit_plan_id,

                representative_id:
                  selectedVisit.representative_id,

                customer_id:
                  selectedVisit.customer_id,

                visit_date:
                  selectedVisit.visit_date,

                check_in_time:
                  selectedVisit.check_in_time,

                check_out_time:
                  selectedVisit.check_out_time,

                latitude:
                  selectedVisit.latitude,

                longitude:
                  selectedVisit.longitude,

                visit_status:
                  selectedVisit.visit_status as VisitForm["visit_status"],

                visit_result:
                  selectedVisit.visit_result,

                notes:
                  selectedVisit.notes ?? "",

                order_exists:
                  selectedVisit.order_exists,

                order_amount:
                  selectedVisit.order_amount,

                order_notes:
                  selectedVisit.order_notes,

                collection_exists:
                  selectedVisit.collection_exists,

                collection_amount:
                  selectedVisit.collection_amount,

                payment_method:
                  selectedVisit.payment_method,

                collection_notes:
                  selectedVisit.collection_notes,

                need_follow_up:
                  selectedVisit.need_follow_up,

                next_visit_date:
                  selectedVisit.next_visit_date,
              }
            : null
        }
      />
            <DeleteVisitDialog
        open={deleteOpen}
        visitCode={
          selectedVisit?.code ?? ""
        }
        loading={deleteLoading}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedVisit(null);
        }}
        onConfirm={confirmDelete}
      />
    </Box>
  );
}