import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SendIcon from '@material-ui/icons/Send';
import * as React from 'react';
import { connect } from 'react-redux';
import './InvitationForm.scss';

import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { IInvitation } from '../../../../models/invitation';
import { ApplicationState } from '../../../../store';
import { InvitationThunks } from '../../../../store/invitations/invitationsThunks';


interface IInvitationFormState {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

interface IInvitationFormProps {
    selectedInvitation?: IInvitation;
    isLoading: boolean;
    errorMessage?: string;
    inviteUser: (invitenUserModel: IInvitationFormState) => void;
}

class InvitationForm extends React.Component<IInvitationFormProps, IInvitationFormState> {
    state: IInvitationFormState = {
        email: this.props.selectedInvitation ? this.props.selectedInvitation.email : '',
        firstName: this.props.selectedInvitation ? this.props.selectedInvitation.firstName : '',
        lastName: this.props.selectedInvitation ? this.props.selectedInvitation.lastName : '',
        phoneNumber: this.props.selectedInvitation ? this.props.selectedInvitation.phoneNumber : ''
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

    inviteUser = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.inviteUser({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber
        });
    };

    isButtonDisabled = () => !this.state.email || !this.state.firstName || !this.state.lastName;

    getSubmitButton = () => {
        return <Button
            disabled={this.isButtonDisabled()}
            type="submit"
            variant="contained"
            color="primary"
        >
            {this.props.isLoading ? <CircularProgress size={30} color='secondary' /> : (<div><SendIcon /> Invite </div>)}
        </Button>
    }

    render(): JSX.Element {
        return (
            <form onSubmit={this.inviteUser} className="invitation-form-container">
                <Card className="invitaion-form-card">
                    <CardHeader title={'Invite User'} />
                    <CardContent className="invitation-form-card-content">
                        <FormControl className="invitation-form-input">
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input
                                type='text'
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                            />
                        </FormControl>
                        <FormControl className="invitation-form-input">
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input
                                type='text'
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                            />
                        </FormControl>
                        <FormControl className="invitation-form-input">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                type='email'
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                            />
                        </FormControl>
                        {/* <FormControl className="invitation-form-input">
                            <InputLabel htmlFor="phone">Phone Number</InputLabel>
                            <Input
                                type='phone'
                                value={this.state.phoneNumber}
                                onChange={this.handleChange('phoneNumber')}
                            />
                        </FormControl> */}
                    </CardContent>
                    <CardActions className="invitation-form-actions">
                        <div style={{ 'color': 'red' }}> {this.props.errorMessage} </div>
                        {this.getSubmitButton()}
                    </CardActions>
                </Card>
            </form>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedInvitation: state.invitations.selectedInvitation,
        isLoading: state.authentication.isLoading,
        errorMessage: state.authentication.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        inviteUser: (invitation: IInvitation) =>
            dispatch(InvitationThunks.sendInvitation(invitation)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitationForm);
