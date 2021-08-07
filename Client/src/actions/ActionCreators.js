import { GET_ITEMS , ADD_ITEMS ,ITEMS_LOADING } from "./types";
import axios from 'axios';


export const getItems = () => dispatch => {
    dispatch(setItemsLoading());

    axios.get('/items')            
    .then(res => dispatch({
        type:GET_ITEMS,
        payload: res.data
    }))
};


export const addItem = (item) => dispatch => {
    axios.post('/items' , item)
    .then(res => dispatch({
        type: ADD_ITEMS,
        payload: res.data
    }))
};

export const setItemsLoading = () => {                           
                                                                
    return {                             
        type: ITEMS_LOADING                                                                     
    };
};





