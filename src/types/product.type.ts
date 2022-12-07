export interface Product {
  id?: number;
  product_name: string;
  image?: string;
  price: number;
  unit: string;
  createdAt?: Date;
  updatedAt?: Date;
  url_img?: any;
  url_img_correct?: any;
  file_obj?: URL | string;
  message?: any;
}
