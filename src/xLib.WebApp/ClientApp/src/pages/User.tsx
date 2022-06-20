import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import UserService from '../services/UserService';
import { useAuthStore } from '../stores/AuthStore';

function User() {
    const params = useParams();
    const [token, user] = useAuthStore((state) => [
        state.getToken(),
        state.getUser(),
    ]);

    const { status, error, data } = useQuery(['profile'], () =>
        UserService.getSpecificUserData(
            token ? token : '',
            params?.userName ? params.userName : '',
        ),
    );

    console.log(data);

    return <div>{params.userName}</div>;
}

export default User;
