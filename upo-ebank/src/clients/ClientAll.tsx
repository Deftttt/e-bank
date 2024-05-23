import React, { useEffect, useState } from 'react';
import { Box, Container, TablePagination, TextField, Button } from '@mui/material';
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
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      try {
        const data: PagedResponse<ClientDto> = await getClients(lastName, page, rowsPerPage, sort);
        setClients(data.content);
        setTotalClients(data.totalElements);
      } catch (error) {
        navigate('/error', { state: { message: 'Failed to load clients' } });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [navigate, page, rowsPerPage, sort, lastName]);

  const handleSortChange = (sortField: string) => {
    const isAsc = sort.endsWith('asc');
    const direction = isAsc ? 'desc' : 'asc';
    setSort(`${sortField},${direction}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    setLastName(searchValue);
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
        <h1>List of all clients</h1>
        <Box display="flex" alignItems="center" mb={2} width="100%">
          <TextField
            label="Search by Last Name"
            variant="outlined"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ marginRight: '10px', flex: 1, backgroundColor: 'white' , borderRadius: '4px'}}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>
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
