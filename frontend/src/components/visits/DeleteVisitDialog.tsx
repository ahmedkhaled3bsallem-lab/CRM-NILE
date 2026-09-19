import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DeleteVisitDialogProps {
  open: boolean;

  visitCode: string;

  loading: boolean;

  onClose: () => void;

  onConfirm: () => void | Promise<void>;
}

export default function DeleteVisitDialog({
  open,
  visitCode,
  loading,
  onClose,
  onConfirm,
}: DeleteVisitDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Visit
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete visit
          <strong>
            {" "}
            {visitCode}
          </strong>
          ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={loading}
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