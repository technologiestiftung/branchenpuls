"use client";

import { FC, useState, useEffect, useRef, ReactNode } from "react";
import { Cross, ArrowLeft } from "@components/Icons";
import classNames from "classnames";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";

export interface SidebarWrapperType {
	classes: string;
	isOpen: boolean;
	setOpen: any;
	children: ReactNode;
	position: string;
	closeSymbol?: "arrow" | "cross";
	mobileHeight?: "full" | "half" | string;
}

export const SidebarWrapper: FC<SidebarWrapperType> = ({
	classes,
	isOpen,
	children,
	setOpen,
	position,
	closeSymbol,
	mobileHeight,
}) => {
	const hasMobileSize = useHasMobileSize();
	const positionClass = position === "left" ? "left-0" : "right-0";
	const positionClassClosed =
		position === "left" ? "-translate-x-full" : "translate-x-full";
	const heightOnMobile = mobileHeight === "full" ? "h-3/4" : "h-3/4"; // this is currently the same css

	const classesMobile = hasMobileSize
		? isOpen
			? heightOnMobile + " w-full bottom-0"
			: heightOnMobile + " w-full"
		: "top-0 w-sidebar";
	const sidebarPosition = isOpen
		? positionClass
		: hasMobileSize
		? "bottom-[-100%]"
		: positionClassClosed;

	// scrolling stuff
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [hasScrolled, setHasScrolled] = useState<boolean>(false);
	useEffect(() => {
		const scrollContainer = sidebarRef.current;
		if (!scrollContainer) return;
		const onScroll: EventListener = (evt) => {
			const target = evt.target as HTMLButtonElement;
			if (target.scrollTop > 5) {
				setHasScrolled(true);
			} else {
				setHasScrolled(false);
			}
		};
		// @ts-ignore
		scrollContainer.addEventListener("scroll", onScroll);
		// @ts-ignore
		return () => scrollContainer.removeEventListener("scroll", onScroll);
	}, [hasScrolled]);
	const scrolling = hasScrolled ? "scrolling" : "";

	return (
		<aside
			className={classNames(
				classesMobile,
				classes,
				scrolling,
				"text-textcolor/80 fixed z-30 h-full rounded pb-[75px] pl-[28px] pr-[28px] pt-[22px] duration-300 ease-in-out sm:pr-0",
				sidebarPosition,
				positionClass
			)}
		>
			<div
				ref={sidebarRef}
				className="h-full overflow-y-auto rounded bg-white shadow-lg"
			>
				<button
					className="hover:bg-textcolor absolute right-0 top-0 z-20 m-10 mr-7 mt-9 cursor-pointer rounded-full p-0 hover:text-secondary"
					onClick={() => setOpen(false)}
				>
					{closeSymbol === "cross" && <Cross />}
					{closeSymbol === "arrow" && <ArrowLeft color1={"black"} />}
				</button>

				{children}
			</div>
		</aside>
	);
};
