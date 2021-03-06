import React, { useState } from "react";
import { Grid, TextField, Avatar } from "@material-ui/core";
import Button from "components/Button";
import { ArticleService } from "components/Article";
import { useForm, Controller } from "react-hook-form";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import {
  CameraAltOutlined as CameraIcon,
  CloudUploadOutlined as CloudUploadOutlinedIcon,
} from "@material-ui/icons";
import { storage } from "../../services/firebase";
export default function AddArticle() {
  const [form, setForm] = useState({
    title: "",
    body: "",
    header: "",
    lastModifiedDate: Date.now(),
  });
  const { register, errors, reset, handleSubmit, control } = useForm();
  const avatarRef = React.createRef();
  const onSubmit = () => {
    console.log(form);
    let randomName = Math.random().toString(36).substring(7);
    const uploadHeader = storage
      .ref(`images/${randomName}.jpg`)
      .put(form.header);
    uploadHeader.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        storage
          .ref("images")
          .child(`${randomName}.jpg`)
          .getDownloadURL()
          .then((url) => {
            setForm((form) => ({ ...form, header: url }));
          })
          .then(() => {
            ArticleService.create(form)
              .then(() => alert("done"))
              .catch((error) => console.log(error));
          });
      }
    );
  };
  const editorHandleChange = (editorState) => {
    setForm((form) => ({ ...form, body: editorState }));
  };
  const handleChange = (ev) => {
    const { value, name } = ev.target;
    setForm((form) => ({ ...form, [name]: value }));
  };
  const handleFileChange = (ev) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(ev.target.files[0]);
    fileReader.onload = (e) => {
      setForm((form) => ({ ...form, header: e.target.result }));
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Title"
            defaultValue=""
            variant="outlined"
            fullWidth
            onChange={handleChange}
            inputRef={register({
              required: "Title is required",
              maxLength: {
                value: 250,
                message: "Title must be less than 250 characters",
              },
            })}
            error={!!errors.title}
            helperText={!!errors.title && errors.title.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="body"
            label="Body"
            control={control}
            rules={{ required: "Body is required" }}
            value={form.body}
            onChange={editorHandleChange}
            as={
              <BraftEditor
                style={{ border: "1px solid", borderColor: "#0000003b" }}
              />
            }
          />
          <p style={{ color: "red" }}>{errors.body?.message}</p>
        </Grid>
        <Grid style={{ marginTop: "1.5em" }} item xs={6}>
          <input
            type="file"
            ref={avatarRef}
            hidden
            onChange={handleFileChange}
          />
          <Avatar style={{ width: "6em", height: "6em" }} src={form.header}>
            <CameraIcon style={{ fontSize: "3em" }} />
          </Avatar>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => avatarRef.current?.click()}
          >
            <CloudUploadOutlinedIcon />{" "}
            <span style={{ marginLeft: ".5em" }}>Upload</span>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: 8 }}
          >
            Submit
          </Button>
          <Button variant="contained" type="reset" onClick={reset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
