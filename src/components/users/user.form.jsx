import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Switch,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const WithForm = (WrappedForm) =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        form: { ...props.initialData },
        errors: [],
      };
      this.rules = {
        phone: new RegExp("09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}"),
        email: new RegExp("[^@]+@[^.]+..+"),
        birthDate: new RegExp(
          "^[0-9]{4}([- /.])(((0[13578]|(10|12))\\1(0[1-9]|[1-2][0-9]|3[0-1]))|(02\\1(0[1-9]|[1-2][0-9]))|((0[469]|11)\\1(0[1-9]|[1-2][0-9]|30)))$"
        ),
      };
    }
    validate = (ev) => {
      let error = "";
      if (["firstName", "lastName"].includes(ev.target.name)) {
        error = ev.target.value === "" ? "required" : "";
      } else if (["phone", "email", "birthDate"].includes(ev.target.name))
        error = this.rules[ev.target.name].test(String(ev.target.value))
          ? ""
          : "invalid";

      let { errors } = this.state;
      if (error === "") {
        errors = errors.filter((item) => item.name !== ev.target.name);
      } else {
        !errors.find((item) => item.name === ev.target.name) &&
          errors.push({ name: ev.target.name, message: error });
      }
      this.setState((state) => ({ ...state, errors }));
      return error ? false : true;
    };

    handleChange = (ev) => {
      ev.persist();
      if (this.validate(ev)) {
        this.setState((state) => ({
          ...state,
          form: { ...state.form, [ev.target.name]: ev.target.value },
        }));
      }
    };

    handleSwitchChange = () =>
      this.setState((state) => ({
        ...state,
        form: { ...state.form, displayEmail: !state.form.displayEmail },
      }));

    handleFileChange = (ev) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(ev.target.files[0]);
      fileReader.onload = (e) => {
        this.setState((state) => ({
          ...state,
          form: { ...state.form, avatar: e.target.result },
        }));
      };
    };
    handleSubmit = () => {
      this.props.setInitialData(this.state.form);
    };

    getError = (name) => {
      let error = this.state.errors.find((item) => item.name === name);
      return error ? error.message : "";
    };

    render = () => (
      <WrappedForm
        {...this.props}
        handleChange={this.handleChange}
        handleFileChange={this.handleFileChange}
        handleSwitchChange={this.handleSwitchChange}
        handleSubmit={this.handleSubmit}
        getError={this.getError}
        errors={this.state.errors}
      />
    );
  };

const UserForm = (props) => {
  const classes = useStyles();
  const avatarRef = React.createRef();
  return (
    <form
      style={{ width: "100%" }}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <Grid container style={{ padding: "1em" }} spacing={2}>
        <Grid item xs={6}>
          <input
            type="file"
            style={{ display: "none" }}
            id="avatar-file"
            onChange={props.handleFileChange}
            ref={avatarRef}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => avatarRef.current && avatarRef.current.click()}
          >
            CHANGE PICTURE
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            disabled={props.errors.length === 0 ? false : true}
            variant="contained"
            color="primary"
            onClick={props.handleSubmit}
          >
            SUBMIT
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={props.getError("firstName")}
            id="outlined-error-helper-text"
            label="First Name"
            helperText={props.getError("firstName")}
            variant="outlined"
            onChange={props.handleChange}
            name="firstName"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={props.getError("lastName")}
            id="outlined-error-helper-text"
            label="Last Name"
            helperText={props.getError("lastName")}
            variant="outlined"
            onChange={props.handleChange}
            name="lastName"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={props.getError("phone")}
            id="outlined-error-helper-text"
            label="Phone"
            helperText={props.getError("phone")}
            variant="outlined"
            onChange={props.handleChange}
            name="phone"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={props.getError("email")}
            id="outlined-error-helper-text"
            label="Email Address"
            helperText={props.getError("email")}
            variant="outlined"
            onChange={props.handleChange}
            name="email"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={props.getError("birthDate")}
            id="outlined-error-helper-text"
            label="Birth Date"
            helperText={props.getError("birthDate")}
            variant="outlined"
            onChange={props.handleChange}
            name="birthDate"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl
            variant="outlined"
            style={{ width: "100%", margin: ".5em" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Title
            </InputLabel>
            <Select label="Title" name="title" onChange={props.handleChange}>
              <MenuItem value={"writer"}>Writer</MenuItem>
              <MenuItem value={"editor"}>Editor</MenuItem>
              <MenuItem value={"publisher"}>Publisher</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch color="secondary" onClick={props.handleSwitchChange} />
            }
            label="Display Email"
            labelPlacement="top"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              {[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ].map((item) => (
                <FormControlLabel
                  {...item}
                  control={
                    <Radio
                      color="primary"
                      onChange={props.handleChange}
                      name="gender"
                    />
                  }
                  labelPlacement="start"
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-error-helper-text"
            label="Address"
            variant="outlined"
            onChange={props.handleChange}
            name="address"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default WithForm(UserForm);
