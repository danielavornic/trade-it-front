import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Text, Checkbox, VStack, CheckboxGroup, Collapse, Button } from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export const FilterListOptions = ({
  title,
  name,
  options,
}: {
  title: string;
  name: string;
  options: any[];
}) => {
  const router = useRouter();
  const [defaultValue, setDefaultValue] = useState<string[]>([]);
  const [show, setShow] = useState(false); // State to control the collapse

  const handleCheckboxChange = (value: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, [name]: value },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    const query = router.query[name] as string;
    const selectedValues = query ? query.split(",") : [];
    setDefaultValue(selectedValues);
  }, [router.query]);

  if (!options) return null;

  const handleToggle = () => setShow(!show); // Function to toggle the collapse

  return (
    <VStack align="flex-start" width="full" spacing={4}>
      <Button
        onClick={handleToggle}
        size="sm"
        variant="ghost"
        width="full"
        justifyContent="space-between"
        alignItems="center"
        rightIcon={show ? <AiFillCaretUp /> : <AiFillCaretDown />}
      >
        {title}
      </Button>
      <Collapse in={show} animateOpacity>
        <CheckboxGroup
          colorScheme="accent"
          value={defaultValue}
          onChange={(value) => handleCheckboxChange(value.toString())}
        >
          <VStack spacing={2} align="start">
            {options.map((option) => (
              <Checkbox name="category" key={option.id} value={option.id.toString()}>
                {option.name}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </Collapse>
    </VStack>
  );
};
