import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './SentenceEditor.css';

class SentenceEditor extends Component {
  constructor(props) {
    super(props);

    const { text = '', font, size, style } = this.props?.sentence ?? {};

    this.state = {
      text,
      font,
      size,
      style,
    };
  }

  handleChange = event => this.setState({ text: event.target.value });

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleDone();
    }
  };

  handleDone = () => {
    const { text, font, size, style } = this.state;
    const _id = this.props.sentence?._id;
    const sentence = { text, font, size, style, _id };

    this.props.doneHandler(sentence);
    this.setState({ text: '' });
  };

  render() {
    return (
      <>
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
        <div className="sentence-editor-buttons">
          {this.props.cancelHandler && (
            <Button style={{ marginRight: '10px' }} onClick={this.props.cancelHandler}>
              Cancel
            </Button>
          )}

          <Button variant="contained" color="primary" onClick={this.handleDone}>
            {this.props.doneText ?? 'Submit'}
          </Button>
        </div>
      </>
    );
  }
}

export default SentenceEditor;
