import React, { useEffect, useState } from 'react';
import { Box, Container, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loading from '../shared/ui/Loading';
import Navbar from '../shared/ui/Navbar';
import { ClientDto, getClients } from './services/ClientService';
import { PagedResponse } from '../utils/PagedResponse';
import ClientsTable from './ui/ClientTable';

const ClientsListPage = () => {
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState('id,asc');
  const [totalClients, setTotalClients] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const data: PagedResponse<ClientDto> = await getClients(page, rowsPerPage, sort);
        setClients(data.content);
        setTotalClients(data.totalElements);
      } catch (error) {
        navigate('/error', { state: { message: 'Failed to load clients' } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [navigate, page, rowsPerPage, sort]);

  const handleSortChange = (sortField: string) => {
    const isAsc = sort.endsWith('asc');
    const direction = isAsc ? 'desc' : 'asc';
    setSort(`${sortField},${direction}`);
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
        <h1>List of all clients</h1>
        <Box pb={4}>
          <ClientsTable clients={clients} onSortChange={handleSortChange} />
          <TablePagination
            component="div"
            count={totalClients}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'white',
              color: 'black',
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default ClientsListPage;
