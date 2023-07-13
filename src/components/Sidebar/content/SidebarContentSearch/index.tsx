import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";

export const SidebarContentSearch = () => {
	return (
		<>
			<SidebarHeader text={"Standort Suche"} />
			<SidebarBody>
				<div className="gap- flex w-full flex-col pr-[16px]">
					<p className="text-sm text-dark-grey">
						Finde dein Unternehmen, die relevante Straße für eine Neugründung
						oder betrachte deine gewohnte Nachbarschaft aus der Perspektive
						eines Wirtschaftsstandorts.
					</p>

					<input
						className="mt-[24px] rounded border border-solid p-2 text-sm"
						placeholder="Gib hier deinen Suchbegriff ein"
					/>
				</div>
			</SidebarBody>
		</>
	);
};
