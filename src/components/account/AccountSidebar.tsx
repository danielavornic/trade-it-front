import { VStack, HStack, Heading, Divider, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const sidebarItems = [
  // {
  //   label: "Profile",
  //   href: "/account",
  // },
  {
    label: "My transactions",
    href: "/account/transactions",
  },
  {
    label: "My products",
    href: "/account/products",
  },
  {
    label: "Add product",
    href: "/product/add",
  },
  // {
  //   label: "Settings",
  //   href: "/account/settings",
  // },
];

export const AccountSidebar = () => {
  const router = useRouter();

  return (
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
  );
};
