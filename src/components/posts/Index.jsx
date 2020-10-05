import React from "react";
import { Grid } from "@material-ui/core";
import CardPost from "./CardPost";
export default ({ posts, viewPost }) => {
  return (
    <>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <CardPost post={post} viewPost={viewPost} />
        ))}
      </Grid>
    </>
  );
};
