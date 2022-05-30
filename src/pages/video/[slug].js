import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player/lazy";

import app from "../../../firebase-config";
import Layout from "../../components/Layout";
import { format } from "../../../constants/const";
import moment from "moment";
import { getUserInfo } from "../../../utils/fetchData";

const VideoDetail = ({ video, user }) => {
	// console.log({ video });
	// console.log({ user });

	const [hasWindow, setHasWindow] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setHasWindow(true);
		}
	}, []);

	return (
		<Layout>
			<Flex mt={{ base: "80px", md: "15px" }} ml={{ base: "0", md: "70px" }} width="full" direction="column">
				<Flex bg="black" align="center">
					{hasWindow && <ReactPlayer url={video.videoUrl} playing controls width="100%" height="100%" />}
				</Flex>
				<Text fontSize={{ base: "15pt", md: "25pt" }}>{video.title}</Text>
				<Box my="2">{moment(new Date(parseInt(video.id)).toISOString()).fromNow()}</Box>
				<Text fontSize={{ base: "10pt", md: "11pt" }} fontFamily="sans-serif">
					{video.description}
				</Text>
				<Flex align="center" w={["100%", "30%"]} justify="space-between" p="2" shadow="lg">
					<Flex gap="2">
						<Image src={user.photoURL} alt="" rounded="full" w="30px" />
						<Text>{user.displayName}</Text>
					</Flex>
					<Button
						colorScheme="red"
						onClick={() => (window.location = "https://www.youtube.com/channel/UCZ4Teasw10sOY3LYsM_a4bg")}
					>
						SUBSRIBE
					</Button>
				</Flex>
			</Flex>
		</Layout>
	);
};

export default VideoDetail;

export const getServerSideProps = async ({ params: { slug } }) => {
	const db = getFirestore(app);

	const snap = await getDoc(doc(db, "videos", slug));
	const data = snap.data();
	// console.log(data);

	const user = await getUserInfo(db, data.userId);

	// console.log({ user });
	return {
		props: {
			video: data,
			user,
		},
	};
};
