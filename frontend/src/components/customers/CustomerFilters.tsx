import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import type {
  Representative,
} from "../../services/representativeService";

interface CustomerFiltersProps {
  search: string;

  status: string;

  customerType: string;

  representativeId: number | "";

  representatives: Representative[];

  onSearchChange: (value: string) => void;

  onStatusChange: (value: string) => void;

  onCustomerTypeChange: (value: string) => void;

  onRepresentativeChange: (
    value: number | ""
  ) => void;

  onRefresh: () => void;
}

export default function CustomerFilters({
  search,
  status,
  customerType,
  representativeId,
  representatives,
  onSearchChange,
  onStatusChange,
  onCustomerTypeChange,
  onRepresentativeChange,
  onRefresh,
}: CustomerFiltersProps) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 4,
        border: "1px solid #ECECEC",
        boxShadow: "0 8px 24px rgba(0,0,0,.05)",
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
                    <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              placeholder="Search by code, name or representative..."
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2.5 }}>
            <TextField
              select
              fullWidth
              label="Customer Type"
              value={customerType}
              onChange={(e) =>
                onCustomerTypeChange(e.target.value)
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

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
          </Grid>

          <Grid size={{ xs: 12, md: 2.5 }}>
            <TextField
              select
              fullWidth
              label="Representative"
              value={representativeId}
              onChange={(e) =>
                onRepresentativeChange(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                )
              }
            >
              <MenuItem value="">
                All Representatives
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
          </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) =>
                onStatusChange(e.target.value)
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="Inactive">
                Inactive
              </MenuItem>
            </TextField>
          </Grid>

          <Grid
            size={{ xs: 12, md: 2 }}
            display="flex"
            justifyContent="flex-end"
          >
            <IconButton
              color="primary"
              onClick={onRefresh}
              sx={{
                border: "1px solid #E0E0E0",
                borderRadius: 2,
                width: 48,
                height: 48,
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}