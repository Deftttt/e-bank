import axios from 'axios';
import { authHeader } from '../../utils/AuthHeader';

const API_BASE_URL = 'http://localhost:8080/users';

export interface UserUpdateDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addresses: AddressUpdateDto[];
}

export interface AddressUpdateDto {
  street: string;
  city: string;
  country: string;
  postCode: string;
  localNumber: string;
}

export const updateUser = async (id: string, userUpdateDto: UserUpdateDto): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/${id}`, userUpdateDto, { headers: authHeader() });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const getUser = async (id: string): Promise<UserUpdateDto> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  };