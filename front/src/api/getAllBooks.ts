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

export type BookMetadataType = {
  page: number;
  records_per_page: number;
  total_records: number;
};

export const getAllBooks: (page: number) => Promise<{
  data: BookDataType[];
  metadata: BookMetadataType;
}> = async (page) => {
  return await axios
    .get("http://localhost:3001/api/book", { params: { page: page } })
    .then((res) => res.data)
    .then((json) => json);
};
