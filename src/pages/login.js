import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import Head from "next/head";
import { useRouter } from "next/router";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import app from "../../firebase-config";
import { fetchToken } from "../../utils/fetchData";

const Login = () => {
	const router = useRouter();
	// sử dung các hook của firebase
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();
	const db = getFirestore(app);

	useEffect(() => {
		const token = fetchToken();
		if (token) {
			router.prefetch("/");
		}
	}, []);

	//hàm login bằng google
	const handleLogin = async () => {
		const { user } = await signInWithPopup(firebaseAuth, provider);
		const { refreshToken, providerData } = user;
		console.log({ user });
		// Chứa thông tin user và refreshToken trong localStorage
		localStorage.setItem("user", JSON.stringify(providerData));
		localStorage.setItem("accessToken", JSON.stringify(refreshToken));

		// Chứa thông tin trên firestore
		const data = providerData[0];
		await setDoc(doc(db, "users", data.uid), data);
		// Nếu thành công sẽ chuyển đến trang chủ
		router.push("/");
	};

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<Flex direction="column" h="100vh">
				<Image src="/images/musicbg.jpg" alt="bg" h="full" w="full" objectFit="cover" />
				<Flex pos="absolute" w="100%" h="100%" align="center" justify="center" bg="blackAlpha.600">
					<Button
						leftIcon={<FcGoogle size="1.5rem" />}
						size="lg"
						gap="2"
						colorScheme="facebook"
						shadow="lg"
						onClick={handleLogin}
					>
						Signin with Google
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default Login;
