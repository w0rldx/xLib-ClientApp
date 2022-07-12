import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import UserCard from '../components/UserCard';
import UserService from '../services/UserService';
import { useAuthStore } from '../stores/AuthStore';

function User() {
    const params = useParams();
    const [token] = useAuthStore((state) => [state.getToken()]);

    const { data } = useQuery(['profile'], () =>
        UserService.getSpecificUserData(
            token ? token : '',
            params?.userName ? params.userName : '',
        ),
    );

    return (
        <UserCard
            email={data?.email ? data.email : ''}
            fistName={data?.firstName ? data.firstName : ''}
            lastName={data?.lastName ? data.lastName : ''}
            userName={data?.username ? data.username : ''}
            avatar={data?.avatar ? data.avatar : ''}
            headerPicture={data?.headerPicture ? data.headerPicture : ''}
        ></UserCard>
    );
}

export default User;
