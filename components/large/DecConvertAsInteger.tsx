import { Box, Center, VStack, Spacer, Flex } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { ClearButton } from "../small/ClearButton";
import { BitSelect } from "../small/BitSelect";
import { ShowValueWindow } from "../medium/ShowValueWindow";

export const DecConvertAsInteger = () => {
    // select
    const [selectedOption, setSelectedOption] = useState<String>("");

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedOption(value);

        const selectedBitLength = value ? Number(value) : 32;
        const selectedByteLength = selectedBitLength / 4;
        //setInputValue(inputValue.slice(0, selectedByteLength));
    };

    const selectedBitLength = selectedOption ? Number(selectedOption) : 32;
    const selectedByteLength = selectedBitLength / 4;

    // input
    const initialValue = "";
    const [inputUnsignedValue, setInputUnsignedValue] = useState<
        number | string
    >(initialValue);
    const [inputSignedValue, setInputSignedValue] = useState<number | string>(
        initialValue
    );

    const handleUnsignedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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

    const inputBitLengthUnsigned = (dec: number | string) => {
        // option is auto (selectedBitLength == 32)
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
            return selectedBitLength;
        }
    };

    const inputBitLengthSigned = (decimal: number | string) => {
        let dec = Number(decimal);
        // option is auto (selectedBitLength == 32)
        if (selectedOption == "") {
            // if dec == "-"
            if (isNaN(dec)) {
                return 0;
            } else {
                if (dec == 0) {
                    return 0;
                } else if (
                    dec >= -1 * 2 ** (8 - 1) &&
                    dec <= 2 ** (8 - 1) - 1
                ) {
                    return 8;
                } else if (
                    dec >= -1 * 2 ** (16 - 1) &&
                    dec <= 2 ** (16 - 1) - 1
                ) {
                    return 16;
                } else if (
                    dec >= -1 * 2 ** (24 - 1) &&
                    dec <= 2 ** (24 - 1) - 1
                ) {
                    return 24;
                } else if (
                    dec >= -1 * 2 ** (32 - 1) &&
                    dec <= 2 ** (32 - 1) - 1
                ) {
                    return 32;
                } else {
                    return 32;
                }
            }
        }
        // option is selected
        else {
            return selectedBitLength;
        }
    };

    const isErrorUnsigned =
        // if bitLength == 0, then isErrorUnsigned == false
        inputBitLengthUnsigned(inputUnsignedValue)
            ? inputUnsignedValue >=
              2 ** inputBitLengthUnsigned(inputUnsignedValue)
            : false;

    const isErrorSigned =
        // if bitLength == 0, then isErrorSigned == false
        inputBitLengthSigned(inputSignedValue)
            ? inputSignedValue <
                  -1 * 2 ** (inputBitLengthSigned(inputSignedValue) - 1) ||
              inputSignedValue >
                  2 ** (inputBitLengthSigned(inputSignedValue) - 1) - 1
            : false;

    const toHex = (decimal: number | string) => {
        let dec = Number(decimal);

        if (isNaN(dec)) {
            return "";
        } else {
            // positive number
            if (dec >= 0) {
                const hex = Number(dec).toString(16).toUpperCase();

                return dec
                    ? hex.padStart(inputBitLengthSigned(dec) / 4, "0")
                    : "";
            }
            // negative number
            else {
                let dec_unsigned =
                    2 ** inputBitLengthSigned(dec) - Math.abs(dec);
                const hex = Number(dec_unsigned).toString(16).toUpperCase();
                return hex.padStart(inputBitLengthUnsigned(dec) / 4, "0");
            }
            // 8bit
            // else if (dec >= -128) {
            //     let dec_unsigned = 256 - Math.abs(dec);
            //     const hex = Number(dec_unsigned).toString(16).toUpperCase();
            //     return hex.padStart(inputBitLengthUnsigned(dec) / 4, "0");
            // }
            // // 16bit
            // else if (dec >= -32768) {
            //     let dec_unsigned = 65536 - Math.abs(dec);
            //     const hex = Number(dec_unsigned).toString(16).toUpperCase();
            //     return hex.padStart(inputBitLengthUnsigned(dec) / 4, "0");
            // }
            // // 24bit
            // else if (dec >= -8388608) {
            //     let dec_unsigned = 16777216 - Math.abs(dec);
            //     const hex = Number(dec_unsigned).toString(16).toUpperCase();
            //     return hex.padStart(inputBitLengthUnsigned(dec) / 4, "0");
            // }
            // // 32bit
            // else if (dec >= -2147483648) {
            //     let dec_unsigned = 4294967296 - Math.abs(dec);
            //     const hex = Number(dec_unsigned).toString(16).toUpperCase();
            //     return hex.padStart(inputBitLengthUnsigned(dec) / 4, "0");
            // }
        }
    };
    const toBin = (hex: any) => {
        const bin = parseInt(hex, 16).toString(2);
        return hex ? bin.padStart(hex.length * 4, "0") : "";
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
                            color={
                                isErrorUnsigned || isErrorSigned ? "tomato" : ""
                            }>
                            {inputUnsignedValue
                                ? inputBitLengthUnsigned(inputUnsignedValue) +
                                  "bit"
                                : inputBitLengthSigned(inputSignedValue) +
                                  "bit"}
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
                        onClick={() => {
                            setInputUnsignedValue(initialValue);
                            setInputSignedValue(initialValue);
                        }}></ClearButton>
                </Flex>
            </Box>
            {/* input */}
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
                    value={inputUnsignedValue}
                    isInput={inputSignedValue ? false : true}
                    onChange={handleUnsignedChange}
                    isError={isErrorUnsigned}
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
                    value={inputSignedValue}
                    isInput={inputUnsignedValue ? false : true}
                    onChange={handleSignedChange}
                    isError={isErrorSigned}
                    radix={10}></ShowValueWindow>
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
                    value={
                        !(isErrorUnsigned || isErrorSigned)
                            ? toBin(
                                  toHex(inputUnsignedValue || inputSignedValue)
                              )
                            : ""
                    }
                    isInput={false}
                    radix={2}></ShowValueWindow>
            </Box>
            {/* HEX */}
            <Box
                paddingY={{ base: "3", md: "0" }}
                width={"100%"}
                display={{ md: "flex" }}>
                <Flex alignItems={"center"} width={"25%"}>
                    <Box layerStyle='showBaseNumber'>HEX</Box>
                    <Spacer />
                </Flex>
                <ShowValueWindow
                    placeholder='FF'
                    value={
                        !(isErrorUnsigned || isErrorSigned)
                            ? toHex(inputUnsignedValue || inputSignedValue)
                            : ""
                    }
                    isInput={false}
                    radix={16}></ShowValueWindow>
            </Box>
        </VStack>
    );
};
