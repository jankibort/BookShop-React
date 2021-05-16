import {
  Box,
  Center,
  Circle,
  Container,
  Flex,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/layout";
import { ROUTES } from "constants/routes";
import { SIZES } from "constants/ui";
import { FC } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { Link as RouterLink } from "react-router-dom";
import { toggleCartDrawer } from "redux/slices/ui";
import { useAppDispatch, useAppSelector } from "store";

export const Appbar: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { booksInCart } = useAppSelector((state) => state.books);

  return (
    <Center bg="gray.700" h={SIZES.APPBAR_HEIGHT} boxShadow="lg">
      <Container maxW="container.xl">
        <Flex>
          <Box>
            <Link
              as={RouterLink}
              to={ROUTES.BOOKS}
              _hover={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
            >
              <Heading color="teal.100" d="inline" lineHeight="1">
                KSIĘ
              </Heading>
              <Heading color="teal.300" d="inline" lineHeight="1">
                GARNIA
              </Heading>
            </Link>
          </Box>
          <Spacer />
          <Circle
            color="teal.100"
            size="40px"
            _hover={{ color: "teal.200", bg: "gray.800" }}
            cursor="pointer"
            transitionDuration=".3s"
            onClick={() => dispatch(toggleCartDrawer())}
            position="relative"
          >
            <BiShoppingBag size={26} />
            {booksInCart.length > 0 && (
              <Circle
                size="12px"
                position="absolute"
                bg="red.500"
                top="7px"
                right="7px"
              />
            )}
          </Circle>
        </Flex>
      </Container>
    </Center>
  );
};
