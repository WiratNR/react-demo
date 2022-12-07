import { Padding } from "@mui/icons-material";
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
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../..";
import { Product } from "../../../types/product.type";
import * as productActions from "../../../actions/product.action";

type ProductCreatePageProps = {
  //
};

const ProductCreatePage: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 150 }} />;
    }
  };

  const showForm = ({
    values,
    setFieldValue,
    isSubmitting,
  }: FormikProps<Product>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Create Product
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="product_name"
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
              name="unit"
              type="text"
              label="Unit"
            />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <img
                src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                style={{ width: 25, height: 20 }}
              />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                Add Picture
              </span>

              <input
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault();
                  const filename = e.target.files[0].name;
                  let files = e.target.files;
                  console.log(files[0])
                  let fileReader = new FileReader();
                  fileReader.readAsDataURL(files[0]);
                  //
                  fileReader.onload = (e) => {
                    setFieldValue("url_img", {
                      data: e.target?.result?.toString().replace(/^.*,/, ""),
                      filename: filename,
                    }); // for upload
                  };
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/product" variant="outlined" fullWidth>
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const initialValues: Product = { product_name: "", unit: "", price: 0 };

  return (
    <Box>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.product_name) errors.product_name = "Enter name";
          if (!values.unit) errors.unit = "Enter unit";
          if (values.price < 100)
            errors.price = "Min price is not lower than 100";
          return errors;
        }}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          // let formData = new FormData();
          // formData.append("id", String(values.id));
          // formData.append("product_name", values.product_name);
          // formData.append("price", String(values.price));
          // formData.append("unit", String(values.unit));
          // console.log("values : ",values)
          dispatch(productActions.addProduct(values, navigate));
          setSubmitting(false);
        }}
      >
        {(props: any) => showForm(props)}
      </Formik>
    </Box>
  );
};

export default ProductCreatePage;
