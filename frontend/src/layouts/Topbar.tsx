import { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  NotificationsNone,
  Search,
  CalendarMonth,
  AccessTime,
} from "@mui/icons-material";

export default function Topbar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const date = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: "calc(100% - 280px)",
        ml: "280px",
        background: "#ffffff",
        color: "#222",
        borderBottom: "1px solid #ECECEC",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          height: 70,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Nile Pharma CRM
          </Typography>

          <Typography
            fontSize={13}
            color="text.secondary"
          >
            Welcome back 👋
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 3,
              border: "1px solid #ECECEC",
              bgcolor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,.05)",
            }}
          >
            <CalendarMonth
              sx={{
                color: "#666",
                fontSize: 18,
              }}
            />

            <Typography
              fontSize={13}
              fontWeight={600}
            >
              {date}
            </Typography>

            <AccessTime
              sx={{
                ml: 1,
                color: "#666",
                fontSize: 18,
              }}
            />

            <Typography
              fontSize={13}
              fontWeight={600}
            >
              {time}
            </Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              width: 260,

              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                background: "#F5F7FB",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <IconButton>
            <Badge
              badgeContent={3}
              color="error"
            >
              <NotificationsNone />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              bgcolor: "#1976D2",
              width: 42,
              height: 42,
            }}
          >
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}