import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export default ({
  initialData: {
    avatar = "",
    firstName = "",
    lastName = "",
    phone = "",
    email = "",
    birthDate = "",
    title = "",
    gender = "",
    address = "",
    displayEmail = false,
  },
}) => {
  const classes = useStyles();
  return (
    <>
      <Avatar src={avatar} className={classes.large}>
        M
      </Avatar>
      <Typography component="p">
        {firstName} {lastName}
      </Typography>
      <Typography component="p">{phone}</Typography>
      <Typography component="p">{displayEmail ? email : ""}</Typography>
      <Typography component="p">{birthDate}</Typography>
      <Typography component="p">{title}</Typography>
      <Typography component="p">{gender}</Typography>
      <Typography component="p">{address}</Typography>
    </>
  );
};
