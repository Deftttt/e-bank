import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { authHeader } from '../../utils/AuthHeader';

export interface Transaction {
  id: number;
  amount: number;
  transactionDate: string;
  senderAccountNumber: string;
  recipientAccountNumber: string;
}


const API_BASE_URL = 'http://localhost:8080/transactions';

export const getTransactionById = async (id: string): Promise<Transaction | null> => {
    try {
      const response = await axios.get<Transaction>(`${API_BASE_URL}/${id}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction by id:', error);
      return null;
    }
  };

export const getAllTransactions = async (): Promise<Transaction[]> => {
    try {
      const response = await axios.get<Transaction[]>(`${API_BASE_URL}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      return [];
    }
  };

export const getTransactionsByAccount = async (accountNumber: string): Promise<Transaction[]> => {
  try {
    const response = await axios.get<Transaction[]>(`${API_BASE_URL}/account/${accountNumber}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions by account:', error);
    return [];
  }
};

export const getTransactionsByClient = async (clientId: string): Promise<Transaction[]> => {
    try {
      const response = await axios.get<Transaction[]>(`${API_BASE_URL}/client/${clientId}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions by client:', error);
      return [];
    }
  };

