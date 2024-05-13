import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/ui/Loading";
import Navbar from "../shared/ui/Navbar";
import { getAllLoans } from "./services/LoanService";
import { LoanDto } from "./services/LoanService";
import LoansTable from "./ui/LoansTable";

const LoansAllPage = () => {
    const [loans, setLoans] = useState<LoanDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchLoans = async () => {
        setIsLoading(true);
        try {
          const data = await getAllLoans();
          setLoans(data);
        } catch (error) {
          navigate('/error', { state: { message: 'Failed to load loans' } });
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchLoans();
    }, [navigate]);
  
    if (isLoading) {
      return <Loading />;
    }
  
    return (
      <>
        <Navbar />
        <Container maxWidth={false}>
          <h1>Loans list</h1>
          <LoansTable loans={loans} />
        </Container>
      </>
    );
  };
  
  export default LoansAllPage;