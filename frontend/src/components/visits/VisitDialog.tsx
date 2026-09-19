import { useEffect, useMemo } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import {
  useForm,
  Controller,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  visitSchema,
  type VisitForm,
} from "../../validation/visitSchema";

import type { Representative } from "../../services/representativeService";
import type { Customer } from "../../services/customerService";
import type { VisitPlan } from "../../services/visitPlanService";
import type { Visit } from "../../services/visitService";

interface VisitDialogProps {
  open: boolean;

  onClose: () => void;

  onSave: (
    data: VisitForm
  ) => void;

  representatives: Representative[];

  customers: Customer[];

  visitPlans: VisitPlan[];

  visits: Visit[];

  initialData: VisitForm | null;
}

const defaultValues: VisitForm = {
  code: "",

  visit_plan_id: null,

  representative_id: null,

  customer_id: null,

  visit_date: "",

  check_in_time: null,

  check_out_time: null,

  latitude: null,

  longitude: null,

  visit_status: "Pending",

  visit_result: null,

  notes: "",

  order_exists: false,

  order_amount: null,

  order_notes: null,

  collection_exists: false,

  collection_amount: null,

  payment_method: null,

  collection_notes: null,

  need_follow_up: false,

  next_visit_date: null,
};

export default function VisitDialog({
  open,
  onClose,
  onSave,
  representatives,
  customers,
  visitPlans,
  visits,
  initialData,
}: VisitDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<VisitForm>({
    resolver: zodResolver(
      visitSchema
    ),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset(defaultValues);
    }
  }, [
    initialData,
    reset,
  ]);

  const visitPlanId = watch(
    "visit_plan_id"
  );

  const followUp = watch(
    "need_follow_up"
  );

  const nextVisitCode = useMemo(() => {
    let maxNumber = 0;

    for (const visit of visits) {
      const match =
        visit.code?.match(
          /^V(\d+)$/
        );

      if (!match) {
        continue;
      }

      const number = Number(
        match[1]
      );

      if (
        Number.isFinite(number) &&
        number > maxNumber
      ) {
        maxNumber = number;
      }
    }

    return `V${String(
      maxNumber + 1
    ).padStart(4, "0")}`;
  }, [visits]);

  useEffect(() => {
    if (
      open &&
      !initialData
    ) {
      setValue(
        "code",
        nextVisitCode
      );
    }
  }, [
    open,
    initialData,
    nextVisitCode,
    setValue,
  ]);

  const selectedVisitPlan =
    useMemo(() => {
      if (
        visitPlanId === null ||
        visitPlanId === undefined
      ) {
        return null;
      }

      return (
        visitPlans.find(
          (plan) =>
            plan.id ===
            visitPlanId
        ) ?? null
      );
    }, [
      visitPlanId,
      visitPlans,
    ]);

  useEffect(() => {
    if (!selectedVisitPlan) {
      return;
    }

    setValue(
      "representative_id",
      selectedVisitPlan.representative_id,
      {
        shouldValidate: true,
      }
    );

    setValue(
      "customer_id",
      selectedVisitPlan.customer_id,
      {
        shouldValidate: true,
      }
    );

    setValue(
      "visit_date",
      selectedVisitPlan.visit_date,
      {
        shouldValidate: true,
      }
    );
  }, [
    selectedVisitPlan,
    setValue,
  ]);

  function handleFormSubmit(
    data: VisitForm
  ) {
    if (!initialData) {
      data.code =
        nextVisitCode;
    }

    onSave(data);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>
        {initialData
          ? "Edit Visit"
          : "New Visit"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 0.5,
          }}
        >
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Controller
              name="code"
              control={control}
              render={({
                field,
                fieldState,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Code"
                  value={
                    initialData
                      ? field.value
                      : nextVisitCode
                  }
                  disabled
                  error={
                    !!fieldState.error
                  }
                  helperText={
                    fieldState.error
                      ?.message
                  }
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Controller
              name="visit_plan_id"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  select
                  fullWidth
                  label="Visit Plan"
                  value={
                    field.value ??
                    ""
                  }
                  onChange={(e) => {
                    const value =
                      e.target.value;

                    field.onChange(
                      value === ""
                        ? null
                        : Number(
                            value
                          )
                    );
                  }}
                >
                  <MenuItem value="">
                    None
                  </MenuItem>

                  {visitPlans.map(
                    (plan) => (
                      <MenuItem
                        key={plan.id}
                        value={plan.id}
                      >
                        {plan.code}
                      </MenuItem>
                    )
                  )}
                </TextField>
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Controller
              name="representative_id"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  select
                  fullWidth
                  label="Representative"
                  value={
                    field.value ??
                    ""
                  }
                  disabled={
                    selectedVisitPlan !==
                    null
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ===
                        ""
                        ? null
                        : Number(
                            e.target
                              .value
                          )
                    )
                  }
                >
                  <MenuItem value="">
                    Select
                  </MenuItem>

                  {representatives.map(
                    (rep) => (
                      <MenuItem
                        key={rep.id}
                        value={rep.id}
                      >
                        {rep.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Controller
              name="customer_id"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  select
                  fullWidth
                  label="Customer"
                  value={
                    field.value ??
                    ""
                  }
                  disabled={
                    selectedVisitPlan !==
                    null
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ===
                        ""
                        ? null
                        : Number(
                            e.target
                              .value
                          )
                    )
                  }
                >
                  <MenuItem value="">
                    Select
                  </MenuItem>

                  {customers.map(
                    (customer) => (
                      <MenuItem
                        key={customer.id}
                        value={
                          customer.id
                        }
                      >
                        {customer.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Controller
              name="visit_date"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  label="Visit Date"
                  disabled={
                    selectedVisitPlan !==
                    null
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <TextField
              fullWidth
              label="Planned Time"
              value={
                selectedVisitPlan
                  ?.planned_time ??
                ""
              }
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Controller
              name="check_in_time"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  value={
                    field.value ?? ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ||
                        null
                    )
                  }
                  type="time"
                  fullWidth
                  label="Check In"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Controller
              name="check_out_time"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  value={
                    field.value ?? ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ||
                        null
                    )
                  }
                  type="time"
                  fullWidth
                  label="Check Out"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Controller
              name="latitude"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  type="number"
                  fullWidth
                  label="Latitude"
                  value={
                    field.value ?? ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ===
                        ""
                        ? null
                        : Number(
                            e.target
                              .value
                          )
                    )
                  }
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Controller
              name="longitude"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  type="number"
                  fullWidth
                  label="Longitude"
                  value={
                    field.value ?? ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ===
                        ""
                        ? null
                        : Number(
                            e.target
                              .value
                          )
                    )
                  }
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Controller
              name="visit_status"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Visit Status"
                >
                  <MenuItem value="Pending">
                    Pending
                  </MenuItem>

                  <MenuItem value="Completed">
                    Completed
                  </MenuItem>

                  <MenuItem value="Cancelled">
                    Cancelled
                  </MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <Controller
              name="visit_result"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  fullWidth
                  label="Visit Result"
                  value={
                    field.value ?? ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ||
                        null
                    )
                  }
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
            }}
          >
            <Controller
              name="notes"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="Visit Notes"
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Controller
              name="order_notes"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Order notes"
                  placeholder="What happened about the order in this visit..."
                  value={
                    field.value ?? ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ||
                        null
                    )
                  }
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Controller
              name="collection_notes"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Collection notes"
                  placeholder="Any collection notes for this visit..."
                  value={
                    field.value ?? ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ||
                        null
                    )
                  }
                />
              )}
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
            }}
          >
            <Controller
              name="need_follow_up"
              control={control}
              render={({
                field,
              }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        field.value
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target
                            .checked
                        )
                      }
                    />
                  }
                  label="Need Follow Up"
                />
              )}
            />
          </Grid>

          {followUp && (
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Controller
                name="next_visit_date"
                control={control}
                render={({
                  field,
                }) => (
                  <TextField
                    fullWidth
                    type="date"
                    label="Next Visit Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      field.value ??
                      ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ||
                          null
                      )
                    }
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Button
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(
            handleFormSubmit
          )}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}