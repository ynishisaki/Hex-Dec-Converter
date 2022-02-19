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

		if (bitLength % 8 !== 0) {
			return "ERR!";
		} else {
			if (unSignedDec >> (bitLength - 1) == 1) {
				return -((~unSignedDec - 1) & (2 ** (bitLength - 1)));
			} else {
				return unSignedDec;
			}
		}
	};

	const test = (hex: any) => {
		const unSignedDec = parseInt(hex, 16);
		const bitLength = hex.toString().length * 4; // bit
		return 1 - ~unSignedDec;
	};

	const showBitLength = (hex: any) => {
		const bitLength = hex.toString().length * 4;
		if (bitLength % 8 == 0) {
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
			{test(inputValue)}
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
