import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#2e2e2e",
      paper: "#2e2e2e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#4e4e4e",
      light: "#6e6e6e",
      dark: "#3e3e3e",
    },
    info: {
      main: "#00bcd4",
      light: "#62efff",
      dark: "#008ba3",
    },
    warning: {
      main: "#ff9800",
      light: "#ffd180",
      dark: "#b26a00",
    },
    error: {
      main: "#f44336",
      light: "#ff7961",
      dark: "#ba000d",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e2e2e",
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          border: "1px solid #ffffff",
          borderRadius: "30px",
          marginBottom: "4px",
        },
      },
    },
  },
});
