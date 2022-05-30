import { Box, Flex, Tooltip, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Category = ({ category }) => {
	const router = useRouter();
	const { colorMode } = useColorMode();

	return (
		<>
			<Flex gap="2">
				<Tooltip placement="right" hasArrow arrowSize={5} label={category.name}>
					<Box
						cursor="pointer"
						color={colorMode == "light" ? "blue" : "white"}
						_hover={{ transform: "rotate(20deg)", color: "orange" }}
						transition="200ms ease"
						onClick={() => router.push(`/category/${category.name}`)}
					>
						{category.iconSrc}
					</Box>
				</Tooltip>
			</Flex>
		</>
	);
};

export default Category;
