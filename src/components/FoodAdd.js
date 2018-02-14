import React, {Component} from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
import {Link} from 'react-router-dom'

import textCategories from './categories'
import {database} from '../firebase'

class FoodAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: null,
            catSelect: "Warzywa",
            name: null,
            category: null,
            energy: null,
            protein: null,
            fats: null,
            carbo: null,
            sug: null,
            photo: null,
            msg: "",
        }
    }

    getData = () => {
        fetch(
            'https://jfddl3-fitcode.firebaseio.com/products/food/.json',
        )
            .then(response => response.json())
            .then(parsedJSONData => {
                this.setState({
                    data: parsedJSONData
                })
            })
    }

    componentWillMount() {
        this.getData()
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const newFood = {
            name: this.state.name,
            category: this.state.catSelect,
            energy: this.state.energy,
            protein: this.state.protein,
            fat: this.state.fats,
            carbohydrate: this.state.carbo,
            sugars: this.state.sug,
            photo: this.state.photo,
        }

        if (!/([A-Za-z0-9])\w+/.test(newFood.name)
            ||
            !/^([0-9])+$/.test(newFood.energy)
            ||
            !/^([0-9])+$/.test(newFood.protein)
            ||
            !/^([0-9])+$/.test(newFood.fat)
            ||
            !/^([0-9])+$/.test(newFood.carbohydrate)
            ||
            !/^([0-9])+$/.test(newFood.sugars)
            ||
            !/([A-Za-z0-9])\w+/.test(newFood.photo)
        ) {
            this.setState({
                open: true,
                msg: "Ups, coś poszło nie tak.",
            })

            return
        }

        console.log(newFood)

        database.ref('products/food').push(newFood)
            .then(() => {
                    this.setState({
                        open: true,
                        msg: "Dodano produkt",
                    })
                    this.getData()
                }
            )
            .catch((error) => alert('Ups, cos sie popsuło'))
    }

    handleTextChange = (event, name) => {
        const newState = {}
        newState[name] = event.target.value
        this.setState(newState)
    }

    handleCatSelect = (event, index, value) => this.setState({catSelect: value})

    handleRequestClose = () => {
        this.setState({
            open: false,
        })
    }

    render() {
        return (
            <Paper
                style={{margin: 20, padding: 20}}
                zDepth={2}
            >
                <form onSubmit={this.handleSubmit}>
                    {
                        textCategories.map(cat => (
                            <TextField
                                hintText={cat.hintText}
                                floatingLabelText={cat.floatingLabelText}
                                style={{display: 'block'}}
                                key={cat.floatingLabelText}
                                name={cat.name}
                                onChange={(e) => this.handleTextChange(e, cat.name)}
                                fullWidth={true}
                            />
                        ))
                    }

                    <SelectField
                        floatingLabelText="Kategorie"
                        value={this.state.catSelect}
                        onChange={this.handleCatSelect}
                        fullWidth={true}
                    >
                        <MenuItem value={'Warzywa'} primaryText="Warzywa"/>
                        <MenuItem value={'Owoce'} primaryText="Owoce"/>
                        <MenuItem value={'Mięso'} primaryText="Mięso"/>
                        <MenuItem value={'Ryby'} primaryText="Ryby"/>
                        <MenuItem value={'Nabiał'} primaryText="Nabiał"/>
                        <MenuItem value={'Vege-Food'} primaryText="Vege-Food"/>
                    </SelectField>

                    <RaisedButton label="Dodaj" primary={true} type="submit" fullWidth={true}/>
                    <br/><br/>
                    <Link to="/food-list">
                        <RaisedButton label="Lista produktów" primary={true} fullWidth={true} onClick={this.props.butt}/>
                    </Link>

                    <Snackbar
                        open={this.state.open}
                        message={this.state.msg}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </form>
            </Paper>
        )
    }

}

export default FoodAdd;