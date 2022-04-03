import {
	Box,
	Button,
	ButtonProps,
	Center,
	Flex,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputGroupProps,
	InputRightAddon,
	InputRightElement,
	Select,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useState } from "react";
import { CgMathEqual } from "react-icons/cg";

export const HexConvert_V = () => {
	const initialValue = "";
	const [inputValue, setInputValue] = useState<number | string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue(event.target.value.toUpperCase());

	// one's complement
	const toUnsignedDec = (hex: any) => parseInt(hex, 16);

	// two's complement
	const toSignedDec = (hex: any) => {
		const unSignedDec = parseInt(hex, 16);
		const bitLength = hex.toString().length * 4; // bit

		// 8, 16, 24bit かつ 最上位bitが1の場合
		if (
			bitLength + (bitLength % 8) <= 24 &&
			unSignedDec >>> (bitLength - 1) == 1
		) {
			return unSignedDec - 2 ** bitLength;
		}
		// 8, 16, 24bit かつ 最上位bitが0の場合
		else if (
			(bitLength == 8 || bitLength == 16 || bitLength == 24) &&
			unSignedDec >>> (bitLength - 1) == 0
		) {
			return unSignedDec;
		}
		// 32bit の場合
		else if (bitLength == 32) {
			return unSignedDec >> 0;
		}
		// その他: 8, 16, 24, 32bit以外の場合
		else {
			return "";
		}
	};

	const showBitLength = (hex: any) => {
		const bitLength = hex.toString().length * 4;
		if (bitLength <= 32) {
			return Number(bitLength) + Number(bitLength % 8);
		}
		// over 32bit is invalid
		else {
			return ">32";
		}
	};

	const isError = (hex: any) => {
		// 0, 0.5, 1, 1.5... byte
		const byteLength = hex.toString().length / 2;
		// over 4byte is Error
		return byteLength > 4;
	};

	const toBin = (hex: any) => parseInt(hex, 16).toString(2);

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
				{/* HEX */}
				<Flex width={"640px"}>
					<Spacer />
					<Flex width={"490px"}>
						<Center
							fontSize={"xl"}
							width={"auto"}
							mx={4}
							color={isError(inputValue) ? "tomato" : ""}>
							{showBitLength(inputValue) + "bit"}
						</Center>
						<Spacer />
						<Button size="lg" onClick={() => setInputValue(initialValue)}>
							clear
						</Button>
					</Flex>
				</Flex>
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
							type="alphanumeric"
							placeholder="FF"
							value={inputValue}
							onChange={handleChange}
							isInvalid={isError(inputValue)}
							// borderColor={"green.100"}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(16)"
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
							width={"490px"}
							placeholder="1111"
							value={toBin(inputValue)}
							fontSize={"2xl"}
							isReadOnly={true}
							bg={"green.100"}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(2)"
						/>
					</InputGroup>
				</Flex>
				{/* unsignedDEC */}
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
							// type="number"
							fontSize={"2xl"}
							placeholder="255"
							value={toUnsignedDec(inputValue)}
							isReadOnly={true}
							bg={"green.100"}
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
							// type="number"
							fontSize={"2xl"}
							placeholder="255"
							value={toSignedDec(inputValue)}
							isReadOnly={true}
							bg={"green.100"}
						/>
						<InputRightElement
							pointerEvents="none"
							fontSize={"sm"}
							m={"1.5"}
							children="(10)"
						/>
					</InputGroup>
				</Flex>
			</VStack>
		</Box>
	);
};
