import React, { useEffect, useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { ArticleService } from "../../components/Article/index";
// import moment from "moment";
export default () => {
  useEffect(() => {
    const articles = ArticleService.getAll();
    articles.on("value", (data) =>
      setArticle(Object.values(data.val()).find((a) => a.title === title))
    );
  }, []);
  const [article, setArticle] = useState({});
  const history = useHistory();
  const { title } = useParams();
  return (
    <>
      <Typography variant="h5" component="h2">
        {article.title}
      </Typography>

      <Typography variant="body2" color="textSecondary">
        last modified: {article.lastModifiedDate}
      </Typography>
      <img src={article.header} alt={article.title} width={"100%"} />
      <Typography variant="subtitle1" gutterBottom>
        {article.body}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {article.body}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Back To List
      </Button>
    </>
  );
};
