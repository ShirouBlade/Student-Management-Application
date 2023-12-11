import {CREATE_BOOK_REQUEST} from '../actionTypes';

const createBookAction = bookData => {
    return async dispatch => {
    try {
            dispatch({
                type: CREATE_BOOK_REQUEST,
            });

            const config = {
                'Content-Type': 'application/json',
            };
            const {data} = await axios.post('api/books', bookData, config);

            dispatch({
                type: CREATE_BOOK_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CREATE_BOOK_FAIL,
                payload: error.reponse && error.response.data.message
            });
        }
        
    };
};

export {createBookAction};
