import './Profile.scss';

import * as React from 'react';

import ChangePassword from '../Authentication/Profile/ChangePassword';
import ProfileUserForm from '../Authentication/Profile/ProfileUserForm';
import { connect } from 'react-redux';
import { ApplicationState } from 'client/store';
import { ILogoutAction } from 'client/store/authentication/authenticationActions';
import { User } from 'client/models/Authentication';
import ProfileCompanyForm from '../Authentication/Profile/ProfileCompanyForm';

interface IProfileProps {
    user?: User;
    isLoading: boolean;
    errorMessage?: string;
}

const Profile = (props: IProfileProps): JSX.Element => {
    let ProfileForm = () => (props.user && props.user.isCompany ? <ProfileCompanyForm /> : <ProfileUserForm />);
    return (
        <div className="profile">
            <ProfileForm />
            <br />
            <ChangePassword />
        </div>
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    user: state.authentication.user,
    isLoading: state.authentication.isLoading,
    errorMessage: state.authentication.errorMessage
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        const action: ILogoutAction = {
            type: "LOGOUT_ACTION"
        };
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
