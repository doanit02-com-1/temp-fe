import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#C4E7D6",
      main: "#2D9A78",
      dark: "#1A614C",
    },
    secondary: {
      light: "#FBD0D9",
      main: "#E96B82",
      dark: "#B94158",
    },
    success: {
      light: "#B3F0D1",
      main: "#1ACD75",
      dark: "#0F7B47",
    },
    warning: {
      light: "#FFF0B8",
      main: "#F2B84B",
      dark: "#9A6A14",
    },
    error: {
      light: "#FFD8D2",
      main: "#D95D4F",
      dark: "#913B33",
    },
    info: {
      light: "#D4E9F5",
      main: "#5B9EBB",
      dark: "#315D72",
    },
    text: {
      primary: "#26372F",
      secondary: "#647168",
    },
    background: {
      default: "#F7F8F4",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "var(--font-store), sans-serif",
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
