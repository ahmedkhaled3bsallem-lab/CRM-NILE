import { Box, Typography} from "@mui/material";

import { motion } from "framer-motion";

export default function DashboardHeader() {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Dashboard
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}