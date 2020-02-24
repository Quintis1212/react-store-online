import React, { Component } from 'react';
import { connect } from 'react-redux';



class Basket extends Component {
    state = {
        items:null,
        modal:false
    }
    static getDerivedStateFromProps(props,state) {
 
        let addedItems = [];
        props.data.staticData.forEach(el=>{
            return  el.isAdded === true ? addedItems.push({...el}) : null
          })
        const stateUpdate = {
            items:addedItems,
            id:props.data.id

          }
  
          return stateUpdate;
      }
    quantityHandler=(e,key)=>{
        let val = e.target.value
          this.props.changeQuantiy(val,key)
        }
    clearBasketHandler = ()=> {
        this.props.clearBasket()
    }
    render() {

        let total = 0;
        this.state.items.forEach(el=>{
            return total= total + el.price*el.quantity
        })
         return (
            <div className="basket">
                              <form action="https://formspree.io/mlejjgdr" method="POST">

        {this.state.items ? this.state.items.map(el=>{
                            let key = el.id
                            return (
      
                                <ul className="basket-item" key={key}>
                                    <li>For {el.gender}</li>
                                    <img src={"https:"+el.img} alt="clothes" /> 
                                    <li>{el.type}</li>
                                    <li>Price {el.price} $</li>
                                    <li>Brand {el.brand}</li>
                                    <li onClick={(e)=>this.quantityHandler(e,key)}>Quantity <div><button type="button" value="+">+</button>{el.quantity}<button type="button" value="-">-</button></div> </li>
                                    <li><input className="order-info" type="text" name="order" defaultValue={`${el.gender}+${el.type}+${el.price}+${el.brand}+${el.quantity}`}/></li>
                                </ul>
                            )
                 }) : null  }
                          <h2> you choose  {  this.state.items.length < 1 ? ('no one'):this.state.items.length } item(s){  this.state.items.length < 1 ? null : ` on price ${total} $`} </h2>
        {  this.state.items.length < 1 ? null :  (
        <div className="basket-buttons">
        <button type="button" onClick={this.clearBasketHandler}>Clear a basket</button>   
        <input type="text" name="name" required placeholder="Your name"/>
        <input type="tel" id="phone" name="phone" required placeholder="Your phone number"/>
        <button type="submit">Send order</button>  
        </div>)}

        </form>
            </div>
        )
    }
}


export default connect(state=>({
    data:state
}), 
 dispatch=>({
     removeItemFromBasket:(id)=>{
      dispatch({type:'REMOVE-FROM-BASKET',id})
     },
     changeQuantiy:(val,id)=>{
        dispatch({type:'ITEM-QUANTITY',val,id})
     },
     clearBasket:()=>{
        dispatch({type:'CLEAR-BASKET'})
       },

 })

)(Basket)