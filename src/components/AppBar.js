import React, {Component} from 'react';
import MuiAppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

import {connect} from 'react-redux'
import {logOut} from '../state/auth'

class AppBar extends Component {
    render() {
        return (
            <MuiAppBar
                style={{position: 'fixed', opacity: 1}}
                title={`FitCode App`}
                onLeftIconButtonClick={this.props.butt}
                iconElementRight={
                    <IconButton
                        tooltip="Wyloguj"
                        style={{}}
                        onClick={() => this.props.onLogOutClick()}
                    >
                        <PowerSettingsNew color={"#fff"}/>
                    </IconButton>
                }
            />
        )
    }
}

const mapStateToProps = state => ({
    //userEmail: state.auth.user.email
})

const mapDispatchToProps = dispatch => ({
    onLogOutClick: () => dispatch(logOut()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBar)