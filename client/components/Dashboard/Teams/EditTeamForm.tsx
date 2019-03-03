import { ITeam } from '../../../models/Team';
import { ApplicationState } from '../../../store';
import { TeamThunks } from '../../../store/team/teamThunks';
import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import CardActions from '@material-ui/core/CardActions';
import './EditTeamForm.scss';

interface IEditTeamsFormProps {
    selectedTeam?: ITeam;
    isEditMode: boolean;
    isLoading: boolean;
    errorMessage?: string;
    addTeam: (team: ITeam) => void;
    updateTeam: (team: ITeam) => void;
    onSave?: () => void;
}

interface IEditTeamsFormState {
    name: string;
    description: string;
}

class EditTeamForm extends React.Component<IEditTeamsFormProps, IEditTeamsFormState> {
    componentWillMount() {
        this.setState({
            name: this.props.isEditMode && this.props.selectedTeam ? this.props.selectedTeam.name : '',
            description: this.props.isEditMode && this.props.selectedTeam && this.props.selectedTeam.description ? this.props.selectedTeam.description : ''
        });
    }

    componentWillReceiveProps(newProps: IEditTeamsFormProps) {
        if (newProps.selectedTeam && newProps.selectedTeam !== this.props.selectedTeam && newProps.isEditMode) {
            this.setState({
                name: newProps.selectedTeam.name,
                description: newProps.selectedTeam.description
            });
        }
    }

    createTeam = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.addTeam({
            name: this.state.name,
            description: this.state.description
        });
    };

    updateTeam = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.selectedTeam
            && (this.props.selectedTeam.name !== this.state.name || this.props.selectedTeam.description !== this.state.description)
        ) {
            this.props.updateTeam({
                id: this.props.selectedTeam.id,
                name: this.state.name,
                description: this.state.description
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

    isButtonDisabled = () => !this.state.name;

    getSubmitButton = () => {
        return <Button
            type="submit"
            color="primary"
            disabled={this.isButtonDisabled()}
            variant={this.isButtonDisabled() ? 'text' : 'contained'}
        >
            {this.props.isLoading ? <CircularProgress color="secondary" size={30} /> : 'Save'}
        </Button>;
    };

    render() {
        return (
            <Card className="team-form-card">
                <form className="team-form" onSubmit={(event) => {
                    this.props.isEditMode ? this.updateTeam(event) : this.createTeam(event);
                    if (this.props.onSave) this.props.onSave();
                }}>
                    <CardHeader title={(this.props.isEditMode ? 'Edit' : 'Create') + ' Team'} />
                    <CardContent className="team-form-content">
                        <FormControl className="team-form-input">
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                            />
                        </FormControl>
                        <FormControl className="team-form-input">
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input
                                type="text"
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        {<div style={{ 'color': 'red' }}> {this.props.errorMessage} </div>}
                        {this.getSubmitButton()}
                    </CardActions>
                </form>
            </Card>
        );
    }
}


const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedTeam: state.teams.selectedTeam,
        isEditMode: state.teams.isEditMode,
        isLoading: state.teams.isLoading,
        errorMessage: state.teams.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTeam: (team: ITeam) => dispatch(TeamThunks.createTeam(team)),
        updateTeam: (team: ITeam) => dispatch(TeamThunks.updateTeam(team))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTeamForm)
