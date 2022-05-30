import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { categories } from "../../utils/data";
import Category from "./Category";

const CategoryBar = () => {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const handleScrol = () => {
			if (window.scrollY > 0) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};
		window.addEventListener("scroll", handleScrol);

		return () => {
			window.removeEventListener("scroll", handleScrol);
		};
	}, []);

	return (
		<Flex
			mt={["0", "1px"]}
			direction={{ base: "row", md: "column" }}
			bg={scroll ? "blackAlpha.300" : "unset"}
			w={{ base: "full", md: "80px" }}
			h={{ base: "50px", md: "100vh" }}
			gap={{ base: "5", md: "8" }}
			pos="fixed"
			align="center"
			justify={{ base: "center", md: "unset" }}
			left="0"
			top={scroll ? "0" : "unset"}
			transition="1s ease"
			zIndex={99}
		>
			{categories.map((cat) => (
				<Category key={cat.id} category={cat} />
			))}
		</Flex>
	);
};

export default CategoryBar;
