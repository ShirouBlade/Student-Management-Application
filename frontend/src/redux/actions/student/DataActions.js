import axios from 'axios';
import {
    CREATE_STUDENTDATA_REQUEST, 
    CREATE_STUDENTDATA_SUCCESS, 
    CREATE_STUDENTDATA_FAIL,

    FETCH_STUDENTDATA_REQUEST,
    FETCH_STUDENTDATA_SUCCESS,
    FETCH_STUDENTDATA_FAIL,

    DELETE_STUDENTDATA_REQUEST,
    DELETE_STUDENTDATA_SUCCESS,
    DELETE_STUDENTDATA_FAIL,

    STUDENTPROFILE_DETAIL_REQUEST,
    STUDENTPROFILE_DETAIL_SUCCESS,
    STUDENTPROFILE_DETAIL_FAIL,

    PROFILEDETAIL_UPDATE_REQUEST,
    PROFILEDETAIL_UPDATE_SUCCESS,
    PROFILEDETAIL_UPDATE_FAIL,
} from '../DataTypes';

export const createStudentDataAction = StudentData => {
    return async dispatch => {
        try{
            dispatch({
                type: CREATE_STUDENTDATA_REQUEST,
                loading: true,
            });
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                },
            };
            const{ data } = await axios.post('/api/student', StudentData, config);
            dispatch({
                type: CREATE_STUDENTDATA_SUCCESS,
                payload: data,
            });
        } catch(error){
            dispatch({
                type: CREATE_STUDENTDATA_FAIL,
                error: error.response && error.response.data.message,
            });
        }
    };
};

export const fetchStudentData = () =>{
    return async dispatch =>{
        try{
            dispatch({
                type: FETCH_STUDENTDATA_REQUEST,
                loading: true,
            });
            const config ={
                headers:{
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.get('/api/student', config);
            dispatch({
                type: FETCH_STUDENTDATA_SUCCESS,
                payload: data, 
            });
        }catch(error){
            display({
                type:FETCH_STUDENTDATA_FAIL,
                error: error.response && error.response.data.message,
            });
        }
    };
};

export const deleteStudentData = id => {
    return async dispatch => {
      try {
        dispatch({
          type: DELETE_STUDENTDATA_REQUEST,
          loading: true,
        });
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axios.delete(`/api/student/${id}`, config);
        dispatch({
          type: DELETE_STUDENTDATA_SUCCESS,
          payload: data,
        });
        dispatch({
          type: FETCH_STUDENTDATA_SUCCESS,
        });
      } catch (error) {
        dispatch({
          type: DELETE_STUDENTDATA_FAIL,
          loading: false,
          error: error.response && error.response.data.message,
        });
      }
    };
  };

export const fetchAStudent = (id, StudentData) => {
  return async dispatch => {
    try {
      dispatch({
        type: STUDENTPROFILE_DETAIL_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`/api/student/${id}`, StudentData, config);
      dispatch({
        type: STUDENTPROFILE_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STUDENTPROFILE_DETAIL_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const updateStudentData = (id, StudentData) => {
  return async dispatch => {
    try {
      dispatch({
        type: PROFILEDETAIL_UPDATE_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(`/api/student/${id}`, StudentData, config);
      dispatch({
        type: PROFILEDETAIL_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFILEDETAIL_UPDATE_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};