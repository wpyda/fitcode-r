import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie} from 'recharts';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'
import Paper from 'material-ui/Paper';
import {Grid, Row, Col} from 'react-flexbox-grid'

import {connect} from "react-redux";


const style = {
    margin: 12,
};

class Dashboard extends Component {

        actualNumberOFusers = () => ( this.props.usersCount ?
        this.props.usersCount.length
        :
        null)


    render() {
        let foodCount = [0, 0, 0, 0, 0, 0];

        const lineChartData = [
            {name: 'Tydzień:', użytkownicy: 0},
            {name: '1', użytkownicy: 1},
            {name: '2', użytkownicy: 2},
            {name: '3', użytkownicy: 4},
            {name: '4', użytkownicy: this.actualNumberOFusers()}
    ];

        return (
            <div
                style={{textAlign: "center"}}
            >

                <Paper style={{margin: 20, padding: 20}}
                       zDepth={2}>
                    <h1>
                        Witaj w aplikacji FitCode!
                        <br/><br/>
                        Bądź FIT razem z nami!
                    </h1>
                    <h2>W naszej aplikacji możesz sprawdzać produkty żywieniowe, dodawać nowe oraz tworzyć swoje własne
                        posiłki!<br/> Zacznij już dziś.</h2>
                    <Link to="/food-list">
                        <RaisedButton label="Zobacz produkty!" primary={true} style={style}/>
                    </Link>
                    <Link to="/food-add">
                        <RaisedButton label="Dodaj produkt!" primary={true} style={style}/>
                    </Link>
                </Paper>


                <Paper
                    style={{margin: 20, padding: 20}}
                    zDepth={2}
                >
                    <Grid>
                        <Row>
                            <Col xs={12} md={6} lg={4}>

                                <h3> Posiadamy bogatą bazę produktów: </h3>

                                <h3>
                                    {
                                        this.props.foodData && this.props.foodData
                                            .forEach(([key, product]) => {
                                                switch (product.category) {
                                                    case 'Warzywa' :
                                                        foodCount[0] += 1;
                                                        break;
                                                    case 'Owoce' :
                                                        foodCount[1] += 1;
                                                        break;
                                                    case 'Mięso' :
                                                        foodCount[2] += 1;
                                                        break;
                                                    case 'Ryby' :
                                                        foodCount[3] += 1;
                                                        break;
                                                    case 'Nabiał' :
                                                        foodCount[4] += 1;
                                                        break;
                                                    case 'Vege-Food' :
                                                        foodCount[5] += 1;
                                                        break;
                                                    default :
                                                        return;
                                                }
                                            })
                                    }

                                    <span style={{color: "orange"}}>Warzywa: {foodCount[0]} szt., </span>
                                    <span style={{color: "red"}}>Owoce: {foodCount[1]} szt., </span>
                                    <span style={{color: "grey"}}>Mięso: {foodCount[2]} szt., </span>
                                    <span style={{color: "blue"}}>Ryby: {foodCount[3]} szt., </span>
                                    <span style={{color: "pink"}}>Nabiał: {foodCount[4]} szt., </span>
                                    <span style={{color: "green"}}>Vege-Food: {foodCount[5]} szt. </span>
                                    <br/>

                                </h3>

                                <PieChart
                                    style={{margin: '0 auto'}}
                                    width={window.innerWidth < 500 ? 150 : 400}
                                    height={window.innerHeight < 500 ? 150 : 400}

                                >
                                    <Pie
                                        data={[{
                                            value: foodCount[0],
                                            name: 'warzywa',
                                            fill: 'orange'
                                        },
                                            {
                                                value: foodCount[1],
                                                name: 'owoce',
                                                fill: 'red'
                                            },
                                            {
                                                value: foodCount[2],
                                                name: 'mięso',
                                                fill: 'grey'
                                            },
                                            {
                                                value: foodCount[3],
                                                name: 'Ryby',
                                                fill: 'blue'
                                            },
                                            {
                                                value: foodCount[4],
                                                name: 'nabiał',
                                                fill: 'pink'
                                            },
                                            {
                                                value: foodCount[5],
                                                name: 'Vege',
                                                fill: 'green'
                                            }]}
                                        dataKey="value"
                                        nameKey="name"
                                        fill="#8884d8"

                                        labelLine={true}
                                    />
                                </PieChart>
                                <h3>Łącznie: {foodCount.reduce((reducer, element) => {
                                    return reducer += element
                                }, 0)} szt.</h3>
                            </Col>
                            <Col xs={12} md={6} lg={4}>

                                <h3> Aktualna liczba użytkowników: {
                                    this.actualNumberOFusers()
                                }
                                </h3>
                                <h3>Ilość użytkowników korzystających z naszej aplikacji w ujeciu tygodniowym:</h3>
                                <LineChart
                                    style={{margin: '0 auto'}}
                                    width={window.innerWidth < 500 ? 150 : 400}
                                    height={window.innerHeight < 500 ? 150 : 400}
                                    data={lineChartData}
                                    margin={{top: 5, right: 30, left: 10, bottom: 5}}>
                                    <XAxis/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip datakey="uzytkownicy"/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="użytkownicy" stroke="#8884d8" activeDot={{r: 5}}/>

                                </LineChart>
                            </Col>
                        </Row>
                    </Grid>
                </Paper>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    foodData: state.products.productsData,
    usersCount: state.dashboard.usersCount
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)