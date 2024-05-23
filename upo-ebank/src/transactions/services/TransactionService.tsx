import axios from 'axios';
import { authHeader } from '../../utils/AuthHeader';
import { PagedResponse } from '../../utils/PagedResponse';

export type TransactionType = 'OUTGOING' | 'INCOMING' ;

export interface Transaction {
  id: number;
  amount: number;
  transactionDate: string;
  senderAccountNumber: string;
  recipientAccountNumber: string;
}

export interface TransactionDetailDTO {
  id: number;
  amount: number;
  transactionDate: string;
  message: string;
  senderAccountNumber: string;
  senderName: string;
  senderSurname: string;
  recipientAccountNumber: string;
  recipientName: string;
  recipientSurname: string;
}

export interface CreateTransactionDTO {
  amount: number;
  message: string;
  recipientAccountNumber: string;
}


const API_BASE_URL = 'http://localhost:8080/transactions';

export const getTransactionById = async (id: string): Promise<TransactionDetailDTO | null> => {
    try {
      const response = await axios.get<TransactionDetailDTO>(`${API_BASE_URL}/${id}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction by id:', error);
      throw error;
    }
  };

  export const createTransaction = async (accountNumber: string, data: CreateTransactionDTO): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/account/${accountNumber}/transfer`, data, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  };

  export const getAllTransactions = async (page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<PagedResponse<Transaction>> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort
      });
      const response = await axios.get<PagedResponse<Transaction>>(`${API_BASE_URL}`, { params, headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      throw error;
    }
  };
  
  export const getTransactionsByAccount = async (accountNumber: string, transactionType?: TransactionType, page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<PagedResponse<Transaction>> => {
    try {
      const params = new URLSearchParams({
        transactionType: transactionType || '',
        page: page.toString(),
        size: size.toString(),
        sort
      });
      const response = await axios.get<PagedResponse<Transaction>>(`${API_BASE_URL}/account/${accountNumber}`, { params, headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions by account:', error);
      throw error;
    }
  };
  
  export const getTransactionsByClient = async (clientId: number, transactionType?: TransactionType, page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<PagedResponse<Transaction>> => {
    try {
      const params = new URLSearchParams({
        transactionType: transactionType || '',
        page: page.toString(),
        size: size.toString(),
        sort
      });
      const response = await axios.get<PagedResponse<Transaction>>(`${API_BASE_URL}/client/${clientId}`, { params, headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions by client:', error);
      throw error;
    }
  };

