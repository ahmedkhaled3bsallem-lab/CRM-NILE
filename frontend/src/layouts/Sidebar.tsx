import {
  Drawer,
  Box,
} from "@mui/material";

import SidebarHeader from "./components/SidebarHeader";
import SidebarMenu from "./components/SidebarMenu";
import SidebarFooter from "./components/SidebarFooter";

const drawerWidth = 280;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          border: 0,

          background:
            "linear-gradient(180deg,#0F4C81,#1565C0)",

          color: "#fff",

          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <SidebarHeader collapsed={false} />

      <SidebarMenu collapsed={false} />

      <Box sx={{ flexGrow: 1 }} />

      <SidebarFooter collapsed={false} />
    </Drawer>
  );
}