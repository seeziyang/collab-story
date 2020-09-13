import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './SentenceEditor.css';

class SentenceEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  handleChange = event => this.setState({ text: event.target.value });

  handleKeyPress = event => {
    if (event.key == 'Enter') {
      this.handleDone();
    }
  };

  handleDone = () => {
    const { text, font, size, style } = this.state;
    const sentence = { text, font, size, style };

    this.props.doneHandler(sentence);
    this.setState({ text: '' });
  };

  render() {
    return (
      <Paper className="sentence-editor-paper">
        <TextField
          id="outlined-multiline-static"
          label="Your New Sentence"
          fullWidth
          // multiline
          // rows={4}
          value={this.state.text}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          variant="outlined"
        />
        <div className="sentence-editor-button">
          <Button variant="contained" color="primary" onClick={this.handleDone}>
            {this.props.doneText ?? 'Submit'}
          </Button>
        </div>
      </Paper>
    );
  }
}

export default SentenceEditor;
