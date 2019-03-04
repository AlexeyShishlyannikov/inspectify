import './ProfileForm.scss';

import { CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { User } from '../../../models/Authentication';
import { ApplicationState } from '../../../store';
import { ILogoutAction } from '../../../store/authentication/authenticationActions';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { IPerson } from '../../../models/person';
import { PeopleThunks } from '../../../store/people/peopleThunks';

interface IProfileUserFormProps {
    person?: IPerson;
    user?: User;
    isLoading: boolean;
    isAuthenticated: boolean;
    errorMessage?: string;
    logout: () => void;
    getPerson: (id: string) => void;
    updatePerson: (person: IPerson) => void;
}

interface IProfileUserFormState {
    firstName?: string;
    lastName?: string;
}

class ProfileUserForm extends React.Component<IProfileUserFormProps, IProfileUserFormState> {
    state: IProfileUserFormState = {
        firstName: '',
        lastName: ''
    };

    componentWillMount() {
        if (this.props.user) {
            this.props.getPerson(this.props.user.userId);
        }
    }

    componentWillReceiveProps(newProps: IProfileUserFormProps) {
        if (newProps.person !== this.props.person) {
            this.setState(state => {
                return {
                    firstName: newProps.person ? newProps.person.firstName : state.firstName,
                    lastName: newProps.person ? newProps.person.lastName : state.lastName
                }
            });
            console.log(this.state);
        }
    }

    updateUser = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.user && this.props.person) {
            this.props.updatePerson({
                id: this.props.person.id,
                team: this.props.person.team,
                email: this.props.user.email,
                firstName: this.state.firstName as string,
                lastName: this.state.lastName as string
            });
        }
    };

    handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        const value = event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    isButtonDisabled = () => !this.state.firstName || !this.state.lastName;

    getSubmitButton = () => {
        return <Button
            disabled={this.isButtonDisabled()}
            type="submit"
            variant={this.isButtonDisabled() ? 'text' : 'contained'}
            color="primary"
        >
            {this.props.isLoading ? <CircularProgress color="secondary" size={30} /> : 'Save'}
        </Button>;
    };

    render() {
        if (!this.props.isAuthenticated) return <Redirect to="/login" />
        return (
            <Card className="profile-form-card">
                <form className="profile-form" onSubmit={this.updateUser}>
                    <CardHeader
                        title={'Profile'}
                        action={
                            <Button onClick={this.props.logout} variant="text" color="secondary">
                                Logout
                            </Button>
                        } />
                    <CardContent className="profile-form-content">
                        <FormControl className="profile-form-input">
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                            />
                        </FormControl>
                        <FormControl className="profile-form-input">
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input
                                type="text"
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        {<div style={{ 'color': 'red' }}> {!this.props.errorMessage ? null : this.props.errorMessage} </div>}
                        {this.getSubmitButton()}
                    </CardActions>
                </form>
            </Card>
        );
    }
};

const mapStateToProps = (state: ApplicationState) => ({
    user: state.authentication.user,
    person: state.people.selectedPerson,
    isLoading: state.people.isLoading,
    errorMessage: state.authentication.errorMessage,
    isAuthenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        const action: ILogoutAction = {
            type: "LOGOUT_ACTION"
        };
        dispatch(action);
    },
    getPerson: (id: string) => dispatch(PeopleThunks.getPerson(id)),
    updatePerson: (person: IPerson) => dispatch(PeopleThunks.updatePerson(person))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserForm);
