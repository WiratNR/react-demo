import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { FormikProps, Form, Field, Formik } from "formik";
import { TextField } from "formik-material-ui";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { useAppDispatch } from "../../..";
import { RootReducers } from "../../../reducers";
import { Product } from "../../../types/product.type";
import * as productDetailActions from "../../../actions/product.detail.action";

const ProductDetailPage: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const productDetailReducer = useSelector(
    (state: RootReducers) => state.productDetailReducer
  );

  const match = useMatch("/product/detail/:id");
  React.useEffect(() => {
    let id = match?.params.id;
    dispatch(productDetailActions.getProductDetailById(id));
  }, []);

  const showPreviewImage = (values: any) => {
    if (values.thumbnail) {
      // eslint-disable-next-line jsx-a11y/alt-text
      return <img src={values.thumbnail} style={{ height: 150 }} />;
    }
  };

  const showForm = ({ values }: FormikProps<Product>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Product Detail
            </Typography>
            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="title"
              type="text"
              label="Product Name"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Price"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="stock"
              type="text"
              label="Stock"
            />
          </CardContent>
          <CardActions>
            <Button component={Link} to="/product" variant="outlined" fullWidth>
              back
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const initialValues: Product = {
    title: "loading...",
    stock: 0,
    price: 0,
  };

  return (
    <Box>
      <Formik
        initialValues={
          productDetailReducer.result
            ? productDetailReducer.result
            : initialValues
        }
        onSubmit={(values) => {}}
      >
        {(props: any) => showForm(props)}
      </Formik>
    </Box>
  );
};

export default ProductDetailPage;
