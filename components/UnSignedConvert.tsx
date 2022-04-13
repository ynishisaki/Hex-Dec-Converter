import {
	Box,
	Button,
	Center,
	VStack,
	Input,
	InputGroup,
	InputRightElement,
	Spacer,
	Text,
	Select,
	Flex,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

export const UnSignedConvert = () => {
	const initialValue = "";
	const [inputUnsignedValue, setInputUnsignedValue] = useState<number | string>(
		initialValue
	);
	const [inputSignedValue, setInputSignedValue] = useState<number | string>(
		initialValue
	);

	const handleUnsignedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const regex = /[^0-9]/g;
		setInputUnsignedValue(
			event.target.value.replaceAll(regex, "").slice(0, 8).toUpperCase()
		);
	};
	const handleSignedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// const regex = /[^-+\d+]/g;
		const str = event.target.value;
		const regex = /\-?[0-9]*/g;
		const matches_array = regex.exec(str);
		if (matches_array) {
			setInputSignedValue(matches_array[0]);
		} else {
			setInputSignedValue("nan");
		}
		// event.target.value.replaceAll(regex, "").slice(0, 8).toUpperCase()
	};

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

	const isError =
		inputUnsignedValue < -2147483648 || inputUnsignedValue > 2147483647;

	return (
		<Box fontSize={"2xl"}>
			<VStack>
				{/* selecter and button */}
				<Flex width={"640px"}>
					<Spacer />
					<Flex width={"490px"}>
						<Center fontSize={"xl"} width={"auto"} mx={4}>
							precision :
						</Center>
						<Select size={"lg"} width="auto">
							<option value="auto">Auto</option>
							<option value="8bit">8 bit</option>
							<option value="16bit">16 bit</option>
						</Select>
						<Spacer />
					</Flex>
				</Flex>
				{/* input */}
				{/* unsignedDEC */}
				<Flex width={"640px"}>
					<Spacer />
					<Flex width={"490px"}>
						<Center
							fontSize={"xl"}
							width={"auto"}
							mx={4}
							// color={isError(inputValue) ? "tomato" : ""}
						>
							{showBitLength(inputUnsignedValue) + "bit"}
						</Center>
						<Spacer />
						<Button
							size="lg"
							onClick={() => {
								setInputUnsignedValue(initialValue);
								setInputSignedValue(initialValue);
							}}>
							clear
						</Button>
					</Flex>
				</Flex>
				<Flex width={"640px"}>
					<Flex alignItems={"center"} width={"50px"}>
						DEC
					</Flex>
					<Flex alignItems={"center"} width={"100px"} fontSize={"lg"} ml={3}>
						unsigned
					</Flex>
					<InputGroup size={"lg"} width={"490px"}>
						<Input
							htmlSize={30}
							width={"490px"}
							fontSize={"2xl"}
							placeholder="255"
							value={inputUnsignedValue}
							onChange={handleUnsignedChange}
							isReadOnly={inputSignedValue}
							bg={inputSignedValue && "green.100"}
							// isInvalid={isError(inputValue)}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(10)"
						/>
					</InputGroup>
				</Flex>
				{/* signedDEC */}
				<Flex width={"640px"}>
					<Flex alignItems={"center"} width={"50px"}>
						DEC
					</Flex>
					<Flex alignItems={"center"} width={"100px"} fontSize={"lg"} ml={3}>
						signed
					</Flex>
					<InputGroup size={"lg"} width={"490px"}>
						<Input
							htmlSize={30}
							width={"490px"}
							fontSize={"2xl"}
							placeholder="-1"
							value={inputSignedValue}
							onChange={handleSignedChange}
							isReadOnly={inputUnsignedValue}
							bg={inputUnsignedValue && "green.100"}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(10)"
						/>
					</InputGroup>
				</Flex>
				{/* output */}
				{/* BIN */}
				<Flex width={"640px"}>
					<Flex alignItems={"center"} width={"50px"}>
						BIN
					</Flex>
					{/* <Box width={"100px"} /> */}
					<Spacer />
					<InputGroup size={"lg"} width={"490px"}>
						<Input
							htmlSize={30}
							width="490px"
							white-space="normal"
							placeholder="11111111"
							overflow-wrap="break-word"
							value={toBin(inputUnsignedValue)}
							fontSize={"2xl"}
							isReadOnly={true}
							bg={"green.100"}></Input>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(2)"
						/>
					</InputGroup>
				</Flex>
				{/* HEX */}
				<Flex width={"640px"}>
					<Flex alignItems={"center"} width={"50px"}>
						HEX
					</Flex>
					<Spacer />
					<InputGroup size={"lg"} width={"490px"}>
						<Input
							htmlSize={30}
							width={"490px"}
							fontSize={"2xl"}
							placeholder="FF"
							value={toHex(inputUnsignedValue)}
							isReadOnly={true}
							bg={"green.100"}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(16)"
						/>
					</InputGroup>
				</Flex>
			</VStack>
		</Box>
	);
};
