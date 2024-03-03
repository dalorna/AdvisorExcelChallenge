import {atom} from 'recoil';


export const userAtom = atom({
    key: 'username',
    default: null
});

export const transactionAtom = atom({
    key: 'transaction',
    default: []
})