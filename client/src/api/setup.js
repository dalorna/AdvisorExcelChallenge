import axios from 'axios';

export const dropTable = () => axios.get('/setup/drop');
export const createTable = () => axios.get('/setup/create');
export const addTableConstraint = () => axios.get('/setup/constraint');
export const insertStartUpRecords = () => axios.get('/setup/insert');