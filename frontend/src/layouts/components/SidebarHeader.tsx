import { Box, Typography } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";
import { motion } from "framer-motion";

type SidebarHeaderProps = {
  collapsed: boolean;
};

export default function SidebarHeader({
  collapsed,
}: SidebarHeaderProps) {
  return (
    <Box
      sx={{
        height: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed
          ? "center"
          : "flex-start",
        px: collapsed ? 0 : 3,
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <motion.div
        whileHover={{
          rotate: 10,
          scale: 1.08,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg,#2196F3,#1565C0)",
            boxShadow:
              "0 10px 25px rgba(33,150,243,.35)",
          }}
        >
          <LocalHospital
            sx={{
              color: "#fff",
              fontSize: 30,
            }}
          />
        </Box>
      </motion.div>

      {!collapsed && (
        <Box ml={2}>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              lineHeight: 1.1,
            }}
          >
            Nile Pharma
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,.65)",
              fontSize: 12,
              letterSpacing: 1,
            }}
          >
            CRM SYSTEM
          </Typography>
        </Box>
      )}
    </Box>
  );
}