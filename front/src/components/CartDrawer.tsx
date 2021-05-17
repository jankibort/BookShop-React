import {
  Divider,
  Flex,
  Spacer,
  Text,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FC } from "react";
import { toggleCartDrawer } from "redux/slices/ui";
import { useAppDispatch, useAppSelector } from "store";
import { GrFormClose } from "react-icons/gr";
import { ROUTES } from "constants/routes";
import { CartItemsList } from "./CartItemsList";

export const CartDrawer: FC<{}> = () => {
  const { isCartDrawerVisible } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleClick = () => {
    history.push(ROUTES.ORDER);
    dispatch(toggleCartDrawer());
  };

  return (
    <Drawer
      onClose={() => dispatch(toggleCartDrawer())}
      isOpen={isCartDrawerVisible}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Flex>
            <Text d="inline-block" fontWeight="bold" fontSize="26px">
              Koszyk
            </Text>
            <Spacer />
            <IconButton
              _focus={{ boxShadow: "none" }}
              variant="ghost"
              aria-label="close drawer"
              icon={<GrFormClose size={26} />}
              onClick={() => dispatch(toggleCartDrawer())}
            />
          </Flex>
        </DrawerHeader>
        <Divider orientation="horizontal" />
        <DrawerBody>
          <CartItemsList />
        </DrawerBody>
        <Divider />
        <DrawerFooter justifyContent="center">
          <Button
            w="100%"
            colorScheme="blackAlpha"
            onClick={() => handleClick()}
          >
            PRZEJDŹ DO ZAMÓWIENIA
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
