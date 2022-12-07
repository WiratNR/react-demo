import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { imageUrl, image_url } from "../../../Constants";
import * as productActions from "../../../actions/product.action";
import { useDispatch, useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import {
  Typography,
  Stack,
  IconButton,
  Box,
  TextField,
  Fab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import Moment from "react-moment";
import {
  Add,
  AddShoppingCart,
  AssignmentReturn,
  Clear,
  NewReleases,
  Search,
  Star,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "@react-hook/debounce";
import { Product } from "../../../types/product.type";
import StockCard from "../../layouts/StockCard";
import { useAppDispatch } from "../../..";

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
      {/* <Box sx={{ flexGrow: 1 }} />
      <Button variant="contained" size="large">เพิ่มสินค้า</Button> */}
      {/* <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to="/product/create"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Add />
      </Fab> */}
      <Button
        variant="contained"
        aria-label="add"
        component={Link}
        to="/product/create"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
        startIcon={<Add />}
      >
        New Product
      </Button>
    </Box>
  );
}

export default function ProductPage() {
  const productReducer = useSelector(
    (state: RootReducers) => state.productReducer
  );
  const dispatch: any = useAppDispatch();
  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");
    
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(productActions.loadProductByKeyword(keywordSearch));
  }, [keywordSearch]);

  React.useEffect(() => {
    dispatch(productActions.loadProduct());
  }, []);

  const stockColumns: GridColDef[] = [
    {
      headerName: "#",
      headerAlign: "center",
      align: "center",
      field: "id",
      width: 120,
    },
    {
      headerName: "IMG",
      headerAlign: "center",
      field: "url_img",
      width: 80,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          src={`${
            value
              ? `${image_url.URL_SHOW_IMG}` + value
              : `${image_url.URL_SHOW_IMG}${image_url.IMG_UNKHOW}`
          }`}
          style={{ width: "100%", height: "100%", borderRadius: "5%" }}
        />
      ),
    },
    {
      headerName: "NAME",
      headerAlign: "center",
      field: "product_name",
      width: 500,
    },
    {
      headerName: "UNIT",
      headerAlign: "center",
      width: 120,
      align: "left",
      field: "unit",
      //   renderCell: ({ value }: GridRenderCellParams<string>) => (
      //     <Typography variant="body1">
      //       <NumericFormat
      //         value={value}
      //         displayType={"text"}
      //         thousandSeparator={true}
      //         decimalScale={0}
      //         fixedDecimalScale={true}
      //       />
      //     </Typography>
      //   ),
    },
    {
      headerName: "PRICE",
      headerAlign: "center",
      align: "right",
      field: "price",
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
    // {
    //   headerName: "TIME",
    //   field: "createdAt",
    //   width: 220,
    //   renderCell: ({ value }: GridRenderCellParams<string>) => (
    //     <Typography variant="body1">
    //       <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
    //     </Typography>
    //   ),
    // },
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
              navigate("/product/edit/" + row.id);
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedProduct(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const handleDeleteConfirm = () => {
    dispatch(
      productActions.deleteProduct(
        String(selectedProduct!.id!),
        String(selectedProduct!.url_img!)
      )
    );
    setOpenDialog(false);
  };

  const showDialog = () => {
    if (selectedProduct === null) {
      return "";
    }

    return (
      <Dialog
        open={openDialog}
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
          <img
            src={`${image_url.URL_SHOW_IMG}${selectedProduct.url_img}`}
            style={{
              width: "30%",
              borderRadius: "5%",
            }}
          />
          <br />
          Confirm to delete the product? : {selectedProduct.product_name}
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
            onClick={() => setOpenDialog(false)}
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

  return (
    <Box>
      {/* Summary Icons */}
      <Grid container style={{ marginBottom: 16 }} spacing={7}>
        <Grid item lg={3} md={6}>
          <StockCard
            icon={AddShoppingCart}
            title="TOTAL"
            subtitle="112 THB"
            color="#00a65a"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={NewReleases}
            title="EMPTY"
            subtitle="9 PCS."
            color="#f39c12"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={AssignmentReturn}
            title="RETURN"
            subtitle="1 PCS."
            color="#dd4b39"
          />
        </Grid>

        <Grid item lg={3} md={6}>
          <StockCard
            icon={Star}
            title="LOSS"
            subtitle="5 PCS."
            color="#00c0ef"
          />
        </Grid>
      </Grid>

      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: keywordSearchNoDelay,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setKeywordSearch(e.target.value);
              setKeywordSearchNoDelay(e.target.value);
            },
            clearSearch: () => {
              setKeywordSearch("");
              setKeywordSearchNoDelay("");
            },
          },
        }}
        sx={{ backgroundColor: "white", height: "70vh" }}
        rows={productReducer.result}
        columns={stockColumns}
        pageSize={15}
        rowsPerPageOptions={[15]}
      />

      {showDialog()}
    </Box>
  );
}
