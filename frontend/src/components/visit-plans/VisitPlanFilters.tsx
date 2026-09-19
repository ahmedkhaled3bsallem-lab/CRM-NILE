import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

interface VisitPlanFiltersProps {
  search: string;

  status: string;

  priority: string;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onPriorityChange: (
    value: string
  ) => void;

  onRefresh: () => void;
}

export default function VisitPlanFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onRefresh,
}: VisitPlanFiltersProps) {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={2}
          alignItems="center"
        >
          <Grid
            size={{
              xs: 12,
              md: 4,
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
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>
                Status
              </InputLabel>

              <Select
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

                <MenuItem value="Planned">
                  Planned
                </MenuItem>

                <MenuItem value="Completed">
                  Completed
                </MenuItem>

                <MenuItem value="Cancelled">
                  Cancelled
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>
                Priority
              </InputLabel>

              <Select
                label="Priority"
                value={priority}
                onChange={(e) =>
                  onPriorityChange(
                    e.target.value
                  )
                }
              >
                <MenuItem value="">
                  All
                </MenuItem>

                <MenuItem value="High">
                  High
                </MenuItem>

                <MenuItem value="Medium">
                  Medium
                </MenuItem>

                <MenuItem value="Low">
                  Low
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  <RefreshIcon />
                }
                onClick={onRefresh}
              >
                Refresh
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}