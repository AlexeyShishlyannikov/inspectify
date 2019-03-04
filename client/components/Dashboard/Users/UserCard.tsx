import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import { IPerson } from 'client/models/person';
import { ITeam } from 'client/models/Team';
import { ApplicationState } from 'client/store';
import * as React from 'react';
import { connect } from 'react-redux';
import './UserCard.scss';
import { PeopleThunks } from '../../../store/people/peopleThunks';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IUserCardProps {
    teams: ITeam[];
    selectedPerson?: IPerson;
    isLoading: boolean;
    deletePerson: (id: string) => void;
    updatePerson: (person: IPerson) => void;
}

interface IUserCardState {
    selectedTeam?: ITeam;
}

class UserCard extends React.Component<IUserCardProps, IUserCardState> {
    componentWillMount() {
        if (this.props.selectedPerson) {
            this.setState({
                selectedTeam: this.props.selectedPerson.team
            });
        }
    }

    componentWillReceiveProps(newProps: IUserCardProps) {
        if (newProps.selectedPerson && newProps.selectedPerson !== this.props.selectedPerson) {
            this.setState({
                selectedTeam: newProps.selectedPerson.team
            });
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const teamId = event.target.value;
        const team = this.props.teams.find(t => t.id === teamId);
        this.setState({
            selectedTeam: team
        });
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (this.props.selectedPerson && !this.props.isLoading) {
            const person: IPerson = {
                ...this.props.selectedPerson,
                team: this.state.selectedTeam
            };
            this.props.updatePerson(person);
        }
    }

    render() {
        if (!this.props.selectedPerson) {
            return <React.Fragment />;
        }
        return (
            <Card>
                <CardHeader
                    title={this.props.selectedPerson.firstName + ' ' + this.props.selectedPerson.lastName}
                    action={
                        <Button aria-label="delete" color="secondary" variant='text' onClick={() => this.props.selectedPerson && this.props.deletePerson(this.props.selectedPerson.id)}>
                            DELETE USER
                        </Button>
                    } />
                {
                    this.props.selectedPerson.email &&
                    <CardContent>
                        <Typography color="textSecondary">Email: {this.props.selectedPerson.email}</Typography>
                        <form className="user-card-team-input-container" onSubmit={this.onSubmit}>
                            <FormControl className="user-card-team-input">
                                <InputLabel htmlFor="age-native-helper">Team</InputLabel>
                                <NativeSelect
                                    value={this.state.selectedTeam ? this.state.selectedTeam.id : undefined}
                                    onChange={this.handleChange}
                                    input={<Input name="team" id="age-native-helper" />}
                                >
                                    <option key={undefined} value={undefined}>N/A</option>,
                                    {this.props.teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
                                </NativeSelect>
                            </FormControl>
                            {this.state.selectedTeam !== this.props.selectedPerson.team &&
                                <Button className="user-card-team-button" type="submit" color="primary" variant='text'>
                                    {this.props.isLoading ? <CircularProgress color="secondary" size={30} /> : 'Save'}
                                </Button>
                            }
                        </form>
                    </CardContent>
                }
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    teams: state.teams.teams,
    selectedPerson: state.people.selectedPerson,
    isLoading: state.people.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    deletePerson: (id: string) => dispatch(PeopleThunks.deletePerson(id)),
    updatePerson: (person: IPerson) => dispatch(PeopleThunks.updatePerson(person)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCard)
