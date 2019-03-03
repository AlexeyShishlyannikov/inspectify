import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { connect } from 'react-redux';

import { ITeam } from '../../../models/Team';
import { ApplicationState } from '../../../store';
import { ISwitchEditTeamModeAction } from '../../../store/team/teamActions';

interface ITeamCardProps {
    isEditMode: boolean;
    selectedTeam?: ITeam;
    isLoading: boolean;
    setEditMode: (isEdit: boolean) => void;
}

const TeamCard = (props: ITeamCardProps) => {
    if (!props.selectedTeam) {
        return <React.Fragment />;
    }
    return (
        <Card>
            <CardHeader
                title={props.selectedTeam.name}
                action={
                    <IconButton aria-label="edit" color="primary" onClick={() => props.setEditMode(true)}>
                        <EditIcon />
                    </IconButton>
                } />
            {
                props.selectedTeam.description &&
                <CardContent>
                    <Typography color="textSecondary">{props.selectedTeam.description}</Typography>
                </CardContent>
            }
        </Card>
    );
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isEditMode: state.teams.isEditMode,
        selectedTeam: state.teams.selectedTeam,
        isLoading: state.teams.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEditMode: (mode: boolean) => {
            const action: ISwitchEditTeamModeAction = {
                type: "SWITCH_EDIT_TEAM_MODE_ACTION",
                status: mode
            };
            return dispatch(action);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamCard);
