import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import representativeService, {
  type Representative,
} from "../services/representativeService";

import type { RepresentativeForm } from "../validation/representativeSchema";

import RepresentativeHeader from "../components/representatives/RepresentativeHeader";
import RepresentativeStats from "../components/representatives/RepresentativeStats";
import RepresentativeFilters from "../components/representatives/RepresentativeFilters";
import RepresentativesTable from "../components/representatives/RepresentativesTable";
import RepresentativeDialog from "../components/representatives/RepresentativeDialog";
import DeleteRepresentativeDialog from "../components/representatives/DeleteRepresentativeDialog";

export default function Representatives() {
  const [representatives, setRepresentatives] =
    useState<Representative[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedRepresentative, setSelectedRepresentative] =
    useState<Representative | null>(null);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  useEffect(() => {
    loadRepresentatives();
  }, []);
  async function loadRepresentatives() {
  try {
    setLoading(true);

    const data =
      await representativeService.getRepresentatives();

    setRepresentatives(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

const filteredRepresentatives = useMemo(() => {
  return representatives.filter(
    (representative) => {
      const matchesSearch =
        representative.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        representative.code
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "" ||
        representative.is_active ===
          (status === "true");

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );
}, [
  representatives,
  search,
  status,
]);

const totalRepresentatives =
  representatives.length;

const activeRepresentatives =
  representatives.filter(
    (r) => r.is_active
  ).length;

const inactiveRepresentatives =
  representatives.filter(
    (r) => !r.is_active
  ).length;

const totalCustomers =
  representatives.reduce(
    (sum, representative) =>
      sum +
      (representative.customers_count ?? 0),
    0
  );

function handleAdd() {
  setSelectedRepresentative(null);

  setDialogOpen(true);
}

function handleEdit(
  representative: Representative
) {
  setSelectedRepresentative(
    representative
  );

  setDialogOpen(true);
}

function handleDelete(
  representative: Representative
) {
  setSelectedRepresentative(
    representative
  );

  setDeleteOpen(true);
}
async function handleSave(
  representative: RepresentativeForm
) {
  try {
    if (selectedRepresentative) {
      await representativeService.updateRepresentative(
        selectedRepresentative.id,
        representative
      );
    } else {
      await representativeService.createRepresentative(
        representative
      );
    }

    await loadRepresentatives();

    setDialogOpen(false);

    setSelectedRepresentative(null);
  } catch (error) {
    console.error(error);
  }
}

async function confirmDelete() {
  if (!selectedRepresentative) return;

  try {
    await representativeService.deleteRepresentative(
      selectedRepresentative.id
    );

    await loadRepresentatives();

    setDeleteOpen(false);

    setSelectedRepresentative(null);
  } catch (error) {
    console.error(error);
  }
}
return (
  <Box sx={{ width: "100%" }}>
    <RepresentativeHeader
      onAdd={handleAdd}
    />

    <RepresentativeStats
      totalRepresentatives={totalRepresentatives}
      activeRepresentatives={activeRepresentatives}
      inactiveRepresentatives={inactiveRepresentatives}
      totalCustomers={totalCustomers}
    />

    <RepresentativeFilters
      search={search}
      status={status}
      onSearchChange={setSearch}
      onStatusChange={setStatus}
      onRefresh={loadRepresentatives}
    />

    <RepresentativesTable
      rows={filteredRepresentatives}
      loading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />

    <RepresentativeDialog
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
        setSelectedRepresentative(null);
      }}
      onSave={handleSave}
      initialData={
        selectedRepresentative
          ? {
              code: selectedRepresentative.code,
              name: selectedRepresentative.name,
              phone: selectedRepresentative.phone,
              email: selectedRepresentative.email,
              address: selectedRepresentative.address,
              is_active:
                selectedRepresentative.is_active,
            }
          : null
      }
    />

    <DeleteRepresentativeDialog
      open={deleteOpen}
      representativeName={
        selectedRepresentative?.name ?? ""
      }
      onClose={() => {
        setDeleteOpen(false);
        setSelectedRepresentative(null);
      }}
      onConfirm={confirmDelete}
    />
  </Box>
);
}