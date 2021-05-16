import axios from "axios";

export type BookDataType = {
  author: string;
  id: number;
  pages: number;
  currency: string;
  price: number;
  title: string;
  cover_url: string;
};

export const getBookById: (id: number) => Promise<{
  data: BookDataType;
}> = async (id) => {
  const result = await axios
    .get(`http://localhost:3001/api/book/${id}`)
    .then((res) => res.data)
    .then((json) => json);

  return result;
};
