import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { BookDataType } from "api/getAllBooks";
import { useAppDispatch } from "store";
import { addBookToCart } from "redux/slices/books";
import { toggleCartDrawer } from "redux/slices/ui";

type BookItemProps = {
  bookData: BookDataType;
};

export const BookItem: FC<BookItemProps> = ({ bookData }) => {
  const dispatch = useAppDispatch();

  const handleClick: (id: number, cover_url: string, title: string) => void = (
    id,
    cover_url,
    title
  ) => {
    dispatch(addBookToCart({ id, cover_url, title }));
    dispatch(toggleCartDrawer());
  };

  return (
    <Flex
      borderRadius="md"
      flexDirection={{ base: "column", sm: "row" }}
      bg="white"
      p={{ base: 2, sm: 4 }}
      fontSize="16px"
      color="gray.600"
    >
      <Center pb={{ base: 2, sm: 0 }} mr={{ base: 0, sm: 4 }}>
        <Image maxW="130px" src={bookData.cover_url} />
      </Center>
      <Stack w="100%">
        <Box>
          <Text d="inline" pr={2}>
            Tytuł:
          </Text>
          <Text d="inline">{bookData.title}</Text>
        </Box>
        <Box>
          <Text d="inline" pr={2}>
            Autor:
          </Text>
          <Text d="inline">{bookData.author}</Text>
        </Box>
        <Box>
          <Text d="inline" pr={2}>
            Ilość stron:
          </Text>
          <Text d="inline">{bookData.pages}</Text>
        </Box>
        <Box>
          <Text d="inline" pr={2}>
            Cena:
          </Text>
          <Text d="inline">
            {bookData.price} {bookData.currency}
          </Text>
        </Box>
        <Spacer />
        <Center>
          <Button
            size="sm"
            w="100%"
            onClick={() =>
              handleClick(bookData.id, bookData.cover_url, bookData.title)
            }
          >
            DODAJ DO KOSZYKA
          </Button>
        </Center>
      </Stack>
    </Flex>
  );
};
