import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../shared/ui/Loading";
import Navbar from "../shared/ui/Navbar";
import { getLoan, Loan } from "./services/LoanService";

const LoanDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [loan, setLoan] = useState<Loan | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

    if (isLoading) {
        return <Loading />;
    }


    return (
        <>
            <Navbar />
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ width: '100%', mt: 4 }}>
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom>
                            Loan Details
                        </Typography>
                        <Typography variant="body1"><strong>ID:</strong> {loan.id}</Typography>
                        <Typography variant="body1"><strong>Client:</strong> {loan?.clientFullName}</Typography>
                        <Typography variant="body1"><strong>Employee:</strong> {loan?.employeeFullName}</Typography>
                        <Typography variant="body1"><strong>Amount:</strong> {loan.amount}</Typography>
                        <Typography variant="body1"><strong>Status:</strong> {loan.status}</Typography>
                        <Typography variant="body1"><strong>Application Date:</strong> {loan.applicationDate}</Typography>
                        <Typography variant="body1"><strong>Decision Date:</strong> {loan.decisionDate || "No decision yet"}</Typography>
                        <Typography variant="body1"><strong>Loan Purpose:</strong> {loan.loanPurpose}</Typography>
                        <Typography variant="body1"><strong>Loan Term (Months):</strong> {loan.loanTermMonths}</Typography>
                        <Typography variant="body1"><strong>Start Date:</strong> {loan.startDate}</Typography>
                        <Typography variant="body1"><strong>Interest Rate:</strong> {loan.interestRate}</Typography>
                        <Typography variant="body1"><strong>Monthly Repayment Amount:</strong> {loan.monthlyRepaymentAmount}</Typography>
                        <Typography variant="body1"><strong>Total Repayment Amount:</strong> {loan.totalRepaymentAmount}</Typography>
                        <Typography variant="body1"><strong>Comment:</strong> {loan.comment}</Typography>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default LoanDetailsPage;
