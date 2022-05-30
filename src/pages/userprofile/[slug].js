import { Button, Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import React from "react";
import app from "../../../firebase-config";
import { getUserInfo } from "../../../utils/fetchData";
import Layout from "../../components/Layout";
import VideoPin from "../../components/VideoPin";

const UserProfile = ({ video, user }) => {
	// console.log({ video });
	// console.log({ user });
	return (
		<Layout>
			<Flex mt={{ base: "80px", md: "15px" }} ml={{ base: "0", md: "70px" }} width="full" direction="column">
				<Flex gap="2" align="center" justify="space-between" direction={{ base: "column", md: "row" }}>
					<Flex align="center" gap="2">
						<Image src={user.photoURL} alt="" rounded="full" />
						<Text fontSize={["10pt", "20pt"]}>{user.displayName}</Text>
					</Flex>
					<Flex align="center" gap="2">
						<Button colorScheme="facebook" fontFamily="serif">
							CUSTOMIZE CHANNEL
						</Button>
						<Button colorScheme="facebook" fontFamily="serif">
							MANAGE VIDEOS
						</Button>
					</Flex>
				</Flex>
				<Heading my="2" fontFamily="serif">
					All video of {user.displayName}
				</Heading>
				<SimpleGrid mt="2" autoColumns="max-content" spacing={2} minChildWidth="200px">
					{video.map((v) => (
						<VideoPin key={v.id} data={v} />
					))}
				</SimpleGrid>
			</Flex>
		</Layout>
	);
};

export default UserProfile;

export const getServerSideProps = async ({ params: { slug } }) => {
	const db = getFirestore(app);
	const queries = await getDocs(query(collection(db, "videos"), where("userId", "==", slug), orderBy("id", "desc")));

	const data = queries.docs.map((entry) => ({ ...entry.data() }));

	// console.log(data[0].userId);
	const user = await getUserInfo(db, data[0].userId);

	return {
		props: {
			video: data,
			user: user,
		},
	};
};
