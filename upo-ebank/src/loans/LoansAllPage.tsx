import { Box, Container, TablePagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/ui/Loading";
import Navbar from "../shared/ui/Navbar";
import { getAllLoans } from "./services/LoanService";
import { LoanDto } from "./services/LoanService";
import LoansTable from "./ui/LoansTable";
import LoanStatusFilter from "./ui/LoanStatusFilter";

const LoansAllPage = () => {
    const [loans, setLoans] = useState<LoanDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState('id,asc');
    const [totalLoans, setTotalLoans] = useState(0);
    const [status, setStatus] = useState<string | undefined>(undefined);
  
    useEffect(() => {
      const fetchLoans = async () => {
        setIsLoading(true);
        try {
          const data = await getAllLoans(status, page, rowsPerPage, sort);
          setLoans(data.loans);
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

    const handleStatusChange = (newStatus: string) => {
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
  
    return (
      <>
      <Navbar />
      <Container maxWidth={false}>
        <h1>Loans list</h1>
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
                backgroundColor: 'white', // change this to match your color
                color: 'black', // change this to match your color
            }}
        />
        </Box>
      </Container>
    </>
    );
  };
  
  export default LoansAllPage;