import { createTheme } from "@mui/material/styles";

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d1b2a", // Dark blue
    },
    secondary: {
      main: "#1b263b", // Darker blue
    },
    background: {
      default: "#e0e1dd", // Light grey
      paper: "#ffffff", // White
    },
    text: {
      primary: "#0d1b2a", // Dark blue for primary text
      secondary: "#1b263b", // Darker blue for secondary text
    },
    warning: {
      main: "#778da9", // Greyish blue
    },
    error: {
      main: "#f44336", // Red for error
    },
    custom: {
      green: "#4caf50", // Primary green
      lightGreen: "#81c784", // Light green
      red: "#f44336",
      blue: "#2196f3",
      orange: "#ff9800",
      yellow: "#ffeb3b",
      purple: "#9c27b0",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e0e1dd", // Light grey
    },
    secondary: {
      main: "#778da9", // Greyish blue
    },
    background: {
      default: "#0d1b2a", // Dark blue
      paper: "#1b263b", // Darker blue
    },
    text: {
      primary: "#e0e1dd", // Light grey for primary text
      secondary: "#778da9", // Greyish blue for secondary text
    },
    warning: {
      main: "#415a77", // Medium blue
    },
    error: {
      main: "#f44336", // Red for error
    },
    custom: {
      green: "#4caf50", // Primary green
      lightGreen: "#81c784", // Light green
      red: "#f44336",
      blue: "#2196f3",
      orange: "#ff9800",
      yellow: "#ffeb3b",
      purple: "#9c27b0",
    },
  },
  typography: {
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
