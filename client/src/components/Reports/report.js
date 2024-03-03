import {useEffect, useState} from 'react';
import {getAllAccounts} from '../../api/account';

const Report = () => {
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        const getAccounts = async () => {
            const res = await getAllAccounts();
            setAccounts(res.data);
        }
        getAccounts().then(() => {});
    }, []);

    return <div className="page container py-4 py-sm-5 ">
        <div className="row p-3 shadow-sm rounded bg-white mx-3">
            <h1>Report</h1>
        </div>
        <div className="row p-3 shadow-sm rounded bg-white mx-3 mt-5">
            <div className="row">
                <div className="col-2">Account Type</div>
                <div className="col-2">Name</div>
                <div className="col-2">Amount</div>
            </div>
            {
                accounts.map((account, i) =>
                        <div className="row" key={i}>
                            <div className="col-2" style={{textAlign: 'left'}}>
                                {
                                    `${account.type}`
                                }
                            </div>
                            <div className="col-2" style={{textAlign: 'left'}}>
                                {
                                    `${account.name}`
                                }
                            </div>
                            <div className="col-2">
                                {
                                    `${account.amount}`
                                }
                            </div>
                        </div>
                    )
                }
        </div>
    </div>
}
export default Report;