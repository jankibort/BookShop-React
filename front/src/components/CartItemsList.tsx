import { FC } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { Image, Center, Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { modifyQuantity, ModifyQuantityOption } from "redux/slices/books";

export const CartItemsList: FC<{}> = () => {
  const { booksInCart } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  const handleClick = (modifyOption: ModifyQuantityOption, id: number) => {
    dispatch(modifyQuantity({ option: modifyOption, id }));
  };

  return (
    <>
      {!booksInCart.length ? (
        <Text fontSize="15px" color="gray.500">
          Koszyk jest pusty
        </Text>
      ) : (
        <>
          {booksInCart.map((book) => (
            <Flex
              key={book.id}
              borderRadius="md"
              bg="white"
              p={{ base: 2, sm: 4 }}
              fontSize="16px"
              color="gray.600"
            >
              <Center mr={4}>
                <Image maxW="76px" src={book.cover_url} />
              </Center>
              <Box>
                <Text>Tytuł : {book.title}</Text>
                <Text d="inline">Ilość sztuk :</Text>
                <Text px={2} d="inline">
                  {book.quantity}
                </Text>
                <IconButton
                  mx={2}
                  size="xs"
                  icon={<BiMinus size={18} />}
                  aria-label="decrease quantity"
                  onClick={() =>
                    handleClick(ModifyQuantityOption.Remove, book.id)
                  }
                />
                <IconButton
                  size="xs"
                  icon={<BiPlus size={18} />}
                  aria-label="increase quantity"
                  onClick={() => handleClick(ModifyQuantityOption.Add, book.id)}
                />
              </Box>
            </Flex>
          ))}
        </>
      )}
    </>
  );
};
