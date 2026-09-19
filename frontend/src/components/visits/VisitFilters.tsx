import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

interface VisitFiltersProps {
  search: string;
  status: string;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onRefresh: () => void;
}

export default function VisitFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onRefresh,
}: VisitFiltersProps) {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
      }}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={(e) =>
              onSearchChange(
                e.target.value
              )
            }
            placeholder="Code / Customer / Representative"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <TextField
            select
            fullWidth
            label="Status"
            value={status}
            onChange={(e) =>
              onStatusChange(
                e.target.value
              )
            }
          >
            <MenuItem value="">
              All
            </MenuItem>

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
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            height="100%"
            alignItems="center"
          >
            <Button
              variant="outlined"
              startIcon={
                <RefreshIcon />
              }
              onClick={onRefresh}
            >
              Refresh
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}