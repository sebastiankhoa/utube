import { Flex, SimpleGrid } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { collection, doc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";

import app from "../../firebase-config";
import Spinners from "../components/Spinner";
import VideoPin from "../components/VideoPin";

export default function Home({ feeds }) {
	// if (!feeds) return <Spinners msg="loading your feeds" />;

	return (
		<Layout>
			<Flex mt={{ base: "80px", md: "15px" }} ml={{ base: "0", md: "70px" }} width="full" direction="column">
				<SimpleGrid autoColumns="max-content" w="full" minChildWidth="250px" rowGap="50px" columnGap="15px">
					{feeds.map((feed) => (
						<VideoPin key={feed.id} data={feed} />
					))}
				</SimpleGrid>
			</Flex>
		</Layout>
	);
}

export const getStaticProps = async (context) => {
	const db = getFirestore(app);
	// fetch all docs from firebase
	const queries = await getDocs(query(collection(db, "videos"), orderBy("id", "desc")));
	const data = queries.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

	return {
		props: {
			feeds: data,
		},
	};
};
