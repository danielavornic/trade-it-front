import { products } from "@/api";
import { Layout } from "@/components";
import { getCategories } from "@/data";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  VStack,
  useToast,
  Image,
  Input,
  Textarea,
  Text,
  Select,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const initialFormValues = {
  name: "",
  description: "",
  details: "",
  category: "",
  condition: "",
  status: "",
  targetProduct: "",
  img: "",
};

const FALLBACK_IMAGE = "/assets/images/fallback.png";

const AddProductPage = () => {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: categories, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [formValues, setFormValues] = useState(initialFormValues);
  const [imageUrl, setImageUrl] = useState(FALLBACK_IMAGE);

  // const { mutate: addMutation } = useMutation(products.add, {
  //   onSuccess: () => {
  //     toastNotification("Product added succesfully", "success");
  //     router.push("/catalog");
  //     queryClient.invalidateQueries(["catalog"]);
  //     window.scrollTo(0, 0);
  //   },
  // });

  const toastNotification = (title: string, status: "success" | "error") =>
    toast({
      title,
      status,
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) =>
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
  };

  return (
    <Layout title="Add item">
      <Flex justifyContent="space-between" mb={4} alignItems="center" as="section" pt={10}>
        <VStack alignItems="start">
          <Text color="gray.600" fontFamily="poppins" fontWeight="bold" fontSize="sm">
            Back to product list
          </Text>
          <Heading as="h2" size="lg">
            Add new product
          </Heading>
        </VStack>

        {/* <Flex alignItems="center">
          <Button colorScheme="gray" fontFamily="poppins" mr={4}>
            Discard
          </Button>
          <Button colorScheme="brand" fontFamily="poppins" onClick={handleSubmit}>
            Save product
          </Button>
        </Flex> */}
      </Flex>

      <form id="add-product-form" onSubmit={handleSubmit}>
        <Box as="section" py={10}>
          <HStack justifyContent="space-between" alignItems="start">
            <VStack w="58%" alignItems={"start"}>
              <Heading as="h3" size="md" textAlign="left" mb={8}>
                Product Details
              </Heading>
              <VStack
                w="full"
                spacing={8}
                border="1px solid"
                borderColor="gray.200"
                p={5}
                borderRadius={6}
              >
                <FormControl id="name" isRequired>
                  <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                    Name
                  </FormLabel>
                  <Input type="name" name="name" value={formValues.name} onChange={handleChange} />
                </FormControl>

                <FormControl id="category" isRequired>
                  <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                    Category
                  </FormLabel>
                  <Select placeholder="Select category">
                    {categories?.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl id="description" isRequired>
                  <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                    Description
                  </FormLabel>
                  <Textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    height="100px"
                    resize="vertical"
                  />
                </FormControl>

                <FormControl id="details">
                  <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                    Details
                  </FormLabel>
                  <Textarea
                    name="details"
                    value={formValues.details}
                    onChange={handleChange}
                    height="150px"
                    resize="vertical"
                  />
                </FormControl>

                <FormControl id="condition" isRequired>
                  <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                    Condition
                  </FormLabel>
                  <Select placeholder="Select condition">
                    <option value="new">New</option>
                    <option value="like-new">Like new</option>
                    <option value="used">Used</option>
                  </Select>
                </FormControl>

                <FormControl id="targetProduct" isRequired>
                  <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                    Items to look for
                  </FormLabel>
                  <Input
                    type="text"
                    name="targetProduct"
                    value={formValues.targetProduct}
                    onChange={handleChange}
                  />
                </FormControl>
              </VStack>
            </VStack>

            <Box w="40%">
              <Heading as="h3" size="md" textAlign="left" mb={8}>
                Product Image
              </Heading>
              <FormControl
                isRequired
                borderRadius={6}
                p={5}
                border="1px solid"
                borderColor="gray.200"
              >
                <Image src={imageUrl} alt="product" w="full" mb={6} />
                <input type="file" accept="image/*" id="file-input" className="file-input" />
                <label htmlFor="file-input" className="file-input-label">
                  Choose file
                </label>
              </FormControl>

              <Flex alignItems="center" justifyContent="flex-end" mt={8}>
                <Button colorScheme="gray" fontFamily="poppins" mr={4}>
                  Discard
                </Button>
                <Button colorScheme="brand" fontFamily="poppins" onClick={handleSubmit}>
                  Save product
                </Button>
              </Flex>
            </Box>
          </HStack>
        </Box>
      </form>
    </Layout>
  );
};

export default AddProductPage;
