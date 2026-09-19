import { useEffect } from "react";

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
  representativeSchema,
  type RepresentativeForm,
} from "../../validation/representativeSchema";

interface RepresentativeDialogProps {
  open: boolean;

  onClose: () => void;

  onSave: (
    representative: RepresentativeForm
  ) => void;

  initialData?: RepresentativeForm | null;
}

export default function RepresentativeDialog({
  open,
  onClose,
  onSave,
  initialData,
}: RepresentativeDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<
    z.input<typeof representativeSchema>,
    unknown,
    z.output<typeof representativeSchema>
  >({
    resolver: zodResolver(
      representativeSchema
    ),

    defaultValues: {
      code: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      reset(initialData);
    } else {
      reset({
        code: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        is_active: true,
      });
    }
  }, [open, initialData, reset]);

  const onSubmit = (
    data: RepresentativeForm
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
          ? "Edit Representative"
          : "Add Representative"}
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
                  helperText={
                    errors.code?.message
                  }
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
                  label="Representative Name"
                  error={!!errors.name}
                  helperText={
                    errors.name?.message
                  }
                />
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
                  helperText={
                    errors.phone?.message
                  }
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  error={!!errors.email}
                  helperText={
                    errors.email?.message
                  }
                />
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
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={field.value ? "true" : "false"}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "true"
                    )
                  }
                >
                  <MenuItem value="true">
                    Active
                  </MenuItem>

                  <MenuItem value="false">
                    Inactive
                  </MenuItem>
                </TextField>
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
            ? "Update Representative"
            : "Save Representative"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}