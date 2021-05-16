import {
  Box,
  Center,
  IconButton,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { getAllBooks, BookDataType, BookMetadataType } from "api/getAllBooks";
import { BookItem } from "components/BookItem";
import { FC, useEffect, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

export const BooksPage: FC<{}> = () => {
  const [loadedBooksData, setLoadedBooksData] =
    useState<{ data: BookDataType[]; metadata: BookMetadataType } | null>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    getAllBooks(activePage).then((json) => setLoadedBooksData(json));
    if (loadedBooksData) {
      setTotalPages(
        Math.ceil(
          loadedBooksData.metadata.total_records /
            loadedBooksData.metadata.records_per_page
        )
      );
    }
  }, [activePage]);

  return (
    <>
      {!loadedBooksData ? (
        <Center h="100%">
          <Spinner
            thickness="4px"
            speed="0.5s"
            emptyColor="gray.200"
            color="gray.600"
            size="xl"
          />
        </Center>
      ) : (
        <>
          <Box mb={3} color="gray.600">
            <Text d="inline">Page:</Text>
            <IconButton
              size="sm"
              icon={<IoMdArrowDropleft size={20} />}
              _focus={{ boxShadow: "none" }}
              onClick={() => setActivePage(activePage - 1)}
              aria-label=""
            />
            <Text d="inline">{activePage}</Text>
            <IconButton
              size="sm"
              icon={<IoMdArrowDropright size={20} />}
              _focus={{ boxShadow: "none" }}
              onClick={() => setActivePage(activePage + 1)}
              aria-label=""
            />
            <Text d="inline">of {totalPages}</Text>
          </Box>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 3, sm: 6, md: 8 }}
            h="100%"
          >
            {loadedBooksData.data.map((data) => (
              <BookItem key={data.id} bookData={data} />
            ))}
          </SimpleGrid>
          <Box mt={3} color="gray.600">
            <Text d="inline">Page:</Text>
            <IconButton
              size="sm"
              icon={<IoMdArrowDropleft size={20} />}
              _focus={{ boxShadow: "none" }}
              onClick={() => setActivePage(activePage - 1)}
              aria-label=""
            />
            <Text d="inline">{activePage}</Text>
            <IconButton
              size="sm"
              icon={<IoMdArrowDropright size={20} />}
              _focus={{ boxShadow: "none" }}
              onClick={() => setActivePage(activePage + 1)}
              aria-label=""
            />
            <Text d="inline">of {totalPages}</Text>
          </Box>
        </>
      )}
    </>
  );
};
