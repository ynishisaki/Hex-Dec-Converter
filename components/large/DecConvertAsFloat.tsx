import { Box, VStack, Spacer, Flex } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { ClearButton } from "../small/ClearButton";
import { ShowValueWindow } from "../medium/ShowValueWindow";

export const DecConvertAsFloat = () => {
    // input
    const initialValue = "";
    const [inputValue, setInputValue] = useState<number | string>(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = event.target.value; // string

        // 入力から、整数or浮動小数点のみを受け付ける正規表現

        // 入力可能な文字は、-と.と0-9。それ以外の文字は無効なので、取り除く
        val = val.replace(/[^-\.0-9]/g, "");

        // 先頭に入力可能な文字は、-と0-9のみ
        val = val.replace(/^[^-0-9]/g, "");

        // 0は、基本先頭には入力できないが、例外として、0.1のような場合はOK
        val = val.replace(/^[0]+[0-9]/g, "0"); // 先頭の0の後に来て良いのは、.のみ
        val = val.replace(/^[-][0]+[0-9]+/g, "-0"); // 先頭の-0の後に来て良いのは、.のみ

        // .は、1つまでしか入力できないので、2つ目の.が入力された場合は、2つ目を取り除く
        if (/^[-]?[0-9]+[\.][0-9]*[\.]/.test(val) == true) {
            let regexp = /\./g;

            // 最初のマッチを探す
            let matchOne = regexp.exec(val);
            if (matchOne !== null) {
                regexp.lastIndex; //  マッチ後の位置
            }

            // 2つ目のマッチを探す
            let matchTwo = regexp.exec(val); // regexp.lastIndex から検索を続ける
            if (matchTwo !== null) {
                let index = matchTwo.index; // マッチした位置

                // 2つ目のマッチした.を切り取る
                // ただし、ひとつ目の.を入力した場合は、2つ目が切り取られるため、若干不自然な挙動ではある
                val = val.slice(0, index) + val.slice(index + 1);

                setInputValue(val);
            }
        }

        // 0は、先頭には入力できないため、先頭以外に0が入力された場合は、取り除く
        // 先頭が0-9のとき(=正の数)
        if (/^[\.0-9]+[-]/.test(val) == true) {
            val = val.replace(/[-]/g, ""); // 文字列の途中の-を取り除く
            setInputValue(val);
        }
        // 先頭が-のとき（=負の数）
        else if (/^[-][\.0-9]*[-]/.test(val) == true) {
            val = "-" + val.replace(/[-]/g, ""); // 文字列の途中の-を取り除き、先頭の-を残す
            setInputValue(val);
        }
        // それ以外、入力に問題がない場合
        else {
            setInputValue(val);
        }
    };

    // 入力の10進数から16進数に変換(ieee754単精度)
    const toHex = (dec: number | string) => {
        const buffer = new ArrayBuffer(4);

        const dataView = new DataView(buffer);
        dataView.setFloat32(0, Number(dec), false); // falseならBig endian

        const hex = dataView.getUint32(0).toString(16); // byteOffset=0, littleEndian=false

        return dec ? hex.padStart(8, "0") : "";
    };

    // 16進数から2進数に変換
    const toBin = (hex: string) => {
        let hexLiteral = Number(`0x${hex}`);
        let bin = hexLiteral.toString(2);

        return hex ? bin.padStart(32, "0") : "";
    };

    return (
        <VStack width={"100%"}>
            <Box width={"100%"}>
                {/* button */}
                <Flex justifyContent={"flex-end"} my={"1"}>
                    <ClearButton
                        onClick={() => {
                            setInputValue(initialValue);
                        }}></ClearButton>
                </Flex>
            </Box>
            {/* input */}
            {/* DEC */}
            <Box
                paddingY={{ base: "3", md: "0" }}
                width={"100%"}
                display={{ md: "flex" }}>
                <Flex alignItems={"center"} width={"25%"}>
                    <Box layerStyle='showBaseNumber'>DEC</Box>
                    <Box layerStyle='showUnsignedOrSigned'></Box>
                </Flex>
                <ShowValueWindow
                    placeholder='0.5'
                    value={inputValue}
                    isInput={true}
                    onChange={handleChange}
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
                    placeholder='00111111000000000000000000000000'
                    value={toBin(toHex(inputValue))}
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
                    placeholder='3f000000'
                    value={toHex(inputValue)}
                    isInput={false}
                    radix={16}></ShowValueWindow>
            </Box>
        </VStack>
    );
};
