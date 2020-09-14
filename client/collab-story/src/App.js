import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import SentenceCard from './Components/SentenceCard';
import SentenceEditor from './Components/SentenceEditor';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sentences: [],
    };
  }

  componentDidMount() {
    this.fetchSentences();
  }

  fetchSentences = async () => {
    try {
      const res = await axios.get('/api/sentences');
      const sentences = res.data;

      this.setState({ sentences });
    } catch {
      console.log('Error fetching sentences');
    }
  };

  submitSentence = sentence => {
    // Update state
    this.setState({ sentences: [...this.state.sentences, sentence] });

    // Update backend
    axios.post('/api/sentences', sentence).catch(err => console.log('Error posting sentence', err));
  };

  deleteSentence = sentence => () => {
    // Uodate state
    this.setState({ sentences: this.state.sentences.filter(x => x !== sentence) });

    // Update backend
    axios
      .delete(`/api/sentences/${sentence._id}`)
      .catch(err => console.log('Error deleting sentence', err));
  };

  editSentence = newSentence => {
    // Update State
    const newSentences = this.state.sentences.map(sentence => {
      if (sentence._id === newSentence._id) {
        return newSentence;
      } else {
        return sentence;
      }
    });

    this.setState({ sentences: newSentences });

    // Update backend
    axios
      .put(`/api/sentences/${newSentence._id}`, newSentence)
      .catch(err => console.log('Error updating sentence', err));
  };

  render() {
    return (
      <div className="app-container">
        <div className="sentences-container">
          <div>
            {this.state.sentences.map((sentence, index) => (
              <SentenceCard
                key={index}
                sentence={sentence}
                editHandler={this.editSentence}
                deleteHandler={this.deleteSentence(sentence)}
              />
            ))}
          </div>
        </div>
        <Paper className="sentence-editor-paper">
          <SentenceEditor doneHandler={this.submitSentence} />
        </Paper>
      </div>
    );
  }
}

export default App;
