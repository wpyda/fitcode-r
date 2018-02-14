import React from 'react'

import Forms from './Forms'
import MuiAppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import {connect} from 'react-redux'

const Auth  = (props) => (
            props.userData ?
                props.children
                :
                <div>
                    <MuiAppBar
                        title={`FitCode App`}
                        iconElementLeft={<IconButton><ActionFavoriteBorder /></IconButton>}
                    />
                <Forms />
                </div>
        )


const mapStateToProps = state => ({
    userData: state.auth.user
})

export default connect(
    mapStateToProps
)(Auth)