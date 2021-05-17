import { Box, SimpleGrid, Text } from "@chakra-ui/layout";
import { BookOrderForm } from "components/BookOrderForm";
import { CartItemsList } from "components/CartItemsList";
import { FC } from "react";

export const OrderPage: FC<{}> = () => {
  return (
    <Box p={4} borderRadius="md" bg="white">
      <Text mb={4} fontSize="xl">
        Szczegóły zamówienia
      </Text>
      <SimpleGrid spacing={6} columns={2}>
        <Box>
          <BookOrderForm />
        </Box>
        <Box>
          <CartItemsList />
        </Box>
      </SimpleGrid>
    </Box>
  );
};
