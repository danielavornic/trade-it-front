import { useAuth } from "@/hooks";
import { SearchInput } from "@/components";

export const Header = () => {
  const { user } = useAuth();

  // Render different header based on user state
  if (user) {
    // https://chakra-templates.dev/navigation/navbar
    return (
      <div>
        Header Auth
        <SearchInput />
      </div>
    );
  }

  // https://choc-ui.com/docs/navigation/navbars
  // But we will use our own SearchInput component
  return <div>Header</div>;
};