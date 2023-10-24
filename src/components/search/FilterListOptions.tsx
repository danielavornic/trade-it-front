import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Text, Checkbox, VStack, CheckboxGroup } from "@chakra-ui/react";

export const FilterListOptions = ({ title, options }: { title: string; options: any[] }) => {
  const router = useRouter();
  const [defaultValue, setDefaultValue] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, category: value },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    const categoryQuery = router.query.category as string;
    const selectedValues = categoryQuery ? categoryQuery.split(",") : [];
    setDefaultValue(selectedValues);
  }, [router.query]);

  if (!options) return null;

  return (
    <VStack align="flex-start" spacing={4}>
      <Text fontSize="md" fontWeight="bold" fontFamily="poppins">
        {title}
      </Text>
      <CheckboxGroup
        colorScheme="accent"
        value={defaultValue}
        onChange={(value) => handleCheckboxChange(value.toString())}
      >
        <VStack spacing={2} align="start">
          {options.map((option) => {
            return (
              <Checkbox name="category" key={option.id} value={option.id.toString()}>
                {option.name}
              </Checkbox>
            );
          })}
        </VStack>
      </CheckboxGroup>
    </VStack>
  );
};
