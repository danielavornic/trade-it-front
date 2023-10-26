import { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";

import { getProducts } from "@/data";
import { products as productsApi } from "@/api";
import { Product } from "@/types";
import { useAuth } from "@/hooks";
import { ProductCheckbox } from "@/components";
import { barters } from "@/api/barter";
import { useRouter } from "next/router";

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
      router.push({ pathname: `/product/${product.id}`, query: { barter: "sent" } });
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
                  {isSuccess &&
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
          <Button colorScheme="brand" mr={3} type="submit" form="barter-form">
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
