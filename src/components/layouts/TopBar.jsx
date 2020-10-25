import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        {/* <CameraIcon className={classes.icon} /> */}
        <Typography variant="h6" color="inherit" noWrap>
          Learning React
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
