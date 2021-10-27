import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";

// Mui Stuff

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";

// Redux stuff
import { connect } from "react-redux";

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

class DialogMarkup extends Component {
  render() {
    const {
      classes,
      post: {
        postId,
        content,
        createdAt,
        likeCount,
        commentCount,
        imageUrl,
        userImage,
        userPseudo,
        comments,
      },
      UI: { loading },
    } = this.props;

    return loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={2}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={10}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            tp={`/users/${userPseudo}`}
          >
            {userPseudo}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("DD MMMM YYYY, H:mm")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{content}</Typography>
          <img
            src={imageUrl}
            className={classes.imagePost}
            alt="illustration post"
          />
          <LikeButton postId={postId} />
          <span> {likeCount} J'aime </span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>
            {commentCount} commentaire{+commentCount > 1 ? "s" : ""}{" "}
          </span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <Comments comments={comments} />
        <CommentForm postId={postId} />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(DialogMarkup));
