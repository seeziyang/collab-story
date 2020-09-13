import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './SentenceCard.css';

class SentenceCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { text = '', font, size, style, _id, createdOn } = this.props?.sentence ?? {};

    return (
      <Paper className="sentence-card-paper">
        <Typography>{text}</Typography>
      </Paper>
    );
  }
}

export default SentenceCard;
