import React, { Component } from 'react';
import { connect } from 'react-redux';
import Products from '../components/Products';
import Client from '../Contentful';




 class Magazine extends Component {
    state={
        loading:true,
        mansMenu:false,
        womanMenu:false,

    }

    componentDidMount(){
     
        if (this.props.data.staticData.length === 0) {
            Client.getEntries({
                content_type: 'maxShop'
            })
            .then((response) =>{
    
               this.props.setData(response.items)
               this.props.getData()
    
            },      
            
            this.setState((state, props) => ({
                loading:false
              }))
     
            )
            .catch(console.error)
        }


    }
    


    mensMenuHandler=()=>{
        this.setState(state => ({
            mansMenu: !state.mansMenu
          }));
        
    }
    womanMenuHandler=()=>{
        this.setState(state => ({
            womanMenu: !state.womanMenu
          }));
    }


    handleClick=(e,gender)=>{
        let text = e.target.textContent
        this.props.getFiterItems(gender,text)
        if ( gender === 'man'){
            this.setState(state => ({
            itemMan: text,
            itemWoman: ''
          }));


        } else {
            this.setState(state => ({
                itemWoman: text,
                itemMan: ''
              }));
        }

    }
    seeAllFunc=()=>{
        this.setState(state => ({
            itemWoman: '',
            itemMan: ''
          }));
          this.props.seeAllDispatch()
    }

    render() {

        let mensMenu = []
        this.props.data.staticData.forEach((el,i)=>{
            if (el.gender=== 'man'  ) {
                mensMenu.push(el.type)
            }
            
        })
        mensMenu=[...new Set(mensMenu)]

        let womanMenu = []
        this.props.data.staticData.forEach((el,i)=>{
            if (el.gender=== 'woman'  ) {
                 womanMenu.push(el.type)
            }

        })
        womanMenu=[...new Set(womanMenu)]
        
        mensMenu =mensMenu.map(el=>{
            return <h5 onClick={(e)=>this.handleClick(e,'man')} className={this.state.itemMan===el?"menu-items-active": "menu-items"} key={el}>{el}</h5>
        })

        womanMenu= womanMenu.map(el=>{
            return <h5 onClick={(e)=>this.handleClick(e,'woman')} className={this.state.itemWoman===el?"menu-items-active": "menu-items"} key={el}>{el}</h5>
        })

        
        return (
                <>
               {this.props.data.staticData.length === 0? (<h2 className="loading-title">Loading items ...</h2>) : ( 
                <main className="magazine-main">
                <div className="filter-bar">
                <div className="menu-header">
                <h4 className="menu-title" onClick={this.seeAllFunc}>See all</h4>
                <h4 className="menu-title" onClick={this.mensMenuHandler}>Man</h4>
                {this.state.mansMenu?mensMenu: null}

                </div>
                <div className="menu-header">
                <h4 className="menu-title" onClick={this.womanMenuHandler}>Woman</h4>
                {this.state.womanMenu?womanMenu: null}

                </div>
                </div>
                <div className="product-list">
                    <Products data={this.props.data.data}/>

                </div>
                </main>
               )}
               </>
        )
    }
}

export default connect(state=>({
    data:state
}), 
   dispatch=>({
       getFiterItems:(gender,typeClothes)=>{
        dispatch({type:'FILTER', filters: { gender, type: typeClothes, price: null, brand: null}})
       },
       seeAllDispatch:()=>{
        dispatch({type:'GET-DATA'})
       },
       setData:(data)=>{
        dispatch({type:'SET-DATA',data})
       },
       getData:()=>{
        dispatch({type:'GET-DATA'})
       },
   })

)(Magazine)