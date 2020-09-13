import React, { Component } from 'react';
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
    axios.post('/api/sentences', sentence);
  };

  render() {
    return (
      <div className="app-container">
        {this.state.sentences.map((sentence, index) => (
          <SentenceCard key={index} sentence={sentence} />
        ))}
        <SentenceEditor doneHandler={this.submitSentence} />
      </div>
    );
  }
}

export default App;
