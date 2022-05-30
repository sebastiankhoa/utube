import React, { useState, useEffect, useRef } from "react";

import { Box, Button, Flex, FormLabel, Input, Menu, MenuButton, MenuItem, MenuList, Text, Textarea } from "@chakra-ui/react";
import { IoChevronDownCircleOutline, IoTrashSharp, IoWarning } from "react-icons/io5";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineUpload } from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
// Import các hoọk để chứa video lên firebase
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../../firebase-config";

import Router, { useRouter } from "next/router";

import { categories } from "../../utils/data";
import Layout from "../components/Layout";
import Spinners from "../components/Spinner";
import { fetchUser, fetchToken } from "../../utils/fetchData";
import Alerts from "../components/Alert";

const Create = () => {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [category, setCategory] = useState(null);
	const [location, setLocation] = useState("");
	const [video, setVideo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);

	const [alert, setAlert] = useState(false);
	const [alertStatus, setAlertStatus] = useState("");
	const [alertMsg, setAlertMsg] = useState("");
	const [alertIcon, setAlertIcon] = useState(null);
	const [description, setDescription] = useState("");

	// Kiểm tra xem user đã đăng nhập chưa, nếu chưa thì sẽ chuyển đến Login
	const [user, setUser] = useState();
	useEffect(() => {
		const token = fetchToken();
		if (!token) {
			Router.push("/login");
		} else {
			const [userInfo] = fetchUser();
			setUser(userInfo);
		}
	}, []);

	// Function upload video
	const storage = getStorage(app);

	const uploadVideo = (e) => {
		setLoading(true);
		const videoFile = e.target.files[0];
		const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, videoFile);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(uploadProgress);
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
					setVideo(downloadUrl);
					setLoading(false);
					setAlert(true);
					setAlertStatus("success");
					setAlertIcon(<FcCheckmark size="2rem" />);
					setAlertMsg("Video của bạn đã được tải lên thành công");
					setTimeout(() => {
						setAlert(false);
					}, 4000);
				});
			}
		);
	};
	// Delete video
	const deleteVideo = () => {
		const deleteRef = ref(storage, video);
		deleteObject(deleteRef)
			.then(() => {
				setVideo(null);
				setAlert(true);
				setAlertStatus("error");
				setAlertIcon(<IoWarning size="2rem" />);
				setAlertMsg("Video của bạn đã được xoá !");
				setTimeout(() => {
					setAlert(false);
				}, 4000);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//Finish and post
	const db = getFirestore(app);

	const uploadHandle = async () => {
		setLoading(true);
		if (!title || !category || !video) {
			setAlert(true);
			setAlertStatus("error");
			setAlertIcon(<IoWarning size="2rem" />);
			setAlertMsg("Xin hãy nhập đầy đủ thông tin!");
			setTimeout(() => {
				setAlert(false);
			}, 4000);
			setLoading(false);
		} else {
			const data = {
				id: `${Date.now()}`,
				title: title,
				userId: user?.uid,
				category: category,
				location: location,
				videoUrl: video,
				description: description,
			};
			await setDoc(doc(db, "videos", `${Date.now()}`), data);
			setLoading(false);
			router.push("/");
		}
	};

	// Rerender everytime title,location... change
	useEffect(() => {
		console.log("render");
	}, [title, location, description, category]);

	//=========================================JSX===========================================================//
	return (
		<Layout>
			<Flex mt="5" direction="column" border="0.8px" w={["300px", "80%"]} h="100vh" rounded="10px" shadow="xl" p="5">
				{alert && <Alerts status={alertStatus} icon={alertIcon} title={alertMsg} />}
				<Input
					placeholder="Tiêu đề"
					value={title}
					border="none"
					borderBottom="1px"
					_focus={{ border: "none", borderBottom: "1px" }}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Flex mt="4" gap="5" direction={{ base: "column", md: "row" }}>
					<Flex w={{ base: "100%", md: "45%" }} justify="center">
						<Menu>
							<MenuButton
								bg="blue.400"
								color="white"
								_hover={{ bg: "blue.300" }}
								w="100%"
								as={Button}
								rightIcon={<IoChevronDownCircleOutline size="1.5rem" />}
							>
								{category}
							</MenuButton>
							<MenuList w={["100px", "100px", "250px", "420px"]}>
								{categories.map((cat) => (
									<MenuItem key={cat.id} onClick={() => setCategory(cat.name)} gap="2">
										{cat.iconSrc} {cat.name}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
					</Flex>
					<Flex align="center" w={{ base: "100%", md: "50%" }} pl="2">
						<HiLocationMarker size="1.5rem" />
						<Input
							value={location}
							placeholder="Vị trí của video"
							border="none"
							borderBottom="1px"
							_focus={{ border: "none", borderBottom: "1px" }}
							onChange={(event) => setLocation(event.target.value)}
						/>
					</Flex>
				</Flex>
				<Flex w="100%" h="500px" mt="5" border="1px dashed" shadow="lg" align="center" justify="center" borderRadius="lg">
					{!video ? (
						<FormLabel w="full">
							<Flex direction="column" align="center">
								{loading ? (
									<Spinners msg="Uploading your video" progress={progress} />
								) : (
									<Box align="center" cursor="pointer">
										<AiOutlineUpload size="2rem" />
										<Text fontSize={["13pt", "18pt"]}>Bấm vào để tải video lên</Text>
										<input
											type={"file"}
											style={{ width: 0, height: 0 }}
											name="upload video"
											accept="video/mp4,video/x-m4v,video/*"
											onChange={uploadVideo}
										/>
									</Box>
								)}
							</Flex>
						</FormLabel>
					) : (
						<Flex w="full" h="full" pos="relative" justify="center" align="center">
							<Box pos="absolute" top="2" right="6" cursor="pointer" zIndex={99} w="40px" h="40px" onClick={deleteVideo}>
								<IoTrashSharp size="1.5rem" color="red" />
							</Box>
							<video src={video} width="100%" controls />
						</Flex>
					)}
				</Flex>
				<Flex mt="5">
					<Textarea
						placeholder={user && `${user.displayName} ơi, bạn đang nghĩ gì thế?`}
						_placeholder={{ fontSize: "10pt" }}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						minH="400px"
						fontSize={["10pt", "15pt"]}
						letterSpacing="2px"
						shadow="lg"
					/>
				</Flex>
				<Flex justify="center" align="center" mt="5">
					<Button
						colorScheme="facebook"
						w="40%"
						rounded="20px"
						isLoading={loading}
						loadingText="Đang hoàn tất..."
						_hover={{ shadow: "xl" }}
						fontSize={["8pt", "14pt"]}
						onClick={() => uploadHandle()}
					>
						Hoàn tất và đăng bài
					</Button>
				</Flex>
			</Flex>
		</Layout>
	);
};

export default Create;
