import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ClearButton } from "../small/ClearButton";
import { InputWithRadix } from "../medium/InputWithRadix";

export const HexConvertAsFloat = () => {
	//input
	const initialValue = "";
	const [inputValue, setInputValue] = useState<string>(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		const regex = /[^0-9a-fA-F]/g;
		let val = value.replaceAll(regex, "").slice(0, 8).toUpperCase();

		setInputValue(val);
	};

	const handleClickClear = () => {
		setInputValue(initialValue);
	};

	// 入力の16進数から2進数に変換
	const toBin = (hex: string | number) => {
		let hexLiteral = Number(`0x${hex}`);
		let bin = hexLiteral.toString(2);

		return hex ? bin.padStart(32, "0") : "";
	};

	// 2進数から10進数に変換（ieee754単精度）
	const toDec = (bin: string) => {
		const buffer = new ArrayBuffer(4);

		const dataView = new DataView(buffer);
		dataView.setUint32(0, parseInt(bin, 2), false);

		const decAsFloat32 = dataView.getFloat32(0, false); // byteOffset=0, littleEndian=false

		return bin ? decAsFloat32 : "";
	};

	return (
		<VStack width={"100%"}>
			{/* HEX */}
			<Box
				marginY={{ base: "2", md: "0" }}
				width={"100%"}
				display={{ md: "flex" }}>
				<Flex alignItems={"center"} width={"10%"}>
					<Box
						layerStyle='showBaseNumber'
						color='green.500'
						fontWeight={"bold"}>
						HEX
					</Box>
					<Spacer />
				</Flex>
				<Flex width={{ base: "100%", md: "90%" }}>
					<InputWithRadix
						placeholder='3F000000'
						value={inputValue}
						isInput={true}
						onChange={handleChange}
						radix={16}></InputWithRadix>
					<ClearButton onClick={handleClickClear}></ClearButton>
				</Flex>
			</Box>
			{/* output */}
			{/* BIN */}
			<Box
				marginY={{ base: "3", md: "0" }}
				width={"100%"}
				display={{ md: "flex" }}>
				<Flex alignItems={"center"} width={"10%"}>
					<Box layerStyle='showBaseNumber'>BIN</Box>
					<Spacer />
				</Flex>
				<Flex width={{ base: "100%", md: "90%" }}>
					<InputWithRadix
						placeholder='00111111000000000000000000000000'
						value={toBin(inputValue)}
						isInput={false}
						radix={2}></InputWithRadix>
				</Flex>
			</Box>
			{/* DEC */}
			<Box
				marginY={{ base: "3", md: "0" }}
				width={"100%"}
				display={{ md: "flex" }}>
				<Flex alignItems={"center"} width={"10%"}>
					<Box layerStyle='showBaseNumber'>DEC</Box>
				</Flex>
				<Flex width={{ base: "100%", md: "90%" }}>
					<InputWithRadix
						placeholder='0.5'
						value={toDec(toBin(inputValue))}
						isInput={false}
						radix={10}></InputWithRadix>
				</Flex>
			</Box>
		</VStack>
	);
};
