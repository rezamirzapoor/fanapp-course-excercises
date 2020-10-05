import React from "react";
import { Typography, Button } from "@material-ui/core";
import moment from "moment";
export default ({ post, goToIndex }) => {
  return (
    <>
      <Typography variant="h5" component="h2">
        {post.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        by: {post.author}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        date: {moment(post.created).format("dddd, MMMM Do YYYY")}
      </Typography>
      <img src={post.cover} alt={post.title} width={"100%"} />
      <Typography variant="subtitle1" gutterBottom>
        {post.description}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {post.body}
      </Typography>
      <Button variant="contained" color="primary" onClick={goToIndex}>
        Back To List
      </Button>
    </>
  );
};
