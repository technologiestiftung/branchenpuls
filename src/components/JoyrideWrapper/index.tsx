import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { FC, useState, useEffect } from "react";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
import { ViewStateType } from "@common/interfaces";

export interface JoyrideWrapper {
	runJoyride: boolean;
	setRunJoyride: (x: boolean) => void;
	setShowWelcome: (x: boolean) => void;
	setViewState: React.Dispatch<React.SetStateAction<ViewStateType>>;
	setSidebarMenuOpen: (open: boolean) => void;
	setOpenFilterDropdowns: (x: boolean) => void;
}

export const JoyrideWrapper: FC<JoyrideWrapper> = ({
	runJoyride,
	setRunJoyride,
	setShowWelcome,
	setViewState,
	setSidebarMenuOpen,
	setOpenFilterDropdowns,
}) => {
	const [joyrideIndex, setJoyrideIndex] = useState<number>(0);
	const [startJoyride, setStartJoyride] = useState<boolean>(false);

	const hasMobileSize = useHasMobileSize();
	setShowWelcome(false);

	// trigger joyride 500ms after runJoyride is true so the map view is set at the right position
	useEffect(() => {
		if (runJoyride) {
			setViewState({
				longitude: 13.405,
				latitude: 52.52,
				zoom: 10,
				pitch: 0,
				bearing: 0,
				transitionDuration: 0,
			});
			setTimeout(() => {
				setStartJoyride(true);
			}, 500);
		}
	}, [runJoyride]);

	const steps = [
		{
			target: "#joyride-marker-center",
			title: "Gewerbekonzentration in ganz Berlin",
			content:
				"Die Punkte auf der Karte repräsentieren die Vetrteilung der Unternehmen in Berlin. Die Heatmap unterstützt dabei, besonders hohe Unternehmenskonzentrationen auf der Karte ausfindig zu machen.",
			disableBeacon: true,
			spotlightPadding: 75,
			offset: 0,
		},
		{
			target: hasMobileSize ? "#joyride-counter-mob" : "#joyride-counter",
			title: "Anzahl der Unternehmen",
			content:
				"Hier (unten) wird die Zahl der Unternehmen angezeigt, die den gesetzten Filtereinstellungen entsprechen.",
			disableBeacon: true,
			spotlightPadding: 10,
			offset: 0,
		},
		{
			target: "#joyride-timespan-dropdown",
			title: "Zeitraum",
			content:
				"Der im Branchenpuls abgebildete Datensatz wird monatlich aktualisiert. Standardmäßig ist immer der aktuelle Monat ausgewählt. Es können aber auch frühere Monate ausgewählt werden. So wird ein zeitlicher Vergleich der Daten möglich.",
			disableBeacon: true,
			spotlightPadding: 10,
			offset: 0,
		},
		{
			target: "#joyride-branch-dropdown",
			title: "Branchen Filter",
			content:
				"Der Datensatz ist in mehrere Branchentypen unterteilt. Jedes Unternehemen ist einer Unternehmens-ID zugeordnet (z.B. Gastronomie = ID 56). Basierend auf dem Branchentyp lassen sich weitere Unterkategorien wie NACE und IHK ID auswählen. Es können mehrere Branchentypen gleichzeitig ausgewählt werden. Außerdem kann nach Branchen im Freitextfeld gesucht werden.",
			disableBeacon: true,
			spotlightPadding: 10,
			offset: 0,
		},
		{
			target: "#joyride-space-dropdown",
			title: "Räumliche Filter",
			content:
				"Die Daten können räumlich gefiltert werden, z.B. nach den 12 Berliner Bezirken. Innerhalb des ausgewählten Bezirks lassen sich detaillierte stadtplanerische Raumeinheiten wie der Prognose- und Planungsraum auswählen.",
			disableBeacon: true,
			spotlightPadding: 10,
			offset: 0,
		},

		{
			target: "#joyride-details-dropdown",
			title: "Detail Filter",
			content:
				"Die Detail-Filter beinhalten weitere Informationen zu den Unternehmen und bieten Explorationsmöglichkeiten zu Beschäftigtenzahl, Unternehmensalter und Unternehmenstyp.",
			disableBeacon: true,
			spotlightPadding: 10,
			offset: 0,
		},
		{
			target: "#joyride-views",
			title: "Ansichten",
			content:
				"Der BranchenPuls bietet die Möglichkeit Daten miteinander zu vergleichen. Dafür können maximal drei Ansichten aktiviert werden. Jede Ansicht beinhaltet dir gleichen Filteroptionen, die jedoch jeweils unterschiedlich eingestellt werden können. So können beispielsweise verschiedenen Branchen gegenübergestellt werden.",
			disableBeacon: true,
			spotlightPadding: 10,
			offset: 0,
		},
		{
			target: "#joyride-csv-download",
			title: "Download",
			content:
				"Der gefilterte Datensatz kann abschließend als CSV-Datei heruntergeladen werden. Die Daten können dann eigenständig weiterverarbeitet werden.",
			disableBeacon: true,
			spotlightPadding: 5,
			offset: 0,
		},
		{
			target: hasMobileSize ? "#joyride-search-nav-mob" : "#joyride-search-nav",
			title: "Suche",
			content:
				"Über die Ortssuche können Adressen innerhalb Berlins durchsucht werden. Mit einem Klick auf die ausgewählte Adresse navigiert der Kartenausschnitt zum gewünschten Ort.",
			disableBeacon: true,
			spotlightPadding: 10,
			offset: 0,
		},
		{
			target: "#joyride-marker-center",
			title: "Unternehmen",
			content:
				"Unternehmensstandorte werden durch Punkte auf der Karte visualisiert. Ein Punkt kann entweder ein Unternehmen oder mehrere Unternehmen repräsentieren. Je mehr Unternehmen sich an einem Standort befinden, umso dunkler ist die Punktfarbe. Durch einen Klick auf den Punkt lassen sich alle dort eingetragenen Unternehmen einsehen.",
			disableBeacon: true,
			spotlightPadding: 10,
			offset: 0,
		},
	];

	const handleJoyrideCallback = (jRData: any) => {
		const { action, index, status, type } = jRData;

		if (type === "tour:end") {
			setRunJoyride(false);
			setJoyrideIndex(0);

			setViewState({
				longitude: 13.405,
				latitude: 52.52,
				zoom: 10,
				pitch: 0,
				bearing: 0,
				transitionDuration: 0,
			});
			return;
		}

		if (
			[EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND, EVENTS.TOUR_START].includes(
				type
			)
		) {
			if (action === "close") {
				setRunJoyride(false);
				setJoyrideIndex(0);
				setOpenFilterDropdowns(false);

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
			if (tempIndex === 2) {
				setSidebarMenuOpen(true);
				setOpenFilterDropdowns(true);
			}
			if (tempIndex === 3) {
				setSidebarMenuOpen(true);
			}
			if (tempIndex === 7) {
				setSidebarMenuOpen(true);
			}
			if (tempIndex === 9) {
				setSidebarMenuOpen(false);
				setViewState({
					longitude: 13.40474,
					latitude: 52.52053,
					zoom: 15,
					pitch: 0,
					bearing: 0,
					transitionDuration: 800,
				});
			}
			setTimeout(() => {
				setJoyrideIndex(tempIndex);
			}, 300);
		}
	};

	return (
		<Joyride
			callback={handleJoyrideCallback}
			run={startJoyride}
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
			scrollOffset={100}
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
					borderRadius: ".4rem",
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
