import {useRecoilState} from 'recoil';
import {userAtom} from '../../utils/state';

const Home = () => {
    const [currentUser, ] = useRecoilState(userAtom)


    return <div className="page container py-4 py-sm-5 ">
        <div className="row p-3 shadow-sm rounded bg-white mx-3">
            <h1>Home</h1>
        </div>
        {
            !currentUser &&
            <div className="row p-3 shadow-sm rounded bg-white mx-3 mt-5">
                <ul>
                    <li>
                        In order to use this application, you will need to navigate to the user page.
                    </li>
                    <li>
                        Simply click on the person icon and enter the name of the user you would like to work with
                    </li>
                    <li>
                        The reports section with graph icon will give you a list of users if you would like to copy and paste
                    </li>
                    <li>
                        once logged in you can hover the account section and chooser the operation you would like to work with
                    </li>
                    <li>
                        I may have went overboard a little, but I had a lot of fun constructing this application
                    </li>
                </ul>
            </div>
        }
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
export default Home;