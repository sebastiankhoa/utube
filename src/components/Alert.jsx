import React from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const Alerts = ({ status, icon, title }) => {
	return (
		<Alert status={`${status ? status : "info"}`}>
			{icon}
			<AlertTitle ml={5}>{title}</AlertTitle>
		</Alert>
	);
};

export default Alerts;
