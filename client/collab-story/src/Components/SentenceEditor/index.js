import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import './SentenceEditor.css';

class SentenceEditor extends Component {
  constructor(props) {
    super(props);

    const { text = '', font = 'Roboto', size = 16, style } = this.props?.sentence ?? {};

    this.state = {
      text,
      font,
      size,
      style: this.parseStyleString(style),
    };
  }

  getStyleString = () => {
    return this.state.style.toString();
  };

  parseStyleString = styleString => {
    const style = [];

    if (styleString?.includes('bold')) {
      style.push('bold');
    }

    if (styleString?.includes('italic')) {
      style.push('italic');
    }

    if (styleString?.includes('underline')) {
      style.push('underline');
    }

    return style;
  };

  handleStyle = (event, style) => this.setState({ style });

  handleSize = event => this.setState({ size: event.target.value });

  handleFont = event => this.setState({ font: event.target.value });

  handleChange = event => this.setState({ text: event.target.value });

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleDone();
    }
  };

  handleDone = () => {
    const { text, font, size, style } = this.state;
    const _id = this.props.sentence?._id;
    const sentence = { text, font, size, style: this.getStyleString(style), _id };

    this.props.doneHandler(sentence);
    this.setState({ text: '' });
  };

  isDoneDisabled = () => this.state.text.length <= 0 || this.state.text.length > 300;

  render() {
    return (
      <>
        <TextField
          id="outlined-multiline-static"
          label={this.props.inputLabel ?? 'Enter your new sentence'}
          fullWidth
          value={this.state.text}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          variant="outlined"
        />

        <div className="sentence-editor-buttons">
          <div className="sentence-editor-style-buttons">
            <FormControl style={{ width: 160, marginRight: 10 }} size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Font</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.font}
                onChange={this.handleFont}
                label="Font"
              >
                <MenuItem value="Roboto">Roboto</MenuItem>
                <MenuItem value="Times">Times</MenuItem>
                <MenuItem value="Comic Sans MS">Comic Sans</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ marginRight: 10 }} size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.size}
                onChange={this.handleSize}
                label="Size"
              >
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={26}>26</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>

            <ToggleButtonGroup
              value={this.state.style}
              onChange={this.handleStyle}
              size="small"
              aria-label="text formatting"
            >
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underline" aria-label="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          {this.props.cancelHandler && (
            <Button style={{ marginRight: '10px' }} onClick={this.props.cancelHandler}>
              Cancel
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleDone}
            disabled={this.isDoneDisabled()}
          >
            {this.props.doneText ?? 'Submit'}
          </Button>
        </div>
      </>
    );
  }
}

export default SentenceEditor;
