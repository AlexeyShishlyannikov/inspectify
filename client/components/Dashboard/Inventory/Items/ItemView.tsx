import './ItemView.scss';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';

import { IProperty, IItem } from '../../../../models/inventory';
import { ApplicationState } from '../../../../store';
import { ItemsThunks } from '../../../../store/items/itemsThunks';

interface IItemViewProps {
    selectedItem?: IItem;
    isLoading: boolean;
    errorMessage?: string;
    getItem: (id: string) => void;
    deleteItem: (id: string) => void;
    // getPeopleForItem: (ItemId: string) => void;
}

class ItemView extends React.Component<IItemViewProps & RouteComponentProps & RouteProps> {
    componentWillMount() {
        const id: string = this.props.match.params['id'];
        this.props.getItem(id);
    }

    render() {
        if (this.props.isLoading) {
            return <CircularProgress />
        }
        if (!this.props.selectedItem) {
            return <Redirect to="../.." />
        }
        return (
            <div style={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
                <Card>
                    <CardHeader
                        title={this.props.selectedItem.name}
                        action={
                            <div>
                                <Link to={'../edit/' + this.props.selectedItem.id} style={{ textDecoration: 'none' }}>
                                    <Button color="primary" variant="text">
                                        Edit <EditIcon />
                                    </Button>
                                </Link>
                                <Button color="secondary" onClick={() => this.props.selectedItem && this.props.deleteItem(this.props.selectedItem.id as string)} variant="outlined">Delete</Button> {/** move to edit view */}
                            </div>
                        }
                        subheader={<Typography color="textSecondary" variant="subheading">{this.props.selectedItem.template.name}</Typography>}
                    />
                </Card>
                <br />
                {this.props.selectedItem.values.length > 0 && <CardHeader title='Values' />}
                {this.props.selectedItem.values.map(value => {
                    return <div key={value.id} className="item-view-panel">{JSON.stringify(value)}</div>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedItem: state.items.selectedItem,
        isLoading: state.items.isLoading,
        errorMessage: state.items.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItem: (id: string) => dispatch(ItemsThunks.getItem(id)),
        deleteItem: (id: string) => dispatch(ItemsThunks.deleteItem(id)),
        // getPeopleForItem: (ItemId: string) => dispatch(PeopleThunks.getPeopleForItem(ItemId, ''))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);
