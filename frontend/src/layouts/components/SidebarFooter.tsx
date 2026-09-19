import { Box, Avatar, Typography, IconButton } from "@mui/material";

import { Logout } from "@mui/icons-material";

import { motion } from "framer-motion";

import { useAuth } from "../../context/AuthContext";

type SidebarFooterProps = {
  collapsed: boolean;
};

export default function SidebarFooter({
  collapsed,
}: SidebarFooterProps) {
  const { logout } = useAuth();

  return (
    <Box
      sx={{
        borderTop: "1px solid rgba(255,255,255,.08)",
        p: 2,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={
          collapsed ? "center" : "space-between"
        }
      >
        <Box
          display="flex"
          alignItems="center"
        >
          <Avatar
            sx={{
              bgcolor: "#1976D2",
              width: 46,
              height: 46,
              fontWeight: 700,
            }}
          >
            A
          </Avatar>

          {!collapsed && (
            <Box ml={2}>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Administrator
              </Typography>

              <Typography
                sx={{
                  color:
                    "rgba(255,255,255,.6)",
                  fontSize: 12,
                }}
              >
                System Admin
              </Typography>
            </Box>
          )}
        </Box>

        {!collapsed && (
          <motion.div
            whileHover={{
              rotate: 15,
              scale: 1.1,
            }}
            whileTap={{
              scale: .9,
            }}
          >
            <IconButton
              onClick={logout}
              sx={{
                color: "#fff",

                "&:hover": {
                  bgcolor:
                    "rgba(255,255,255,.08)",
                },
              }}
            >
              <Logout />
            </IconButton>
          </motion.div>
        )}
      </Box>
    </Box>
  );
}