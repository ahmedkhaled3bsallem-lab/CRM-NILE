import { Box, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";

interface CustomerHeaderProps {
  onAdd: () => void;
}

export default function CustomerHeader({
  onAdd,
}: CustomerHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Customers
          </Typography>

          <Typography color="text.secondary">
            Manage all customers
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAdd}
        >
          Add Customer
        </Button>
      </Box>
    </motion.div>
  );
}