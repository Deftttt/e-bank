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

export interface Loan {
    id: number;
    clientId: number;
    employeeId: number;
    clientFullName: string;
    employeeFullName: string;
    amount: number;
    status: LoanStatus;
    applicationDate: string;
    decisionDate: string | null;
    loanPurpose: string;
    loanTermMonths: number;
    startDate: string;
    interestRate: number;
    monthlyRepaymentAmount: number;
    totalRepaymentAmount: number;
    comment: string;
}

export interface LoanRequest {
    amount: number;
    loanPurpose: string;
    loanTermMonths: number;
    startDate: string;
}

export interface LoanDecision {
    approved: boolean;
    comment?: string;
}

export const getAllLoans = async (status?: LoanStatus, page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<PagedLoanResponse> => {
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

export const getLoansByEmployee = async (employeeId: number, status?: LoanStatus, page: number = 0, size: number = 10, sort: string = 'amount,asc'): Promise<PagedLoanResponse> => {
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

export const getLoansByClient = async (clientId: number, status?: LoanStatus, page: number = 0, size: number = 10, sort: string = 'amount,asc'): Promise<PagedLoanResponse> => {
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

export const getLoan = async (id: number): Promise<Loan> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error fetching loan:', error);
        throw error;
    }
};

export const requestLoan = async (loanRequest: LoanRequest): Promise<Loan> => {
    try {
        const response = await axios.post(`${API_URL}/request`, loanRequest, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error requesting loan:', error);
        throw error;
    }
};


export const approveOrRejectLoan = async (loanId: number, decision: LoanDecision): Promise<Loan> => {
    try {
        const response = await axios.post(`${API_URL}/${loanId}/decision`, decision, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error approving/rejecting loan:', error);
        throw error;
    }
};

export const clientDecision = async (loanId: number, accepted: boolean): Promise<Loan> => {
    try {
        const response = await axios.put(`${API_URL}/${loanId}/client-decision`, null, {
            params: { accepted },
            headers: authHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error making client decision:', error);
        throw error;
    }
};

