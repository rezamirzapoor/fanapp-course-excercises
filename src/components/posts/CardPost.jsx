import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: "1em",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    // backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({ post, viewPost }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root} style={{ position: "relative" }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {post.author[0]}
            </Avatar>
          }
          action={<IconButton aria-label="settings"></IconButton>}
          title={
            post.title.length > 40
              ? `${post.title.substring(0, 40)} ...`
              : post.title
          }
          subheader={moment(post.created).format("dddd, MMMM Do YYYY")}
        />
        <CardMedia
          className={classes.media}
          image={post.cover}
          title={
            post.title.length > 40
              ? `${post.title.substring(0, 40)} ...`
              : post.title
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ marginBottom: "1em" }}
          >
            {post.description}
          </Typography>
        </CardContent>
        <CardActions style={{ position: "absolute", bottom: 0 }}>
          <Button size="small" color="primary" onClick={() => viewPost(post)}>
            Read More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
