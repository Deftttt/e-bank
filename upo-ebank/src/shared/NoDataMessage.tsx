import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NoDataMessageProps {
  message: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message }) => {
  const navigate = useNavigate();

  return (
    <Box
      mt={8}  
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="80vh"
      textAlign="center"
    >
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Box>
  );
};

export default NoDataMessage;
