"use client";

import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "./logout-button";
import { ExternalLinkIcon } from "lucide-react";

export const UserButton = () => {
	const user = useCurrentUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.image || ""} />
					<AvatarFallback className="bg-sky-500">
						<FaUser className="text-white" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="end">
				<LogoutButton>
					<DropdownMenuItem className="cursor-pointer">
						<ExternalLinkIcon className="h-4 w-4 mr-2" />
						Logout
					</DropdownMenuItem>
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
