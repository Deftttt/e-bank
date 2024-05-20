import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestLoan, LoanRequest } from "./services/LoanService";
import Navbar from "../shared/ui/Navbar";
import Loading from "../shared/ui/Loading";

const LoanRequestPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loanRequest, setLoanRequest] = useState<LoanRequest>({
        amount: 0,
        loanPurpose: '',
        loanTermMonths: 0,
        startDate: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoanRequest((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const loanId = (await requestLoan(loanRequest)).id;
            navigate(`/loans/${loanId}`);
        } catch (error) {
            setErrors(error.response.data.errors);
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
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ width: '100%', mt: 4 }}>
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom>
                            Request a Loan
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Amount"
                                name="amount"
                                type="number"
                                value={loanRequest.amount}
                                onChange={handleChange}
                                error={!!errors.amount}
                                helperText={errors.amount}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Loan Term (Months)"
                                name="loanTermMonths"
                                type="number"
                                value={loanRequest.loanTermMonths}
                                onChange={handleChange}
                                error={!!errors.loanTermMonths}
                                helperText={errors.loanTermMonths}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Loan Purpose"
                                name="loanPurpose"
                                value={loanRequest.loanPurpose}
                                onChange={handleChange}
                                error={!!errors.loanPurpose}
                                helperText={errors.loanPurpose}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Start Date"
                                name="startDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={loanRequest.startDate}
                                onChange={handleChange}
                                error={!!errors.startDate}
                                helperText={errors.startDate}
                            />
                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit Request
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default LoanRequestPage;
