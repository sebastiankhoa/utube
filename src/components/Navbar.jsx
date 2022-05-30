import { Box, Button, Flex, Image, Input, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiSun } from "react-icons/fi";
import { BsFillMoonStarsFill, BsSearch, BsFillPlusSquareFill, BsYoutube } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { signOut, getAuth } from "firebase/auth";

import app from "../../firebase-config";

const Navbar = ({ user }) => {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();

	const auth = getAuth(app);
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				router.push("/login");
				localStorage.clear();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Flex px="5" bg="blackAlpha.200" h="80px" align="center">
			<Flex display={{ base: "none", md: "flex" }} align="center" gap="1" onClick={() => router.replace("/")} cursor="pointer">
				<BsYoutube size="2.1rem" color="red" />
				<Text fontSize="20pt" fontWeight="900" bgGradient="linear(to-l,red,blue)" bgClip="text" fontFamily="sans-serif">
					UTube
				</Text>
			</Flex>
			<Flex display={{ base: "flex", md: "none" }} align="center" onClick={() => router.replace("/")} cursor="pointer" mr="1">
				<AiFillHome size="2rem" />
			</Flex>
			<Flex align="center" px="3" flexGrow={1} mx={["0px", "100px"]} rounded="xl" border="1px" borderColor="gray.400">
				<BsSearch size="1.5rem" />
				<Input border="none" _focus={{ boder: "none" }} placeholder="Search..." />
			</Flex>
			<Flex align="center" gap={["0", "5"]}>
				<Button onClick={toggleColorMode} variant="outline" _hover={{ opacity: "90%" }} _focus={{ border: "none" }}>
					{colorMode === "light" ? <BsFillMoonStarsFill size="25px" /> : <FiSun size="1.5rem" />}
				</Button>
				<BsFillPlusSquareFill size="25px" cursor="pointer" onClick={() => router.push("/create")} />
				{!user ? (
					<Button onClick={() => router.push("/login")}>Login</Button>
				) : (
					<Menu>
						<MenuButton as={Button} variant="unstyle" _focus={{ boder: "none" }}>
							<Image alt="avatar" src={user && `${user?.photoURL}`} rounded="full" w={["5", "8"]} />
						</MenuButton>
						<MenuList shadow="xl">
							<MenuItem
								_focus={{ bg: "white", color: "green" }}
								cursor="pointer"
								onClick={() => router.replace(`/userprofile/${user.uid}`)}
							>
								My Account
							</MenuItem>
							<MenuItem gap="2" _focus={{ bg: "white", color: "green" }} cursor="pointer" onClick={() => handleLogout()}>
								Logout <RiLogoutBoxRLine />
							</MenuItem>
						</MenuList>
					</Menu>
				)}
			</Flex>
		</Flex>
	);
};

export default Navbar;
