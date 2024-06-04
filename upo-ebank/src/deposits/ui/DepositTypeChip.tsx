import React from "react";
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DepositType } from "../services/DepositsService";

const DepositTypeChip = ({ type }: { type: DepositType }) => {
  const theme = useTheme();

  const getTypeChip = (type: DepositType) => {
    switch (type) {
      case "ONE_MONTH":
        return (
          <Chip
            label="One Month"
            style={{
              backgroundColor: theme.palette.custom.purple,
              color: theme.palette.getContrastText(theme.palette.custom.purple),
            }}
          />
        );
      case "SIX_MONTHS":
        return (
          <Chip
            label="Six Months"
            style={{
              backgroundColor: theme.palette.custom.blue,
              color: theme.palette.getContrastText(theme.palette.custom.blue),
            }}
          />
        );
      case "TWELVE_MONTHS":
        return (
          <Chip
            label="Twelve Months"
            style={{
              backgroundColor: theme.palette.custom.yellow,
              color: theme.palette.getContrastText(theme.palette.custom.yellow),
            }}
          />
        );
      case "TWENTY_FOUR_MONTHS":
        return (
          <Chip
            label="Twenty Four Months"
            style={{
              backgroundColor: theme.palette.custom.orange,
              color: theme.palette.getContrastText(theme.palette.custom.orange),
            }}
          />
        );
      default:
        return <Chip label="Unknown" />;
    }
  };

  return getTypeChip(type);
};

export default DepositTypeChip;
