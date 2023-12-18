import {
    FETCH_PROFESSORDATA_FAIL,
    FETCH_PROFESSORDATA_REQUEST,
    FETCH_PROFESSORDATA_SUCCESS,
  } from '../../actions/datatypes';
  
  const professorListReducer = (state = [], action) => {
    switch (action.type) {
      case FETCH_PROFESSORDATA_REQUEST:
        return {
          loading: true,
        };
      case FETCH_PROFESSORDATA_SUCCESS:
        return {
          books: action.payload,
          loading: false,
        };
      case FETCH_PROFESSORDATA_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default professorListReducer;
