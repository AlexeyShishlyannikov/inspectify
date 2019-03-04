import { ApplicationState } from "../../../store";
import { IPerson } from "../../../models/person";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import React = require("react");

import CloseIcon from '@material-ui/icons/Close';
import SelectIcon from '@material-ui/icons/ChevronRight';
import { ISelectPersonAction } from "../../../store/people/peopleActions";
import { PeopleThunks } from "../../../store/people/peopleThunks";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

interface IUserListItemProps {
    person: IPerson;
    deletePerson: (id: string) => void;
    selectPerson: (person: IPerson) => void;
}

const UserListItem = (props: IUserListItemProps) => {
    const { person } = props;
    return <ListItem key={person.id} dense>
        <ListItemText
            primary={<Typography variant="title">{person.firstName + ' ' + person.lastName}</Typography>}
            secondary={
                <React.Fragment>
                    <span>Email: {person.email}</span>
                    {person.team && <span> Team: {person.team.name}</span>}
                </React.Fragment>
            }
        />
        <ListItemText></ListItemText>
        <ListItemSecondaryAction>
            <IconButton aria-label="delete" color="secondary"
                onClick={() => props.deletePerson(person.id as string)}>
                <CloseIcon />
            </IconButton>
            <Link to={"/dashboard/users/" + person.id}>
                <IconButton aria-label="select" color="primary"
                    onClick={() => props.selectPerson(person)}>
                    <SelectIcon />
                </IconButton>
            </Link>
        </ListItemSecondaryAction>
    </ListItem>
};

const mapStateToProps = (state: ApplicationState) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePerson: (id: string) => dispatch(PeopleThunks.deletePerson(id)),
        selectPerson: (person: IPerson) => {
            const action: ISelectPersonAction = {
                type: "SELECT_PERSON_ACTION",
                selectedPerson: person
            }
            return dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListItem);