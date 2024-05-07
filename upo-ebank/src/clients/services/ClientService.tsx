import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { authHeader } from '../../utils/AuthHeader';

export interface Client {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addresses: Address[];
  pesel: string
}


export interface Address {
  id: number;
  city: string;
  street: string;
  localNumber: string;
  postCode: string;
  country: string
}

export interface ClientDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}


const API_BASE_URL = 'http://localhost:8080/clients';
//wszyscy
export const getClients = async (): Promise<ClientDto[]> => {
  try {
    const response = await axios.get<ClientDto[]>(`${API_BASE_URL}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching all clients:', error);
    return [];
  }
};

//po id
export const getClient = async (id: string): Promise<Client | null> => {
    try {
      const response = await axios.get<Client>(`${API_BASE_URL}/${id}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching clients by id:', error);
      return null;
    }
  };


