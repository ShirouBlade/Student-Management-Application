import {
    FETCH_STUDENTDATA_FAIL,
    FETCH_STUDENTDATA_REQUEST,
    FETCH_STUDENTDATA_SUCCESS,
  } from '../../actions/DataTypes';
  
  const studentlistreducer = (state = [], action) => {
    switch (action.type) {
      case FETCH_STUDENTDATA_REQUEST:
        return {
          loading: true,
        };
      case FETCH_STUDENTDATA_SUCCESS:
        return {
          books: action.payload,
          loading: false,
        };
      case FETCH_STUDENTDATA_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default studentlistreducer;