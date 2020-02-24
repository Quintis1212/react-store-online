import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';
import { connect } from 'react-redux';

 class ProductItem extends Component {

    state= {
        data:''
    }

    static getDerivedStateFromProps(props, state) {
        //  console.log(props , state)
        let url = props.location.pathname.replace('/item/', '');
        let data = props.data.data;
        data = data.find(el=>{
           return el.id === url
        })

        return {data:data};
      }

    basketHandler=(id)=>{
        this.props.addToBasket(id)
    }
    
    render() {
      
        return (
            <div className="product-page">
                <ul  key={this.state.data.id}>
                <li>For {this.state.data.gender}</li>
                <li><img src={"https:"+this.state.data.img} alt="clothes"/></li>
                <li>{this.state.data.type}</li>
                <li>Price {this.state.data.price} $</li>
                <li>Brand {this.state.data.brand}</li>
                <li><p>{this.state.data.description}</p></li>
                <li><button onClick={()=>this.basketHandler(this.state.data.id)} disabled={this.state.data.isAdded}>{this.state.data.isAdded?  ('Added to basket') : ('Add to basket') }</button></li>
                </ul>
                <NavLink  to='/'   className="nav-link" >Back to shop </NavLink >
            </div>
        )
    }
}

export default connect(state=>({
    data:state
}), 
   dispatch=>({
    addToBasket:(id)=>{
        dispatch({type:'ADD-TO-BASKET',id})
       },
   })
)(ProductItem)
