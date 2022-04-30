import {
	Box,
	Button,
	Center,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Spacer,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export const HexConvert = () => {
	// select
	const [selectedOption, setSelectedOption] = useState<String>("");

	const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedOption(value);

		const selectedMaxOfBitLength = value ? Number(value) : 32;
		const selectedMaxOfByteLength = selectedMaxOfBitLength / 4;
		setInputValue(inputValue.slice(0, selectedMaxOfByteLength));
	};

	const selectedMaxOfBitLength = selectedOption ? Number(selectedOption) : 32;
	const selectedMaxOfByteLength = selectedMaxOfBitLength / 4;

	//input
	const initialValue = "";
	const [inputValue, setInputValue] = useState<string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const regex = /[^0-9a-fA-F]/g;
		setInputValue(
			value
				.replaceAll(regex, "")
				.slice(0, selectedMaxOfByteLength)
				.toUpperCase()
		);
	};

	const showBitLength = (hex: string) => {
		const bitLength = hex.toString().length * 4;
		const bitLengthZeroPadding = Number(bitLength) + Number(bitLength % 8);
		return selectedOption ? selectedMaxOfBitLength : bitLengthZeroPadding;
	};

	// const isError = (hex: string) => {
	// 	// 0, 0.5, 1, 1.5... byte
	// 	const byteLength = hex.toString().length / 2;
	// 	// over 4byte is Error
	// 	return byteLength > selectedMaxOfByteLength;
	// };

	const toBin = (hex: string) => {
		const bin = parseInt(hex, 16).toString(2);
		return hex ? "0".repeat(showBitLength(hex) - bin.length) + bin : "";
	};

	// one's complement
	const toUnsignedDec = (hex: string) => (hex ? parseInt(hex, 16) : "");

	// two's complement
	const toSignedDec = (hex: string) => {
		const unSignedDec = parseInt(hex, 16);
		// 8, 16, 24bit かつ 最上位bitが1の場合
		if (
			showBitLength(hex) <= 24 &&
			unSignedDec >>> (showBitLength(hex) - 1) == 1
		) {
			return hex ? unSignedDec - 2 ** showBitLength(hex) : "";
		}
		// 8, 16, 24bit かつ 最上位bitが0の場合
		else if (
			showBitLength(hex) <= 24 &&
			unSignedDec >>> (showBitLength(hex) - 1) == 0
		) {
			return hex ? unSignedDec : "";
		}
		// 32bit の場合
		else if (showBitLength(hex) == 32) {
			return unSignedDec >> 0;
		}
		// その他: 8, 16, 24, 32bit以外の場合
		else {
			return "";
		}
	};

	return (
		<Box fontSize={"2xl"}>
			<VStack>
				{/* selecter and button */}
				{/* <Flex width={"640px"}>
					<Spacer />
					<Flex width={"490px"}>
						<Center fontSize={"xl"} width={"auto"} mx={4}>
							precision :
						</Center>
						<Select size={"lg"} width="auto" onChange={selectChange}>
							<option value="">Auto</option>
							<option value="8">8bit</option>
							<option value="16">16bit</option>
						</Select>
						<Spacer />
					</Flex>
				</Flex> */}
				{/* input */}
				{/* HEX */}
				<Flex width={"640px"}>
					<Spacer />
					<Flex width={"490px"}>
						{!selectedOption && (
							<Center
								fontSize={"xl"}
								width={"auto"}
								mx={4}
								// color={isError(inputValue) ? "tomato" : ""}
							>
								{showBitLength(inputValue) + "bit"}
							</Center>
						)}
						<Spacer />
						<Center fontSize={"xl"} width={"auto"} mx={2}>
							bit length :
						</Center>
						<Select size={"lg"} width="auto" onChange={selectChange}>
							<option value="">Auto</option>
							<option value="8">8bit</option>
							<option value="16">16bit</option>
							<option value="24">24bit</option>
							<option value="32">32bit</option>
						</Select>
						<Button
							ml="6"
							size="lg"
							onClick={() => setInputValue(initialValue)}>
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
							// isInvalid={isError(inputValue)}
						/>
						<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
							<>(16)</>
						</InputRightElement>
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
							type="number"
							white-space="normal"
							placeholder="11111111"
							overflow-wrap="break-word"
							value={toBin(inputValue)}
							fontSize={"2xl"}
							isReadOnly={true}
							bg={"green.100"}
						/>
						<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
							<>(2)</>
						</InputRightElement>
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
						<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
							<>(10)</>
						</InputRightElement>
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
						<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
							<>(10)</>
						</InputRightElement>
					</InputGroup>
				</Flex>
			</VStack>
		</Box>
	);
};
