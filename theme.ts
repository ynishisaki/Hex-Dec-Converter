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
			// bg: "#f6f1eb",
			// mt: "70px",
			p: { base: "3% 5%", md: "3% 20%" },
			//	 width: { md: "100%" },
			// color: "#4d5156",
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
			// alignItems: "center",
			width: "50px",
			fontSize: "2xl",
		},
		showUnsignedOrSigned: {
			// alignItems: "center",
			width: "100px",
			fontSize: "lg",
			ml: 3,
		},
	},
});
