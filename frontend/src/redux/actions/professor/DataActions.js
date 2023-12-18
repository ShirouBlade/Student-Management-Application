import axios from 'axios';
import {
    CREATE_PROFESSORDATA_REQUEST, 
    CREATE_PROFESSORDATA_SUCCESS, 
    CREATE_PROFESSORDATA_FAIL,

    FETCH_PROFESSORDATA_REQUEST,
    FETCH_PROFESSORDATA_SUCCESS,
    FETCH_PROFESSORDATA_FAIL,

    DELETE_PROFESSORDATA_REQUEST,
    DELETE_PROFESSORDATA_SUCCESS,
    DELETE_PROFESSORDATA_FAIL,

    PROFESSORPROFILE_DETAIL_REQUEST,
    PROFESSORPROFILE_DETAIL_SUCCESS,
    PROFESSORPROFILE_DETAIL_FAIL,

    PROFILEDETAIL_UPDATE_REQUEST,
    PROFILEDETAIL_UPDATE_SUCCESS,
    PROFILEDETAIL_UPDATE_FAIL,
} from '../datatypes';

export const createProfessorDataAction = ProfessorData => {
    return async dispatch => {
        try{
            dispatch({
                type: CREATE_PROFESSORDATA_REQUEST,
                loading: true,
            });
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                },
            };
            const{ data } = await axios.post('/api/professor', ProfessorData, config);
            dispatch({
                type: CREATE_PROFESSORDATA_SUCCESS,
                payload: data,
            });
        } catch(error){
            dispatch({
                type: CREATE_PROFESSORDATA_FAIL,
                error: error.response && error.response.data.message,
            });
        }
    };
};

export const fetchProfessorData = () =>{
    return async dispatch =>{
        try{
            dispatch({
                type: FETCH_PROFESSORDATA_REQUEST,
                loading: true,
            });
            const config ={
                headers:{
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.get('/api/professor', config);
            dispatch({
                type: FETCH_PROFESSORDATA_SUCCESS,
                payload: data, 
            });
        }catch(error){
            display({
                type:FETCH_PROFESSORDATA_FAIL,
                error: error.response && error.response.data.message,
            });
        }
    };
};

export const deleteProfessorData = id => {
    return async dispatch => {
      try {
        dispatch({
          type: DELETE_PROFESSORDATA_REQUEST,
          loading: true,
        });
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axios.delete(`/api/professor/${id}`, config);
        dispatch({
          type: DELETE_PROFESSORDATA_SUCCESS,
          payload: data,
        });
        dispatch({
          type: FETCH_PROFESSORDATA_SUCCESS,
        });
      } catch (error) {
        dispatch({
          type: DELETE_PROFESSORDATA_FAIL,
          loading: false,
          error: error.response && error.response.data.message,
        });
      }
    };
  };

export const fetchAProfessor = (id, ProfessorData) => {
  return async dispatch => {
    try {
      dispatch({
        type: PROFESSORPROFILE_DETAIL_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`/api/professor/${id}`, ProfessorData, config);
      dispatch({
        type: PROFESSORPROFILE_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFESSORPROFILE_DETAIL_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const updateProfessorData = (id, ProfessorData) => {
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
      const { data } = await axios.put(`/api/professor/${id}`, ProfessorData, config);
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
