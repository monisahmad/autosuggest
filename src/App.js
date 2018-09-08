import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Modal from 'react-modal';

import './App.css';
import {movies} from './content';
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '20%',
    height                : '30%',
    background            : 'lightgray',
  }
};




function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return movies.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      modalIsOpen: false,
      visibility: 'hidden'

    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDone = this.handleDone.bind(this); 
  }
  componentDidMount () {
    setTimeout(()=> {
      this.setState({visibility: 'visible'})
    }, 500)
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleDone() {
    window.alert('Done!');
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };


  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };
 
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    
    const { value, suggestions, visibility } = this.state;
 
    const inputProps = {
      placeholder: 'Type a Marvel Movie. Iron Man?',
      value,
      onChange: this.onChange,
      
    };
    const searchboxStyle = {
      visibility
    }
 
    return (
      <div className="main">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 className="modalHead">{value}</h2>
          <div className="modalContent">
            Hello!
          </div>
          <div className="modalBottom">
            <button  className="modalButton">Cancel</button>
            <button onClick={this.handleDone} className="modalButton">Proceed</button>
          </div>

        </Modal>
        <div className="searchContainer">
        <div className="searchInput" style={searchboxStyle}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.openModal}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          
        />
        </div>
        <button className="searchButton"><i class="fa fa-search"> </i> Search </button>

        </div>
      </div>
    );
  }
}

export default App;
