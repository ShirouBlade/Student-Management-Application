import {
    STUDENTPROFILE_DETAIL_FAIL,
    STUDENTPROFILE_DETAIL_REQUEST,
    STUDENTPROFILE_DETAIL_SUCCESS,
  } from '../../actions/DataTypes';
  
  const studentdetailreducer = (state = {}, action) => {
    switch (action.type) {
      case STUDENTPROFILE_DETAIL_REQUEST:
        return {
          loading: true,
        };
      case STUDENTPROFILE_DETAIL_SUCCESS:
        return {
          book: action.payload,
          loading: false,
        };
      case STUDENTPROFILE_DETAIL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default studentdetailreducer;