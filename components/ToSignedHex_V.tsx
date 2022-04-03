import {
	Box,
	Button,
	Center,
	HStack,
	VStack,
	Icon,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
	Spacer,
	Text,
	Select,
	Flex,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { CgMathEqual } from "react-icons/cg";

export const ToSignedHex_V = () => {
	const initialValue = "";
	const [inputValue, setInputValue] = useState<number | string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue(event.target.value.toUpperCase());

	// two's complement
	const toHex = (dec: number | string) => {
		// positive numbebr
		if (dec >= 0) {
			return dec ? Number(dec).toString(16).toUpperCase() : "";
		}
		// negative number
		// 8bit
		else if (dec >= -128) {
			let dec_unsigned = 256 - Math.abs(dec);
			return Number(dec_unsigned).toString(16).toUpperCase();
		}
		// 16bit
		else if (dec >= -32768) {
			let dec_unsigned = 65536 - Math.abs(dec);
			return Number(dec_unsigned).toString(16).toUpperCase();
		}
		// 24bit
		else if (dec >= -8388608) {
			let dec_unsigned = 16777216 - Math.abs(dec);
			return Number(dec_unsigned).toString(16).toUpperCase();
		}
		// 32bit
		else if (dec >= -2147483648) {
			let dec_unsigned = 4294967296 - Math.abs(dec);
			return Number(dec_unsigned).toString(16).toUpperCase();
		}
		// 40bit
		else if (dec >= -2147483648) {
			let dec_unsigned = 1099511627774 - Math.abs(dec);
			return Number(dec_unsigned).toString(16).toUpperCase();
		}
		// 48bit
		else if (dec >= -2147483648) {
			let dec_unsigned = 281474976710654 - Math.abs(dec);
			return Number(dec_unsigned).toString(16).toUpperCase();
		}
		// 56bit
		else if (dec >= -2147483648) {
			let dec_unsigned = 72057594037927939 - Math.abs(dec);
			return Number(dec_unsigned).toString(16).toUpperCase();
		}
		// 64bit
		else if (dec >= -2147483648) {
			let dec_unsigned = 18446744073709551999 - Math.abs(dec);
			return Number(dec_unsigned).toString(16).toUpperCase();
		} else {
			return "ERROR";
		}
	};

	const showBitLength = (dec: number | string) => {
		if (dec == 0) {
			return 0 + "bit";
		} else if (dec >= -128 && dec <= 127) {
			return "8bit";
		} else if (dec >= -32768 && dec <= 32767) {
			return "16bit";
		} else if (dec >= -8388608 && dec <= 8388607) {
			return "24bit";
		} else if (dec >= -2147483648 && dec <= 2147483647) {
			return "32bit";
		} else {
			return "Invalid:>32bit";
		}
	};

	const toBin = (hex: any) => {
		return hex ? parseInt(hex, 16).toString(2) : "";
	};

	const isError = inputValue < -2147483648 || inputValue > 2147483647;

	return (
		<Box>
			<Text fontSize={"xl"}>signed two's complement</Text>
			<VStack>
				<Flex width={"460px"}>
					<Button
						// colorScheme="green"
						colorScheme="teal"
						size="lg"
						onClick={() => setInputValue(initialValue)}>
						clear
					</Button>
					<Spacer />
				</Flex>
				<Flex width={"460px"}>
					<InputGroup size={"lg"}>
						<Input
							htmlSize={30}
							width={"460px"}
							type="number"
							fontSize={"2xl"}
							placeholder="255"
							value={inputValue}
							onChange={handleChange}
							isInvalid={isError}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(10)"
						/>
					</InputGroup>
					<Text
						pt="2"
						px="3"
						width={"auto"}
						fontSize={"xl"}
						color={isError ? "tomato" : ""}>
						{showBitLength(inputValue)}
					</Text>
				</Flex>
				<InputGroup size={"lg"}>
					<Input
						htmlSize={30}
						width={"460px"}
						type="alphanumeric"
						placeholder="FF"
						fontSize={"2xl"}
						value={toHex(inputValue)}
						isReadOnly={true}
						bg={"gray.200"}
					/>
					<InputRightElement
						pointerEvents="none"
						fontSize={"sm"}
						m={"1.5"}
						children="(16)"
					/>
				</InputGroup>
				<InputGroup size={"lg"}>
					<Input
						htmlSize={30}
						width={"460px"}
						placeholder="1111"
						value={toBin(toHex(inputValue))}
						fontSize={"2xl"}
						isReadOnly={true}
						bg={"gray.200"}
					/>
					<InputRightElement
						pointerEvents="none"
						fontSize={"sm"}
						m={"1.5"}
						children="(2)"
					/>
				</InputGroup>
			</VStack>
		</Box>
	);
};
