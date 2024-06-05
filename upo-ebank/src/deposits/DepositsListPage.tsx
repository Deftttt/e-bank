import { Box, Container, TablePagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../shared/ui/Loading";
import { DepositStatus, getAllTimeDeposits, getTimeDepositsByAccountNumber } from "./services/DepositsService";
import { TimeDepositDto } from "./services/DepositsService";
import DepositsTable from "./ui/DepositsTable";
import { PagedResponse } from "../utils/PagedResponse";
import NoDataMessage from "../shared/NoDataMessage";
import { useTheme } from '@mui/material/styles';

const DepositsListPage = () => {
    const [deposits, setDeposits] = useState<TimeDepositDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { accountNumber } = useParams();
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState('id,asc');
    const [totalDeposits, setTotalDeposits] = useState(0);
    const [status, setStatus] = useState<DepositStatus | undefined>(undefined);

    useEffect(() => {
        const fetchDeposits = async () => {
            setIsLoading(true);
            try {
                let data: PagedResponse<TimeDepositDto>;
                if (accountNumber) {
                    data = await getTimeDepositsByAccountNumber(accountNumber, page, rowsPerPage, sort);
                } else {
                    data = await getAllTimeDeposits(page, rowsPerPage, sort);
                }
                setDeposits(data.content);
                setTotalDeposits(data.totalElements);
            } catch (error) {
                navigate('/error', { state: { message: 'Failed to load deposits' } });
            } finally {
                setIsLoading(false);
            }
        };

        fetchDeposits();
    }, [navigate, page, rowsPerPage, sort, status, accountNumber]);

    const handleSortChange = (sortField: string) => {
        const isAsc = sort.endsWith('asc');
        const direction = isAsc ? 'desc' : 'asc';
        setSort(`${sortField},${direction}`);
    };

    const handleStatusChange = (newStatus: DepositStatus) => {
        setStatus(newStatus);
        setPage(0); 
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (deposits.length === 0) {
        return (
            <>
                <Container maxWidth={false}>
                    <h1>
                        {accountNumber ? `Deposits for account ${accountNumber}:` : 'List of all deposits:'}
                    </h1>
                    <NoDataMessage message="No deposits with given criteria available." />
                </Container>
            </>
        );
    }

    return (
        <>
            <Container maxWidth={false}>
                <h1>
                    {accountNumber ? `Deposits for account ${accountNumber}:` : 'List of all deposits:'}
                </h1>
                <Box pb={4}>
                    <DepositsTable deposits={deposits} onSortChange={handleSortChange} />
                    <TablePagination
                        component="div"
                        count={totalDeposits}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                        }}
                    />
                </Box>
            </Container>
        </>
    );
};

export default DepositsListPage;
