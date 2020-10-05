import React, { useState } from "react";

import Index from "./Index";
import Show from "./Show";
import posts from "../../data.json";
import Layout from "../layout/Layout";
import { CssBaseline } from "@material-ui/core";
export default () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <CssBaseline />
      <Layout>
        {selectedPost ? (
          <Show post={selectedPost} goToIndex={() => setSelectedPost(null)} />
        ) : (
          <Index posts={posts} viewPost={(p) => setSelectedPost(p)} />
        )}
      </Layout>
    </>
  );
};
