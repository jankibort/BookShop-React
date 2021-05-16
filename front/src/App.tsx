import { BooksPage } from "pages/BooksPage";
import { Appbar } from "components/Appbar";
import { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { OrderPage } from "pages/OrderPage";
import { ROUTES } from "constants/routes";
import { Box, Container } from "@chakra-ui/react";
import { CartDrawer } from "components/CartDrawer";
import { SIZES } from "constants/ui";

export const App: FC<{}> = () => (
  <Box h="100vh" bg="gray.100">
    <Appbar />
    <CartDrawer />
    <Box overflowY="scroll" h={`calc(100vh - ${SIZES.APPBAR_HEIGHT})`}>
      <Container py={6} maxW="container.xl">
        <Switch>
          <Route exact path={ROUTES.BOOKS}>
            <BooksPage />
          </Route>
          <Route exact path={ROUTES.ORDER}>
            <OrderPage />
          </Route>
          <Route path="*">
            <Redirect to={ROUTES.BOOKS} />
          </Route>
        </Switch>
      </Container>
    </Box>
  </Box>
);
