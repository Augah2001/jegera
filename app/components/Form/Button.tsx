import { Button, Stack } from "@chakra-ui/react";
import React from "react";

const Button1 = ({ label }: { label: string }) => {
  return (
    <Stack spacing={10} pt={2}>
      <Button
        className=" mx-4"
        marginY="30px"
        type="submit"
        size="lg"
        bg={"pink.600"}
        color={"white"}
        _active={{ backgroundColor: "purple.600" }}
        _hover={{
          bg: "pink.500",
        }}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default Button1;
