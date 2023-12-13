import {CREATE_ACCOUNT_REQUEST} from '../actionTypes';

const createAccountAction = accountData => {
    return async dispatch => {
    try {
            dispatch({
                type: CREATE_ACCOUNT_REQUEST,
            });

            const config = {
                'Content-Type': 'application/json',
            };
            const {data} = await axios.post('api/books', bookData, config);

            dispatch({
                type: CREATE_ACCOUNT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CREATE_ACCOUNT_FAIL,
                payload: error.reponse && error.response.data.message
            });
        }
        
    };
};

export {createAccountAction};
