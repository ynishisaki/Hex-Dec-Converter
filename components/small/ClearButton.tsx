import { IconButton } from "@chakra-ui/react";
import { MdOutlineClear } from "react-icons/md";

type ChildCompProps = {
	onClick: (
		event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => void;
};

export const ClearButton = (props: ChildCompProps) => {
	return (
		<IconButton
			ml='2'
			width={"50px"}
			size='lg'
			colorScheme='gray'
			variant='outline'
			aria-label='clear'
			icon={<MdOutlineClear />}
			onClick={(e) => props.onClick(e)}></IconButton>
	);
};
