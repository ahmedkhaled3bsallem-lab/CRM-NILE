import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteVisitPlanDialogProps {
  open: boolean;

  loading: boolean;

  visitPlanCode: string;

  onClose: () => void;

  onConfirm: () => void;
}

export default function DeleteVisitPlanDialog({
  open,
  loading,
 visitPlanCode,
  onClose,
  onConfirm,
}: DeleteVisitPlanDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Visit Plan
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete visit plan{" "}
          <strong>{visitPlanCode}</strong>?
        </DialogContentText>

        <DialogContentText
          sx={{
            mt: 2,
            color: "error.main",
            fontWeight: 600,
          }}
        >
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
        }}
      >
        <Button
          disabled={loading}
          onClick={onClose}
          color="inherit"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          disabled={loading}
          onClick={onConfirm}
        >
          {loading
            ? "Deleting..."
            : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}