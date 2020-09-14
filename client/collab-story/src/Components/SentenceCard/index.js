import React, { Component } from 'react';
import SentenceEditor from '../SentenceEditor';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import './SentenceCard.css';

class SentenceCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
      elevation: 1,
      isDeleteDialogOpen: false,
      isEditorOpen: false,
    };
  }

  openDeleteDialog = () => this.setState({ isDeleteDialogOpen: true });

  closeDeleteDialog = () => this.setState({ isDeleteDialogOpen: false });

  confirmDelete = () => {
    this.props.deleteHandler();
    this.setState({ isDeleteDialogOpen: false });
  };

  openEditor = () => this.setState({ isEditorOpen: true });

  closeEditor = () => this.setState({ isEditorOpen: false });

  confirmEdit = newSentence => {
    this.props.editHandler(newSentence);
    this.setState({ isEditorOpen: false });
  };

  render() {
    const { text = '', font, size, style, _id, createdOn } = this.props?.sentence ?? {};

    return (
      <Paper
        className="sentence-card-paper"
        onMouseEnter={() => this.setState({ isHovering: true, elevation: 3 })}
        onMouseLeave={() => this.setState({ isHovering: false, elevation: 1 })}
        elevation={this.state.elevation}
      >
        {!this.state.isEditorOpen && (
          <div className="sentence-card-text">
            <Typography>{text}</Typography>
          </div>
        )}

        {this.state.isEditorOpen && (
          <div className="sentence-card-editor">
            <SentenceEditor
              sentence={this.props.sentence}
              doneHandler={this.confirmEdit}
              cancelHandler={this.closeEditor}
            />
          </div>
        )}

        {!this.state.isEditorOpen && this.state.isHovering && (
          <>
            <IconButton
              className="sentence-card-button"
              aria-label="edit"
              onClick={this.openEditor}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              className="sentence-card-button"
              aria-label="delete"
              onClick={this.openDeleteDialog}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}

        <Dialog
          open={this.state.isDeleteDialogOpen}
          onClose={this.closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete this sentence?</DialogTitle>
          <DialogActions>
            <Button onClick={this.closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.confirmDelete} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

export default SentenceCard;
