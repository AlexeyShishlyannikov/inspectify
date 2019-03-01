import {
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    CardHeader,
    Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SelectIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { PeopleThunks } from '../../../store/people/peopleThunks';
import { IPerson } from '../../../models/person';
import { ISelectPersonAction } from '../../../store/people/peopleActions';

interface IUsersListProps {
    people: IPerson[];
    isLoading: boolean;
    getPeople: (searchTerm: string) => void;
    selectPerson: (person: IPerson) => void;
    deletePerson: (id: string) => void;
}

class UsersList extends React.Component<IUsersListProps, {}> {
    componentWillMount() {
        this.props.getPeople('');
    }

    render() {
        let Content: () => JSX.Element;
        if (this.props.isLoading) {
            Content = () => <CircularProgress />;
        } else if (this.props.people.length === 0) {
            Content = () => <div>No Active Users found.</div>;
        } else {
            Content = () => <List>
                {this.props.people.map(person => (
                    <ListItem key={person.id} dense>
                        <ListItemText
                            primary={<Typography variant="title">{person.firstName + ' ' + person.lastName}</Typography>}
                            secondary={<span key={person.email}>Email: {person.email}</span>}
                        />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="delete" color="secondary" 
                                onClick={() => this.props.deletePerson(person.id as string)}>
                                <CloseIcon />
                            </IconButton>
                            <IconButton aria-label="select" color="primary" 
                                onClick={() => this.props.selectPerson(person)}>
                                <SelectIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>;
        }
        return (
            <Card style={{marginTop: '15px'}}>
                <CardHeader title="Active Users" />
                <CardContent>
                    {this.props.isLoading ? <CircularProgress /> : <Content />}
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        people: state.people.people,
        isLoading: state.authentication.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPeople: (searchTerm: string) => dispatch(PeopleThunks.getPeople(searchTerm)),
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
