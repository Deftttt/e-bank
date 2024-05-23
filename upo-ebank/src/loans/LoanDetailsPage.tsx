import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import Navbar from '../shared/ui/Navbar';
import { clientDecision, getLoan, Loan } from './services/LoanService';
import useAuth from '../hooks/useAuth';
import LoanStatusChip from './ui/LoanStatusChip';

const LoanDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [loan, setLoan] = useState<Loan | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        const fetchLoan = async () => {
            setIsLoading(true);
            try {
                const loanData = await getLoan(Number(id));
                setLoan(loanData);
            } catch (error) {
                navigate('/error', { state: { message: 'Failed to load loan details' } });
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoan();
    }, [id, navigate]);

    const handleClientDecision = async (accepted: boolean) => {
        setIsLoading(true);
        try {
            await clientDecision(Number(id), accepted);
            const updatedLoan = await getLoan(Number(id)); 
            setLoan(updatedLoan);
        } catch (error) {
            console.error('Error client decision:', error);
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
                {loan && (
                    <Card sx={{ margin: '20px auto', padding: '20px', maxWidth: '600px' }} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" sx={{ marginBottom: '20px' }} component="div">
                                Loan Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>ID:</strong> {loan.id}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Client:</strong> {loan.clientFullName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Employee:</strong> {loan.employeeFullName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Amount:</strong> {loan.amount}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Status:</strong> <LoanStatusChip status={loan.status} />
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Application Date:</strong> {loan.applicationDate}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Decision Date:</strong> {loan.decisionDate || 'No decision yet'}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Loan Purpose:</strong> {loan.loanPurpose}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Loan Term (Months):</strong> {loan.loanTermMonths}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Start Date:</strong> {loan.startDate}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Interest Rate:</strong> {loan.interestRate}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Monthly Repayment Amount:</strong> {loan.monthlyRepaymentAmount}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Total Repayment Amount:</strong> {loan.totalRepaymentAmount}
                                    </Typography>
                                    <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                        <strong>Comment:</strong> {loan.comment}
                                    </Typography>
                                </Grid>
                                {loan.status === 'APPROVED' && auth.roles.includes('USER_RIGHTS') && (
                                    <Grid item xs={12}>
                                        <Box mt={2} pb={4} display="flex" justifyContent="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleClientDecision(true)}
                                                sx={{ mr: 2 }}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleClientDecision(false)}
                                            >
                                                Reject
                                            </Button>
                                        </Box>
                                    </Grid>
                                )}
                                {loan.status === 'REQUESTED' && auth.roles.includes('APPROVE_LOANS') && (
                                    <Grid item xs={12}>
                                        <Box mt={2} pb={4} display="flex" justifyContent="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => navigate(`/loans/${loan.id}/decision`)}
                                                sx={{ mr: 2 }}
                                            >
                                                Approve/Reject Loan
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

export default LoanDetailsPage;
