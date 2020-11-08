import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";
import { useForm } from "react-hook-form";

export default function AddArticle() {
  const [article, setArticle] = React.useState({ title: "", body: "" });
  const { register, handleSubmit: handleSubmitController, errors } = useForm();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    ArticleService.create(article)
      .then(() => alert("done"))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmitController(handleSubmit)}>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            error={errors.title}
            name="title"
            fullWidth
            variant="outlined"
            value={article.title}
            onChange={handleChange}
            inputRef={register({ required: "Title Should Bbe Filled" })}
            helperText={errors.tilte?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Body"
            error={errors.body}
            name="body"
            fullWidth
            variant="outlined"
            multiline
            value={article.body}
            onChange={handleChange}
            inputRef={register({ required: "Body Should Be Filled" })}
            helperText={errors.body?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
