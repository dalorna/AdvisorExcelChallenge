import {useRecoilState} from 'recoil';
import {transactionAtom, userAtom} from '../../utils/state';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {toast} from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import {balanceAdjust, getUserByName} from '../../api/account';
import {ErrorFeedback} from '../../utils/shared';

const schema = Yup.object().shape({
    deposit: Yup.number().required(),
});

const Deposit = () => {
    const [currentUser, setCurrentUser] = useRecoilState(userAtom);
    const [, setTransactions] = useRecoilState(transactionAtom);
    const {
        register,
        handleSubmit,
        formState: {isValid},
        watch,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {deposit: null}
    });
    const dep = watch('deposit');

    const isDepositAllowed = (depositAmount) => {
        if (depositAmount > 1000) {
            toast.error('You may not deposit more that $1000 in a single transaction')
            return false;
        } else if (currentUser.type === 'credit') {
            const balance = currentUser.amount + depositAmount;
            if (balance > 0) {
                toast.error('A credit account cannot exceed a 0 balance')
                return
            }
        }
        return true;
    }

    const onSubmit = async (data) => {
        if (isDepositAllowed(data.deposit)) {
            try {

                const date = new Date();
                const balance = currentUser.amount + data.deposit;
                await balanceAdjust({amount: balance, account_number: currentUser.account_number});
                const response = await getUserByName(currentUser.name);
                if (response.data.length === 1) {
                    setCurrentUser(response.data[0])
                    setTransactions((currenList) => [...currenList, {
                        amount: data.deposit,
                        account_number: currentUser.account_number,
                        action: 'Deposit',
                        date: date.toLocaleDateString(),
                        day: date.getDay()
                    }])
                    toast.success('Deposit was successful');
                }
            } catch (e) {
                toast.error(`Failed make the deposit\r ${e.message}`);
            } finally {
                setValue('deposit', null);
            }
        }
    }

    return <div className="page container py-4 py-sm-5 ">
        <div className="row p-3 shadow-sm rounded bg-white mx-3">
            <h1>Deposit</h1>
        </div>
            {
                currentUser &&
                <div className="row p-3 shadow-sm rounded bg-white mx-3 mt-5">
                    <h4>Welcome</h4>
                    <div className="mb-3">
                        <span style={{fontWeight: 'bold'}}>{currentUser.name}</span>
                        <span>{`, your current amount is: $${currentUser.amount}`}</span>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-4">
                                    <label htmlFor="user" className="form-label">Enter the amount you would like to deposit</label>
                                </div>
                                <div className="col-3">
                                    <input type="text" id="deposit" {...register('deposit')} placeholder="Amount in dollars only"  />
                                    <ErrorFeedback isValid={isValid} value={dep} />
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-primary" type="submit" disabled={!isValid}>Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
    </div>
}

export default Deposit;

