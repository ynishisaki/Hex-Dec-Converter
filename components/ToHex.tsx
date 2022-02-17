import {
	Box,
	HStack,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
	PinInput,
	PinInputField,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export const ToHex = () => {
	const [inputValue, setInputValue] = useState<number | string>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue(event.target.value);

	const toHex = (dec: any) => Number(dec).toString(16).toUpperCase();

	return (
		<Box width={"50%"}>
			<Text>toHex = Number(dec).toString(16).toUpperCase()</Text>
			<InputGroup>
				<Input
					type="number"
					// defaultValue="255"
					placeholder="255"
					htmlSize={4}
					// width="auto"
					value={inputValue}
					onChange={handleChange}
				/>
				{/* <InputRightAddon children="(10)" /> */}
				<InputRightElement pointerEvents="none" fontSize={2} children="(10)" />
			</InputGroup>
			<Text>output is here: {toHex(inputValue)}</Text>
		</Box>
	);
};
