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

interface RepresentativeFiltersProps {
  search: string;

  status: string;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: string) => void;

  onRefresh: () => void;
}

export default function RepresentativeFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onRefresh,
}: RepresentativeFiltersProps) {
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
        <Grid container spacing={2} alignItems="center">

          <Grid size={{ xs: 12, md: 7 }}>
            <TextField
              fullWidth
              placeholder="Search by code or name..."
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

          <Grid size={{ xs: 12, md: 3 }}>
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

              <MenuItem value="true">
                Active
              </MenuItem>

              <MenuItem value="false">
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