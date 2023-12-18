import {
    
    CREATE_PROFESSORDATA_REQUEST, 
    CREATE_PROFESSORDATA_FAIL, 
    CREATE_PROFESSORDATA_SUCCESS 

} from '../../actions/datatypes';

const createProfessorReducers = (state={}, action) => {
    switch(action.type){
        case CREATE_PROFESSORDATA_REQUEST:
            return{
                loading: true,
            };
        case CREATE_PROFESSORDATA_SUCCESS:
            return{
                professordata: action.payload,
            };
        case CREATE_PROFESSORDATA_FAIL: 
            return{
                loading: false, 
                error: action.payload, 
            };

        default: 
            return state;
    };
};
export{createProfessorReducers};
