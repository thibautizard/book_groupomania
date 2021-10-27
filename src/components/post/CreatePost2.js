import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";

import { connect } from "react-redux";
import {
  createPost,
  uploadImagePost,
  clearErrors,
} from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,

  card: {
    position: "relative",
    marginBottom: 20,
    padding: "0 30px",
    margin: "0 10px",
  },

  cardContent: {
    paddingTop: "0px",
  },

  title: {
    fontSize: "26px",
    textAlign: "center",
    marginBottom: "5px",
    fontWeight: "400",
    color: "rgb(15, 31, 65)",
  },

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
      this.setState({ body: "", errors: {} });
    }
  }

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

    if (this.state.body.length) {
      this.setState({
        body: "",
        imageUrl: "",
        errors: {},
      });
      document.querySelector("textarea").value = "";
    }
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
      <Card className={classes.card} fullWidth>
        <h2 className={classes.title}> Partagez du contenu ! </h2>
        <p style={{ textAlign: "center", margin: "0", fontSize: "50px" }}>👇</p>
        <CardContent className={classes.cardContent}>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            {imageUrl ? (
              <Fragment>
                <img
                  src={imageUrl}
                  className={classes.imagePost}
                  alt="illustration post"
                />
                <TextField
                  name="body"
                  type="text"
                  label="Un commentaire"
                  multiline
                  rows="2"
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
              </Fragment>
            ) : (
              <Fragment>
                <input
                  type="file"
                  id="imagePostInput"
                  onChange={this.handleImageChange}
                  hidden="hidden"
                />
                <MyButton
                  tip="Ajouter une image"
                  onClick={this.handleEditPicture}
                >
                  <AddPhotoAlternate
                    color="primary"
                    style={{ fontSize: "60px" }}
                  />
                </MyButton>
              </Fragment>
            )}
          </form>
        </CardContent>
      </Card>
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
