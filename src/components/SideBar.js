import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

class SideBar extends Component {
    render() {
        return (
            <Drawer
                docked={false}
                width={250}
                open={this.props.isOpen}
                onRequestChange={this.props.butt}
            >
                {
                    this.props.menuElements
                        .map((element) => (
                            <Link to={element[1]} style={{textDecoration: 'none'}} key={element[1]}>
                                <MenuItem
                                    onClick={this.props.butt}
                                >
                                    {element[0]}
                                </MenuItem>
                            </Link>
                        ))
                }
            </Drawer>
        )
    }
}

export default SideBar