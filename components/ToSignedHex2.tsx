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
	FormHelperText,
	FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { CgMathEqual } from "react-icons/cg";

export const ToSignedHex2 = () => {
	const initialValue = "";
	const [inputValue, setInputValue] = useState<number | string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue(event.target.value.toUpperCase());

	// two's complement
	const toHex = (dec: any) => {
		// const toHex = (dec: any) => {
		if (dec >= 0) {
			return Number(dec).toString(16).toUpperCase();
		}
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
			return "over 32bit: ERROR!";
		}
	};

	// const toBin = (hex: any) => parseInt(hex, 16).toString(2);
	const toBin = (hex: any) => parseInt(hex, 16).toString(2);

	const isError = inputValue === "";

	return (
		<>
			<HStack>
				<Text fontSize={"xl"}>precision</Text>
				<Select
					size={"lg"}
					width="auto"
					// placeholder="Select option"
				>
					<option value="auto">Auto</option>
					<option value="8bit">8 bit</option>
					<option value="16bit">16 bit</option>
				</Select>
			</HStack>

			<Box w={"auto"} fontSize={"4xl"}>
				<Text fontSize={"xl"}>signed two's complement</Text>
				<Text fontSize={"xl"}>{showBitLength(inputValue)}</Text>
				<VStack width={"448px"}>
					<Flex width={"448px"}>
						<Button
							// flex-direction="row"
							// justify-content="start"
							// ml="0"
							colorScheme="teal"
							size="lg"
							onClick={() => setInputValue(initialValue)}>
							clear
						</Button>
						<Spacer />
					</Flex>
					<Flex width={"448px"}>
						<InputGroup size={"lg"}>
							<Input
								htmlSize={30}
								width="auto"
								// type="number"
								placeholder="255"
								fontSize={"2xl"}
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
						<Spacer></Spacer>
						{isError && (
							<Text pt="2" pl="3" fontSize={"xl"} color={"tomato"}>
								isInvalid
							</Text>
						)}
					</Flex>
					<InputGroup size={"lg"}>
						<Input
							htmlSize={30}
							width="auto"
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
							width="auto"
							placeholder="FF"
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
		</>
	);
};