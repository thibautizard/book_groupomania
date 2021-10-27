import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DialogMarkup from "./DialogMarkup";

// MUI Stuff

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

// Redux stuff
import { connect } from "react-redux";
import { getPost } from "../../redux/actions/dataActions";

// Icons
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  ...theme.spreadThis,

  profileImage: {
    width: 70,
    height: 70,

    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    right: "3px",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  imagePost: {
    margin: "17px auto",
    width: "100%",
  },
});

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { pseudo, postId } = this.props;
    const newPath = `/users/${pseudo}/post/${postId}`;
    if (oldPath === newPath) oldPath = `/users/${pseudo}`;
    window.history.pushState(null, null, newPath);
    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
  };

  render() {
    const { classes, commentCountFix } = this.props;

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Commentaires"
          tipClassName={classes.expandButton}
        >
          <ChatIcon color="primary" />
        </MyButton>
        <span>
          {" "}
          {commentCountFix} commentaire{+commentCountFix > 1 ? "s" : ""}{" "}
        </span>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Fermer"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>

          <DialogContent className={classes.dialogContent}>
            <DialogMarkup />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  createPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
