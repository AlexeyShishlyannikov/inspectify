import * as React from 'react';
import NavMenu from './NavMenu';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <React.Fragment>
                <NavMenu />
                {this.props.children}
            </React.Fragment>
        );
    }
}
