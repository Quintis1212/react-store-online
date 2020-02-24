import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Magazine from './pages/Magazine';
import Basket from './pages/Basket';
import ProductItem from './pages/ProductItem';
import {  Switch,  Route, Redirect } from "react-router-dom";
import Error from './components/Error';
import { Provider } from 'react-redux';
import store from './reducers/reducer'



function App() {
//    
  return (
    <Provider store={store}>
    <div className="App">
    <Navbar/>
    <Switch>
      
    <Route exact path="/" component={Magazine}  />
    <Route exact path="/basket" component={Basket}  />
    <Route exact path="/item/:slug" component={ProductItem}  />
    <Redirect exact from="" to="/" />
    <Route  component={Error}  />
    
    </Switch>
    </div>
    </Provider>
  );
}

export default App;
