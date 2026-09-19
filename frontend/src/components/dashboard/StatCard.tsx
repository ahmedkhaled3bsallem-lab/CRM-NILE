import { Card, CardContent, Typography, Box } from "@mui/material";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          background: "#ffffff",
          border: "1px solid #ECECEC",
          boxShadow: "0 8px 24px rgba(0,0,0,.05)",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
                mt={1}
              >
                {value}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: color,
                color: "#fff",
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}