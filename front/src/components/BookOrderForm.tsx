import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector } from "store";
import { postOrder } from "api/postOder";

type BookFormInputs = {
  first_name: string;
  last_name: string;
  city: string;
  zip_code: string;
};

const schema = yup.object().shape({
  first_name: yup
    .string()
    .required("Wprowadź imię")
    .matches(/^[\s\p{L}\-']+$/u, "Niepoprawny format"),
  last_name: yup
    .string()
    .required("Wprowadź nazwisko")
    .matches(/^[\s\p{L}\-']+$/u, "Niepoprawny format"),
  city: yup
    .string()
    .required("Wprowadź nazwę miejscowości")
    .matches(
      /^[\s\p{L}\-]+$/u,
      "City should contain only letters and '-' sign"
    ),
  zip_code: yup
    .string()
    .required("Wprowadź kod pocztowy")
    .matches(
      /^[0-9]{2}(?:-[0-9]{3})?$/,
      "Postal code is invalid (00-000 format required)"
    ),
});

export const BookOrderForm: FC<{}> = () => {
  const { booksInCart } = useAppSelector((state) => state.books);
  const [postRequested, setPostRequested] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: BookFormInputs) => {
    setPostRequested(true);
    const booksDetails = booksInCart.map((bookItem) => {
      return { id: bookItem.id, quantity: bookItem.quantity };
    });
    const orderData = { ...formData, order: booksDetails };
    postOrder(orderData)
      .then(() => {
        setTimeout(() => {
          toast({
            title: "Udało się złożyć zamówienie",
            isClosable: true,
            status: "success",
            variant: "subtle",
            duration: 5000,
          });
          setPostRequested(false);
        }, 500);
      })
      .catch(() => {
        setTimeout(() => {
          toast({
            title: "Wystąpił błąd podczas składania zamówienia",
            isClosable: true,
            status: "error",
            variant: "subtle",
            duration: 5000,
          });
          setPostRequested(false);
        }, 500);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={errors.first_name && true}>
          <FormLabel>Imię</FormLabel>
          <Input size="sm" {...register("first_name")} />
          <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.last_name && true}>
          <FormLabel>Nazwisko</FormLabel>
          <Input size="sm" {...register("last_name")} />
          <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.city && true}>
          <FormLabel>Miejscowość</FormLabel>
          <Input size="sm" {...register("city")} />
          <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.zip_code && true}>
          <FormLabel>Kod pocztowy</FormLabel>
          <Input size="sm" {...register("zip_code")} />
          <FormErrorMessage>{errors.zip_code?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          disabled={!booksInCart.length || postRequested}
        >
          {postRequested ? (
            <Spinner
              thickness="4px"
              speed="0.5s"
              emptyColor="gray.200"
              color="gray.600"
              size="sm"
            />
          ) : (
            <>ZAMAWIAM I PŁACĘ</>
          )}
        </Button>
      </Stack>
    </form>
  );
};
