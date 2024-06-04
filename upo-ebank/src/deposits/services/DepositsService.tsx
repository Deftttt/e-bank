import axios, { AxiosResponse } from 'axios';
import { authHeader } from '../../utils/AuthHeader';
import { PagedResponse } from '../../utils/PagedResponse';

const API_URL = 'http://localhost:8080/deposits';

export type DepositStatus = 'ACTIVE' | 'CLOSED';
export type DepositType = 'ONE_MONTH' | 'SIX_MONTHS' | 'TWELVE_MONTHS' | 'TWENTY_FOUR_MONTHS';

export interface TimeDepositDto {
    id: number;
    depositAmount: number;
    startDate: string;
    endDate: string;
    status: DepositStatus;
    depositType: DepositType;
    accountNumber: string;
}

export interface TimeDepositDetailsDto {
    id: number;
    accountNumber: string;
    depositAmount: number;
    finalAmount: number;
    startDate: string;
    endDate: string;
    status: DepositStatus;
    months: number;
    interestRate: number;
    clientFirstName: string;
    clientLastName: string;
}

export interface TimeDepositRequest {
    depositAmount: number;
    startDate: string;
    depositType: DepositType;
}

export const getAllTimeDeposits = async (page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<PagedResponse<TimeDepositDto>> => {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sort
        });
        const response = await axios.get(`${API_URL}`, { params, headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error fetching all time deposits:', error);
        throw error;
    }
};

export const getTimeDepositsByAccountNumber = async (accountNumber: string, page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<PagedResponse<TimeDepositDto>> => {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sort
        });
        const response = await axios.get(`${API_URL}/account/${accountNumber}`, { params, headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error(`Error fetching time deposits for account ${accountNumber}:`, error);
        throw error;
    }
};

export const getTimeDeposit = async (id: number): Promise<TimeDepositDetailsDto> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error fetching time deposit:', error);
        throw error;
    }
};

export const requestTimeDeposit = async (accountNumber: string, timeDepositRequest: TimeDepositRequest): Promise<TimeDepositDto> => {
    try {
        const response = await axios.post(`${API_URL}/account/${accountNumber}/request`, timeDepositRequest, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.error('Error requesting time deposit:', error);
        throw error;
    }
};

export const cancelTimeDeposit = async (id: number): Promise<void> => {
    try {
        await axios.post(`${API_URL}/${id}/cancel`, null, { headers: authHeader() });
    } catch (error) {
        console.error('Error cancelling time deposit:', error);
        throw error;
    }
};
