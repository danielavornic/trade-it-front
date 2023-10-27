import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  Select,
  Divider,
  Card,
  CardBody,
} from "@chakra-ui/react";

import { products, categories as categoriesApi, images } from "@/api";
import { useAuth } from "@/hooks";
import { Layout } from "@/components";
import { Category, Condition } from "@/types";

const initialFormValues = {
  name: "",
  description: "",
  details: "",
  category_id: "",
  condition: "",
  targetProducts: "",
  img: "",
};

const sidebarItems = [
  {
    label: "Profile",
    href: "/account",
  },
  {
    label: "Products",
    href: "/account/products",
  },
  {
    label: "Add product",
    href: "/products/add",
  },
  {
    label: "Transactions",
    href: "/account/transactions",
  },
  {
    label: "Reviews",
    href: "/account/reviews",
  },
  {
    label: "Settings",
    href: "/account/settings",
  },
];

const FALLBACK_IMAGE = "/assets/images/fallback.png";

const AddProductPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getList(),
  });

  const [formValues, setFormValues] = useState(initialFormValues);
  const [imageUrl, setImageUrl] = useState(FALLBACK_IMAGE);
  const [productId, setProductId] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setSelectedImage(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    } else {
      setImageUrl(FALLBACK_IMAGE);
    }
  };

  const { mutate: addProduct } = useMutation(products.add, {
    onSuccess: ({ product_id }: any) => {
      setProductId(product_id);
      addImage({ product_id, image: selectedImage as File });
    },
  });

  const { mutate: addImage } = useMutation(images.add, {
    onSuccess: () => {
      router.push(`/product/${productId}`);
      queryClient.invalidateQueries(["products"]);
      window.scrollTo(0, 0);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) =>
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));

  const handleSelectChange = (name: string, e: any) => {
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    addProduct({
      ...formValues,
      category_id: Number(formValues.category_id),
      seller_id: Number(user?.id) || 1,
      condition: formValues.condition,
    });
  };

  return (
    <Layout title="Add product">
      <HStack as="section" mb={20} h="full" alignItems="start" justifyContent="space-between">
        <VStack w="20%" alignItems="start">
          <HStack w="full" justifyContent="space-between" alignItems="baseline">
            <Heading size="md" textTransform="uppercase" textAlign="left">
              Account
            </Heading>
          </HStack>
          <Divider my={3} />

          <VStack w="full" alignItems="start">
            {sidebarItems.map((item) => (
              <Button
                w="full"
                fontWeight={router.pathname === item.href ? "bold" : "normal"}
                variant="ghost"
                justifyContent="flex-start"
                color="gray.600"
                key={item.label}
                onClick={() => router.push(item.href)}
                fontFamily="poppins"
              >
                {item.label}
              </Button>
            ))}
          </VStack>
        </VStack>

        <Box w="75%">
          <Card shadow="sm" w="full" border="1px solid" borderColor="gray.100">
            <CardBody py={4}>
              <HStack spacing={4} justifyContent="space-between" alignItems="center">
                <Heading size="md" textAlign="left">
                  Add product
                </Heading>

                <Flex alignItems="center" justifyContent="flex-end">
                  <Button colorScheme="gray" fontFamily="poppins" mr={4}>
                    Discard
                  </Button>
                  <Button colorScheme="brand" fontFamily="poppins" onClick={handleSubmit}>
                    Save product
                  </Button>
                </Flex>
              </HStack>
            </CardBody>
          </Card>
          <form id="add-product-form" onSubmit={handleSubmit}>
            <Box as="section" py={10}>
              <HStack justifyContent="space-between" alignItems="start">
                <VStack w="58%" alignItems={"start"}>
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
                      <Input
                        type="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <FormControl id="category_id" isRequired>
                      <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                        Category
                      </FormLabel>
                      <Select
                        placeholder="Select category"
                        onChange={(val) => handleSelectChange("category_id", val)}
                      >
                        {categories?.map(({ id, name }: Category) => (
                          <option key={id} value={id}>{name}</option>
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
                      <Select
                        placeholder="Select condition"
                        onChange={(val) => handleSelectChange("condition", val)}
                      >
                        <option value="NEW">New</option>
                        <option value="LIKE NEW">Like new</option>
                        <option value="USED">Used</option>
                      </Select>
                    </FormControl>
                    {/* 
                    <FormControl id="city_id" isRequired>
                      <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                        City
                      </FormLabel>
                      <Select
                        placeholder="Select city"
                        onChange={(val) => handleSelectChange("city_id", val)}
                      >
                        <option value="1">New</option>
                        <option value="2">Like new</option>
                        <option value="3">Used</option>
                      </Select>
                    </FormControl> */}

                    <FormControl id="targetProducts" isRequired>
                      <FormLabel color="gray.600" fontFamily="poppins" fontWeight="bold">
                        Items to look for
                      </FormLabel>
                      <Input
                        type="text"
                        name="targetProducts"
                        value={formValues.targetProducts}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </VStack>
                </VStack>

                <Box w="40%">
                  <FormControl
                    isRequired
                    borderRadius={6}
                    p={5}
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Image src={imageUrl} alt="product" w="full" mb={6} />
                    <input
                      type="file"
                      accept="image/*"
                      id="file-input"
                      className="file-input"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="file-input" className="file-input-label">
                      Choose file
                    </label>
                  </FormControl>
                </Box>
              </HStack>
            </Box>
          </form>
        </Box>
      </HStack>
    </Layout>
  );
};

export default AddProductPage;
