import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

interface RepresentativeHeaderProps {
  onAdd: () => void;
}

export default function RepresentativeHeader({
  onAdd,
}: RepresentativeHeaderProps) {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          Representatives
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Manage your sales representatives,
          assign customers, and track activity.
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          height: 48,
        }}
      >
        Add Representative
      </Button>
    </Box>
  );
}