import {
    Box,
    Center,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Spacer,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ClearButton } from "../small/ClearButton";
import { BitSelect } from "../small/BitSelect";
import { ShowValueWindow } from "../medium/ShowValueWindow";

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
        <VStack width={"100%"}>
            {/* selecter and button */}
            <Box width={"100%"}>
                <Flex justifyContent={"flex-end"} my={"1"}>
                    {/* selecter */}
                    {!selectedOption && (
                        <Center fontSize={{ base: "lg", md: "xl" }} mx={4}>
                            {showBitLength(inputValue) + "bit"}
                        </Center>
                    )}
                    <Center
                        fontSize={{ base: "lg", md: "xl" }}
                        minW={"100px"}
                        mx={2}>
                        bit length :
                    </Center>
                    <BitSelect onChange={(e) => selectChange(e)}></BitSelect>
                </Flex>
                {/* button */}
                <Flex justifyContent={"flex-end"} my={"1"}>
                    <ClearButton
                        onClick={() =>
                            setInputValue(initialValue)
                        }></ClearButton>
                </Flex>
            </Box>
            {/* input */}
            {/* HEX */}
            <Box
                paddingY={{ base: "2", md: "0" }}
                width={"100%"}
                display={{ md: "flex" }}>
                <Flex alignItems={"center"} width={"25%"}>
                    <Box layerStyle='showBaseNumber'>HEX</Box>
                    <Spacer />
                </Flex>
                <ShowValueWindow
                    placeholder='FF'
                    value={inputValue}
                    isInput={true}
                    onChange={handleChange}
                    // 入力文字数に制限があるので、isErrorで判定する必要がない
                    // isError={false}
                    radix={16}></ShowValueWindow>
            </Box>
            {/* output */}
            {/* BIN */}
            <Box
                paddingY={{ base: "3", md: "0" }}
                width={"100%"}
                display={{ md: "flex" }}>
                <Flex alignItems={"center"} width={"25%"}>
                    <Box layerStyle='showBaseNumber'>BIN</Box>
                    <Spacer />
                </Flex>
                <ShowValueWindow
                    placeholder='11111111'
                    value={toBin(inputValue)}
                    isInput={false}
                    radix={2}></ShowValueWindow>
            </Box>
            {/* unsignedDEC */}
            <Box
                paddingY={{ base: "3", md: "0" }}
                width={"100%"}
                display={{ md: "flex" }}>
                <Flex alignItems={"center"} width={"25%"}>
                    <Box layerStyle='showBaseNumber'>DEC</Box>
                    <Box layerStyle='showUnsignedOrSigned'>unsigned</Box>
                </Flex>
                <ShowValueWindow
                    placeholder='255'
                    value={toUnsignedDec(inputValue)}
                    isInput={false}
                    radix={10}></ShowValueWindow>
            </Box>
            {/* signedDEC */}
            <Box
                paddingY={{ base: "3", md: "0" }}
                width={"100%"}
                display={{ md: "flex" }}>
                <Flex alignItems={"center"} width={"25%"}>
                    <Box layerStyle='showBaseNumber'>DEC</Box>
                    <Box layerStyle='showUnsignedOrSigned'>signed</Box>
                </Flex>
                <ShowValueWindow
                    placeholder='-1'
                    value={toSignedDec(inputValue)}
                    isInput={false}
                    radix={10}></ShowValueWindow>
            </Box>
        </VStack>
    );
};
