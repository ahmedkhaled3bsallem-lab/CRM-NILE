import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  People,
  Badge,
  LocationOn,
  Assessment,
  Settings,
  EventNote,
} from "@mui/icons-material";

type SidebarMenuProps = {
  collapsed: boolean;
};

const menuItems = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },

  {
    title: "Customers",
    icon: <People />,
    path: "/customers",
  },

  {
    title: "Representatives",
    icon: <Badge />,
    path: "/representatives",
  },

  {
   title: "Visit Plans",
   icon: <EventNote />,
   path: "/visit-plans",
  },

  {
    title: "Visits",
    icon: <LocationOn />,
    path: "/visits",
  },

  {
    title: "Reports",
    icon: <Assessment />,
    path: "/reports",
  },

  {
    title: "Settings",
    icon: <Settings />,
    path: "/settings",
  },

  
];

export default function SidebarMenu({
  collapsed,
}: SidebarMenuProps) {
  return (
    <Box
      sx={{
        flex: 1,
        mt: 2,
        px: 1.5,
      }}
    >
      {!collapsed && (
        <Typography
          sx={{
            color: "rgba(255,255,255,.45)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 1,
            mb: 1,
            px: 2,
          }}
        >
          CRM
        </Typography>
      )}

      <List disablePadding>
        {menuItems.map((item) => (
          <motion.div
            key={item.path}
            whileHover={{
              x: 4,
            }}
          >
            <NavLink
              to={item.path}
              style={{
                textDecoration: "none",
              }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    borderRadius: 3,
                    mb: 1,

                    minHeight: 50,

                    justifyContent: collapsed
                      ? "center"
                      : "flex-start",

                    background: isActive
                      ? "linear-gradient(90deg,#1976D2,#42A5F5)"
                      : "transparent",

                    color: "#fff",

                    "&:hover": {
                      background: isActive
                        ? "linear-gradient(90deg,#1976D2,#42A5F5)"
                        : "rgba(255,255,255,.08)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#fff",
                      minWidth: collapsed
                        ? 0
                        : 42,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {!collapsed && (
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: isActive
                          ? 700
                          : 500,
                      }}
                    />
                  )}
                </ListItemButton>
              )}
            </NavLink>
          </motion.div>
        ))}
      </List>
    </Box>
  );
}