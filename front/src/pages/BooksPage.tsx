import {
  Box,
  Center,
  IconButton,
  ScaleFade,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { getAllBooks, BookDataType } from "api/getAllBooks";
import { BookItem } from "components/BookItem";
import { FC, useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

enum PagingOptions {
  Prev,
  Next,
}

export const BooksPage: FC<{}> = () => {
  const [loadedBooksData, setLoadedBooksData] =
    useState<BookDataType[] | null>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [booksLoaded, setBooksLoaded] = useState<boolean>(false);

  useEffect(() => {
    getAllBooks(activePage).then((json) => {
      setLoadedBooksData(json.data);
      setTotalPages(
        Math.ceil(json.metadata.total_records / json.metadata.records_per_page)
      );
      setBooksLoaded(true);
    });
  }, [activePage, booksLoaded]);

  const handlePageChange = (option: PagingOptions) => {
    setBooksLoaded(false);
    option === PagingOptions.Next && setActivePage(activePage + 1);
    option === PagingOptions.Prev && setActivePage(activePage - 1);
    setBooksLoaded(true);
  };

  return (
    <>
      {!loadedBooksData && (
        <Center h="100%">
          <Spinner
            thickness="4px"
            speed="0.5s"
            emptyColor="gray.200"
            color="gray.600"
            size="xl"
          />
        </Center>
      )}
      <ScaleFade unmountOnExit={true} initialScale={0.92} in={booksLoaded}>
        <Box mb={3} color="gray.600">
          <Text d="inline">Strona:</Text>
          <IconButton
            size="sm"
            icon={<IoMdArrowDropleft size={20} />}
            _focus={{ boxShadow: "none" }}
            onClick={() => handlePageChange(PagingOptions.Prev)}
            aria-label=""
            disabled={activePage === 1}
          />
          <Text d="inline">{activePage}</Text>
          <IconButton
            size="sm"
            icon={<IoMdArrowDropright size={20} />}
            _focus={{ boxShadow: "none" }}
            onClick={() => handlePageChange(PagingOptions.Next)}
            aria-label=""
            disabled={activePage === totalPages}
          />
          <Text d="inline">z {totalPages}</Text>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 3, sm: 6, md: 8 }}
          h="100%"
        >
          {loadedBooksData?.map((data) => (
            <BookItem key={data.id} bookData={data} />
          ))}
        </SimpleGrid>
        <Box mt={3} color="gray.600">
          <Text d="inline">Strona:</Text>
          <IconButton
            size="sm"
            icon={<IoMdArrowDropleft size={20} />}
            _focus={{ boxShadow: "none" }}
            onClick={() => handlePageChange(PagingOptions.Prev)}
            aria-label=""
            disabled={activePage === 1}
          />
          <Text d="inline">{activePage}</Text>
          <IconButton
            size="sm"
            icon={<IoMdArrowDropright size={20} />}
            _focus={{ boxShadow: "none" }}
            onClick={() => handlePageChange(PagingOptions.Next)}
            aria-label=""
            disabled={activePage === totalPages}
          />
          <Text d="inline">z {totalPages}</Text>
        </Box>
      </ScaleFade>
    </>
  );
};
