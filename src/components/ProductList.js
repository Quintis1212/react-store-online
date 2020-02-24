import React, { Component } from 'react';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css"; 
import { NavLink  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ProductList extends Component {
    state = {
        currentPage: 1,
        data: [],
        id:1,
        filters: {}
      };

      static getDerivedStateFromProps(props, state) {
        // console.log(props , state)
        const prevData = state.data;
        const newData = props.dataList;

        if(newData.length === prevData.length &&  newData.every((newEl, i) => prevData[i].id === newEl.id)) {
          return {
            data: newData ? newData : []
          };
        }
          
        const stateUpdate = {
          totalSize: newData ?newData.length : 0,
          data: newData ? newData : [],
          currentPage: 1,
        }

        return stateUpdate;
      }
    
      changeCurrentPage = numPage => {
        this.setState({ currentPage: numPage });
      };
    
    basketHandler=(id)=>{
        this.props.addToBasket(id)
    }
    
      render() {
        const { data, currentPage, totalSize } = this.state;
        return (
            <>
          <div className="product-container"> 
                {data.length >= 1?  data.slice(currentPage*12-12,currentPage*12).map(el=>{
                      let slug = el.id
                      
                            return (
                                <ul className="product-item" key={el.id}>
                                    <li>For {el.gender}</li>
                                    <li><img src={"https:"+el.img} alt="clothes" /></li> 
                                    <li>{el.type}</li>
                                    <li>Price {el.price} $</li>
                                    <li>Brand {el.brand}</li>
                                    <li><button onClick={()=>this.basketHandler(el.id)} disabled={el.isAdded}>{el.isAdded?  ('Added to basket') : ('Add to basket') }</button></li>
                                    <li><NavLink  to={`/item/${slug}`}  className="nav-link" >More info ... </NavLink ></li>
                                </ul>
                            )
                 }) : <h2>No match items , please change serching options</h2>}
          </div>
          <div className="paginator">

            {this.props.dataList.length > 12 ?  ( 
              <Pagination   currentPage={currentPage}
              totalSize={totalSize} 
              sizePerPage={12} 
              changeCurrentPage={this.changeCurrentPage} 
              firstPageText="first" 
              lastPageText="last" 
              showFirstLastPages={true} 
              nextPageText="next"
              previousPageText="prev"
              />
            ) : null}

            </div>
              </>
        );
      }
}

export default connect(state=>({

}), 
 dispatch=>({
     addToBasket:(id)=>{
      dispatch({type:'ADD-TO-BASKET',id})
     },

 })

)(ProductList)

ProductList.propTypes = {
  dataList: PropTypes.array
};