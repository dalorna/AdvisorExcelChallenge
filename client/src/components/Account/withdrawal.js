import {useRecoilState} from 'recoil';
import {userAtom, transactionAtom} from '../../utils/state';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {toast} from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import {balanceAdjust, getUserByName} from '../../api/account';
import {ErrorFeedback} from '../../utils/shared';

const schema = Yup.object().shape({
    withdrawal: Yup.number().required(),
});
const Withdrawal = () => {
    const [transactions,  setTransactions] = useRecoilState(transactionAtom);
    const [currentUser, setCurrentUser] = useRecoilState(userAtom);
    const {
        register,
        handleSubmit,
        formState: {isValid},
        watch,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {withdrawal: null}
    });
    const draw = watch('withdrawal');

    const isWithdrawalAllowed = (withdrawalAmount) => {
        if (withdrawalAmount % 5 === 0) {
            const currentUserTransactions = transactions.filter(f => f.account_number === currentUser.account_number);
            const withdrawalSum = currentUserTransactions.length > 0 ?
                currentUserTransactions.map(m => m.amount).reduce((sum, val) => sum + val)
                : 0;
            const isLimitExceeded = (withdrawalSum + withdrawalAmount) <= 400 && withdrawalAmount <= 200;
            return currentUser.type !== 'credit' ? withdrawalAmount < currentUser.amount && isLimitExceeded : isLimitExceeded;
        }
        toast.error('You must withdraw in units of 5!')
        return false;
    }

    const onSubmit = async (data) => {
        if (isWithdrawalAllowed(data.withdrawal)) {
            try {
                const balance = currentUser.amount - data.withdrawal;
                await balanceAdjust({amount: balance, account_number: currentUser.account_number});
                const response = await getUserByName(currentUser.name);
                if (response.data.length === 1) {
                    setCurrentUser(response.data[0])
                    setTransactions((currenList) => [...currenList, {
                        amount: data.withdrawal,
                        account_number: currentUser.account_number,
                        action: 'Withdrawal'
                    }])
                    toast.success('Withdrawal was successful');
                }
            } catch (e) {
                toast.error(`Failed make the withdrawal\r ${e.message}`);
            } finally {
                setValue('withdrawal', null);
            }
        } else {

            toast.error('Withdrawal failed')
        }
    }

    return <div className="page container py-4 py-sm-5 ">
        <div className="row p-3 shadow-sm rounded bg-white mx-3">
            <h1>Withdrawal</h1>
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
                                <label htmlFor="user" className="form-label">Enter the amount you would like to withdraw</label>
                            </div>
                            <div className="col-3">
                                <input type="text" id="withdrawal" {...register('withdrawal')} placeholder="Amount in dollars only"  />
                                <ErrorFeedback isValid={isValid} value={draw} />
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
export default Withdrawal;