import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment'
import MealRemove from './MealRemove'
import {RadialBarChart, RadialBar} from 'recharts'
import {BarChart, Bar} from 'recharts'
import Divider from 'material-ui/Divider';

import {connect} from 'react-redux'


class MealPlanList extends Component {

    calcMealSummary = (dataMeal, dataFood, date, mealType) => {
        const mealSum = {
            energy: 0,
            protein: 0,
            fat: 0,
            carbohydrate: 0,
            sugars: 0
        }

        dataMeal
        &&
        dataMeal[date][mealType]
        &&
        dataMeal[date][mealType]
            .map((el) => {
                return (
                    dataFood && dataFood
                        .filter(([key, product]) => el === key)
                        .forEach(([key, product]) => {
                                mealSum.energy += +product.energy
                                mealSum.protein += +product.protein
                                mealSum.fat += +product.fat
                                mealSum.carbohydrate += +product.carbohydrate
                                mealSum.sugars += +product.sugars
                            }
                        )
                )
            })
        return mealSum
    }

    render() {
        const sumEner = this.calcMealSummary(this.props.mealsData, this.props.foodData, this.props.mealDate, this.props.mealType)
        const data = [
            {name: 'Energy', uv: sumEner.energy, fill: '#d0ed57'},
            {name: 'Carbo', uv: sumEner.carbohydrate, fill: '#a4de6c'},
            {name: 'Fat', uv: sumEner.fat, fill: '#82ca9d'},
            {name: 'Proteins', uv: sumEner.protein, fill: '#8dd1e1'},
            {name: 'Sugars', uv: sumEner.sugars, fill: '#83a6ed'},
        ];

        return (
            <Paper style={{margin: 20, padding: 20}} zDepth={2}>
                <Subheader>
                    <span>{this.props.mealType}</span>
                </Subheader>
                {
                    this.props.mealsData
                    &&
                    this.props.mealsData[this.props.mealDate][this.props.mealType]
                    &&
                    this.props.mealsData[this.props.mealDate][this.props.mealType]
                        .map((el) => {
                            return (
                                <div key={el}>
                                    {
                                        this.props.foodData && this.props.foodData
                                            .filter(([key, product]) => el === key)
                                            .map(([key, product]) =>
                                                <ListItem
                                                    key={el}
                                                    primaryText={product.name}
                                                    secondaryText={`Kcal: ${product.energy} | ${product.category}`}
                                                    leftAvatar={<Avatar src={product.photo === undefined ? `https://jfddl3-fitcode.firebaseapp.com/img/noimage.png` : `${product.photo}`}/>}
                                                    rightIcon={<MealRemove foodId={el} mealType={this.props.mealType}
                                                                           mealDate={this.props.mealDate}/>}
                                                />
                                            )
                                    }
                                </div>
                            )
                        })
                }
                <div style={{textAlign: 'center', padding:'20px 0 20px 0'}}>
                    <Divider style={{margin:'0 0 35px 0'}} />
                        <BarChart width={150} height={40} data={data} style={{display:'inline-block'}}>
                            <Bar dataKey='uv' fill='#888888' background={{ fill: '#eee' }}/>
                        </BarChart>
                        <div style={{margin:'20px 0 0 0', fontSize:'14px', color:'#777'}}>
                            <span style={{borderBottom: '5px solid #d0ed57', display:'inline-block', marginTop: 5, fontWeight:'bold'}}>kcal: {sumEner.energy}</span>&nbsp;&nbsp;
                            <span style={{borderBottom: '5px solid #a4de6c'}}>carbo: {sumEner.carbohydrate}</span>&nbsp;&nbsp;
                            <span style={{borderBottom: '5px solid #82ca9d'}}>fat: {sumEner.fat}</span>&nbsp;&nbsp;
                            <span style={{borderBottom: '5px solid #8dd1e1'}}>proteins: {sumEner.protein}</span>&nbsp;&nbsp;
                            <span style={{borderBottom: '5px solid #83a6ed'}}>sugars: {sumEner.sugars}</span>
                        </div>
                </div>
            </Paper>
        )
    }
}


class MealPlan extends Component {
    state = {
        mealDate: null
    };

    calcDaySummary = (dataMeal, dataFood, date) => {
        const daySum = {
            energy: 0,
            protein: 0,
            fat: 0,
            carbohydrate: 0,
            sugars: 0
        }

        if(dataMeal && dataMeal[date])
        Object.values(dataMeal[date])
            .forEach((arr)=>{
                arr.map((el)=>{
                    return (
                        dataFood && dataFood
                            .filter(([key, product]) => el === key)
                            .forEach(([key, product]) => {
                                daySum.energy += +product.energy
                                daySum.protein += +product.protein
                                daySum.fat += +product.fat
                                daySum.carbohydrate += +product.carbohydrate
                                daySum.sugars += +product.sugars
                                }
                            )
                    )
                })
            })
        return daySum
    }

    handleMealDate = (n, date) => this.setState({mealDate: moment(date).format("YYYYMMDD")})

    render() {
        const sumDay = this.calcDaySummary(this.props.mealsData, this.props.foodData, this.state.mealDate)
        const dayData = [
            {name: 'Sugars', uv: sumDay.sugars, fill: '#83a6ed'},
            {name: 'Proteins', uv: sumDay.protein, fill: '#8dd1e1'},
            {name: 'Fat', uv: sumDay.fat, fill: '#82ca9d'},
            {name: 'Carbo', uv: sumDay.carbohydrate, fill: '#a4de6c'},
            {name: 'Energy', uv: sumDay.energy, fill: '#d0ed57'},
        ];

        return (
            <div>
                <Paper style={{margin: 20, padding: 20, textAlign:'center'}} zDepth={2}>
                    <DatePicker
                        hintText="Wybierz dzien"
                        onChange={this.handleMealDate}
                    />
                    <h4 style={{color:'#777'}}>lub</h4>
                    <Link to={'/food-list'}>
                        <RaisedButton
                            label="Dodaj produkt do posilku" primary={true}
                            fullWidth={false}
                            style={{marginBottom: 20}}
                        />
                    </Link>
                </Paper>

                <div>
                    {
                        this.state.mealDate && this.props.mealsData[this.state.mealDate] ?
                            <div>
                                <List>
                                    <MealPlanList
                                        mealType={"sniadanie"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"sniadanie2"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"obiad"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"podwieczorek"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>
                                <List>
                                    <MealPlanList
                                        mealType={"kolacja"}
                                        mealDate={this.state.mealDate}
                                        mealsData={this.props.mealsData}
                                        foodData={this.props.foodData}
                                    />
                                </List>

                                <Paper style={{margin: 20, padding: 20, overflow:'hidden'}} zDepth={2}>
                                    <h3 style={{color:'#777'}}>Bilans dzienny</h3>
                                    <div style={{textAlign:'center'}}>
                                        <RadialBarChart width={300} height={160} cx={150} cy={150} innerRadius={20} outerRadius={140}
                                                        barSize={20} data={dayData} startAngle={180} endAngle={0} style={{display:'inline-block'}}>
                                            <RadialBar minAngle={15} label={{fill: '#666', position: 'insideStart'}} background clockWise={true} dataKey='uv'/>
                                        </RadialBarChart>
                                    </div>
                                    <div style={{margin:'20px 0 20px 0', fontSize:'16px', color:'#777', textAlign:'center'}}>
                                        <span style={{borderBottom: '5px solid #d0ed57', display:'inline-block', marginTop: 5, fontWeight:'bold'}}>kcal: {sumDay.energy}</span>&nbsp;&nbsp;
                                        <span style={{borderBottom: '5px solid #a4de6c'}}>carbo: {sumDay.carbohydrate}</span>&nbsp;&nbsp;
                                        <span style={{borderBottom: '5px solid #82ca9d'}}>fat: {sumDay.fat}</span>&nbsp;&nbsp;
                                        <span style={{borderBottom: '5px solid #8dd1e1'}}>proteins: {sumDay.protein}</span>&nbsp;&nbsp;
                                        <span style={{borderBottom: '5px solid #83a6ed'}}>sugars: {sumDay.sugars}</span>
                                    </div>
                                </Paper>
                            </div>
                            :
                          null
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    foodData: state.products.productsData,
    mealsData: state.meals.mealsData
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MealPlan)