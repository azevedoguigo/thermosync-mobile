import axios from "axios";

const API_URL = "http://192.168.0.108:3000";

type RegisterDTO = {
  first_name: string
  last_name: string
  email: string
  password: string
}

type LoginDTO = {
  email: string
  password: string
}

type ApiResponse = {
  token: string;
}

export const register = async (dto: RegisterDTO): Promise<void> => {
  const response = await axios.post(`${API_URL}/users`, dto);
  return response.data
};

export const login = async (dto: LoginDTO): Promise<ApiResponse> => {
  const response = await axios.post(`${API_URL}/auth`, dto);
  return response.data
};