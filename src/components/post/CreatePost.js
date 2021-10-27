import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";

import { connect } from "react-redux";
import {
  createPost,
  uploadImagePost,
  clearErrors,
} from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "88%",
    top: "0%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  addPhoto: {
    width: "120px",
    height: "120px",
  },
});

class CreatePost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
    imageUrl: "",
  };

  // Met à jour le formulaire si tentative d'envoyer vide
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }

    // Réinitialise le formulaire
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
      this.handleClose();
    }
  }

  // Ouvre le formulaire
  handleOpen = () => {
    this.setState({ open: true });
  };

  // Ferme le formulaire
  handleClose = () => {
    clearErrors();
    this.setState({ open: false, errors: {}, imageUrl: "" });
  };

  // Quand on change le contenu du post à envoyer
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Enoyer le formulaire
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createPost({
      body: this.state.body,
      imageUrl: this.state.imageUrl,
    });
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imagePostInput");
    fileInput.click();
  };

  handleImageChange = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, "post");
    formData.append("pathToSave", "public/images/posts/");
    const imageUrl = await this.props.uploadImagePost(formData);
    this.setState({ imageUrl });
  };

  render() {
    const { errors, imageUrl } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Créer un post">
          <AddIcon color="white" />
        </MyButton>
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
          <DialogTitle> Créer un nouveau post </DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} className={classes.form}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  className={classes.imagePost}
                  alt="illustration post"
                />
              ) : (
                <Fragment>
                  <input
                    type="file"
                    id="imagePostInput"
                    onChange={this.handleImageChange}
                    hidden="hidden"
                  />
                  <MyButton
                    tip="Ajouter un gif"
                    onClick={this.handleEditPicture}
                  >
                    <AddPhotoAlternate
                      color="primary"
                      style={{ fontSize: "80px" }}
                    />
                  </MyButton>
                </Fragment>
              )}

              <TextField
                name="body"
                type="text"
                label="Mon post"
                multiline
                rows="3"
                placeholder="Écrire ici un commentaire"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Poster
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps, { createPost, uploadImagePost })(
  withStyles(styles)(CreatePost)
);
