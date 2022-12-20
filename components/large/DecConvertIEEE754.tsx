import { Box, Center, VStack, Spacer, Flex } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { ClearButton } from "../small/ClearButton";
import { BitSelect } from "../small/BitSelect";
import { ShowValueWindow } from "../medium/ShowValueWindow";

export const DecConvertIEEE754 = () => {
    // input
    const initialValue = "";
    const [inputValue, setInputValue] = useState<number | string>(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = event.target.value; // string

        // 浮動小数点の正規表現

        val = val.replace(/[^-\.0-9]/g, ""); // -と.と0から9以外の文字を取り除く

        val = val.replace(/^[^-0-9]/g, ""); // 先頭の0の後に来て良いのは、-と0-9のみ

        val = val.replace(/^[0]+[0-9]/g, "0"); // 先頭の0の後に来て良いのは、.のみ
        val = val.replace(/^[-][0]+[0-9]+/g, "-0"); // 先頭の-0の後に来て良いのは、.のみ

        // // 文字列の途中の.を取り除く
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
                //　2つ目のマッチした.を切り取る
                // ただし、ひとつ目の.を入力した場合は、2つ目が切り取られるため、若干不自然な挙動ではある
                val = val.slice(0, index) + val.slice(index + 1);
            }
        }

        // -が先頭以外に入力される場合は、取り除く
        // 先頭が-以外(=正の数)
        if (/^[\.0-9]*[-]/.test(val) == true) {
            val = val.replace(/[-]/g, ""); // 文字列の途中の-を取り除く
            console.log("true   ");
            setInputValue(val);
        }
        // 先頭が-（=負の数）
        else if (/^[-][\.0-9]*[-]/.test(val) == true) {
            val = "-" + val.replace(/[-]/g, ""); // 文字列の途中の-を取り除き、先頭の-を残す
            setInputValue(val);
            console.log("true -");
        } else {
            setInputValue(val);
            console.log("false");
        }
        setInputValue(val);
    };

    // 入力値は、ieee754の単精度浮動小数点数で16進数に変換
    const toHex = (dec: number | string) => {
        const buffer = new ArrayBuffer(4);
        const dataView = new DataView(buffer);
        dataView.setFloat32(0, Number(dec));
        const hex = dataView.getUint32(0).toString(16);
        return dec ? hex.padStart(8, "0") : "";
    };

    // 16進数から2進数に変換
    // まだ未完成
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
                    placeholder='11111111'
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
                    placeholder='FF'
                    value={toHex(inputValue)}
                    isInput={false}
                    radix={16}></ShowValueWindow>
            </Box>
        </VStack>
    );
};
