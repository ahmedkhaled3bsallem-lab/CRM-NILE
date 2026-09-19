import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import {
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Representative {
  id: number;

  code: string;

  name: string;

  phone: string;

  email: string;

  address: string;

  is_active: boolean;

  customers_count?: number;

  created_at: string;

  updated_at: string;
}

interface RepresentativesTableProps {
  rows: Representative[];

  loading: boolean;

  onEdit: (representative: Representative) => void;

  onDelete: (representative: Representative) => void;
}

export default function RepresentativesTable({
  rows,
  loading,
  onEdit,
  onDelete,
}: RepresentativesTableProps) {
  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "name",
      headerName: "Representative",
      flex: 1.5,
      minWidth: 200,
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 220,
    },

    {
      field: "customers_count",
      headerName: "Customers",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ?? 0}
          color="primary"
          size="small"
        />
      ),
    },

    {
      field: "is_active",
      headerName: "Status",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={
            params.value
              ? "Active"
              : "Inactive"
          }
          color={
            params.value
              ? "success"
              : "error"
          }
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 130,

      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() =>
                onEdit(params.row)
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() =>
                onDelete(params.row)
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: 650,
        width: "100%",
        bgcolor: "#fff",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
    </Box>
  );
}