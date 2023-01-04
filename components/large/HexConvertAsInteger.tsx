import { Box, Center, Flex, Spacer, VStack } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { ClearButton } from "../small/ClearButton";
import { BitSelect } from "../small/BitSelect";
import { InputWithRadix } from "../medium/InputWithRadix";
import { useCount } from "../../hooks/useCount";

export const HexConvertAsInteger = () => {
    // select
    const [selectedOption, setSelectedOption] = useState<String>("");

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);

        // 外部でも宣言しているが、ここで宣言しないと、更新前の値が参照されてしまう
        let selectedByteLength = Number(value) / 4;

        // // 指定bit数より長い入力は切り捨てる
        setInputValue(inputValue.slice(0, selectedByteLength));
    };

    // selectChangeでセレクターを変更した時にだけ実行したい
    const selectedBitLength = useMemo(
        () => (selectedOption ? Number(selectedOption) : 32),
        [selectedOption]
    );
    const selectedByteLength = useMemo(
        () => selectedBitLength / 4,
        [selectedBitLength]
    );

    // input
    const initialValue = "";
    const [inputValue, setInputValue] = useState<string>(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const regex = /[^0-9a-fA-F]/g;
        setInputValue(
            value
                .replaceAll(regex, "")
                .slice(0, selectedByteLength)
                .toUpperCase()
        );
    };

    const inputBitLength = (hex: string) => {
        const bitLength = hex.toString().length * 4;
        const bitLengthAddZeroPadding =
            Number(bitLength) + Number(bitLength % 8);
        return selectedOption ? selectedBitLength : bitLengthAddZeroPadding;
    };

    const toBin = (hex: string) => {
        const bin = parseInt(hex, 16).toString(2);

        return hex ? bin.padStart(inputBitLength(hex), "0") : "";
    };

    // one's complement
    const toUnsignedDec = (hex: string) => (hex ? parseInt(hex, 16) : "");

    // two's complement
    const toSignedDec = (hex: string) => {
        const unSignedDec = parseInt(hex, 16);
        // 8, 16, 24bit かつ 最上位bitが1の場合
        if (
            inputBitLength(hex) <= 24 &&
            unSignedDec >>> (inputBitLength(hex) - 1) == 1
        ) {
            return hex ? unSignedDec - 2 ** inputBitLength(hex) : "";
        }
        // 8, 16, 24bit かつ 最上位bitが0の場合
        else if (
            inputBitLength(hex) <= 24 &&
            unSignedDec >>> (inputBitLength(hex) - 1) == 0
        ) {
            return hex ? unSignedDec : "";
        }
        // 32bit の場合
        else if (inputBitLength(hex) === 32) {
            return unSignedDec >> 0;
        }
        // その他: 8, 16, 24, 32bit以外の場合
        else {
            return "";
        }
    };

    const { count, increment } = useCount();

    return (
        <VStack width={"100%"}>
            {/* selecter and button */}
            <Box width={"100%"}>
                <p>{count}</p>
                <button onClick={increment}>increment</button>
                <Flex justifyContent={"flex-end"} my={"1"}>
                    {/* selecter */}
                    {!selectedOption && (
                        <Center fontSize={{ base: "lg", md: "xl" }} mx={4}>
                            {inputBitLength(inputValue) + "bit"}
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
                <InputWithRadix
                    placeholder='FF'
                    value={inputValue}
                    isInput={true}
                    onChange={handleChange}
                    radix={16}></InputWithRadix>
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
                <InputWithRadix
                    placeholder='11111111'
                    value={toBin(inputValue)}
                    isInput={false}
                    radix={2}></InputWithRadix>
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
                <InputWithRadix
                    placeholder='255'
                    value={toUnsignedDec(inputValue)}
                    isInput={false}
                    radix={10}></InputWithRadix>
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
                <InputWithRadix
                    placeholder='-1'
                    value={toSignedDec(inputValue)}
                    isInput={false}
                    radix={10}></InputWithRadix>
            </Box>
        </VStack>
    );
};
