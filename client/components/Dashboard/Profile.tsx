import './Profile.scss';

import * as React from 'react';

import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { ILogoutAction } from '../../store/authentication/authenticationActions';
import { User } from '../../models/Authentication';
import ProfileCompanyForm from './Profile/ProfileCompanyForm';
import ProfileUserForm from './Profile/ProfileUserForm';
import ChangePassword from './Profile/ChangePassword';

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
