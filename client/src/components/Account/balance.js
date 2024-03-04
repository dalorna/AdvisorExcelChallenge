import {useRecoilState} from 'recoil';
import {userAtom, transactionAtom} from '../../utils/state';

const Balance = () => {
    const [transactions, ] = useRecoilState(transactionAtom);
    const [currentUser, ] = useRecoilState(userAtom);

    return <div className="page container py-4 py-sm-5 ">
        <div className="row p-3 shadow-sm rounded bg-white mx-3">
            <h1>Balance</h1>
        </div>
        <div>
            {
                currentUser &&
                <div className="row p-3 shadow-sm rounded bg-white mx-3 mt-5">
                    <h4>Welcome</h4>
                    <div className="mb-3">
                        <span style={{fontWeight: 'bold'}}>{currentUser.name}</span>
                        <span>{`, your current amount is: $${currentUser.amount}`}</span>
                    </div>
                </div>
            }
        </div>
        <div>
            {
                currentUser && transactions.length > 0 &&
                <div  className="row p-3 shadow-sm rounded bg-white mx-3 mt-5">
                    <div className="row">
                        <h4>Transaction History</h4>
                    </div>
                    <div className="row">
                        <ul style={{listStyle: 'none'}}>
                            {
                                transactions.filter(f => f.account_number === currentUser.account_number).map((m, i) =>
                                    <li key={i}>
                                        {
                                            `Transaction: ${m.action}, Amount: ${m.amount}, Date: ${m.date}`
                                        }
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            }
        </div>
    </div>
}
export default Balance