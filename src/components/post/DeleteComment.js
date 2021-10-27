import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    right: "-50px",
    top: "-5px",
  },
};

class DeleteComment extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteComment = () => {
    this.props.deleteComment(this.props.commentId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Supprimer le commentaire"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Voulez-vous vraiment supprimer ce commentaire ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.deleteComment} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteComment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  commentId: PropTypes.string.isRequired,
};

export default connect(null, { deleteComment })(
  withStyles(styles)(DeleteComment)
);
