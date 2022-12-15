import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import InfoIcon from '@mui/icons-material/Info';

import * as productActions from "../../../actions/product.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import {
  Typography,
  IconButton,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { Clear, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@react-hook/debounce";
import { useAppDispatch } from "../../..";
import _ from "lodash";

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
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(productActions.loadProductByKeyword(keywordSearch));
  }, [dispatch, keywordSearch]);

  React.useEffect(() => {
    dispatch(productActions.loadProduct());
  }, [dispatch]);

  const [filter, setFilter] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
    switch (event.target.value as string) {
      case "1":
        console.log("https://dummyjson.com/products?limit=100");
        break;
      case "2":
        productReducer.result = productReducer.result.filter(
          (r) => r.price >= 1000
        );
        break;
      case "3":
        const data = productReducer.result.map((r) => r.price * r.stock);
        console.log(data);
        break;
      case "4":
        productReducer.result = productReducer.result = _.sortBy(
          productReducer.result,
          "rating"
        );

        break;
      case "5":
        // Use the reduce function to calculate the total price
        const totalPrice = productReducer.result.reduce(
          (prevPrice, currPrice) => {
            return prevPrice + currPrice.price;
          },
          0
        );

        console.log(totalPrice);
        break;
      default:
        break;
    }
  };

  const dataFilter = [
    { value: "1", label: "โชว์สินค้าทั้งหมด" },
    { value: "2", label: "ราคามากว่า 1000" },
    { value: "3", label: "ราคารวมต่อชิ้น" },
    { value: "4", label: "เรียงเรตติ้ง" },
    { value: "5", label: "แสดงราคารวมทั้งหมด" },
  ];

  const stockColumns: GridColDef[] = [
    {
      headerName: "IMG",
      headerAlign: "center",
      field: "thumbnail",
      width: 80,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          src={`${value}`}
          style={{ width: "100%", height: "100%", borderRadius: "5%" }}
        />
      ),
    },
    {
      headerName: "Title",
      headerAlign: "center",
      field: "title",
      width: 500,
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
    {
      headerName: "STOCK",
      headerAlign: "center",
      align: "right",
      field: "stock",
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
      headerName: "Detail",
      headerAlign: "center",
      field: ".",
      width: 120,
      align: "center",
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() => {
            navigate("/product/detail/" + row.id);
          }}
        >
          <InfoIcon fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
          {dataFilter?.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
    </Box>
  );
}
