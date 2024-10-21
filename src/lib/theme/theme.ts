import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1536,
      xl: 1920,
    },
  },

  palette: {
    primary: {
      main: "#FF6500",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FFF",
      contrastText: "#FF6500",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          border: "0.5px solid #FF6500",
          padding: "5px 14px 3px 14px",
          fontWeight: 500,
          ":hover": {
            color: "#FF6500",
            backgroundColor: "#FFF",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            border: "0.5px solid #FF6500",
          },
          "@media (max-width:600px)": {
            fontSize: "12px",
            padding: "3px 8px 1px 8px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
      styleOverrides: {
        root: {
          "@media (min-width:600px)": {
            maxidth: "540px",
          },
          "@media (min-width:960px)": {
            maxWidth: "860px",
          },
          "@media (min-width:1280px)": {
            maxWidth: "1200px",
          },
          "@media (min-width:1920px)": {
            maxWidth: "1600px",
          },
        },
      },
    },
  },

  typography: {
    fontFamily: `"Arima", Arial, Helvetica, sans-serif`,
  },
});
