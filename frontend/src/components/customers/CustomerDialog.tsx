import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import {
  useForm,
  Controller,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  customerSchema,
  type CustomerForm,
} from "../../validation/customerSchema";

import representativeService, {
  type Representative,
} from "../../services/representativeService";

interface CustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (customer: CustomerForm) => void;
  initialData?: CustomerForm | null;
}

export default function CustomerDialog({
  open,
  onClose,
  onSave,
  initialData,
}: CustomerDialogProps) {
  const [representatives, setRepresentatives] =
    useState<Representative[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<
    z.input<typeof customerSchema>,
    unknown,
    z.output<typeof customerSchema>
  >({
    resolver: zodResolver(customerSchema),

    defaultValues: {
      code: "",
      name: "",
      customer_type: "",
      status: "Active",

      phone: "",
      mobile: "",

      email: "",

      address: "",

      governorate: "",
      city: "",

      representative_id: null,

      latitude: null,
      longitude: null,

      notes: "",
    },
  });

  useEffect(() => {
    async function loadRepresentatives() {
      try {
        const data =
          await representativeService.getRepresentatives();

        setRepresentatives(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (open) {
      loadRepresentatives();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      reset(initialData);
    } else {
      reset({
        code: "",
        name: "",
        customer_type: "",
        status: "Active",

        phone: "",
        mobile: "",

        email: "",

        address: "",

        governorate: "",
        city: "",

        representative_id: null,

        latitude: null,
        longitude: null,

        notes: "",
      });
    }
  }, [open, initialData, reset]);

  const onSubmit = (
    data: z.output<typeof customerSchema>
  ) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {initialData
          ? "Edit Customer"
          : "Add Customer"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Code"
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Customer Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="customer_type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  label="Customer Type"
                  error={!!errors.customer_type}
                  helperText={errors.customer_type?.message}
                >
                  <MenuItem value="صيدلية">
                    صيدلية
                  </MenuItem>

                  <MenuItem value="مستشفى">
                    مستشفى
                  </MenuItem>

                  <MenuItem value="مخزن">
                    مخزن
                  </MenuItem>

                  <MenuItem value="عيادة">
                    عيادة
                  </MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  select
                  label="Status"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="Active">
                    Active
                  </MenuItem>

                  <MenuItem value="Inactive">
                    Inactive
                  </MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mobile"
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="governorate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Governorate"
                  error={!!errors.governorate}
                  helperText={
                    errors.governorate?.message
                  }
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="City"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
  <Controller
    name="representative_id"
    control={control}
    render={({ field }) => (
      <TextField
        fullWidth
        select
        label="Representative"
        value={field.value ?? ""}
        onChange={(e) =>
          field.onChange(
            e.target.value === ""
              ? null
              : Number(e.target.value)
          )
        }
        error={!!errors.representative_id}
        helperText={
          errors.representative_id?.message
        }
      >
        <MenuItem value="">
          بدون مندوب
        </MenuItem>

        {representatives.map((rep) => (
          <MenuItem
            key={rep.id}
            value={rep.id}
          >
            {rep.name}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
</Grid>

<Grid size={{ xs: 12 }}>
  <Controller
    name="address"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        fullWidth
        multiline
        minRows={3}
        label="Address"
        error={!!errors.address}
        helperText={errors.address?.message}
      />
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
        minRows={3}
        label="Notes"
      />
    )}
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <Controller
    name="latitude"
    control={control}
    render={({ field }) => (
      <TextField
        fullWidth
        type="number"
        label="Latitude"
        value={field.value ?? ""}
        onChange={(e) =>
          field.onChange(
            e.target.value === ""
              ? null
              : Number(e.target.value)
          )
        }
      />
    )}
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <Controller
    name="longitude"
    control={control}
    render={({ field }) => (
      <TextField
        fullWidth
        type="number"
        label="Longitude"
        value={field.value ?? ""}
        onChange={(e) =>
          field.onChange(
            e.target.value === ""
              ? null
              : Number(e.target.value)
          )
        }
      />
    )}
  />
</Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #ECECEC",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          sx={{
            minWidth: 170,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Update Customer"
            : "Save Customer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}