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

export const ToSignedDec = () => {
	const initialValue = "";
	const [inputValue, setInputValue] = useState<number | string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue(event.target.value.toUpperCase());

	// two's complement
	const toDec = (hex: any) => {
		const unSignedDec = parseInt(hex, 16);
		const bitLength = hex.toString().length * 4; // bit

		// 8, 16, 24bit かつ 最上位bitが1の場合
		if (
			(bitLength == 8 || bitLength == 16 || bitLength == 24) &&
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
			return "ERR";
		}
	};

	const showBitLength = (hex: any) => {
		const bitLength = hex.toString().length * 4;
		if (bitLength % 8 == 0 && bitLength <= 32) {
			return bitLength + "bit";
		} else {
			return bitLength + "bit: ERROR!";
		}
	};

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
							value={inputValue}
							onChange={handleChange}
							fontSize={"2xl"}
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
							value={toDec(inputValue)}
							fontSize={"2xl"}
							isReadOnly={true}
							bg={"gray.100"}
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
