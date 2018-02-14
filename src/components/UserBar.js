import React, {Component} from 'react';

import {connect} from 'react-redux'

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face'


class UserBar extends Component {
    render() {
        return (
            <div>
                <Chip style={{margin: '80px 20px 0 0', float: 'right'}}>
                    <Avatar color="#444" icon={<SvgIconFace/>}/>
                    Witaj: {this.props.userEmail}
                </Chip>
                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userEmail: state.auth.user.email
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBar)