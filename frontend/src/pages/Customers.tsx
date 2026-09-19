import { useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import customerService, {
  type Customer,
} from "../services/customerService";

import representativeService, {
  type Representative,
} from "../services/representativeService";

import type { CustomerForm } from "../validation/customerSchema";

import CustomerHeader from "../components/customers/CustomerHeader";
import CustomerStats from "../components/customers/CustomerStats";
import CustomerFilters from "../components/customers/CustomerFilters";
import CustomersTable from "../components/customers/CustomersTable";
import CustomerDialog from "../components/customers/CustomerDialog";
import DeleteCustomerDialog from "../components/customers/DeleteCustomerDialog";
export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

const [representatives, setRepresentatives] =
  useState<Representative[]>([]);

const [representativeId, setRepresentativeId] =
  useState<number | "">("");

  const [loading, setLoading] = useState(true);
  

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [customerType, setCustomerType] =
    useState("");

  useEffect(() => {
    loadCustomers();
    loadRepresentatives();
  }, []);

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
      setLoading(true);

      const data =
        await customerService.getCustomers();

      setCustomers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
    const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.code
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (customer.representative_name ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "" ||
        customer.status === status;

      const matchesType =
        customerType === "" ||
        customer.customer_type === customerType;
      const matchesRepresentative =
       representativeId === "" ||
       customer.representative_id === representativeId;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType && 
        matchesRepresentative
      );
    });
  }, [
    customers,
    search,
    status,
    customerType,
  ]);

  const totalCustomers =
    customers.length;

  const activeCustomers =
    customers.filter(
      (c) => c.status === "Active"
    ).length;

  const inactiveCustomers =
    customers.filter(
      (c) => c.status === "Inactive"
    ).length;

  const creditCustomers =
    customers.filter(
      (c) => c.representative_id !== null
    ).length;
      function handleAdd() {
    setSelectedCustomer(null);
    setDialogOpen(true);
  }

  function handleEdit(customer: Customer) {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  }

  function handleDelete(customer: Customer) {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  }

  async function handleSave(
    customer: CustomerForm
  ) {
    try {
      if (selectedCustomer) {
        await customerService.updateCustomer(
          selectedCustomer.id,
          customer
        );
      } else {
        await customerService.createCustomer(
          customer
        );
      }

      await loadCustomers();

      setDialogOpen(false);

      setSelectedCustomer(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function confirmDelete() {
    if (!selectedCustomer) return;

    try {
      await customerService.deleteCustomer(
        selectedCustomer.id
      );

      await loadCustomers();

      setDeleteOpen(false);

      setSelectedCustomer(null);
    } catch (error) {
      console.error(error);
    }
  }
    return (
    <Box sx={{ width: "100%" }}>
      <CustomerHeader
        onAdd={handleAdd}
      />

      <CustomerStats
        totalCustomers={totalCustomers}
        activeCustomers={activeCustomers}
        inactiveCustomers={inactiveCustomers}
        creditCustomers={creditCustomers}
      />

      <CustomerFilters
        search={search}
        status={status}
        customerType={customerType}
        representativeId={representativeId}
        representatives={representatives}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onCustomerTypeChange={setCustomerType}
        onRepresentativeChange={setRepresentativeId}
        onRefresh={loadCustomers}
      />

      <CustomersTable
        rows={filteredCustomers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
            <CustomerDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSave}
        initialData={
          selectedCustomer
            ? {
                code: selectedCustomer.code,

                name: selectedCustomer.name,

                customer_type:
                  selectedCustomer.customer_type,

                status:
                  selectedCustomer.status,

                phone:
                  selectedCustomer.phone,

                mobile:
                  selectedCustomer.mobile,

                email:
                  selectedCustomer.email,

                address:
                  selectedCustomer.address,

                governorate:
                  selectedCustomer.governorate,

                city:
                  selectedCustomer.city,

                representative_id:
                  selectedCustomer.representative_id,

                latitude:
                  selectedCustomer.latitude,

                longitude:
                  selectedCustomer.longitude,

                notes:
                  selectedCustomer.notes,
              }
            : null
        }
      />
            <DeleteCustomerDialog
        open={deleteOpen}
        customerName={
          selectedCustomer?.name ?? ""
        }
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={confirmDelete}
      />
    </Box>
  );
}