import { Typography, Button, Grid } from "@material-ui/core";
import { signInWithGoogle } from "../config/firebase";

export const Signin = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={5}>
        <Typography variant="h4">
          This is a place that helps the help givers and takers!
        </Typography>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </Button>
      </Grid>
    </Grid>
  );
};
