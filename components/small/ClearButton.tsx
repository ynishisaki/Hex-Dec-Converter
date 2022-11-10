import { Button } from "@chakra-ui/react";

type ChildCompProps = {
    onClick: (
        event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => void;
};

export const ClearButton = (props: ChildCompProps) => {
    return (
        <Button
            ml='7'
            minW={"90px"}
            size='lg'
            fontSize={{ base: "lg", md: "xl" }}
            onClick={(e) => props.onClick(e)}>
            clear
        </Button>
    );
};
