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
		<Box>
			<VStack>
				<Flex width={{ base: "420px", md: "640px" }}>
					<Spacer />
					{/* selecter and button */}
					<Flex width={{ base: "370px", md: "490px" }}>
						{!selectedOption && (
							<Center fontSize={{ base: "lg", md: "xl" }} width={"auto"} mx={4}>
								{showBitLength(inputValue) + "bit"}
							</Center>
						)}
						<Spacer />
						<Center fontSize={{ base: "lg", md: "xl" }} width={"auto"} mx={2}>
							bit length :
						</Center>
						<Select
							fontSize={{ base: "lg", md: "xl" }}
							width="auto"
							onChange={selectChange}>
							<option value="">Auto</option>
							<option value="8">8bit</option>
							<option value="16">16bit</option>
							<option value="24">24bit</option>
							<option value="32">32bit</option>
						</Select>
						<Button
							ml="6"
							fontSize={{ base: "lg", md: "xl" }}
							// size="lg"
							onClick={() => setInputValue(initialValue)}>
							clear
						</Button>
					</Flex>
				</Flex>
				{/* input */}
				{/* HEX */}
				<Box width={{ base: "420px", md: "640px" }} display={{ md: "flex" }}>
					<Flex layerStyle="showBaseNumber">HEX</Flex>
					<Spacer />
					<InputGroup size={"lg"} width={{ base: "420px", md: "490px" }}>
						<Input
							htmlSize={30}
							width={{ base: "420px", md: "490px" }}
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
				</Box>
				{/* output */}
				{/* BIN */}
				<Box width={{ base: "420px", md: "640px" }} display={{ md: "flex" }}>
					<Flex layerStyle="showBaseNumber">BIN</Flex>
					<Spacer />
					<InputGroup size={"lg"} width={{ base: "420px", md: "490px" }}>
						<Input
							htmlSize={30}
							width={{ base: "420px", md: "490px" }}
							type="number"
							white-space="normal"
							placeholder="11111111"
							overflow-wrap="break-word"
							value={toBin(inputValue)}
							fontSize={"2xl"}
							isReadOnly={true}
							bg={"green.50"}
						/>
						<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
							<>(2)</>
						</InputRightElement>
					</InputGroup>
				</Box>
				{/* unsignedDEC */}
				<Box width={{ base: "420px", md: "640px" }} display={{ md: "flex" }}>
					<Flex alignItems={"center"} width={"150px"}>
						<Box layerStyle="showBaseNumber">DEC</Box>
						<Box layerStyle="showUnsignedOrSigned">unsigned</Box>
					</Flex>
					<InputGroup size={"lg"} width={{ base: "420px", md: "490px" }}>
						<Input
							htmlSize={30}
							width={{ base: "420px", md: "490px" }}
							fontSize={"2xl"}
							placeholder="255"
							value={toUnsignedDec(inputValue)}
							isReadOnly={true}
							bg={"green.50"}
						/>
						<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
							<>(10)</>
						</InputRightElement>
					</InputGroup>
				</Box>
				{/* signedDEC */}
				<Box width={{ base: "420px", md: "640px" }} display={{ md: "flex" }}>
					<Flex alignItems={"center"} width={"150px"}>
						<Box layerStyle="showBaseNumber">DEC</Box>
						<Box layerStyle="showUnsignedOrSigned">signed</Box>
					</Flex>
					<InputGroup size={"lg"} width={{ base: "420px", md: "490px" }}>
						<Input
							htmlSize={30}
							width={{ base: "420px", md: "490px" }}
							fontSize={"2xl"}
							placeholder="-1"
							value={toSignedDec(inputValue)}
							isReadOnly={true}
							bg={"green.50"}
						/>
						<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
							<>(10)</>
						</InputRightElement>
					</InputGroup>
				</Box>
			</VStack>
		</Box>
	);
};
