import {
	Box,
	Button,
	Center,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { CgMathEqual } from "react-icons/cg";

export const ToSignedHex = () => {
	const initialValue = "";
	const [inputValue, setInputValue] = useState<number | string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue(event.target.value.toUpperCase());

	// two's complement
	const toHex = (dec: any) => {};

	const showBitLength = (dec: any) => {
		const value = Math.abs(dec);
		const bitLength = () => {
			if (value == 0) {
				return 0;
			} else if (value < 2 ** 8) {
				return 8;
			} else if (value < 2 ** 16) {
				return 16;
			} else if (value < 2 ** 24) {
				return 24;
			} else if (value < 2 ** 32) {
				return 32;
			} else {
				return NaN;
			}
			// const value = Math.abs(dec);
			// if (value == 0) {
			// 	return 0 + "bit";
			// } else if (value < 2 ** 8) {
			// 	return "8bit";
			// } else if (value < 2 ** 16) {
			// 	return "16bit";
			// } else if (value < 2 ** 24) {
			// 	return "24bit";
			// } else if (value < 2 ** 32) {
			// 	return "32bit";
			// } else {
			// 	return "ERROR!";
			// }
		};
	return (
			if (typeof bitLength == "string") {
				return bitLength + "ERROR!";
			} 
			else {
				return bitLength + "bit";
			}
		)
		};
	// const bitLength = (dec: any) => {
	// 	const value = Math.abs(dec);
	// 	if (value == 0) {
	// 		return 0;
	// 	} else if (value < 2 ** 8) {
	// 		return 8;
	// 	} else if (value < 2 ** 16) {
	// 		return 16;
	// 	} else if (value < 2 ** 24) {
	// 		return 24;
	// 	} else if (value < 2 ** 32) {
	// 		return 32;
	// 	} else {
	// 		return NaN;
	// 	}
	// };

	const toBin = (hex: any) => parseInt(hex, 16).toString(2);

	return (
		<Box w={"auto"} fontSize={"2xl"}>
			<Text>signed two's complement</Text>
			<Text>{showBitLength(inputValue)}</Text>
			<HStack>
				<Button
					colorScheme="teal"
					size="lg"
					onClick={() => setInputValue(initialValue)}>
					clear
				</Button>
				<Box>
					<InputGroup size={"lg"}>
						<Input
							htmlSize={16}
							width="auto"
							type="alphanumeric"
							placeholder="FF"
							fontSize={"2xl"}
							value={toHex(inputValue)}
							isReadOnly={true}
							bg={"gray.100"}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(16)"
						/>
					</InputGroup>
				</Box>
				<Center>
					<Icon as={CgMathEqual} boxSize={"6"} />
				</Center>
				<Box>
					<InputGroup size={"lg"}>
						<Input
							htmlSize={16}
							width="auto"
							placeholder="FF"
							fontSize={"2xl"}
							value={inputValue}
							onChange={handleChange}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(10)"
						/>
					</InputGroup>
				</Box>
				<Center>
					<Icon as={CgMathEqual} boxSize={"6"} />
				</Center>
				<Box>
					<InputGroup size={"lg"}>
						<Input
							htmlSize={16}
							width="auto"
							placeholder="FF"
							value={toBin(inputValue)}
							fontSize={"2xl"}
							isReadOnly={true}
							bg={"gray.100"}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(2)"
						/>
					</InputGroup>
				</Box>
			</HStack>
		</Box>
	);
};
