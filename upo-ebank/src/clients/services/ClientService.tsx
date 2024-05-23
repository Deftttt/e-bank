import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { authHeader } from '../../utils/AuthHeader';
import { PagedResponse } from '../../utils/PagedResponse';

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

export const getClients = async (page: number = 0, size: number = 10, sort: string = 'id,asc'): Promise<PagedResponse<ClientDto>> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort,
    });
    const response = await axios.get<PagedResponse<ClientDto>>(`${API_BASE_URL}`, { params, headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};

export const getClient = async (id: string): Promise<Client | null> => {
    try {
      const response = await axios.get<Client>(`${API_BASE_URL}/${id}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching clients by id:', error);
      throw error;
    }
  };


