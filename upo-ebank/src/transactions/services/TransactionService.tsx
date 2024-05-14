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

export interface CreateTransactionDTO {
  amount: number;
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
      throw error;
    }
  };

  export const createTransaction = async (data: CreateTransactionDTO): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transfer`, data, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  };

export const getAllTransactions = async (): Promise<Transaction[]> => {
    try {
      const response = await axios.get<Transaction[]>(`${API_BASE_URL}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      throw error;
    }
  };

export const getTransactionsByAccount = async (accountNumber: string): Promise<Transaction[]> => {
  try {
    const response = await axios.get<Transaction[]>(`${API_BASE_URL}/account/${accountNumber}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions by account:', error);
    throw error;
  }
};

export const getTransactionsByClient = async (clientId: string): Promise<Transaction[]> => {
    try {
      const response = await axios.get<Transaction[]>(`${API_BASE_URL}/client/${clientId}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions by client:', error);
      throw error;
    }
  };

