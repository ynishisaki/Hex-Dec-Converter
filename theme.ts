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
			mx: { base: "12px", md: "auto" },
			fontFamily:
				'"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
		},
		title: {
			fontSize: { base: "3xl", sm: "5xl", md: "7xl" },
			fontWeight: "800",
			maxW: "740px",
			mx: { base: "12px", md: "auto" },
			px: "16px",
			pt: "0.5rem",
			pb: "1rem",
		},
		footer: {
			borderTop: "2px solid rgb(226, 232, 240)",
			flexDirection: "column",
			display: "flex",
			flex: "1",
			maxW: "740px",
			mx: { base: "12px", md: "auto" },
			p: "0.8rem 0",
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
