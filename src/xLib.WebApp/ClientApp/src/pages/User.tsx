import { useQuery } from 'react-query';
import { useParams } from 'react-router';
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

    return <div>{params.userName}</div>;
}

export default User;
