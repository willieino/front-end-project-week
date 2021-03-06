import React from 'react';
import "../css/note.css"
import NavNoteList from "./navNoteList";
import NavSaveList from "./navSaveList";
import NavOpenList from "./navOpenList";
//import Login from "./login/login";

import { getNotes } from '../actions/notesActions';
import { viewNote } from '../actions/notesActions';
import { createList } from '../actions/listsActions';
import { getLists } from '../actions/listsActions';
import { connect } from 'react-redux';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      lists: [],
      inputText: '',
      title: "",
      id: "",
      enableList: false,
      enableSaveList: false,
      enableOpenList: false,
      pictures: [],
      listItems: [],
      listSaveInput: "",
      selectedNotes: [],
      noteSelected: [],
      selectThis: false,
    };
  }

  componentDidMount() {
    this.props.getNotes();
    this.props.getLists();
  }

  enableList = (e) => {
    e.preventDefault();
    let enableList = this.state.enableList;
    enableList = !enableList;
    this.setState({ enableList: enableList });
  }

  enableSaveList = (e) => {
    e.preventDefault();
    let enableSaveList = this.state.enableSaveList;
    enableSaveList = !enableSaveList;
    this.setState({ enableSaveList: enableSaveList });
  }

  enableOpenList = (event) => {
    event.preventDefault();
    let enableOpenList = this.state.enableOpenList;
    enableOpenList = !enableOpenList;
    this.setState({ enableOpenList: enableOpenList });
  }

  listHandler = (listItem) => {
    let list = [];

    list = this.state.listItems;
    list.push(listItem);
    this.setState(() => ({ listItems: list, selectThis: true }));
  }

  sortThis = () => {
    const newNotes = this.props.notes.sort((a, b) => a.title.localeCompare(b.title))
    this.setState({ notes: newNotes });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  viewNoteList = (list, listId) => {
    let selectedNote = [];
    const listJSON = JSON.parse(list);
    for (let i = 0; i < listJSON.length; i++) {
      for (let j = 0; j < this.props.notes.length; j++) {
        if (listJSON[i] === this.props.notes[j].id) {
          let obj = this.props.notes[j];
          selectedNote.push(this.props.notes[j]);
        }
      }
      this.setState({ selectedNotes: selectedNote, enableOpenList: false });
      this.props.listView(selectedNote);
    }
  }

  saveList = (event) => {
    event.preventDefault();
    const saveName = this.state.listSaveInput;
    const list = this.state.listItems;
    const listJSON = JSON.stringify(list);
    let newRec = {
      list: listJSON,
      notes_id: 1,
      listTitle: saveName,
      users_id: 1
    }
    this.props.createList(newRec);
    this.setState({ listSaveInput: "", enableSaveList: false })
  }

  render() {
   
    return (
      <form className="nav-left" onSubmit={this.saveList}>
        <div className="nav-title">Lambda Notes</div>
        <ul className="nav-list">
          <li className="nav-left-item icon1">
            <button id="icon1" className="nav-button" value="logout" onClick={this.props.logout} name="logout">Logout</button>
          </li>
          <li className="nav-left-item icon1">
            <div id="icon2" className="nav-left-icon-1"></div>
            <button id="icon1" className="nav-button" value="noteList" onClick={this.props.noteList} name="noteList">View Notes</button>
          </li>
          <li className="nav-left-item">
            <div id="icon2" className="nav-left-icon-1"></div>
            <button id="icon1" className="nav-button" value="noteCreate" onClick={this.props.noteCreate} name="noteCreate">Create Note</button>
          </li>
          <li className="nav-left-item">
            <div id="icon2" className="nav-left-icon-1"></div>
            <button id="icon1" className="nav-button" value="noteListCreate" onClick={this.enableSaveList} name="noteListCreate">{(this.state.enableSaveList) ? <p>Close List</p> : <p>Create List</p>}</button>
          </li>
          <li className="nav-left-item">
            <div id="icon2" className="nav-left-icon-1"></div>
            <button id="icon1" className="nav-button" value="noteList" onClick={this.enableOpenList} name="noteList">{(this.state.enableOpenList) ? <p>Close Note List</p> : <p>Open List</p>}</button>
          </li>
          <li className="nav-left-item">
          </li>
          <li className="nav-left-item">
            <div id="icon2" className="nav-left-icon-1"></div>
            <button id="icon1" className="nav-button" value="noteCreate" onClick={this.enableList} name="noteCreate">{(this.state.enableList) ? <p>Disable Select</p> : <p>Quick Select</p>}</button>
          </li>
          <li className="nav-left-item">
            <div id="icon2" className="nav-left-icon-2">
            </div>
          </li>
        </ul>{(this.state.enableList) ?
          <ul className="nav-title-list">
            {this.props.notes.map((note, index) => {
              return <NavNoteList key={index} title={note.title} viewNote={this.props.viewNote} textBody={note.textBody} id={note.id} noteView={this.props.noteView} notes={this.state.notes} />
            })}
          </ul> : null}
        {(this.state.enableList) ? <div className="sort-button" onClick={this.sortThis}>Sort By Title</div> : null}
        {(this.state.enableSaveList) ?
          <ul className="nav-title-list">Select notes to save
            {this.props.notes.map((note, index) => {
              return <NavSaveList key={index} title={note.title} selectThis={this.state.selectThis} saveList={this.saveList} viewNote={this.props.viewNote} listHandler={this.listHandler} textBody={note.textBody} id={note.id} noteView={this.props.noteView} notes={this.state.notes} />
            })}
          </ul> : null}
        {(this.state.enableSaveList) ? <input type="text"
          className="list-save-input"
          value={this.state.value}
          placeholder="Enter List Name Here..."
          onChange={this.changeHandler}
          name="listSaveInput" /> : null}
        {(this.state.enableSaveList) ? <button className="save-list-button" onSubmit={this.saveList}>Save List</button> : null}
        {(this.state.enableOpenList) ?
          <ul className="nav-title-list">Select a List to open
            {this.props.lists.map((list, index) => {
              return <NavOpenList key={index} listTitle={list.listTitle} viewNoteList={this.viewNoteList} listView={this.props.listView} list={list.list} id={list.id} lists={this.state.lists} />
            })}
          </ul> : null}
        {/*  {(this.state.enableOpenList) ? <div className="open-button" onClick={this.viewNoteList}>Open List</div> : null}  */}
      </form>
    );
  }
}

const mapStateToProps = state => {
  const { notesReducer } = state;
  const { listsReducer } = state;

  return {
    notes: notesReducer.notes,
    lists: listsReducer.lists,
    error: notesReducer.error,
    gettingNotes: notesReducer.gettingNotes,
    gettingLists: listsReducer.gettingLists,
    noteSelected: state.singleNoteReducer.noteSelected
  };
};

export default connect(mapStateToProps, {
  getNotes, createList, getLists, viewNote
})(Nav);

