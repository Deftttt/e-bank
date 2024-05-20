import axios, { AxiosResponse } from 'axios';
import { authHeader } from '../../utils/AuthHeader';

const API_URL = 'http://localhost:8080/loans'; 

export type LoanStatus = 'APPROVED' | 'DENIED' | 'REJECTED' | 'ACCEPTED' | 'REQUESTED';

export interface LoanDto {
    id: number;
    clientId: number;
    employeeId: number;
    amount: number;
    startDate: string;
    status: LoanStatus;
    applicationDate: string;
    decisionDate: string | null;
    loanPurpose: string;
    loanTermMonths: number;
}

export interface PagedLoanResponse {
    loans: LoanDto[];
    totalElements: number;
}

export const getAllLoans = async (status?: string, page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<PagedLoanResponse> => {
    try {
        const params = new URLSearchParams({
            status: status || '',
            page: page.toString(),
            size: size.toString(),
            sort
        });
        const response = await axios.get(`${API_URL}`, { params, headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error fetching all loans:', error);
        throw error;
    }
};

export const getLoansByEmployee = async (employeeId: number, status?: string, page: number = 0, size: number = 10, sort: string = 'amount,asc'): Promise<LoanDto[]> => {
    try {
        const params = new URLSearchParams({
            status: status || '',
            page: page.toString(),
            size: size.toString(),
            sort
        });
        const response = await axios.get(`${API_URL}/employee/${employeeId}`, { params, headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error(`Error fetching loans by employee ${employeeId}:`, error);
        throw error;
    }
};

export const getLoansByClient = async (clientId: number, status?: string, page: number = 0, size: number = 10, sort: string = 'amount,asc'): Promise<LoanDto[]> => {
    try {
        const params = new URLSearchParams({
            status: status || '',
            page: page.toString(),
            size: size.toString(),
            sort
        });
        const response = await axios.get(`${API_URL}/client/${clientId}`, { params, headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error(`Error fetching loans by client ${clientId}:`, error);
        throw error;
    }
};
