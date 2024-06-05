import { Box, Button, Card, CardContent, Container, FormControlLabel, Radio, RadioGroup, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { approveOrRejectLoan, getLoan, LoanDecision } from "./services/LoanService";
import useAuth from "../hooks/useAuth";

const LoanEmployeeDecisionPage = () => {
    const { loanId } = useParams<{ loanId: string }>();
    const [decision, setDecision] = useState<LoanDecision>({ approved: false });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setDecision((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    useEffect(() => {
        const fetchLoan = async () => {
            setIsLoading(true);
            try {
                const loanData = await getLoan(Number(loanId));
                console.log(loanData.employeeId, auth.id);
                if (loanData.employeeId != auth.id || loanData.status != 'REQUESTED') {
                    navigate('/error', { state: { message: 'You cannot decide on this loan!' } });
                }
            } catch (error) {
                navigate('/error', { state: { message: 'You cannot decide on this loan!' } });
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoan();
    }, [loanId, auth]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await approveOrRejectLoan(Number(loanId), decision);
            navigate(`/loans/employee/${auth.id}`); 
        } catch (error) {
            setErrors(error.response.data.errors);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ width: '100%', mt: 4 }}>
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom>
                            Approve or Deny Loan
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <RadioGroup
                                name="approved"
                                value={decision.approved.toString()}
                                onChange={(e) => setDecision({ ...decision, approved: e.target.value === 'true' })}
                                row
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Approve" />
                                <FormControlLabel value="false" control={<Radio />} label="Deny" />
                            </RadioGroup>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Comment"
                                name="comment"
                                value={decision.comment || ''}
                                onChange={handleChange}
                                multiline
                                error={!!errors.comment}
                                helperText={errors.comment}
                                rows={4}
                            />
                            <Box mt={2} sx={{ position: 'relative' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={isLoading}
                                >
                                    Submit Decision
                                </Button>
                                {isLoading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default LoanEmployeeDecisionPage;
