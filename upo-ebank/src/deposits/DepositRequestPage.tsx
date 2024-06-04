import { Box, Button, Card, CardContent, Container, TextField, Typography, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requestTimeDeposit, TimeDepositRequest, DepositType } from "./services/DepositsService";
import Navbar from "../shared/ui/Navbar";
import Loading from "../shared/ui/Loading";
import useAuth from "../hooks/useAuth";
import { BankAccount, getAccountsByClient } from "../accounts/services/AccountsService";

const RequestDepositPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [depositRequest, setDepositRequest] = useState<TimeDepositRequest>({
        depositAmount: 0,
        startDate: '',
        depositType: 'ONE_MONTH' 
    });
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        const fetchAccounts = async () => {
            setIsLoading(true);
            try {
                const response = await getAccountsByClient(auth.id);
                setAccounts(response.content);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAccounts();
    }, [auth.userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDepositRequest((prev) => ({ ...prev, [name]: value }));
    };

    const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAccount(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const deposit = await requestTimeDeposit(selectedAccount, depositRequest);
            navigate(`/deposits/${deposit.id}`);
        } catch (error: any) {
            setErrors(error.response?.data?.errors || {});
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
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center'}}>
                <Card sx={{ width: '100%', mt: 4 }}>
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom textAlign="center">
                            Deposit Request Form
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Select Account"
                                name="accountNumber"
                                select
                                value={selectedAccount}
                                onChange={handleAccountChange}
                                error={!!errors.accountNumber}
                                helperText={errors.accountNumber}
                            >
                                {accounts.map((account) => (
                                    <MenuItem key={account.accountNumber} value={account.accountNumber}>
                                        {account.accountNumber} - {account.accountType}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Deposit Amount"
                                name="depositAmount"
                                type="number"
                                value={depositRequest.depositAmount}
                                onChange={handleChange}
                                error={!!errors.depositAmount}
                                helperText={errors.depositAmount}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Start Date"
                                name="startDate"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={depositRequest.startDate}
                                onChange={handleChange}
                                error={!!errors.startDate}
                                helperText={errors.startDate}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Deposit Type"
                                name="depositType"
                                select
                                value={depositRequest.depositType}
                                onChange={handleChange}
                                error={!!errors.depositType}
                                helperText={errors.depositType}
                            >
                                <MenuItem value="ONE_MONTH">One Month</MenuItem>
                                <MenuItem value="SIX_MONTHS">Six Months</MenuItem>
                                <MenuItem value="TWELVE_MONTHS">Twelve Months</MenuItem>
                                <MenuItem value="TWENTY_FOUR_MONTHS">Twenty Four Months</MenuItem>
                            </TextField>
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

export default RequestDepositPage;
