import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MealAdd from './MealAdd'

import {connect} from 'react-redux'
import {database} from "../firebase";

const styles = {
    favButt: {
        display: "block",
        position: "absolute",
        right: 24,
        top: 0,
        height: 24,
        width: 24
    }
}

class FoodList extends Component {
    state = {
        foodName: '',
        kcalSlider: 280,
        catSelect: 'all',
        favUid: null,
    }

    componentWillMount() {}


    handleFoodName = (event, value) => {
        this.setState({foodName: value});
    };

    handleKcalSlider = (event, value) => {
        this.setState({kcalSlider: value});
    };

    handleCatSelect = (event, index, value) => this.setState({catSelect: value})

    addUidToFavList = (keyId) => {
        const favArr = this.props.favData.concat(keyId)
        database.ref(`/users/${this.props.uuid}/favourites`)
            .set(favArr)
    }

    removeUidFromFavList = (keyId) => {
        const favArr = this.props.favData.filter(el => el !== keyId)
        database.ref(`/users/${this.props.uuid}/favourites`)
            .set(favArr)
    }

    render() {
        return (
            <div>

                <div>
                    <Card style={{margin: 20, padding: 20}} zDepth={2}>
                        <CardHeader
                            title="Szukaj..."
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            <TextField
                                floatingLabelText="Nazwa produktu"
                                fullWidth={true}
                                onChange={this.handleFoodName}
                            />
                            <Slider
                                style={{marginBottom: 0}}
                                min={0}
                                max={300}
                                step={10}
                                value={this.state.kcalSlider}
                                onChange={this.handleKcalSlider}
                            />
                            <div><span>{this.state.kcalSlider} kcal</span></div>
                            <SelectField
                                floatingLabelText="Kategorie"
                                value={this.state.catSelect}
                                onChange={this.handleCatSelect}
                            >
                                <MenuItem value={'all'} primaryText="Wszystkie" style={{color: "#BDBDBD"}}/>
                                <MenuItem value={'Warzywa'} primaryText="Warzywa"/>
                                <MenuItem value={'Owoce'} primaryText="Owoce"/>
                                <MenuItem value={'Mięso'} primaryText="Mięso"/>
                                <MenuItem value={'Ryby'} primaryText="Ryby"/>
                                <MenuItem value={'Nabiał'} primaryText="Nabiał"/>
                                <MenuItem value={'Vege-Food'} primaryText="Vege Food"/>
                            </SelectField>
                        </CardText>
                    </Card>
                </div>

                <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                    <List>
                        <Subheader>Lista produktów</Subheader>
                        {
                            this.props.foodData && this.props.foodData
                                .filter(([key, product]) =>
                                    product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.foodName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1
                                    ).filter(([key, product]) => this.state.catSelect === 'all' ? true : product.category === this.state.catSelect)
                                        .filter(([key, product]) => product.energy < this.state.kcalSlider)
                                        .map(
                                            ([key, product]) => (

                                                    <ListItem
                                                        key={key}
                                                        onClick={() => {this.props.history.push(`/food-details/${key}`)}}
                                                        primaryText={product.name}
                                                        secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                                        leftAvatar={<Avatar src={product.photo === undefined ? `https://jfddl3-fitcode.firebaseapp.com/img/noimage.png` : `${product.photo}`}/>}
                                                        rightIconButton={
                                                                this.props.favData && this.props.favData.indexOf(key) === -1 ?
                                                                    <IconButton>
                                                                        <MealAdd foodId={key} btnType={"ico"}/>
                                                                        <div //div instead of proper IconButton
                                                                            //tooltip="Dodaj do ulubionych"
                                                                            style={styles.favButt}
                                                                            onClick={() => this.addUidToFavList(key)}
                                                                        >
                                                                            <ActionFavoriteBorder color={"#777"} />
                                                                        </div>
                                                                    </IconButton>
                                                                :
                                                                    <IconButton>
                                                                        <MealAdd foodId={key} btnType={"ico"}/>
                                                                        <div //div instead of proper IconButton
                                                                            //tooltip="Usun z ulubionych"
                                                                            style={styles.favButt}
                                                                            onClick={() => this.removeUidFromFavList(key)}
                                                                        >
                                                                            <ActionFavorite color={"#777"} />
                                                                        </div>
                                                                    </IconButton>
                                                        }

                                                    />

                                            ))
                        }
                    </List>
                </Paper>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    favData: state.fav.favData,
    uuid: state.auth.user.uid
})

const mapDispatchToProps = dispatch => ({
    // getFoodData: () => dispatch(fetchProducts()),
    // getFavData: () => dispatch(fetchFav()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodList)