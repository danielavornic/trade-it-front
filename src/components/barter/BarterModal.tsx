import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Textarea,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";

import { products as productsApi, barters } from "@/api";
import { Product } from "@/types";
import { useAuth } from "@/hooks";
import { ProductCheckbox } from "@/components";

interface BarterModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

export const BarterModal = ({ isOpen, onClose, product }: BarterModalProps) => {
  if (!product) return null;

  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [productId, setProductId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const { data: products, isSuccess } = useQuery({
    queryKey: ["my-products"],
    queryFn: () => productsApi.getList({ seller: user?.id }),
  });

  const { mutate } = useMutation(barters.sendProposal, {
    onSuccess: () => {
      onClose();
      // TODO: modify this to redirect to the barter page
      router.push({ pathname: `/account/barters/1`, query: { barter: "sent" } });
      queryClient.invalidateQueries(["barters"]);
      window.scrollTo(0, 0);
    },
  });

  const resetForm = () => {
    setProductId(null);
    setMessage("");
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productId) return;

    mutate({
      offered_product_id: productId,
      desired_product_id: product.id,
      message,
    });

    resetForm();
  };

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily="poppins">Initiate barter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleFormSubmit} id="barter-form">
            <Box mb="6">
              <Heading as="h2" size="md" mb="4" color="gray.600">
                Selected product
              </Heading>
              <ProductCheckbox product={product} isChecked />
            </Box>

            <Box mb="6">
              <Heading as="h2" size="md" mb="4" color="gray.600">
                Pick one of your products
              </Heading>
              <Box maxH="220px" overflowY="auto" className="small-scrollbar">
                <VStack spacing={4} width="full" alignItems="start" pr={2}>
                  {isSuccess && products?.length === 0 && (
                    <>
                      <Text color="gray.500">You don't have any products.</Text>
                      <Button
                        colorScheme="brand"
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/product/add")}
                      >
                        Add product
                      </Button>
                    </>
                  )}
                  {isSuccess &&
                    products?.length > 0 &&
                    products?.map((product) => (
                      <ProductCheckbox
                        key={product.id}
                        product={product}
                        isChecked={product.id === productId}
                        setIsChecked={(value) => value && setProductId(product.id)}
                      />
                    ))}
                </VStack>
              </Box>
            </Box>

            <Heading as="h2" size="md" mb="4" color="gray.600">
              Message
            </Heading>
            <Textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              height="100px"
              resize="vertical"
              maxH="150px"
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            type="submit"
            form="barter-form"
            isDisabled={products?.length === 0}
          >
            Submit
          </Button>
          <Button variant="ghost" onClick={resetForm}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
