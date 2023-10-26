import { Box, Flex, Heading, VStack, Icon, HStack } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ProductGridCard } from "@/components";

export const ProductsSlider = ({ title, products }: { title: string; products?: any[] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Flex w="100%" alignItems="stretch">
      <VStack
        justifyContent="center"
        alignItems="center"
        bg="accent.500"
        w="25%"
        borderRadius="lg"
        spacing={10}
        color="white"
      >
        <Icon as={BsStars} boxSize={16} />
        <Heading as="h2" size="2xl" textAlign="center" lineHeight="1.33">
          {title}
        </Heading>
      </VStack>
      <Box w="75%">
        <Slider {...settings}>
          {products.map((product, index) => (
            <Box px={4} key={index} h="full" transform="translateY(-4px)">
              <ProductGridCard product={product} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Flex>
  );
};
