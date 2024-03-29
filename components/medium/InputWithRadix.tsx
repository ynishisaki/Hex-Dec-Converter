import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";

type ChildCompProps = {
	type?: "number";
	step?: "any";
	placeholder: string;
	value: string | number | undefined;
	isInput: boolean; // 名前ややこしいけど、入力値か出力値かを判定するフラグ
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
	isError?: boolean | undefined;
	radix: number;
};

export const InputWithRadix = (props: ChildCompProps) => {
	return (
		<InputGroup size={"lg"} width={"calc(100% - 58px)"}>
			<Input
				htmlSize={30}
				fontSize={{ base: "xl", md: "2xl" }}
				type='text'
				placeholder={props.placeholder}
				value={props.value}
				// 入力値の場合の設定
				// 入力値を正規表現で制限し、値が不正な場合は赤枠で表示
				onChange={props.isInput ? props.onChange : undefined}
				isInvalid={props.isInput ? props.isError : false}
				// 出力値の場合の設定
				// 読み取り専用の場合は文字入力不可にし、背景色を薄緑で表示
				isReadOnly={props.isInput ? false : true}
				bg={props.isInput ? undefined : "gray.100"}
			/>

			<InputRightElement pointerEvents='none' fontSize={"sm"} m={"1.5"}>
				{/* 例えば2進数の場合、表示は(2) */}
				<>({props.radix})</>
			</InputRightElement>
		</InputGroup>
	);
};
