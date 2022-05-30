import { deleteDoc, doc, getDoc } from "firebase/firestore";

export const fetchToken = () => {
	const accessToken =
		localStorage.getItem("accessToken") !== "undefined" ? JSON.parse(localStorage.getItem("accessToken")) : localStorage.clear();

	return accessToken;
};

export const fetchUser = () => {
	const userInfo = localStorage.getItem("user") !== "undefined" ? JSON.parse(localStorage.getItem("user")) : localStorage.clear();

	return userInfo;
};

// fetch the user information from Firebase
export const getUserInfo = async (db, userId) => {
	const userRef = doc(db, "users", userId);
	const snapshot = await getDoc(userRef);
	if (snapshot.exists()) {
		return snapshot.data();
	} else {
		return "No Document";
	}
};

//Delete video
export const deleteVideo = async (db, videoId) => {
	await deleteDoc(doc(db, "videos", videoId));
};
