import axios from 'axios';

export const balanceAdjust = (deposit) => axios.post('/account/deposit', deposit)
export const getUserByName = (name) => axios.get(`/account/${name}`);
export const getAllAccounts = () => axios.get('/accounts');