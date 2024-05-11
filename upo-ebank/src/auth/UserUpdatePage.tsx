import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, Collapse, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { updateUser, getUser, UserUpdateDto } from './services/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import Navbar from '../shared/ui/Navbar';
import UserUpdateForm from './ui/UserUpdateForm';
import CustomAlert from '../shared/ui/CustomAlert';

const UserUpdatePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [userUpdateDto, setUserUpdateDto] = useState<UserUpdateDto>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    addresses: [{ street: '', city: '', country: '', postCode: '', localNumber: '' }],
  });

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const user = await getUser(userId);
        setUserUpdateDto(user);
      } catch (error) {
        navigate('/error', { state: { message: 'Failed to load user data' } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleUpdate = async (updatedData: UserUpdateDto) => {
    try {
      setErrors({});
      await updateUser(userId, updatedData);
      setSuccess(true);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const handleCloseAlert = () => {
    setSuccess(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>

      <Box pt={2}>
        <CustomAlert
            open={success}
            title={"Success!"}
            message={"Your personal info has been updated."}
            severity={'success'}
            onClose={handleCloseAlert}
        />
      </Box>

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={10}>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              <Typography variant="h4" align="center" gutterBottom>
                Update personal info
              </Typography>
              <UserUpdateForm
                initialData={userUpdateDto}
                errors={errors}
                onSubmit={handleUpdate}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserUpdatePage;
