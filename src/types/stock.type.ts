// export interface Stock {
//   id?: number;
//   product_id: string;
//   product_name: string;
//   amount: number;
//   price_unit: number;
//   amt_total: number;
//   id_account: string;
//   major_id: string;
//   major_name: string;
//   status: string;
//   datetime?: Date;
//   message?: any;
// }

export interface Stock {
  id?: number;
  product_id?: string;
  product_name?: string;
  amount: number;
  price_unit: number;
  amt_total: number;
  account_id?: any;
  major_id?: string;
  major_name?: string;
  status?: string;
  datetime?: Date;
  message?: any;
}

