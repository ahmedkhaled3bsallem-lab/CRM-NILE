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

  /*
   * ==========================================
   * RESET FORM
   * ==========================================
   */

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

  /*
   * ==========================================
   * WATCH VALUES
   * ==========================================
   */

  const visitPlanId = watch(
    "visit_plan_id"
  );

  const orderExists = watch(
    "order_exists"
  );

  const collectionExists = watch(
    "collection_exists"
  );

  const followUp = watch(
    "need_follow_up"
  );

  /*
   * ==========================================
   * GENERATE NEXT VISIT CODE
   *
   * V0001
   * V0002
   * V0003
   * ...
   * ==========================================
   */

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

  /*
   * ==========================================
   * SET AUTOMATIC CODE FOR NEW VISIT
   * ==========================================
   */

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

  /*
   * ==========================================
   * FIND SELECTED VISIT PLAN
   * ==========================================
   */

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

  /*
   * ==========================================
   * AUTO-FILL VISIT PLAN DATA
   * ==========================================
   */

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

  /*
   * ==========================================
   * SUBMIT
   * ==========================================
   */

  function handleFormSubmit(
    data: VisitForm
  ) {
    /*
     * New Visit:
     * always use the automatically
     * generated code.
     */

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
          {/* ========================= */}
          {/* CODE */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* VISIT PLAN */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* REPRESENTATIVE */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* CUSTOMER */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* VISIT DATE */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* PLANNED TIME */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* CHECK IN */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* CHECK OUT */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* LATITUDE */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* LONGITUDE */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* VISIT STATUS */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* VISIT RESULT */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* VISIT NOTES */}
          {/* ========================= */}

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

          {/* ========================= */}
          {/* ORDER */}
          {/* ========================= */}

          <Grid
            size={{
              xs: 12,
            }}
          >
            <Controller
              name="order_exists"
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
                  label="Order Created"
                />
              )}
            />
          </Grid>

          {orderExists && (
            <>
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Controller
                  name="order_amount"
                  control={control}
                  render={({
                    field,
                  }) => (
                    <TextField
                      type="number"
                      fullWidth
                      label="Order Amount"
                      value={
                        field.value ??
                        ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target
                            .value ===
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
                  md: 8,
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
                      label="Order Notes"
                      value={
                        field.value ??
                        ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target
                            .value ||
                            null
                        )
                      }
                    />
                  )}
                />
              </Grid>
            </>
          )}

          {/* ========================= */}
          {/* COLLECTION */}
          {/* ========================= */}

          <Grid
            size={{
              xs: 12,
            }}
          >
            <Controller
              name="collection_exists"
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
                  label="Collection Received"
                />
              )}
            />
          </Grid>

          {collectionExists && (
            <>
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Controller
                  name="collection_amount"
                  control={control}
                  render={({
                    field,
                  }) => (
                    <TextField
                      fullWidth
                      type="number"
                      label="Collection Amount"
                      value={
                        field.value ??
                        ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target
                            .value ===
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
                  md: 4,
                }}
              >
                <Controller
                  name="payment_method"
                  control={control}
                  render={({
                    field,
                  }) => (
                    <TextField
                      select
                      fullWidth
                      label="Payment Method"
                      value={
                        field.value ??
                        ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target
                            .value ||
                            null
                        )
                      }
                    >
                      <MenuItem value="">
                        Select
                      </MenuItem>

                      <MenuItem value="Cash">
                        Cash
                      </MenuItem>

                      <MenuItem value="Cheque">
                        Cheque
                      </MenuItem>

                      <MenuItem value="Transfer">
                        Bank Transfer
                      </MenuItem>
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
                  name="collection_notes"
                  control={control}
                  render={({
                    field,
                  }) => (
                    <TextField
                      fullWidth
                      label="Collection Notes"
                      value={
                        field.value ??
                        ""
                      }
                      onChange={(e) =>
                        field.onChange(
                          e.target
                            .value ||
                            null
                        )
                      }
                    />
                  )}
                />
              </Grid>
            </>
          )}

          {/* ========================= */}
          {/* FOLLOW UP */}
          {/* ========================= */}

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