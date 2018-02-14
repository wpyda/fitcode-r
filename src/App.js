import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import FoodList from './components/FoodList'
import FoodAdd from './components/FoodAdd'
import Dashboard from './components/Dashboard'
import Favourites from './components/Favourites'
import AppBar from './components/AppBar'
import SideBar from './components/SideBar'
import UserBar from './components/UserBar'
import MealPlan from './components/MealPlan'

import './index.css'
import FoodDetails from "./components/FoodDetails";
import ShareButton from './components/ShareButton'

import LoadingIndicator from './components/LoadingIndicator'
import Auth from './components/Auth'
import {Provider} from 'react-redux'
import store from './store'


class App extends Component {

    state = {
        isDrawerOpen: false,
        menuElements: [
            ['Home','/'],
            ['Lista produktów','/food-list'],
            ['Ulubione produkty','/food-favourites'],
            ['Plan posiłków','/meal-plan'],
            ['Dodaj produkt','/food-add']

        ]
    }

    drawerToggle = () => {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen
        })
    }

    render() {
        return (
            <Provider store={store}>
            <MuiThemeProvider>
                <Auth>
                <BrowserRouter>
                    <div>
                        <LoadingIndicator />
                        <AppBar butt={this.drawerToggle}/>
                        <UserBar />
                        <SideBar
                            isOpen={this.state.isDrawerOpen}
                            butt={this.drawerToggle}
                            menuElements={this.state.menuElements}/>

                        <Route path="/" exact={true} component={Dashboard}/>
                        <Route path="/food-list" component={FoodList}/>
                        <Route path="/food-favourites" component={Favourites}/>
                        <Route path="/food-add" component={FoodAdd}/>
                        <Route path="/food-details/:uid/" component={FoodDetails}/>
                        <Route path="/meal-plan/" component={MealPlan}/>

                        <ShareButton />
                    </div>
                </BrowserRouter>
                </Auth>
            </MuiThemeProvider>
            </Provider>

        );
    }
}

export default App;
