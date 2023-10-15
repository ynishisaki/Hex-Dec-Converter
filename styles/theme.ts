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
			maxW: "740px",
			mx: { base: "12px", md: "auto" },
		},
		title: {
			fontSize: { base: "3xl", sm: "5xl", md: "7xl" },
			fontWeight: "extrabold", // 800
			color: "white",
			bgColor: "green.500",
			px: "16px",
			py: "0.5rem",
			mb: { base: "0.5rem", md: "1rem" },
		},
		main: {
			fontFamily:
				'"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
		},
		footer: {
			display: "flex",
			justifyContent: "flex-end",
			p: "0.8rem 16px",
			fontWeight: "semibold", // 600
			color: "white",
			bgColor: "green.500",
			zIndex: "stickey", //1100
		},
		showBaseNumber: {
			fontSize: { base: "lg", md: "2xl" },
		},
		showUnsignedOrSigned: {
			fontSize: { base: "xs", md: "md" },
			ml: 2,
		},
	},
});
