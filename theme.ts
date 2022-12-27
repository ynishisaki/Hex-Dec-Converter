import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    components: {
        Button: {
            baseStyle: {},
            defaultProps: {
                colorScheme: "green",
            },
        },
        Input: {
            baseStyle: {},
            defaultProps: {
                focusBorderColor: "green.400",
            },
        },
        Select: {
            defaultProps: {
                focusBorderColor: "green.400",
            },
        },
    },

    textStyles: {},

    layerStyles: {
        base: {
            bg: "white",
            maxW: "740px",
            px: { base: "0", md: "10" },
            mx: { base: "10vw", md: "auto" },
            display: "block",
            fontFamily:
                '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
        },
        title: {
            fontSize: "4xl",
            py: "10",
        },
        header: {
            px: "10px",
            alignItems: "center",
            display: "flex",
            position: "fixed",
            top: "0px",
            height: "70px",
            width: "100vw",
            bgColor: "#f6f1eb",
            zIndex: "banner", //1200
        },
        footer: {
            borderTop: "1px solid #eaeaea",
            flexDirection: "column",
            display: "flex",
            flex: "1",
            w: "80vw",
            mx: "auto",
            p: "1rem 0",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "stickey", //1100
        },
        showBaseNumber: {
            minW: "60px",
            width: "35%", // 1/3
            fontSize: "2xl",
        },
        showUnsignedOrSigned: {
            minW: "150px",
            width: "65%", // 2/3
            fontSize: "lg",
            ml: 2,
        },
    },
});
