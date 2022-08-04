import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

import UserCard from '../components/UserCard';
import UserService from '../services/UserService';
import { useAuthStore } from '../stores/AuthStore';

function User() {
    const params = useParams();
    const [token] = useAuthStore((state) => [state.getToken()]);
    const navigate = useNavigate();

    const { data, error } = useQuery(['profile'], () =>
        UserService.getSpecificUserData(
            token ? token : '',
            params?.userName ? params.userName : '',
        ),
    );

    const userCard = () => {
        if (data === undefined || error !== null) {
            navigate('/error');
        } else {
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
        }
    };

    return <>{userCard()}</>;
}

export default User;
