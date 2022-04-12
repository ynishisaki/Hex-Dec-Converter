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
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { stringify } from "querystring";
import React, { FC } from "react";
import { useState } from "react";
import { CgMathEqual } from "react-icons/cg";

export const HexConvert = () => {
	const initialValue = "";
	const [inputValue, setInputValue] = useState<string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const regex = /[^0-9a-fA-F]/g;
		setInputValue(
			event.target.value.replaceAll(regex, "").slice(0, 8).toUpperCase()
		);
	};
	// one's complement
	const toUnsignedDec = (hex: string) => (hex ? parseInt(hex, 16) : "");

	// two's complement
	const toSignedDec = (hex: string) => {
		const unSignedDec = parseInt(hex, 16);
		const bitLength = hex.length * 4; // 0, 4, 8, 12, 16...
		const bitLengthComp = bitLength + (bitLength % 8); // 0, 8, 16, 24...
		// 8, 16, 24bit かつ 最上位bitが1の場合
		if (bitLengthComp <= 24 && unSignedDec >>> (bitLengthComp - 1) == 1) {
			return hex ? unSignedDec - 2 ** bitLengthComp : "";
		}
		// 8, 16, 24bit かつ 最上位bitが0の場合
		else if (bitLengthComp <= 24 && unSignedDec >>> (bitLengthComp - 1) == 0) {
			return hex ? unSignedDec : "";
		}
		// 32bit の場合
		else if (bitLengthComp == 32) {
			return unSignedDec >> 0;
		}
		// その他: 8, 16, 24, 32bit以外の場合
		else {
			return "";
		}
	};

	const showBitLength = (hex: string) => {
		const bitLength = hex.toString().length * 4;
		if (bitLength <= 32) {
			return Number(bitLength) + Number(bitLength % 8);
		}
		// over 32bit is invalid
		else {
			return ">32";
		}
	};

	const isError = (hex: string) => {
		// 0, 0.5, 1, 1.5... byte
		const byteLength = hex.toString().length / 2;
		// over 4byte is Error
		return byteLength > 4;
	};

	const toBin = (hex: string) => {
		const bitLength = hex.length * 4;
		const bin = parseInt(hex, 16).toString(2);
		return hex
			? "0".repeat(bitLength + (bitLength % 8) - bin.length) + bin
			: "";
	};
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
							required
							title="0-9,A-F"
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
							isFullWidth="false"
							width="490px"
							// height="96px"
							type="number"
							white-space="normal"
							placeholder="11111111"
							overflow-wrap="break-word"
							value={toBin(inputValue)}
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
							fontSize={"2xl"}
							placeholder="-1"
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
