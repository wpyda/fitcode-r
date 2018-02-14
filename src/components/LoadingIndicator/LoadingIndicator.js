import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

import {connect} from 'react-redux'

const styles = {
    wrapper: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 99999,
        opacity: 0.7
    },
    indicator: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}

const LoadingIndicator = (props) => (
    props.isLoading ?
        <div style={styles.wrapper}>
            <div style={styles.indicator}>
                <CircularProgress size={60}/>
            </div>
        </div>
        :
        null
)

const mapStateToProps = state => ({
    isLoading: state.loading.isLoading
})

export default connect(
    mapStateToProps
)(LoadingIndicator)
