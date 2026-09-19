import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface VisitHeaderProps {
  onAdd: () => void;
}

export default function VisitHeader({
  onAdd,
}: VisitHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 3 }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
      >
        Visits
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          py: 1,
        }}
      >
        New Visit
      </Button>
    </Stack>
  );
}