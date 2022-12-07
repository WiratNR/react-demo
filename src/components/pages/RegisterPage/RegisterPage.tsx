import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { display } from "@mui/system";
import { User } from "../../../types/user.type";
import { httpClient } from "../../../utils/httpclicnt";
import { server } from "../../../Constants";
import * as registerActions from "../../../actions/register.action";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../..";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type RegisterPageProps = {
  //
};

const RegisterPage: React.FC<any> = () => {
  const registerReducer = useSelector(
    (state: RootReducers) => state.registerReducer
  );

  const dispatch: any = useAppDispatch();
  const [visible, setVisible] = React.useState(false);
  const [level, setLevel] = React.useState("");
  const navigate = useNavigate();

  const classes: SxProps<Theme> | any = {
    root: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
    bottons: { marginTop: 2 },
  };

  const showFormV2 = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  }: FormikProps<User>) => {
    const handleClickShowPassword = () => {
      setVisible(visible ? false : true);
    };
    const handleChangeLevel = (event: SelectChangeEvent) => {
      setLevel(event.target.value);
    };

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type={visible ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="level">level</InputLabel>
          <Select
            id="level"
            name="level"
            value={values.level}
            label="level"
            onChange={handleChange}
          >
            <MenuItem value={"admin"}>admin</MenuItem>
            <MenuItem value={"user"}>user</MenuItem>
          </Select>
        </FormControl>
        <br />
        {registerReducer.isError && (
          <Alert severity="error">Register failed</Alert>
        )}

        <Stack direction="row" spacing={2} sx={classes.bottons}>
          <Button
            onClick={() => navigate("/login")}
            type="button"
            fullWidth
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={registerReducer.isFetching}
          >
            Create
          </Button>
        </Stack>
      </form>
    );
  };

  const initialValues: User = { username: "", password: "",createdAt: new Date() };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Register
            </Typography>
            <Formik
              onSubmit={async (values, {}) => {
                dispatch(registerActions.register(values, navigate));
              }}
              initialValues={initialValues}
            >
              {(props) => showFormV2(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default RegisterPage;
