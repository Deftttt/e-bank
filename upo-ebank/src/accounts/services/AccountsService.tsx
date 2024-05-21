import axios from 'axios';
import { authHeader } from '../../utils/AuthHeader';

const API_BASE_URL = 'http://localhost:8080/accounts';

export type AccountType = 'PERSONAL_ACCOUNT' | 'STUDENT_ACCOUNT' | 'RETIREMENT_ACCOUNT' | 'INVESTMENT_ACCOUNT';

export interface BankAccount {
  accountNumber: string;
  balance: number;
  openingDate: string;
  accountType: AccountType;
  clientId: number;
}

export interface PagedBankAccountResponse {
  accounts: BankAccount[];
  totalElements: number;
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

export const getAllAccounts = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'accountNumber,asc',
  accountType?: AccountType
): Promise<PagedBankAccountResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
    });
    
    if (accountType) {
      params.append('accountType', accountType);
    }

    const response = await axios.get<PagedBankAccountResponse>(`${API_BASE_URL}`, { params, headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching all accounts:', error);
    throw error;
  }
};

export const getAccountsByClient = async (
  clientId: string,
  page: number = 0,
  size: number = 10,
  sort: string = 'accountNumber,asc',
  accountType?: AccountType
): Promise<PagedBankAccountResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
    });

    if (accountType) {
      params.append('accountType', accountType);
    }

    const response = await axios.get<PagedBankAccountResponse>(`${API_BASE_URL}/clients/${clientId}`, { params, headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts by client:', error);
    throw error;
  }
};
