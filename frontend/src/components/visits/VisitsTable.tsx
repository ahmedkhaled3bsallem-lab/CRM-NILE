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

import type { Visit } from "../../services/visitService";

interface VisitsTableProps {
  rows: Visit[];

  loading: boolean;

  onEdit: (visit: Visit) => void;

  onDelete: (visit: Visit) => void;
}

export default function VisitsTable({
  rows,
  loading,
  onEdit,
  onDelete,
}: VisitsTableProps) {
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
              Check In
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell align="right">
              Order
            </TableCell>

            <TableCell align="right">
              Collection
            </TableCell>

            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                align="center"
              >
                No visits found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((visit) => (
              <TableRow
                hover
                key={visit.id}
              >
                <TableCell>
                  {visit.code}
                </TableCell>

                <TableCell>
                  {visit.representative_name}
                </TableCell>

                <TableCell>
                  {visit.customer_name}
                </TableCell>

                <TableCell>
                  {visit.visit_date}
                </TableCell>

                <TableCell>
                  {visit.check_in_time ?? "-"}
                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    label={
                      visit.visit_status
                    }
                    color={
                      visit.visit_status ===
                      "Completed"
                        ? "success"
                        : visit.visit_status ===
                          "Cancelled"
                        ? "error"
                        : "warning"
                    }
                  />
                </TableCell>

                <TableCell align="right">
                  {visit.order_exists
                    ? visit.order_amount ??
                      0
                    : "-"}
                </TableCell>

                <TableCell align="right">
                  {visit.collection_exists
                    ? visit.collection_amount ??
                      0
                    : "-"}
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        onEdit(visit)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() =>
                        onDelete(
                          visit
                        )
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