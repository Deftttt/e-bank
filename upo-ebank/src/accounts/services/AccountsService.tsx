import axios from 'axios';
import { authHeader } from '../../utils/AuthHeader';

const API_BASE_URL = 'http://localhost:8080/accounts';

export interface BankAccount {
  accountNumber: string;
  balance: number;
  openingDate: string;
  accountType: string;
  clientId: number;
}

export const getAccountByNumber = async (accountNumber: string): Promise<BankAccount | null> => {
  try {
    const response = await axios.get<BankAccount>(`${API_BASE_URL}/${accountNumber}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching account by number:', error);
    throw error;
  }
};

export const getAllAccounts = async (): Promise<BankAccount[]> => {
  try {
    const response = await axios.get<BankAccount[]>(`${API_BASE_URL}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching all accounts:', error);
    throw error;
  }
};

export const getAccountsByClient = async (clientId: string): Promise<BankAccount[]> => {
  try {
    const response = await axios.get<BankAccount[]>(`${API_BASE_URL}/clients/${clientId}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts by client:', error);
    throw error;
  }
};
