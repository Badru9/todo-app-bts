import axios from 'axios';
import { LoginTypes, RegisterTypes } from './types';

const ROOT_API = process.env.NEXT_PUBLIC_API;

export async function login(data: LoginTypes) {
  const response = await axios.post(`${ROOT_API}/login`, data);

  return response;
}

export async function register(data: RegisterTypes) {
  console.log('ROOT_API:', process.env.NEXT_PUBLIC_API, data);

  const response = await axios.post(`${ROOT_API}/register`, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return response;
}
