import { useAuth } from "@/hooks";
import { Navbar } from "@/components";
import { Box } from "@chakra-ui/react";
export const Header = () => {
  const { user } = useAuth();

  // Render different header based on user state
  if (user) {
    // https://chakra-templates.dev/navigation/navbar
    return (
      <Box mx={20}>
        <Navbar />;
      </Box>
    );
  }

  // https://choc-ui.com/docs/navigation/navbars
  // But we will use our own SearchInput component
  return <div>Header</div>;
};
