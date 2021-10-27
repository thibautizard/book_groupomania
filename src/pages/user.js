import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import Loader from "../util/loader";
import Link from "react-router-dom/Link";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { getUserPosts } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    postIdParam: null,
  };

  componentDidMount() {
    const pseudo = this.props.match.params.pseudo;
    const postId = this.props.match.params.postId;
    this.setState({ postIdParam: postId });

    this.props.getUserPosts(pseudo);
    axios
      .get(
        `https://projet7-oc-api.herokuapp.com/api/user/informations/${pseudo}`
      )
      .then((res) => {
        this.setState({
          profile: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { posts, loading } = this.props.data;
    const { postIdParam } = this.state;

    const postsMarkup = loading ? (
      <Loader />
    ) : posts.length === 0 ? (
      <Fragment>
        <p style={{ fontSize: "20px", textAlign: "center" }}>
          {" "}
          Cet utilisateur n'a encore rien posté 🤷🏼‍♂️{" "}
        </p>
        <div
          className="button-container"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Retour à la page d'accueil
          </Button>
        </div>
      </Fragment>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts.map((post, i) => {
        if (post.postId !== +postIdParam) {
          return <Post key={post.postId} post={post} />;
        } else {
          return <Post key={post.postId} post={post} openDialog={true} />;
        }
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={3} xs={12}>
          {this.state.profile === null ? (
            <p> Chargement du profil... </p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item sm={9} xs={12}>
          {postsMarkup}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserPosts })(user);
