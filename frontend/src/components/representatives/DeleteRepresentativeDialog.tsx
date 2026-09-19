import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteRepresentativeDialogProps {
  open: boolean;

  representativeName: string;

  onClose: () => void;

  onConfirm: () => void;
}

export default function DeleteRepresentativeDialog({
  open,
  representativeName,
  onClose,
  onConfirm,
}: DeleteRepresentativeDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Representative
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete
          representative{" "}
          <strong>{representativeName}</strong>؟
          <br />
          <br />
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}