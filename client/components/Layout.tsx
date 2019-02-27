import * as React from 'react';
import NavMenu from './NavMenu';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return (
            <div style={{ backgroundColor: '#e8ebef', height: '100vh' }}>
                <NavMenu />
                {this.props.children}
            </div>
        );
    }
}
