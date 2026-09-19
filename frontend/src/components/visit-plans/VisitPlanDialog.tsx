import { useEffect } from "react";

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  visitPlanSchema,
  type VisitPlanForm,
} from "../../validation/visitPlanSchema";

import type { Representative } from "../../services/representativeService";
import type { Customer } from "../../services/customerService";

interface VisitPlanDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: VisitPlanForm) => void;
  representatives: Representative[];
  customers: Customer[];
  displayCode: string;
  initialData: VisitPlanForm | null;
}

export default function VisitPlanDialog({
  open,
  onClose,
  onSave,
  representatives,
  customers,
  displayCode,
  initialData,
}: VisitPlanDialogProps) {
  const { control, handleSubmit, reset, watch, setValue } =
    useForm<VisitPlanForm>({
      resolver: zodResolver(visitPlanSchema),
      defaultValues: {
        representative_id: undefined as unknown as number,
        customer_ids: [],
        visit_date: "",
        planned_time: "",
        priority: "Medium",
        status: "Planned",
        notes: "",
      },
    });

  const representativeId = watch("representative_id");
  const selectedCustomerIds = watch("customer_ids");

  const filteredCustomers = customers.filter(
    (customer) => customer.representative_id === representativeId
  );

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        representative_id: undefined as unknown as number,
        customer_ids: [],
        visit_date: "",
        planned_time: "",
        priority: "Medium",
        status: "Planned",
        notes: "",
      });
    }
  }, [initialData, reset, open]);

  useEffect(() => {
    if (!representativeId) {
      setValue("customer_ids", []);
      return;
    }

    const allowedIds = customers
      .filter((customer) => customer.representative_id === representativeId)
      .map((customer) => customer.id);

    const nextIds = selectedCustomerIds.filter((id) =>
      allowedIds.includes(id)
    );

    if (nextIds.length !== selectedCustomerIds.length) {
      setValue("customer_ids", nextIds);
    }
  }, [representativeId, customers, selectedCustomerIds, setValue]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {initialData ? "Edit Visit Plan" : "New Visit Plan"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Code"
              value={displayCode}
              disabled
              helperText="Generated automatically"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="representative_id"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  select
                  fullWidth
                  label="Representative"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  {representatives.map((rep) => (
                    <MenuItem key={rep.id} value={rep.id}>
                      {rep.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="customer_ids"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  disabled={!representativeId}
                  options={filteredCustomers}
                  getOptionLabel={(option) => option.name}
                  value={filteredCustomers.filter((customer) =>
                    field.value.includes(customer.id)
                  )}
                  onChange={(_, value) =>
                    field.onChange(value.map((customer) => customer.id))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customers"
                      placeholder={
                        representativeId
                          ? "Select one or more customers"
                          : "Select representative first"
                      }
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message ||
                        (representativeId
                          ? "Only customers assigned to this representative"
                          : "Choose a representative first")
                      }
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="visit_date"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label="Visit Date"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="planned_time"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="time"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label="Planned Time"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="priority"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Priority"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Status"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="Planned">Planned</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  minRows={4}
                  label="Notes"
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSave)}>
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}