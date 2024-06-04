import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import Navbar from '../shared/ui/Navbar';
import { getTimeDeposit, cancelTimeDeposit, TimeDepositDetailsDto } from './services/DepositsService';
import useAuth from '../hooks/useAuth';
import DepositStatusChip from './ui/DepositStatusChip';

const DepositDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [deposit, setDeposit] = useState<TimeDepositDetailsDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        const fetchDeposit = async () => {
            setIsLoading(true);
            try {
                const depositData = await getTimeDeposit(Number(id));
                setDeposit(depositData);
            } catch (error) {
                navigate('/error', { state: { message: 'Failed to load deposit details' } });
            } finally {
                setIsLoading(false);
            }
        };

        fetchDeposit();
    }, [id, navigate]);

    const handleCancel = async () => {
        setIsLoading(true);
        try {
            await cancelTimeDeposit(Number(id));
            navigate('/deposits');
        } catch (error) {
            console.error('Error cancelling deposit:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Navbar />
            <Container maxWidth={false}>
                {deposit && (
                    <Card sx={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" sx={{ marginBottom: '20px' }} component="div">
                                Deposit Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>ID:</strong> {deposit.id}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Account Number:</strong> {deposit.accountNumber}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Client:</strong> {deposit.clientFirstName} {deposit.clientLastName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Deposit Amount:</strong> {deposit.depositAmount}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Status:</strong> <DepositStatusChip status={deposit.status} />
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Start Date:</strong> {new Date(deposit.startDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>End Date:</strong> {new Date(deposit.endDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Interest Rate:</strong> {deposit.interestRate}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Months:</strong> {deposit.months}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Final Amount:</strong> {deposit.finalAmount}
                                    </Typography>
                                </Grid>
                                {(auth.roles.includes('USER_RIGHTS') || auth.roles.includes('VIEW_DEPOSITS')) && deposit.status === 'ACTIVE' && (
                                    <Grid item xs={12}>
                                        <Box mt={2} pb={4} display="flex" justifyContent="center">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleCancel}
                                            >
                                                Cancel Deposit
                                            </Button>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </Container>
        </>
    );
};

export default DepositDetailsPage;
