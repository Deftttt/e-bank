import React from "react";
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LoanStatus } from "../services/LoanService";

const LoanStatusChip = ({ status }: { status: LoanStatus }) => {
  const theme = useTheme();

  const getStatusChip = (status: LoanStatus) => {
    switch (status) {
      case "APPROVED":
        return (
          <Chip
            label="Approved"
            style={{
              backgroundColor: theme.palette.custom.green,
              color: theme.palette.getContrastText(theme.palette.custom.green),
            }}
          />
        );
      case "DENIED":
        return (
          <Chip
            label="Denied"
            style={{
              backgroundColor: theme.palette.custom.red,
              color: theme.palette.getContrastText(theme.palette.custom.red),
            }}
          />
        );
      case "REJECTED":
        return (
          <Chip
            label="Rejected"
            style={{
              backgroundColor: theme.palette.custom.orange,
              color: theme.palette.getContrastText(theme.palette.error.main),
            }}
          />
        );
      case "ACCEPTED":
        return (
          <Chip
            label="Accepted"
            style={{
              backgroundColor: theme.palette.custom.lightGreen,
              color: theme.palette.getContrastText(theme.palette.success.main),
            }}
          />
        );
      case "REQUESTED":
        return (
          <Chip
            label="Requested"
            style={{
              backgroundColor: theme.palette.custom.blue,
              color: theme.palette.getContrastText(theme.palette.custom.blue),
            }}
          />
        );
      default:
        return <Chip label="Unknown" />;
    }
  };

  return getStatusChip(status);
};

export default LoanStatusChip;
