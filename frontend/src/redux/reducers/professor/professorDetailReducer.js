import {
    PROFESSORPROFILE_DETAIL_FAIL,
    PROFESSORPROFILE_DETAIL_REQUEST,
    PROFESSORPROFILE_DETAIL_SUCCESS,
  } from '../../actions/datatypes';
  
  const professorDetailReducer = (state = {}, action) => {
    switch (action.type) {
      case PROFESSORPROFILE_DETAIL_REQUEST:
        return {
          loading: true,
        };
      case PROFESSORPROFILE_DETAIL_SUCCESS:
        return {
          book: action.payload,
          loading: false,
        };
      case PROFESSORPROFILE_DETAIL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default professorDetailReducer;
