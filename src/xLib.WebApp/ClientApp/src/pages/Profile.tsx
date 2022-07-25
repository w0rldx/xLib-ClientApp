import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router';
import UserCard from '../components/UserCard';
import UserService from '../services/UserService';
import { useAuthStore } from '../stores/AuthStore';

function Profile() {
    const { userName } = useParams();
    const [token] = useAuthStore((state) => [state.getToken()]);
    const { data, error } = useQuery(['profile'], () =>
        UserService.getSpecificUserData(
            token ? token : '',
            userName ? userName : '',
        ),
    );

    const userCard = () => {
        if (data === undefined || error !== null) {
            <Navigate replace to="/error" />;
        } else if (data !== undefined || error === null) {
            return (
                <UserCard
                    email={data?.email ? data.email : ''}
                    fistName={data?.firstName ? data.firstName : ''}
                    lastName={data?.lastName ? data.lastName : ''}
                    userName={data?.userName ? data.userName : ''}
                    avatar={data?.avatar ? data.avatar : ''}
                    roles={data?.roles ? data.roles : []}
                    headerPicture={
                        data?.headerPicture ? data.headerPicture : ''
                    }
                ></UserCard>
            );
        } else {
            return <div>Loading...</div>;
        }
    };
    return <>{userCard()} </>;
}

export default Profile;
