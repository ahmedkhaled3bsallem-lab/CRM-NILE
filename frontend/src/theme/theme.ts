import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1565C0",
    },
    secondary: {
      main: "#42A5F5",
    },
    background: {
      default: "#EEF5FF",
    },
  },

  shape: {
    borderRadius: 14,
  },

  typography: {
    fontFamily: "Segoe UI, Cairo, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;