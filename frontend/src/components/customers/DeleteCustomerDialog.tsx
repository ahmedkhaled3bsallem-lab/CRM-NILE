import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { WarningAmber } from "@mui/icons-material";

interface DeleteCustomerDialogProps {
  open: boolean;
  customerName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteCustomerDialog({
  open,
  customerName,
  onClose,
  onConfirm,
}: DeleteCustomerDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          pt: 4,
        }}
      >
        <Box
          sx={{
            width: 70,
            height: 70,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            bgcolor: "#FFF3E0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarningAmber
            sx={{
              color: "#F57C00",
              fontSize: 40,
            }}
          />
        </Box>

        Delete Customer
      </DialogTitle>

      <DialogContent>
        <Typography
          align="center"
          color="text.secondary"
        >
          Are you sure you want to delete
        </Typography>

        <Typography
          align="center"
          fontWeight={700}
          mt={1}
        >
          {customerName}
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mt={2}
        >
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          pb: 3,
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            minWidth: 120,
            borderRadius: 3,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{
            minWidth: 120,
            borderRadius: 3,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}