import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import moment from "moment";
import { GrVolumeMute } from "react-icons/gr";
import { GoUnmute } from "react-icons/go";
import { useRouter } from "next/router";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import app from "../../firebase-config";
import { getUserInfo } from "../../utils/fetchData";

const VideoPin = ({ data }) => {
	const router = useRouter();
	const db = getFirestore(app);

	const [userId, setUserId] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [muted, setMuted] = useState(true);

	useEffect(() => {
		if (data) setUserId(data.userId);
		if (userId)
			getUserInfo(db, userId).then((info) => {
				setUserInfo(info);
			});
	}, [userId]);

	return (
		<Flex
			direction="column"
			_hover={{ transform: "scale(1.1)" }}
			transition="0.5s ease"
			shadow="xl"
			py="2"
			overflow="hidden"
			rounded="lg"
			maxH="300px"
		>
			<Box cursor="pointer" onClick={() => router.replace(`/video/${data.id}`)}>
				<video
					src={data.videoUrl}
					onMouseOver={(e) => e.target.play()}
					onMouseOut={(e) => e.target.pause()}
					onTouchStart={(e) => e.target.play()}
					onTouchEnd={(e) => e.target.pause()}
					muted={muted}
				/>
			</Box>
			<Flex mt="1" gap="2" align="center">
				<Image
					src={userInfo && userInfo.photoURL}
					alt=""
					rounded="full"
					w="40px"
					cursor="pointer"
					onClick={() => router.replace(`/userprofile/${userId}`)}
				/>
				<Text
					fontFamily="sans-serif"
					cursor="pointer"
					fontSize="11pt"
					fontWeight="700"
					onClick={() => router.replace(`/video/${data.id}`)}
				>
					{data.title}
				</Text>
			</Flex>
			<Flex align="center" justify="center" gap="2">
				<Box onClick={() => setMuted(!muted)}>
					{muted ? <GoUnmute size="1.5rem" /> : <GrVolumeMute size="1.5rem" cursor="pointer" />}
				</Box>
				<Box fontFamily="sans-serif" fontSize="11pt">
					{data && moment(new Date(parseInt(data?.id)).toISOString()).fromNow()}
				</Box>
			</Flex>
		</Flex>
	);
};

export default VideoPin;
