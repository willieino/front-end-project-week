import axios from 'axios';

export const ERROR = 'ERROR';
export const GET_NOTES = 'GET_NOTES';
export const GETTING_NOTES = 'GETTING_NOTES';
export const CREATING_NOTE = 'CREATING_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATING_NOTE = 'UPDATING_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';
export const SINGLE_NOTE = 'SINGLE_NOTE';
export const GETTING_SINGLE_NOTE = 'GETTING_SINGLE_NOTE';
export const TOGGLE_UPDATE_NOTE = 'TOGGLE_UPDATE_NOTE';




export const getNotes = () => {
    return (dispatch) => {
      dispatch({type: GETTING_NOTES})
      axios
      .get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        dispatch({type: GET_NOTES, payload: response.data}) 
        //this.setState(() => ({ notes: response.data }));
      })
      .catch(error => {
        dispatch({type: ERROR, payload: error})
        //console.error('Server Error', error);
      });
      
      
    /*   axios.get('http://localhost:3333/notes')
        .then( response => {
          dispatch({type: GET_NOTES, payload: response.data})
        })
        .catch( err => {
          dispatch({type: ERROR, payload: err})
        }) */
    }
  }

export const createNote = (newNote) => {
    return (dispatch) => {
      dispatch({type: CREATING_NOTE})
     
    // axios.post('http://localhost:3333/notes', newNote)
    axios.post('https://fe-notes.herokuapp.com/note/create', newNote)       
    .then( response => {
 
          dispatch({ type: CREATE_NOTE, payload: response.data })
         
        })
        .catch( err => {
          dispatch({ type: ERROR, payload: err })
        })
    }
  } 

  export const noteUpdate = (newNote) => {
 // noteUpdate = (e) => {
   // e.preventDefault();
   return (dispatch) => {
    dispatch({type: UPDATING_NOTE})
    const URL = 'https://fe-notes.herokuapp.com/note/edit/' + newNote;
    axios
        .put(URL)
        
        .then(response => {
          dispatch({ type: UPDATE_NOTE, payload: response.data }) 
         // this.setState(() => ({ notes: response.data }));
        })
        .catch(error => {
          dispatch({ type: ERROR, payload: error }) 
          //console.error('Server Error', error);
        });
}
  }
  /* axios.post('https://fe-notes.herokuapp.com/note/create', {
    tags: this.state.tags,
    title: this.state.title,
    textBody: this.state.textBody,
  })
    .then(response => {
      this.setState(() => ({ notes: response.data }));
    })
    .catch(error => {
      console.log(error);
    });

  this.setState({
    tags: '',
    title: '',
    textBody: '',
  });
  window.location.reload();
}
 */

export const viewNote = (id) => {
  return (dispatch) => {
    dispatch({type: GETTING_SINGLE_NOTE})
    const URL = 'https://fe-notes.herokuapp.com/note/get/' + id;
    axios
      .get(URL)
      .then(response => {
        dispatch({ type: SINGLE_NOTE, payload: response.data })
        console.log("in viewnote", response.data)
       // this.setState(() => ({ notes: response.data }));
      })
      .catch(error => {
        dispatch({ type: ERROR, payload: error })
       // console.error('Server Error', error);
      });
    }
  }




export const deleteNote = (id) => {
    return (dispatch) => {
      const URL = 'https://fe-notes.herokuapp.com/note/delete/' + id;
      dispatch({type: DELETING_NOTE})
      axios
      .delete(URL)
      .then(response => {
            dispatch({ type: DELETE_NOTE, payload: response.data });
            dispatch({ type: SINGLE_NOTE, payload: {} });
        })
        .catch( err => {
          dispatch({type: ERROR, payload: err })
        })
  
    }
  }

  /* noteDelete = (e) => {
    e.preventDefault();
    const URL = 'https://fe-notes.herokuapp.com/note/delete/' + this.props.id;
    axios
      .delete(URL)
      .then(response => {
        this.setState(() => ({ notes: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  } */

export const toggleShowUpdate = () => {
  return {
    type: TOGGLE_UPDATE_NOTE
  };
};

export const updateSingleNote = note => {
  return {
    type: SINGLE_NOTE,
    payload: note
  };
};