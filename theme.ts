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

	//   textStyles: {
	//     p: {
	//       color: '#4d5156',
	//       margin: '8px 0',
	//       fontSize: '16px',
	//       fontWeight: '200',
	//       fontFamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif',
	//       // lineHeight: '1.4',
	//     },
	//     h1: {
	//       color: '#4d5156',
	//       // margin: '16px 0',
	//       fontSize: '16px',
	//       fontWeight: 'bold',
	//       fontFamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
	//     },
	//     h2: {
	//       color: '#4d5156',
	//       // margin: '16px 0',
	//       fontSize: '24px',
	//       fontWeight: 'bold',
	//       fontFamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
	//     },
	//   },

	layerStyles: {
		body: {
			// m: { base: "3vw 5vw", md: "3vw 5vw" },
			maxW: "640px",
			px: { base: "20", md: "0" },
			mx: "auto",
			// alignItems: "center",
			// display: "flex",
			display: "block",
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
			p: "1rem 0",
			bgColor: "white",
			justifyContent: "center",
			alignItems: "center",
			zIndex: "stickey", //1100
		},
		borderLine: {
			w: "80%",
			mb: "30px",
			borderTop: "1px solid",
			borderColor: "gray.300",
		},
		showBaseNumber: {
			minW: "50px",
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
