import {
  Typography,
  Stack,
  IconButton,
  Box,
  Paper,
  Button,
  Divider,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  DialogTitle,
  DialogTitleProps,
  Dialog,
  DialogActions,
  styled,
  FormControlLabel,
  DialogContentText,
} from "@mui/material";
import { GridColDef, GridRenderCellParams, DataGrid } from "@mui/x-data-grid";
import { useDebounce } from "@react-hook/debounce";
import * as React from "react";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../..";
import { image_url, USERID } from "../../../Constants";
import { RootReducers } from "../../../reducers";
import * as stockActions from "../../../actions/stock.action";
import * as productActions from "../../../actions/product.action";
import * as majorActions from "../../../actions/major.action";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Clear, Search } from "@mui/icons-material";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import Moment from "react-moment";
import { Stock } from "../../../types/stock.type";
import { FormikProps, Form, Field, Formik } from "formik";
import { TextField, Select, RadioGroup } from "formik-material-ui";
import { Product } from "../../../types/product.type";

type StockPageProps = {
  //
};

const StockPage: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const productReducer = useSelector(
    (state: RootReducers) => state.productReducer
  );
  const majorReducer = useSelector((state: RootReducers) => state.majorReducer);
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  const [selectedStock, setSelectedStock] = React.useState<Stock | null>(null);
  const [edit, setEdit] = React.useState<any>("");
  //
  //
  const [openDialogDelete, setOpenDialogDelete] =
    React.useState<boolean>(false);

  //
  //model
  const [open, setOpen] = React.useState<boolean>(false);
  //
  //
  React.useEffect(() => {
    dispatch(stockActions.loadStockByKeyword(keywordSearch));
  }, [dispatch, keywordSearch]);

  React.useEffect(() => {
    dispatch(productActions.loadProduct());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(majorActions.loadMajor());
  }, [dispatch]);

  const stockColumns: GridColDef[] = [
    {
      headerName: "รหัสทำรายการ",
      headerAlign: "center",
      align: "center",
      field: "id",
      width: 120,
    },
    {
      headerName: "ชื่อสินค้า",
      headerAlign: "center",
      field: "product_name",
      width: 250,
    },
    {
      headerName: "จำนวนโอนเข้า",
      headerAlign: "center",
      width: 120,
      align: "right",
      field: "amount_In",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      headerName: "จำนวนโอนออก",
      headerAlign: "center",
      width: 120,
      align: "right",
      field: "amount_Out",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      headerName: "ราคาต่อหน่วย",
      headerAlign: "center",
      align: "right",
      field: "price_unit",
      width: 120,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      headerName: "รวม",
      headerAlign: "center",
      width: 120,
      align: "right",
      field: "amt_total",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      headerName: "ชื่อผู้ใช้",
      headerAlign: "center",
      width: 140,
      align: "center",
      field: "account_name",
    },
    {
      headerName: "ชื่อสาขาโอนเข้า/ออก",
      headerAlign: "center",
      width: 170,
      align: "left",
      field: "major_name",
    },
    {
      headerName: "วันที่",
      field: "datetime",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      headerName: "ACTION",
      headerAlign: "center",
      field: ".",
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              setOpen(true);
              setEdit(row);
              console.log(row);
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedStock(row);
              setOpenDialogDelete(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  // ----------------------------------------dialog--------------------------------------------------------
  //
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  //-------------------------------------dialog delete----------------------------------------------------

  const handleDeleteConfirm = () => {
    dispatch(stockActions.deleteStock(String(selectedStock!.id!)));
    setOpenDialogDelete(false);
  };

  const dialogDelete = () => {
    return (
      <Dialog
        open={openDialogDelete}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          คุณต้องการลบชื่อสินค้านี้หรือไม่: {selectedStock?.product_name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            You cannot restore deleted product.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialogDelete(false)}
            color="info"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="outlined"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  //-------------------------------------dialog delete----------------------------------------------------

  // ----------------------------------------dialog--------------------------------------------------------

  const onModel2 = ({
    values,
    setFieldValue,
    isSubmitting,
    setValues,

    submitForm,
  }: FormikProps<Stock>) => {
    return (
      <Form>
        {/* page add stock */}

        <Paper sx={{ padding: 4 }}>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              mb={2}
              mt={2}
              divider={<Divider orientation="horizontal" flexItem />}
            >
              <Typography variant="h5">Add Stock</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  setOpen(true);
                  setEdit("");
                }}
              >
                New Stock
              </Button>
            </Stack>

            <DataGrid
              // components={{ Toolbar: QuickSearchToolbar }}
              // componentsProps={{
              //   toolbar: {
              //     value: keywordSearchNoDelay,
              //     onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              //       setKeywordSearch(e.target.value);
              //       setKeywordSearchNoDelay(e.target.value);
              //     },
              //     clearSearch: () => {
              //       setKeywordSearch("");
              //       setKeywordSearchNoDelay("");
              //     },
              //   },
              // }}
              sx={{ backgroundColor: "white", height: "70vh" }}
              rows={stockReducer.result ? stockReducer.result : []}
              columns={stockColumns}
              pageSize={15}
              rowsPerPageOptions={[15]}
            />
          </Box>
        </Paper>

        {/* page add stock */}

        {/* Dialog */}

        <BootstrapDialog
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={() => {
              setOpen(false);
            }}
          >
            {edit
              ? "แก้ไขรายการสินค้า : " + edit.product_name
              : "เพิ่มรายการสินค้า"}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <Typography sx={{ mt: 2 }}>
                <Stack spacing={2}>
                  {/*รับเข้า ส่งออก */}
                  <Field
                    defaultValue="IN"
                    component={RadioGroup}
                    name="status"
                    row
                  >
                    <FormControlLabel
                      value="IN"
                      control={<Radio disabled={isSubmitting} />}
                      label="รับเข้า"
                      disabled={isSubmitting}
                    />
                    <FormControlLabel
                      value="OUT"
                      control={<Radio disabled={isSubmitting} />}
                      label="ส่งออก"
                      disabled={isSubmitting}
                    />
                  </Field>
                  {/* Product Name */}
                  <FormControl fullWidth sx={{ minHeight: 50 }}>
                    <Field
                      component={Select}
                      label="ชื่อสินค้า"
                      name="product_id"
                      MenuProps={MenuProps}
                      onChange={(e: any) => {
                        // NOTE: setFieldValue
                        const priceProduct = productReducer.result?.find(
                          (p) => p.id === e.target.value
                        );
                        if (priceProduct) {
                          setFieldValue("price_unit", priceProduct.price);
                        }
                      }}
                    >
                      {productReducer.result?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.product_name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>

                  {/* คงเหลือสาขาใหญ่ เฉพาะส่งออก */}
                  {values.status === "OUT" ? (
                    <Field
                      component={TextField}
                      type="number"
                      name="price_unit"
                      label="คงเหลือสาขาใหญ่"
                      variant="outlined"
                    />
                  ) : (
                    ""
                  )}

                  {/* ราคาต่อหน่วย */}

                  <Field
                    component={TextField}
                    type="number"
                    id="price_unit"
                    name="price_unit"
                    label="ราคาต่อหน่วย"
                    variant="outlined"
                    disabled
                  />
                  {/* จำนวนต่อหน่วย */}
                  <Field
                    fullWidth
                    component={TextField}
                    type="number"
                    name="amount"
                    label="จำนวนต่อหน่วย"
                    variant="outlined"
                    onMouseLeave={(e: any) => {
                      setFieldValue(
                        "amt_total",
                        e.target.value * values.price_unit
                      );
                    }}
                    onMouseDown={(e: any) => {
                      setFieldValue(
                        "amt_total",
                        e.target.value * values.price_unit
                      );
                    }}
                  />
                  {/* รวม */}
                  <Field
                    fullWidth
                    component={TextField}
                    type="number"
                    name="amt_total"
                    label="รวม"
                    variant="outlined"
                    disabled
                  />

                  {/* ชื่อสาขาโอน/ออก */}
                  <FormControl fullWidth>
                    <Field
                      component={Select}
                      label="ชื่อสาขาโอน/ออก"
                      name="major_id"
                      disabled={isSubmitting}
                      // displayEmpty={true}
                    >
                      {majorReducer.result?.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.major_name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  {/* วันที่ */}
                  <Field
                    fullWidth
                    component={TextField}
                    name="datetime"
                    type="datetime-local"
                    label="วันที่"
                    defaultValue=""
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              size="medium"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              autoFocus
              disabled={isSubmitting}
              variant="contained"
              color="success"
              size="medium"
              type="button"
              onClick={submitForm}
            >
              {edit ? "update" : "Save"}
            </Button>
          </DialogActions>
        </BootstrapDialog>

        {/* Dialog */}
      </Form>
    );
  };

  const initialValues: Stock = {
    price_unit: 0,
    amount: 0,
    amt_total: 0,
    major_id: "",
    product_id: "",
    account_id: localStorage.getItem(USERID),
  };

  return (
    <Box>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.product_id) errors.product_id = "กรุณาเลือกชื่อสินค้า";
          if (!values.amount) errors.amount = "กรุณากรอกจำนวน";
          if (!values.major_id) errors.major_id = "กรุณาเลือกชื่อสาขา";
          if (!values.datetime) errors.datetime = "กรุณาเลือกวันที่";

          return errors;
        }}
        initialValues={initialValues}
        // enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          // console.log("values : ", values);
          if (edit) {
            console.log("update");
            dispatch(stockActions.updateStock(values));
            setSubmitting(false);
            setOpen(false);
          } else {
            dispatch(stockActions.addStock(values));
            setSubmitting(false);
            setOpen(false);
          }
        }}
      >
        {(props: any) => onModel2(props)}
      </Formik>
      {dialogDelete()}
    </Box>
  );
};

export default StockPage;
