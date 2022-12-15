import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { User } from "../../../types/user.type";
import { useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../../actions/login.action";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../..";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import * as Yup from 'yup';

// npx crcf -f --notest --typescript DashBoard

type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);

  const [visible, setVisible] = React.useState(false);

  const dispatch: any = useAppDispatch();
  const navigate = useNavigate();

  const classes: SxProps<Theme> | any = {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "88vh",
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
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          onChange={handleChange}
          value={values.email}
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
        <br />

        {loginReducer.isError && <Alert severity="error">Email or password incorrect</Alert>}

        <Stack direction="column" spacing={2} sx={classes.bottons}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loginReducer.isFetching}
          >
            Login
          </Button>
        </Stack>
      </form>
    );
  };

  const initialValues: User = { email: "", password: "" };

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(4, 'Too Short!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Formik
            //  validationSchema={SignupSchema}
              onSubmit={(values, {}) => {
                dispatch(loginActions.login(values, navigate));
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

export default LoginPage;
