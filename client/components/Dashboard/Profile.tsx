import './Profile.scss';

import * as React from 'react';
import ProfileUserForm from '../Authentication/Profile/ProfileUserForm';

interface IProfileProps {
}

const Profile = (props: IProfileProps): JSX.Element => {
    return (
        <div className="profile">
            <ProfileUserForm />
        </div>
    );
};

export default (Profile);
