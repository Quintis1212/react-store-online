import React, {Component} from 'react';
import {FaShoppingCart} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

class Navbar extends Component {
    state = {
        items: ''
    }
    static getDerivedStateFromProps(props) {
        // console.log(props.data)
        const stateUpdate = {
            items: props.data

        }

        return stateUpdate;
    }
    render() {
        let numberOfItems = '';
        this
            .state
            .items
            .staticData
            .forEach(el => {
                return el.isAdded === true
                    ? numberOfItems++
                    : null
            })
        return (
            <nav className="nav-menu">
                <NavLink to='/' className="nav-link">Shop
                </NavLink >
                <NavLink to='/basket' className="nav-link basket">Basket<FaShoppingCart/>{numberOfItems < 1
                        ? null
                        : <h6 className="items-in-basket">
                            {numberOfItems}
                        </h6>}</NavLink >
            </nav>
        )
    }
}

export default connect(state => ({data: state}), dispatch => ({
    //  addToBasket:(id)=>{   dispatch({type:'ADD-TO-BASKET',id})  },

}))(Navbar)