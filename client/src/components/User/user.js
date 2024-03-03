import {useRecoilState} from 'recoil';
import {userAtom} from '../../utils/state';
import { useForm } from 'react-hook-form';
import {getUserByName} from '../../api/account';
import {toast} from 'react-hot-toast';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
    user: Yup.string().required(),
});

const User = () => {
    const [currentUser, setCurrentUser] = useRecoilState(userAtom);

    const {
        register,
        handleSubmit,
        formState: {isValid}
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {user: null}
    });

    const onSubmit = async (data) => {
        const response = await getUserByName(data.user);
        if (response.data.length === 1) {
            setCurrentUser(response.data[0]);
            toast.success('User Found');
            return;
        }
        toast.error('Failed to find the user');
    }

    return <div className="page container py-4 py-sm-5 ">
        <div className="row p-3 shadow-sm rounded bg-white mx-3">
            <h1>User</h1>
        </div>
        <div className="row p-3 shadow-sm rounded bg-white mx-3 mt-5">
            <div>
                <p>
                    Please enter the name on the Account
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-3"><label htmlFor="user" className="form-label">Enter you
                            name</label>
                        </div>
                        <div className="col-3">
                            <input type="text" id="user" {...register('user')} />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" type="submit" disabled={!isValid}>Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div>
            {
                currentUser &&
                <div className="row p-3 shadow-sm rounded bg-white mx-3 mt-5">
                    <div className="row">
                        {
                            `You're now logged in as ${currentUser.name}`
                        }
                    </div>
                </div>
            }
        </div>
    </div>
}
export default User;