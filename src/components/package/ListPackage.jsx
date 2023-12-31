import React, { memo } from "react";
import Modal from "antd";
import Package from "./Package";

const ListPackage = () => {
	return (
		<div className="list__package">
			<Package
				features={["Limit 3 user accounts in a project", "Limit 10 projects per user", "Ask 20 question in every 3 hours"]}
				accountType={"Free"}
			/>
			<Package
				features={["Limit 10 user accounts in a project", "Limit  30 projects per user", "Ask 100 questions in every 3 hours", "Chat GPT can use Google Search"]}
				price={"39.000"}
				accountType={"Standard"}
			/>
			<Package
				features={["Unlimited user accounts in a project", "Unlimited projects per user", "Gain access to Chat GPT", "Project knowledge"]}
				price={"79.000"}
				accountType={"Premium"}
			/>
			<Package
				features={["Future plan"]}
				price={"Coming Soon"}
				accountType={"Enterprise"}
			/>
		</div>
	);
};

export default memo(ListPackage);
