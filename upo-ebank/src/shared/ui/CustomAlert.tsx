import React, { useEffect } from 'react';
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomAlertProps {
  title: string;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  open: boolean;
  onClose: () => void;
  autoCloseTime?: number;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ title, message, severity, open, onClose, autoCloseTime }) => {

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (open) {
      timerId = setTimeout(() => {
        onClose(); 
      }, autoCloseTime);
    }
    return () => clearTimeout(timerId); 
  }, [open, onClose]);

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
