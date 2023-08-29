import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { FC, useState } from "react";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";

// 1. Toggle: Wärme, Auswahl von Rotes Rathaus und Zoom auf Gebäude (Jüdenstr. 1), Sprechblase auf Punkt, restlicher Bildschirm ausgegraut
// 2. Seitenmenü mit Informationen zum Gebäude wird eingeblendet, Dropdown Wärmeverbrauch und Sanierungen sind nicht ausgewählt, restlicher Bildschirm ausgegraut
// 3. Auswahl Dropdown ‘Wärmeverbrauch’, Rest ausgegraut
// 4. Auswahl Dropdown ‘Wärmeverbrauch’, nur ‘Ranking’ hervorgehoben:
// 5. Klick auf Button ‘Pfeil unten’/nächstniedriger Verbrauch, Zoom auf Gothaer Str. 19:
// 6. Wärmeverbrauch eingeklappt, Klick/Auswahl auf Dropdown Sanierungen, Rest ausgegraut
// 7. Highlight “Strom/Wärme” Toggle:
// 8. Rausgezoomt, Ansicht ganz Berlin, Klick auf Filter:

const steps = [
	{
		target: "#zoom-btns",
		title: "Test1",
		content:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam placeat modi quia consequatur.",
		disableBeacon: true,
		spotlightPadding: 75,
		offset: 0,
	},
];

// renovation-dropdown

export interface JoyrideWrapper {
	runJoyride: boolean;
	setRunJoyride: (x: boolean) => void;
	setShowWelcome: (x: boolean) => void;
	// setZoomToCenter: (x: number[]) => void;
	// setEntityId: (id: number | null) => void;
	// setShowEntityConsumption: (x: boolean) => void;
	// setShowEntityRenovations: (x: boolean) => void;
	// setConsumptionType: (typeName: string) => void;
	// setNavView: (view: "filter" | "info") => void;
	// setSidebarMenuOpen: (open: boolean) => void;
	// setMapZoom: (zoom: number) => void;
	// setMapPitch: (pitch: boolean) => void;
}

export const JoyrideWrapper: FC<JoyrideWrapper> = ({
	runJoyride,
	setRunJoyride,
	setShowWelcome,
}) => {
	const [joyrideIndex, setJoyrideIndex] = useState<number>(0);
	const hasMobileSize = useHasMobileSize();
	setShowWelcome(false);

	const handleJoyrideCallback = (jRData: any) => {
		const { action, index, status, type } = jRData;

		if (type === "tour:end") {
			setRunJoyride(false);
			setJoyrideIndex(0);
			return;
		}

		if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
			if (action === "close") {
				setRunJoyride(false);
				setJoyrideIndex(0);

				return;
			}

			let tempIndex = 0;
			if (action === "next") {
				tempIndex = index + 1;
			}
			if (action === "prev") {
				tempIndex = index - 1;
			}

			if (tempIndex === 0) {
			}

			setTimeout(() => {
				setJoyrideIndex(tempIndex);
			}, 100);
		}
	};

	return (
		<Joyride
			callback={handleJoyrideCallback}
			run={runJoyride}
			// @ts-ignore
			steps={steps}
			showProgress
			disableScrolling={false}
			disableScrollParentFix
			showSkipButton
			continuous
			stepIndex={joyrideIndex}
			// @ts-ignore
			scrollToSteps={true}
			locale={{
				back: "Zurück",
				close: "Verlassen",
				last: "Ende",
				next: "Weiter",
				skip: "Tour verlassen",
			}}
			styles={{
				options: { primaryColor: "#1e398f" },
				tooltip: {
					borderRadius: ".2rem",
					fontSize: hasMobileSize ? "14px" : "inherit",
				},
				tooltipContainer: {
					textAlign: "left",
				},
				tooltipTitle: {
					margin: 0,
					fontSize: hasMobileSize ? "14px" : "18px",
				},
				tooltipContent: {
					padding: "1rem 0",
					fontSize: hasMobileSize ? "12px" : "14px",
				},
				buttonNext: {
					borderRadius: ".2rem",
					color: "#fff",
					fontSize: hasMobileSize ? "14px" : "18px",
				},
				buttonBack: {
					marginRight: ".2rem",
					fontSize: hasMobileSize ? "14px" : "18px",
				},
			}}
		/>
	);
};
