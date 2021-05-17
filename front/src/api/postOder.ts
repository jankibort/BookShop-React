import axios from "axios";

export type OrderDataType = {
  order: { id: number; quantity: number }[];
  first_name: string;
  last_name: string;
  city: string;
  zip_code: string;
};

export const postOrder: (
  orderData: OrderDataType
) => Promise<OrderDataType | void> = async (orderData) =>
  await axios
    .post("http://localhost:3001/api/order", orderData)
    .then((response) => console.log(response));
