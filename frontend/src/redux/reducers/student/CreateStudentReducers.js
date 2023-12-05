import {
    
    CREATE_STUDENTDATA_REQUEST, 
    CREATE_STUDENTDATA_FAIL, 
    CREATE_STUDENTDATA_SUCCESS 

} from '../../actions/DataTypes';

const CreateStudentReducers = (state={}, action) => {
    switch(action.type){
        case CREATE_STUDENTDATA_REQUEST:
            return{
                loading: true,
            };
        case CREATE_STUDENTDATA_SUCCESS:
            return{
                studentdata: action.payload,
            };
        case CREATE_STUDENTDATA_FAIL: 
            return{
                loading: false, 
                error: action.payload, 
            };

        default: 
            return state;
    };
};
export{CreateStudentReducers};