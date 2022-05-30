import { Flex, Progress, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FallingLines } from "react-loader-spinner";

const Spinners = ({ msg, progress }) => {
	useEffect(() => {}, [progress]);
	return (
		<Flex direction="column" justifyContent="center" alignItems="center" px={1}>
			<FallingLines width="110" color="#c8553d" />
			<Text fontSize={["15pt", "20pt"]} textAlign="center" px={2}>
				{msg}
			</Text>
			{/* Hien thong so % da Upload */}
			<Text color="green" fontSize={["12pt", "18pt"]}>
				{Number.parseInt(progress)} %
			</Text>
			{/* Hien Thanh progress bar hien tien do upload */}
			{progress && (
				<Progress
					mt={50}
					hasStripe
					isAnimated
					size="md"
					value={Number.parseInt(progress)}
					width={["180px", "400px"]}
					rounded="lg"
					colorScheme="orange"
				/>
			)}
		</Flex>
	);
};

export default Spinners;
