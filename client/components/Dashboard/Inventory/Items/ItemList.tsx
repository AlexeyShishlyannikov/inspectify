import './ItemList.scss';

import { CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SelectIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteProps } from 'react-router-dom';

import { IItem } from '../../../../models/inventory';
import { ApplicationState } from '../../../../store';
import { ISelectItemAction } from '../../../../store/items/itemsActions';

interface IItemsListProps {
    items: IItem[];
    selectedItem?: IItem;
    isLoading: boolean;
    errorMessage?: string;
    selectItem: (item: IItem) => void;
}

class ItemsList extends React.Component<IItemsListProps & RouteProps> {
    render() {
        let Content: () => JSX.Element;
        if (this.props.isLoading) {
            Content = () => <CircularProgress />;
        } else if (this.props.items.length === 0) {
            Content = () => <CardContent><div>No Items found.</div></CardContent>;
        } else {
            Content = () => <List>
                {this.props.items.map(item => (
                    <Link style={{ textDecoration: 'none' }} key={item.id} to={'/dashboard/inventory/items/view/' + item.id}>
                        <ListItem dense button onClick={() => this.props.selectItem(item)}>
                            <ListItemText
                                primary={<Typography variant="title">{item.name}</Typography>}
                                secondary={item.template.name}
                            />
                            <ListItemSecondaryAction>
                                <SelectIcon />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                ))}
            </List>;
        }
        return (
            <Card style={{ marginTop: '15px' }}>
                <CardHeader title="Items" />
                <Content />
                <CardActions className="Items-card-actions">
                    <Link to="/dashboard/inventory/items/create" className="items-new-link">
                        <Button type="submit" color="primary" variant='text'>
                            Create new Item
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        selectedItem: state.items.selectedItem,
        items: state.items.items,
        isLoading: state.items.isLoading,
        errorMessage: state.items.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectItem: (item: IItem) => {
            const action: ISelectItemAction = {
                type: "SELECT_ITEM_ACTION",
                selectedItem: item
            };
            return dispatch(action);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList)
