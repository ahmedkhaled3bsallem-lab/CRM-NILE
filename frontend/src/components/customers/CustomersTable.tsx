import { useMemo } from "react";

import {
  Box,
  Chip,
  IconButton,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";

import {
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";

import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import type {
  Customer,
} from "../../services/customerService";

interface CustomersTableProps {
  rows: Customer[];
  loading: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onView?: (customer: Customer) => void;
}

export default function CustomersTable({
  rows,
  loading,
  onEdit,
  onDelete,
  onView,
}: CustomersTableProps) {
  const columns = useMemo<GridColDef<Customer>[]>(
    () => [
      {
        field: "code",
        headerName: "Code",
        width: 110,
      },

      {
        field: "name",
        headerName: "Customer",
        flex: 1.5,
      },

      {
       field: "representative_name",
       headerName: "Representative",
       width: 180,
       valueGetter: (_, row) =>
        row.representative_name ?? "-",
      },

      {
        field: "customer_type",
        headerName: "Type",
        width: 140,
      },

      {
        field: "phone",
        headerName: "Phone",
        width: 160,
      },
            {
        field: "mobile",
        headerName: "Mobile",
        width: 160,
      },

      {
        field: "email",
        headerName: "Email",
        flex: 1.3,
      },

      {
        field: "governorate",
        headerName: "Governorate",
        width: 150,
      },

      {
        field: "city",
        headerName: "City",
        width: 140,
      },

      {
        field: "status",
        headerName: "Status",
        width: 120,

        renderCell: (params) => (
          <Chip
            size="small"
            label={params.row.status}
            color={
              params.row.status === "Active"
                ? "success"
                : "default"
            }
          />
        ),
      },
            {
        field: "actions",
        headerName: "Actions",
        width: 170,

        sortable: false,

        filterable: false,

        renderCell: (params) => (
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
          >
            <Tooltip title="View">
              <IconButton
                size="small"
                color="primary"
                onClick={() => onView?.(params.row)}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton
                size="small"
                color="warning"
                onClick={() => onEdit(params.row)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(params.row)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    [onEdit, onDelete, onView]
  );
    return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
        boxShadow: "0 8px 24px rgba(0,0,0,.05)",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F8FAFC",
              fontWeight: 700,
              borderBottom: "1px solid #ECECEC",
            },

            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #F3F3F3",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F5F9FF",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #ECECEC",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}