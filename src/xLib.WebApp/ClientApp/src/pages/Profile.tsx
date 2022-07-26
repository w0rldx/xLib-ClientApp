import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router';
import UserCard from '../components/UserCard';
import { IUser } from '../interfaces/User';
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import { useAuthStore } from '../stores/AuthStore';

function Profile() {
    const { userName } = useParams();
    const [token] = useAuthStore((state) => [state.getToken()]);
    const profile = useQuery<IUser, Error>(['profile'], () =>
        UserService.getSpecificUserData(
            token ? token : '',
            userName ? userName : '',
        ),
    );
    const profileUsername = profile.data?.userName;
    const { data, refetch } = useQuery(
        ['posts'],
        () =>
            PostService.getAllPostFromUser(
                token ? token : '',
                profileUsername ? profileUsername : '',
            ),
        { enabled: !!profileUsername || false },
    );

    const userCard = () => {
        if (profile.data === undefined || profile.error !== null) {
            <Navigate replace to="/error" />;
        } else if (profile.data !== undefined) {
            return (
                <UserCard
                    email={profile.data?.email ? profile.data.email : ''}
                    fistName={
                        profile.data?.firstName ? profile.data.firstName : ''
                    }
                    lastName={
                        profile.data?.lastName ? profile.data.lastName : ''
                    }
                    userName={
                        profile.data?.userName ? profile.data.userName : ''
                    }
                    avatar={profile.data?.avatar ? profile.data.avatar : ''}
                    roles={profile.data?.roles ? profile.data.roles : []}
                    headerPicture={
                        profile.data?.headerPicture
                            ? profile.data.headerPicture
                            : ''
                    }
                    posts={data ? data : []}
                    refetch={refetch}
                ></UserCard>
            );
        } else {
            return <div>Loading...</div>;
        }
    };
    return <>{userCard()} </>;
}

export default Profile;
