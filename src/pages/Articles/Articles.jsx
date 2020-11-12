import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import CardArticle from "./CardArticle";
import { ArticleService } from "../../components/Article/index";

export default function Articles() {
  useEffect(() => {
    const articles = ArticleService.getAll();
    articles.on("value", (data) => {
      setArticles(Object.values(data.val()));
    });
  }, []);
  const [articles, setArticles] = useState([]);

  return (
    <>
      <h1>Articles</h1>;
      <Grid container spacing={4}>
        {!!articles && Array.isArray(articles)
          ? articles.map((article) => <CardArticle article={article} />)
          : "Loading"}
      </Grid>
    </>
  );
}
