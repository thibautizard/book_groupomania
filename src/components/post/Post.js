import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import PropTypes from "prop-types";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
    margin: "0 10px",

    "& .image-wrapper": {
      maxWidth: "70px",
      textAlign: "center",
      position: "relative",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    "& .content": {},

    "& .profile-image": {
      width: "60px",
      height: "60px",
      objectFit: "cover",
      borderRadius: "50%",
    },
  },

  image: {
    minWidth: 200,
  },

  content: {
    padding: 25,
    objectFit: "cover",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },

  imagePost: {
    margin: "10px auto",
    width: "100%",
    maxWidth: "450px",
  },

  pseudoContainer: {
    width: "90px",
    whiteSpace: "wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  interaction: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    "& .bloc": {
      margin: "0 15px",
    },
  },
};

export class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    dayjs.locale("fr");
    const {
      classes,
      post: {
        content,
        createdAt,
        imageUrl,
        userImage,
        userPseudo,
        postId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { pseudo, privilege },
      },
    } = this.props;

    const deleteButton =
      authenticated && (userPseudo === pseudo || privilege) ? (
        <DeletePost postId={postId} />
      ) : null;

    return (
      <Card className={classes.card} type="post">
        <div className="image-wrapper">
          <img src={userImage} alt="profile" className="profile-image" />
          <Typography
            variant="subtitle1"
            component={Link}
            to={`/users/${userPseudo}`}
            color="primary"
            className={classes.pseudoContainer}
          >
            {userPseudo}
          </Typography>
        </div>

        <CardContent className={classes.content}>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt, "").fromNow()}
          </Typography>
          <img
            src={imageUrl}
            className={classes.imagePost}
            alt="illustration post"
          />
          <p> {content} </p>
          {/* <Typography variant="body1">{createdAt}</Typography> */}
          <div className={classes.interaction}>
            <div className="bloc">
              <LikeButton postId={postId} className={classes.button} />
              <span>{likeCount} J'aime </span>
            </div>

            <div className="bloc">
              <PostDialog
                postId={postId}
                pseudo={pseudo}
                commentCountFix={commentCount}
                openDialog={this.props.openDialog}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
