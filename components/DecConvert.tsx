import {
	Box,
	Button,
	Center,
	VStack,
	Input,
	InputGroup,
	InputRightElement,
	Spacer,
	Flex,
	Select,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

export const DecConvert = () => {
	// select
	const [selectedOption, setSelectedOption] = useState<String>("");

	const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedOption(value);

		const selectedMaxOfBitLength = value ? Number(value) : 32;
		const selectedMaxOfByteLength = selectedMaxOfBitLength / 4;
		//setInputValue(inputValue.slice(0, selectedMaxOfByteLength));
	};

	const selectedMaxOfBitLength = selectedOption ? Number(selectedOption) : 32;
	const selectedMaxOfByteLength = selectedMaxOfBitLength / 4;

	// input
	const initialValue = "";
	const [inputUnsignedValue, setInputUnsignedValue] = useState<number | string>(
		initialValue
	);
	const [inputSignedValue, setInputSignedValue] = useState<number | string>(
		initialValue
	);

	const handleUnsignedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let val = event.target.value;

		val = val.replace(/[^0-9]/g, ""); // 0から9以外の文字を取り除く
		val = val.replace(/^0+/g, ""); // 文字列の先頭の0を取り除く

		setInputUnsignedValue(val);
	};

	const handleSignedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let val = event.target.value;

		val = val.replace(/[^-0-9]/g, ""); // -と0から9以外の文字を取り除く
		val = val.replace(/^[0]+/g, ""); // 文字列の先頭の00...から0を取り除く
		val = val.replace(/^[-][0]+/g, "-"); // 文字列の先頭部の-00...から0を取り除く

		if (/^[^-][0-9]*[-]/.test(val) == true) {
			val = val.replace(/[-]/g, ""); // 文字列の途中の-を取り除く
			setInputSignedValue(val);
		} else if (/^[-]+[0-9]*[-]/.test(val) == true) {
			val = "-" + val.replace(/[-]/g, ""); // 文字列の途中の-を取り除き、先頭の-を残す
			setInputSignedValue(val);
		} else {
			setInputSignedValue(val);
		}
	};

	const showBitLengthUnsigned = (dec: number | string) => {
		// option is auto (selectedMaxOfBitLength == 32)
		if (selectedOption == "") {
			if (dec == 0) {
				return 0;
			} else if (dec < 2 ** 8) {
				return 8;
			} else if (dec < 2 ** 16) {
				return 16;
			} else if (dec < 2 ** 24) {
				return 24;
			} else if (dec < 2 ** 32) {
				return 32;
			} else {
				return 32;
			}
		}
		// option is selected
		else {
			return selectedMaxOfBitLength;
		}
	};

	const showBitLengthSigned = (decimal: number | string) => {
		let dec = Number(decimal);
		// option is auto (selectedMaxOfBitLength == 32)
		if (selectedOption == "") {
			// if dec == "-"
			if (isNaN(dec)) {
				return 0;
			} else {
				if (dec == 0) {
					return 0;
				} else if (dec >= -1 * 2 ** (8 - 1) && dec <= 2 ** (8 - 1) - 1) {
					return 8;
				} else if (dec >= -1 * 2 ** (16 - 1) && dec <= 2 ** (16 - 1) - 1) {
					return 16;
				} else if (dec >= -1 * 2 ** (24 - 1) && dec <= 2 ** (24 - 1) - 1) {
					return 24;
				} else if (dec >= -1 * 2 ** (32 - 1) && dec <= 2 ** (32 - 1) - 1) {
					return 32;
				} else {
					return 32;
				}
			}
		}
		// option is selected
		else {
			return selectedMaxOfBitLength;
		}
	};

	const isErrorUnsigned =
		// if bitLength == 0, then isErrorUnsigned == false
		showBitLengthUnsigned(inputUnsignedValue)
			? inputUnsignedValue >= 2 ** showBitLengthUnsigned(inputUnsignedValue)
			: false;
	const isErrorSigned =
		// if bitLength == 0, then isErrorSigned == false
		showBitLengthSigned(inputSignedValue)
			? inputSignedValue <
					-1 * 2 ** (showBitLengthSigned(inputSignedValue) - 1) ||
			  inputSignedValue > 2 ** (showBitLengthSigned(inputSignedValue) - 1) - 1
			: false;
	console.log(isErrorSigned, showBitLengthSigned(inputSignedValue));
	const toHex = (decimal: number | string) => {
		let dec = Number(decimal);
		if (isNaN(dec)) {
			return "";
		} else {
			// positive number
			if (dec >= 0) {
				const hex = Number(dec).toString(16).toUpperCase();
				return dec
					? "0".repeat(
							(showBitLengthSigned(dec) && showBitLengthSigned(dec)) / 4 -
								hex.length
					  ) + hex
					: "";
			}
			// negative number
			// 8bit
			else if (dec >= -128) {
				let dec_unsigned = 256 - Math.abs(dec);
				const hex = Number(dec_unsigned).toString(16).toUpperCase();
				return (
					"0".repeat(
						(showBitLengthSigned(dec) && showBitLengthSigned(dec)) / 4 -
							hex.length
					) + hex
				);
			}
			// 16bit
			else if (dec >= -32768) {
				let dec_unsigned = 65536 - Math.abs(dec);
				const hex = Number(dec_unsigned).toString(16).toUpperCase();
				return (
					"0".repeat(
						(showBitLengthSigned(dec) && showBitLengthSigned(dec)) / 4 -
							hex.length
					) + hex
				);
			}
			// 24bit
			else if (dec >= -8388608) {
				let dec_unsigned = 16777216 - Math.abs(dec);
				const hex = Number(dec_unsigned).toString(16).toUpperCase();
				return (
					"0".repeat(
						(showBitLengthSigned(dec) && showBitLengthSigned(dec)) / 4 -
							hex.length
					) + hex
				);
			}
			// 32bit
			else if (dec >= -2147483648) {
				let dec_unsigned = 4294967296 - Math.abs(dec);
				const hex = Number(dec_unsigned).toString(16).toUpperCase();
				return (
					"0".repeat(
						(showBitLengthSigned(dec) && showBitLengthSigned(dec)) / 4 -
							hex.length
					) + hex
				);
			}
		}
	};
	const toBin = (hex: any) => {
		const bin = parseInt(hex, 16).toString(2);
		return hex ? bin : "";
	};

	return (
		<VStack width={"100%"}>
			{/* selecter and button */}
			<Box width={"100%"}>
				{/* selecter */}
				<Flex justifyContent={"flex-end"} my={"1"}>
					{!selectedOption && (
						<Center
							fontSize={{ base: "lg", md: "xl" }}
							mx={4}
							color={isErrorUnsigned || isErrorSigned ? "tomato" : ""}>
							{inputUnsignedValue
								? showBitLengthUnsigned(inputUnsignedValue) + "bit"
								: showBitLengthSigned(inputSignedValue) + "bit"}
						</Center>
					)}
					<Center fontSize={{ base: "lg", md: "xl" }} minW={"100px"} mx={2}>
						bit length :
					</Center>
					<Select
						size="lg"
						minW={"90px"}
						width="auto"
						fontSize={{ base: "lg", md: "xl" }}
						onChange={selectChange}>
						<option value="">Auto</option>
						<option value="8">8bit</option>
						<option value="16">16bit</option>
						<option value="24">24bit</option>
						<option value="32">32bit</option>
					</Select>
				</Flex>
				{/* button */}
				<Flex justifyContent={"flex-end"} my={"1"}>
					<Button
						ml="7"
						minW={"90px"}
						size="lg"
						fontSize={{ base: "lg", md: "xl" }}
						onClick={() => {
							setInputUnsignedValue(initialValue);
							setInputSignedValue(initialValue);
						}}>
						clear
					</Button>
				</Flex>
			</Box>
			{/* input */}
			{/* unsignedDEC */}
			<Box
				paddingY={{ base: "3", md: "0" }}
				width={"100%"}
				display={{ md: "flex" }}>
				<Flex alignItems={"center"} width={"25%"}>
					<Box layerStyle="showBaseNumber">DEC</Box>
					<Box layerStyle="showUnsignedOrSigned">unsigned</Box>
				</Flex>
				<InputGroup size={"lg"} width={{ base: "100%", md: "75%" }}>
					<Input
						htmlSize={30}
						fontSize={"2xl"}
						placeholder="255"
						value={inputUnsignedValue}
						onChange={handleUnsignedChange}
						isReadOnly={inputSignedValue ? true : false}
						bg={inputSignedValue ? "green.50" : undefined}
						isInvalid={isErrorUnsigned}
					/>
					<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
						<>(10)</>
					</InputRightElement>
				</InputGroup>
			</Box>
			{/* signedDEC */}
			<Box
				paddingY={{ base: "3", md: "0" }}
				width={"100%"}
				display={{ md: "flex" }}>
				<Flex alignItems={"center"} width={"25%"}>
					<Box layerStyle="showBaseNumber">DEC</Box>
					<Box layerStyle="showUnsignedOrSigned">signed</Box>
				</Flex>
				<InputGroup size={"lg"} width={{ base: "100%", md: "75%" }}>
					<Input
						htmlSize={30}
						fontSize={"2xl"}
						placeholder="-1"
						value={inputSignedValue}
						onChange={handleSignedChange}
						isReadOnly={inputUnsignedValue ? true : false}
						bg={inputUnsignedValue ? "green.50" : undefined}
						isInvalid={isErrorSigned}
					/>
					<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
						<>(10)</>
					</InputRightElement>
				</InputGroup>
			</Box>
			{/* output */}
			{/* BIN */}
			<Box
				paddingY={{ base: "3", md: "0" }}
				width={"100%"}
				display={{ md: "flex" }}>
				<Flex alignItems={"center"} width={"25%"}>
					<Box layerStyle="showBaseNumber">BIN</Box>
					<Spacer />
				</Flex>
				<InputGroup size={"lg"} width={{ base: "100%", md: "75%" }}>
					<Input
						htmlSize={30}
						white-space="normal"
						placeholder="11111111"
						overflow-wrap="break-word"
						value={
							!(isErrorUnsigned || isErrorSigned)
								? toBin(toHex(inputUnsignedValue || inputSignedValue))
								: ""
						}
						fontSize={"2xl"}
						isReadOnly={true}
						bg={"green.50"}
					/>
					<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
						<>(2)</>
					</InputRightElement>
				</InputGroup>
			</Box>
			{/* HEX */}
			<Box
				paddingY={{ base: "3", md: "0" }}
				width={"100%"}
				display={{ md: "flex" }}>
				<Flex alignItems={"center"} width={"25%"}>
					<Box layerStyle="showBaseNumber">HEX</Box>
					<Spacer />
				</Flex>
				<InputGroup size={"lg"} width={{ base: "100%", md: "75%" }}>
					<Input
						htmlSize={30}
						fontSize={"2xl"}
						placeholder="FF"
						value={
							!(isErrorUnsigned || isErrorSigned)
								? toHex(inputUnsignedValue || inputSignedValue)
								: ""
						}
						isReadOnly={true}
						bg={"green.50"}
					/>
					<InputRightElement pointerEvents="none" fontSize={"sm"} m={"1.5"}>
						<>(16)</>
					</InputRightElement>
				</InputGroup>
			</Box>
		</VStack>
	);
};
