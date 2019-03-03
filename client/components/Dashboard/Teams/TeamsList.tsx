import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SelectIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteProps, Link } from 'react-router-dom';

import { ITeam } from '../../../models/team';
import { ApplicationState } from '../../../store';
import { ISelectTeamAction } from '../../../store/team/teamActions';
import { TeamThunks } from '../../../store/team/teamThunks';


interface ITeamsListProps {
    teams: ITeam[];
    selectedTeam?: ITeam;
    isLoading: boolean;
    errorMessage?: string;
    getTeams: (searchTerm: string) => void;
    selectTeam: (team: ITeam) => void;
}

class TeamsList extends React.Component<ITeamsListProps & RouteProps, {}> {
    componentWillMount() {
        this.props.getTeams('');
    }

    render() {
        let Content: () => JSX.Element;
        if (this.props.isLoading) {
            Content = () => <CircularProgress />;
        } else if (this.props.teams.length === 0) {
            Content = () => <div>No Teams found.</div>;
        } else {
            Content = () => <List>
                {this.props.teams.map(team => (
                    <ListItem key={team.id} dense>
                        <ListItemText
                            primary={<Typography variant="title">{team.name}</Typography>}
                            secondary={team.description && <span>Description: {team.description}</span>}
                        />
                        <ListItemSecondaryAction>
                            <Link to={'/dashboard/teams/' + team.id}>
                                <IconButton aria-label="select" color="primary"
                                    onClick={() => this.props.selectTeam(team)}>
                                    <SelectIcon />
                                </IconButton>
                            </Link>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>;
        }
        return (
            <Card style={{ marginTop: '15px' }}>
                <CardHeader title="Teams" />
                <CardContent>
                    <Content />
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedTeam: state.teams.selectedTeam,
        teams: state.teams.teams,
        isLoading: state.teams.isLoading,
        errorMessage: state.teams.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTeams: (searchTerm: string) => dispatch(TeamThunks.getTeams(searchTerm)),
        selectTeam: (team: ITeam) => {
            const action: ISelectTeamAction = {
                type: "SELECT_TEAM_ACTION",
                selectedTeam: team
            };
            return dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsList)
