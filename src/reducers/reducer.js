import {createStore, applyMiddleware} from 'redux';
import obj from '../data'
import logger from 'redux-logger';




function maxReducer(state=obj, action) {
    switch(action.type){
        case 'SET-DATA':


            let extendData = action.data.map(el=>{
               return {...el.fields,img:el.fields.img.fields.file.url,description:el.fields.description.content[0].content[0].value}
            })
            console.log(extendData)

            const initialPricesExtend = extendData.map(el => el.price);

            return {
                brandData:state.staticData,
                minPrice: Math.min(...initialPricesExtend), 
                maxPrice: Math.max(...initialPricesExtend),
                data:state.staticData,
                selectedValue : 'All',
                id:Math.random(),
                staticData:extendData,
                loaded:true
            }
        case 'GET-DATA':
            const initialPrices = state.staticData.map(el => el.price);


            return {
                brandData:state.staticData,
                minPrice: Math.min(...initialPrices), 
                maxPrice: Math.max(...initialPrices),
                staticData: state.staticData,
                data:state.staticData,
                selectedValue : 'All',
                id:Math.random(),
                loaded:true
       
            };

        case 'REMOVE-FROM-BASKET':
            let removeData = state.data.map((el) => el.id !== action.id ? el : ({...el, isAdded: false}));
            let removeUpdatedData = state.staticData.map((el) => el.id !== action.id ? el : ({...el, isAdded: false}));
            let updatedState = {
                ...state,
                data: removeData,
                staticData:removeUpdatedData,
                priceFilteredData:removeData,
            }
            console.log(updatedState)
            return updatedState
        case 'ITEM-QUANTITY':
            console.log(action.val , action.id)
            let val = action.val;
            if (val === "+") {
                let removeData = state.data.map((el) =>{
                if (el.id === action.id) {
                    let quan = el.quantity;
                    quan=quan+1;
                    return {...el, quantity:quan}
                }else {
                    return {...el}
                }});
            
                let removeUpdatedData = state.staticData.map((el) => {
                    if (el.id === action.id) {
                        let quan = el.quantity;
                        quan=quan+1;
                        return {...el, quantity:quan}
                    } else {
                        return {...el}
                    } } );
                let updatedState = {
                    ...state,
                    data: removeData,
                    staticData:removeUpdatedData,
                    priceFilteredData:removeData,
                }
                console.log(updatedState)
                return updatedState

            }
            if (val === "-") {
                let removeData = state.data.map((el) =>{
                    if (el.id === action.id) {
                        let quan = el.quantity;
                        quan=quan-1;
                       return quan === 0 ? {...el, isAdded:false,quantity:1}: {...el, quantity:quan}
                    }else {
                        return {...el}
                    }});
                
                    let removeUpdatedData = state.staticData.map((el) => {
                        if (el.id === action.id) {
                            let quan = el.quantity;
                            quan=quan-1;
                           return quan === 0 ? {...el, isAdded:false,quantity:1}: {...el, quantity:quan}
                        } else {
                            return {...el}
                        } } );
                    let updatedState = {
                        ...state,
                        data: removeData,
                        staticData:removeUpdatedData,
                        priceFilteredData:removeData,
                    }
                    console.log(updatedState)
                    return updatedState
            }
            return state
            case 'CLEAR-BASKET':
                let newDataCleared = state.data.map((el) => { return {...el,isAdded: false}});
                let staticUpdatedDataCleared = state.staticData.map((el) =>{ return {...el,isAdded: false}});
                let newStateCleared = {
                    ...state,
                    data: newDataCleared,
                    notMutableData: state.staticData,
                    staticData:staticUpdatedDataCleared,
                    priceFilteredData:newDataCleared,
                }
    
                return newStateCleared;
            case 'FILTER':
                 const filterChanges = action.filters;
                 const currentFilters = state.filters;

                 const filters = {
                     ...currentFilters,
                     ...filterChanges
                 };

                 // filters = { price: {min: 11, max: 22}, brand: "Adidas", gender: null } 
                 const filterPredicateFactories = {
                     price: ({min, max}) => (el) => el.price >= min && el.price <= max,
                     brand: (brand) => (el) => el.brand === brand,
                     gender: (gender) => (el) => el.gender === gender,
                     type: (type) => (el) => el.type === type
                 }

                
                 const  brandData = state.staticData.filter(el=>
                    (!filters.gender || el.gender === filters.gender) && (!filters.type || el.type === filters.type)     
                 );

                 console.log(brandData)

                 const predicates = Object.keys(filters).map(filterKey => !filters[filterKey] ? null : filterPredicateFactories[filterKey](filters[filterKey]))
                                        .filter(p => p);

                 const newFilteredData = predicates.reduce((filteredData, predicate) => filteredData.filter(predicate), state.staticData);

                 const prices = newFilteredData.map(el => el.price);
                 const minMax = !filters.price ? {minPrice: Math.min(...prices), maxPrice: Math.max(...prices) } : {};

                 return {
                     ...state,
                     ...minMax,
                     data: newFilteredData,
                     filters,
                     brandData:brandData
                 }
            case 'ADD-TO-BASKET':

            let newData = state.data.map((el) => el.id !== action.id ? el : ({...el, isAdded: true}));
            let staticUpdatedData = state.staticData.map((el) => el.id !== action.id ? el : ({...el, isAdded: true}));
            let newState = {
                ...state,
                data: newData,
                notMutableData: state.staticData,
                staticData:staticUpdatedData,
                priceFilteredData:newData,
            }

            return newState;
        default:
            return state
    }

  }


  const store = createStore(maxReducer, applyMiddleware(logger));  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  

  
  store.dispatch({type:'GET-DATA'})
 
  export default store










