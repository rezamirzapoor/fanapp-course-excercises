import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "components/Button";
import { signup } from "services";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = state;
    signup(email, password, name)
      .catch((error) => toast.error(error.message))
      .then(() => props.history.replace("/"))
      .finally(() => setLoading(false));
  };

  const { register, handleSubmit: handleSubmitController, errors } = useForm();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmitController(handleSubmit)}
          noValidate
        >
          <TextField
            error={errors.name}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={state.name}
            onChange={handleChange}
            inputRef={register({ required: "Name Should Be Filled" })}
            helperText={errors.name?.message}
          />
          <TextField
            error={errors.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // value={state.email}
            onChange={handleChange}
            inputRef={register({
              required: "Email Should Be Filled",
              pattern: {
                value: new RegExp("[^@]+@[^.]+..+"),
                message: "Email Format Is Incorrect",
              },
            })}
            helperText={errors.email?.message}
          />
          <TextField
            error={errors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={handleChange}
            inputRef={register({
              required: "Password Should Be Filled",
            })}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            loading={loading}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
