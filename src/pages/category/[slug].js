import { Flex, SimpleGrid } from "@chakra-ui/react";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import React from "react";
import app from "../../../firebase-config";

import Layout from "../../components/Layout";
import VideoPin from "../../components/VideoPin";

const Category = ({ feeds }) => {
	// console.log({ feeds });
	return (
		<Layout>
			<Flex mt={{ base: "80px", md: "15px" }} ml={{ base: "0", md: "70px" }} width="full" direction="column">
				<SimpleGrid autoColumns="max-content" w="full" minChildWidth="300px" rowGap="50px" columnGap="15px">
					{feeds.map((feed) => (
						<VideoPin key={feed.id} data={feed} />
					))}
				</SimpleGrid>
			</Flex>
		</Layout>
	);
};

export default Category;

export const getServerSideProps = async ({ params: { slug } }) => {
	// console.log({ slug });
	const db = getFirestore(app);

	const queries = await getDocs(query(collection(db, "videos"), where("category", "==", slug), orderBy("id", "desc")));
	const data = queries.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
	// console.log({ data });
	return {
		props: {
			feeds: data,
		},
	};
};
