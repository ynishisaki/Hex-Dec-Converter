import {
	Box,
	Button,
	Center,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightAddon,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { CgMathEqual } from "react-icons/cg";

export const ToUnsignedHex = () => {
	const initialValue = "";
	const [inputValue, setInputValue] = useState<number | string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setInputValue(event.target.value.toUpperCase());

	// one's complement
	const toHex = (dec: any) => Number(dec).toString(16).toUpperCase();

	const toBin = (dec: any) => parseInt(dec, 16).toString(2);

	return (
		<Box w={"auto"} fontSize={"2xl"}>
			<Text>unsigned one's complement</Text>
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
							value={toHex(inputValue)}
							isReadOnly={true}
							fontSize={"2xl"}
							bg={"gray.100"}
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
						{/* <InputLeftElement>
							<Button
								// px={30}
								colorScheme="teal"
								// size="90%"
								size={"lg"}
								onClick={() => setInputValue(initialValue)}>
								clear
							</Button>
						</InputLeftElement> */}
						<Input
							htmlSize={16}
							width="auto"
							placeholder="255"
							onChange={handleChange}
							fontSize={"2xl"}
							// isReadOnly={true}
							value={inputValue}
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
