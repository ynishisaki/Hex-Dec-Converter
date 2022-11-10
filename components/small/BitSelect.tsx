import { Select } from "@chakra-ui/react";

type ChildCompProps = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const BitSelect = (props: ChildCompProps) => {
    return (
        <Select
            size='lg'
            minW={"90px"}
            width='auto'
            fontSize={{ base: "lg", md: "xl" }}
            onChange={(e) => props.onChange(e)}>
            <option value=''>Auto</option>
            <option value='8'>8bit</option>
            <option value='16'>16bit</option>
            <option value='24'>24bit</option>
            <option value='32'>32bit</option>
        </Select>
    );
};
