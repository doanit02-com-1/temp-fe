import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#80B3FF",
      main: "#0D6EFD",
      dark: "#084298",
    },
    secondary: {
      light: "#FF80A8",
      main: "#FF1A61",
      dark: "#990F3C",
    },
    success: {
      light: "#80E6B3",
      main: "#1ACD75",
      dark: "#0F7B47",
    },
    warning: {
      light: "#FFE680",
      main: "#FFD21A",
      dark: "#997F0F",
    },
    error: {
      light: "#FF8080",
      main: "#FF1A1A",
      dark: "#990F0F",
    },
    info: {
      light: "#B3D1FF",
      main: "#0D6EFD",
      dark: "#052C65",
    },
    text: {
      primary: "#212529",
      secondary: "#495057",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h1: { fontSize: "32px", fontWeight: 700, lineHeight: "40px" },
    h2: { fontSize: "24px", fontWeight: 600, lineHeight: "32px" },
    h3: { fontSize: "20px", fontWeight: 600, lineHeight: "28px" },
    body1: { fontSize: "16px", fontWeight: 400, lineHeight: "24px" },
    caption: { fontSize: "12px", fontWeight: 400, lineHeight: "16px" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "8px 16px",
        },
      },
    },
  },
});
