import {dropTable, createTable, insertStartUpRecords, addTableConstraint} from '../api/setup';

export const initializeSetup = async () => {
    try {
        const dropRes = await dropTable();
        const createRes = await createTable();
        const addTableRes = await addTableConstraint();
        const insertRes = await insertStartUpRecords();
        if (dropRes.status === 200 && createRes.status === 200 && addTableRes.status === 200 && insertRes.status === 200) {
            return {message: 'success', status: 200};
        }
        return {message: `Setup Didn't load successfully` , status: 500};
    } catch (e) {
        return {message: e.message, status: 500};
    }
}