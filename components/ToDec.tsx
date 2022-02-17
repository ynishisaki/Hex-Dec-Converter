import {
	Box,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";

export const ToDex = () => {
	const [inputValue, setInputValue] = useState<number | string>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue(event.target.value);

	const toDec = (hex: any) => parseInt(hex, 16);

	return (
		<Box>
			<Text>toDec = parseInt(String(hex), 16)</Text>
			<InputGroup>
				<Input
					type="alphanumeric"
					// defaultValue="ff"
					placeholder="FF"
					htmlSize={4}
					width="auto"
					value={inputValue}
					onChange={handleChange}
				/>
				<InputRightAddon children="(16)" />
			</InputGroup>
			<Text>output is here: {toDec(inputValue)}</Text>
		</Box>
	);
};
