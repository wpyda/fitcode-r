import React from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MealAdd from './MealAdd'
import  {RadialBarChart, RadialBar} from 'recharts'
import Divider from 'material-ui/Divider';

import {connect} from 'react-redux'
import {database} from "../firebase";



class FoodDetails extends React.Component {
    state = {
        id : this.props.match.params.uid,
    }


    addUidToFavList = () => {
        const favArr = this.props.favData.concat(this.state.id)
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
            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                {
                    this.props.foodData && this.props.foodData
                        .filter(([key, product]) => this.state.id === key)
                        .map(
                            ([key, product]) =>
                                <div key={key}>
                                    <h2>Nazwa : {product.name.toUpperCase()}</h2>
                                    <p>Kategoria: {product.category}</p>
                                    <p>Kalorie: {product.energy}</p>
                                    <p>Proteiny: {product.protein}</p>
                                    <p>Tluszcz: {product.fat}</p>
                                    <p>Weglowodany: {product.carbohydrate}</p>
                                    <p>Cukry: {product.sugars}</p>
                                    <p style={{textAlign:'center'}}>
                                        <img
                                            src={product.photo === undefined ? `https://jfddl3-fitcode.firebaseapp.com/img/noimage.png` : `${product.photo}`}
                                            alt=""
                                            style={{width:'60vw', height:'auto', display:'inline-block'}}
                                        />
                                    </p>
                                    <div style={{overflow:'hidden', textAlign:'center'}}>
                                        <RadialBarChart width={300} height={160} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={20} data={[
                                            {name: 'Sugars', uv: +product.sugars, fill: '#83a6ed'},
                                            {name: 'Proteins', uv: +product.protein, fill: '#8dd1e1'},
                                            {name: 'Fat', uv: +product.fat, fill: '#82ca9d'},
                                            {name: 'Carbo', uv: +product.carbohydrate,  fill: '#a4de6c'},
                                            {name: 'Energy', uv: +product.energy,  fill: '#d0ed57'},
                                        ]} startAngle={180} endAngle={0} style={{display:'inline-block'}}>
                                            <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv'/>
                                        </RadialBarChart>
                                        <div style={{margin:'20px 0 20px 0', fontSize:'14px', color:'#777'}}>
                                            <span style={{borderBottom: '5px solid #d0ed57', display:'inline-block', marginTop: 5, fontWeight:'bold'}}>kcal: {product.energy}</span>&nbsp;&nbsp;
                                            <span style={{borderBottom: '5px solid #a4de6c'}}>carbo: {product.carbohydrate}</span>&nbsp;&nbsp;
                                            <span style={{borderBottom: '5px solid #82ca9d'}}>fat: {product.fat}</span>&nbsp;&nbsp;
                                            <span style={{borderBottom: '5px solid #8dd1e1'}}>proteins: {product.protein}</span>&nbsp;&nbsp;
                                            <span style={{borderBottom: '5px solid #83a6ed'}}>sugars: {product.sugars}</span>
                                        </div>
                                    </div>

                                    <Divider style={{margin:'0 0 20px 0'}} />
                                    <RaisedButton
                                        label="powrot do listy" primary={true}
                                        fullWidth={true}
                                        style={{marginBottom:20}}
                                        onClick={this.props.history.goBack}

                                    />
                                    {
                                        this.props.favData && this.props.favData.indexOf(key) === -1 ?
                                            <RaisedButton label="+ ulubione" primary={true}
                                                          fullWidth={true}
                                                          style={{marginBottom:20}}
                                                          onClick={this.addUidToFavList}
                                            />
                                            :
                                            <RaisedButton label="- ulubione" default={true}
                                                          fullWidth={true}
                                                          style={{marginBottom:20}}
                                                          onClick={() => this.removeUidFromFavList(key)}
                                            />
                                    }
                                    <MealAdd foodId={this.state.id} btnType={"butt"} />
                                    <Link to={'/meal-plan'}>
                                    <RaisedButton
                                        label="Zobacz plan posilkow" primary={true}
                                        fullWidth={true}
                                        style={{marginBottom:20}}
                                    />
                                    </Link>
                                </div>
                        )
                }
            </Paper>
        )
    }
}

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    favData: state.fav.favData,
    uuid: state.auth.user.uid
})


const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FoodDetails)