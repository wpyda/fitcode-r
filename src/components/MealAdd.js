import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
//import IconButton from 'material-ui/IconButton';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import moment from 'moment'

import {connect} from 'react-redux'
import {database} from "../firebase";


const styles = {
    addButt: {
        display: "block",
        position: "absolute",
        right: 60,
        top: 12,
        height: 24,
        width: 24
    }
}

class MealAdd extends React.Component {
    state = {
        open: false,
        mealSelect: 'sniadanie',
        mealDate: null
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleMealSelect = (event, index, value) => this.setState({mealSelect: value})

    handleMealDate = (n, date) => this.setState({mealDate: moment(date).format("YYYYMMDD")})

    handleSubmit = (foodId) => {
        if (this.state.mealDate) {
            let mealExists = false
            let mealArr = []
            if (this.props.meals[this.state.mealDate] && this.props.meals[this.state.mealDate][this.state.mealSelect]) {
                mealExists = !!this.props.meals[this.state.mealDate][this.state.mealSelect].find(el => el === foodId)
                if (mealExists){
                    return
                    //TODO prevent same food add to same meal at the same date - DONE to FIX
                }else{
                    mealArr = this.props.meals[this.state.mealDate][this.state.mealSelect].concat(foodId)
                }
            } else {
                mealArr = [foodId]
            }

            database.ref(`/users/${this.props.uuid}/meals/${this.state.mealDate}/${this.state.mealSelect}`)
                .set(mealArr)

            this.setState({open: false, mealDate: null});
        }
    }

    render() {
        //console.log(this.props.meals[this.state.mealDate])
        const actions = [
            <FlatButton
                label="Anuluj"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Dodaj"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.handleSubmit(this.props.foodId)}
            />,
        ];


        return (
            <div>
                {
                    this.props.btnType === 'butt' ?
                        <RaisedButton
                            label="Dodaj do posilku"
                            primary={true}
                            onClick={this.handleOpen}
                            fullWidth={true}
                            style={{marginBottom: 20}}
                        />
                        :
                        <div //div instead of proper IconButton
                            //tooltip="Dodaj do posilku"
                            style={styles.addButt}
                            onClick={this.handleOpen}>
                            <ActionDateRange color={"#777"}/>
                        </div>
                }
                <Dialog
                    title="Dodaj jedzonko do posilku"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <List>
                        {
                            this.props.food && this.props.food
                                .filter(([key, product]) => this.props.foodId === key)
                                .map(([key, product]) =>
                                    <ListItem
                                        key={key}
                                        primaryText={product.name}
                                        secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                        leftAvatar={<Avatar src={product.photo === undefined ? `https://jfddl3-fitcode.firebaseapp.com/img/noimage.png` : `${product.photo}`}/>}
                                        style={{backgroundColor: '#eee'}}
                                    />
                                )
                        }
                    </List>
                    <div>
                        <DatePicker
                            hintText="Wybierz dzien"
                            onChange={this.handleMealDate}
                        />
                        <SelectField
                            floatingLabelText="Twoj posilek"
                            value={this.state.mealSelect}
                            onChange={this.handleMealSelect}
                        >
                            <MenuItem value={'sniadanie'} primaryText="Sniadanie"/>
                            <MenuItem value={'sniadanie2'} primaryText="Drugie sniadanie"/>
                            <MenuItem value={'obiad'} primaryText="Obiad"/>
                            <MenuItem value={'podwieczorek'} primaryText="Podwieczorek"/>
                            <MenuItem value={'kolacja'} primaryText="Kolacja"/>
                        </SelectField>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    uuid: state.auth.user.uid,
    meals: state.meals.mealsData,
    food: state.products.productsData
})


const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealAdd)
