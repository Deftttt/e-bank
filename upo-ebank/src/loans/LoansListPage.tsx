import { Box, Container, TablePagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../shared/ui/Loading";
import Navbar from "../shared/ui/Navbar";
import { LoanStatus, getAllLoans, getLoansByClient, getLoansByEmployee } from "./services/LoanService";
import { LoanDto } from "./services/LoanService";
import LoansTable from "./ui/LoansTable";
import LoanStatusFilter from "./ui/LoanStatusFilter";
import { PagedResponse } from "../utils/PagedResponse";
import NoDataMessage from "../shared/NoDataMessage";
import { useTheme } from '@mui/material/styles';

const LoansListPage = () => {
    const [loans, setLoans] = useState<LoanDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { employeeId, clientId } = useParams();
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState('id,asc');
    const [totalLoans, setTotalLoans] = useState(0);
    const [status, setStatus] = useState<LoanStatus | undefined>(undefined);
    
  
    useEffect(() => {
      const fetchLoans = async () => {
        setIsLoading(true);
        try {
          let data: PagedResponse<LoanDto>;
          if (employeeId) {
            data = await getLoansByEmployee(Number(employeeId), status, page, rowsPerPage, sort);
          } else if (clientId) {
            data = await getLoansByClient(Number(clientId), status, page, rowsPerPage, sort);
          } else {
            data = await getAllLoans(status, page, rowsPerPage, sort);
          }
          setLoans(data.content);
          setTotalLoans(data.totalElements);
        } catch (error) {
          navigate('/error', { state: { message: 'Failed to load loans' } });
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchLoans();
    }, [navigate, page, rowsPerPage, sort, status]);

    const handleSortChange = (sortField: string) => {
        const isAsc = sort.endsWith('asc');
        const direction = isAsc ? 'desc' : 'asc';
        setSort(`${sortField},${direction}`);
    };

    const handleStatusChange = (newStatus: LoanStatus) => {
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


    if (loans.length === 0) {
      return (
        <>
          <Navbar />
          <Container maxWidth={false}>
          <h1>
            {employeeId  ? `Loans assigned to employee ${employeeId}:` :
            clientId  ? `Loans of client ${clientId}:`  :
            'List of all loans:'}
          </h1>
          <LoanStatusFilter onStatusChange={handleStatusChange} />
            <NoDataMessage message="No loans with given criteria available." />
          </Container>
        </>
      );
    }
  
    return (
      <>
      <Navbar />
      <Container maxWidth={false}>
      <h1>
        {employeeId  ? `Loans assigned to employee ${employeeId}:` :
        clientId  ? `Loans of client ${clientId}:`  :
        'List of all loans:'}
      </h1>
        <LoanStatusFilter onStatusChange={handleStatusChange} />
        <Box pb={4}>
          <LoansTable loans={loans} onSortChange={handleSortChange} />
          <TablePagination
            component="div"
            count={totalLoans}
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
  
  export default LoansListPage;