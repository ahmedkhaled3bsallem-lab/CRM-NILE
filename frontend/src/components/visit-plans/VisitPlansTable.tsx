import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { VisitPlan } from "../../services/visitPlanService";

interface VisitPlansTableProps {
  rows: VisitPlan[];
  loading: boolean;
  onEdit: (visitPlan: VisitPlan) => void;
  onDelete: (visitPlan: VisitPlan) => void;
}

export default function VisitPlansTable({
  rows,
  loading,
  onEdit,
  onDelete,
}: VisitPlansTableProps) {
  if (loading) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography>
          Loading...
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Code
            </TableCell>

            <TableCell>
              Representative
            </TableCell>

            <TableCell>
              Customer
            </TableCell>

            <TableCell>
              Visit Date
            </TableCell>

            <TableCell>
              Time
            </TableCell>

            <TableCell>
              Priority
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell
              align="center"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
              >
                No visit plans found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((plan) => (
              <TableRow
                key={plan.id}
                hover
              >
                <TableCell>
                  {plan.code}
                </TableCell>

                <TableCell>
                  {
                    plan.representative_name
                  }
                </TableCell>

                <TableCell>
                  {plan.customer_name}
                </TableCell>

                <TableCell>
                  {plan.visit_date}
                </TableCell>

                <TableCell>
                  {plan.planned_time}
                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    label={
                      plan.priority
                    }
                    color={
                      plan.priority ===
                      "High"
                        ? "error"
                        : plan.priority ===
                          "Medium"
                        ? "warning"
                        : "success"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    label={
                      plan.status
                    }
                    color={
                      plan.status ===
                      "Completed"
                        ? "success"
                        : plan.status ===
                          "Cancelled"
                        ? "error"
                        : "primary"
                    }
                  />
                </TableCell>

                <TableCell
                  align="center"
                >
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        onEdit(plan)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() =>
                        onDelete(plan)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}