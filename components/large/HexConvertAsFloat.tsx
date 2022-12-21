import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ClearButton } from "../small/ClearButton";
import { ShowValueWindow } from "../medium/ShowValueWindow";

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
            <Box width={"100%"}>
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
                    placeholder='3F000000'
                    value={inputValue}
                    isInput={true}
                    onChange={handleChange}
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
                    placeholder='00111111000000000000000000000000'
                    value={toBin(inputValue)}
                    isInput={false}
                    radix={2}></ShowValueWindow>
            </Box>
            {/* DEC */}
            <Box
                paddingY={{ base: "3", md: "0" }}
                width={"100%"}
                display={{ md: "flex" }}>
                <Flex alignItems={"center"} width={"25%"}>
                    <Box layerStyle='showBaseNumber'>DEC</Box>
                </Flex>
                <ShowValueWindow
                    placeholder='0.5'
                    value={toDec(toBin(inputValue))}
                    isInput={false}
                    radix={10}></ShowValueWindow>
            </Box>
        </VStack>
    );
};
