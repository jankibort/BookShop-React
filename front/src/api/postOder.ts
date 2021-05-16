import axios from "axios";

export type OrderDataType = {
  author: string;
  id: number;
  pages: number;
  currency: string;
  price: number;
  title: string;
  cover_url: string;
};

// export const postOrder: Promise<OrderDataType> => void = async({orderData}) =>
//   await axios
//     .post("http://localhost:3001/api/order", { params: { page: page } })
//     .then((res) => res.data);
