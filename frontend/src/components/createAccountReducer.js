import {CREATE_ACCOUNT_REQUEST} from '../../actions/actionTypes'

const createAccountReducer = (state={}, action) => {
    switch(action.type) {
        case CREATE_ACCOUNT_REQUEST:
            return {
                loading: true,
            };
            case CREATE_ACCOUNT_SUCCESS:
                return {
                    account: action.payload,
                };
                case CREATE_ACCOUNT_FAIL:
                    return {
                        loading: false,
                        error: action.payload,
                    };
                    default:
                        return state;
    }
};

export {createAccountReducer};
