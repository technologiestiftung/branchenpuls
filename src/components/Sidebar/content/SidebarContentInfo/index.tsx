import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { Accordion } from "@components/Accordion";
import {
	BerlinLogo,
	CityLabLogo,
	IBBLogo,
	IHKLogo,
	OdisLogo,
	TSBLogo,
} from "@components/logos";

export const SidebarContentInfo = () => {
	return (
		<>
			<SidebarHeader text={"Über das Projekt"} />
			<SidebarBody>
				<div className="">
					<p className="text-sm text-dark-grey">
						Berlin ist Hauptstadt, Start-Up-Metropole, Exzellenzcluster, Stadt
						der Kreativen und vorallem eines: immer im Wandel. Entsprechend
						vielfältig und dynamisch ist auch die Berliner Wirtschaft. Doch in
						welchen Kiezen konzentrieren sich bestimmte Branchen? Wo dominieren
						ältere Unternehmen, wo siedeln sich neue an? Wie entwickelt sich die
						Gewerbelandschaft im Lauf der Zeit?
						{/* <br />
						<br /> */}
						{/* Der
						<span className="italic"> Branchenpuls</span> macht eine
						datenbasierte Betrachtung und Analyse der Berliner Gewerbelandschaft
						erstmalig möglich. */}
					</p>

					<Accordion
						title={"Was zeigt der Branchenpuls?"}
						content={
							<p>
								Der <span className="italic">Branchenpuls</span> ist ein auf
								offenen Daten basierendes Tool, mit dem die Branchenvielfalt der
								Berliner Wirtschaft durch eine Vielzahl an Filtermöglichkeiten
								erkundet werden kann. Das Tool erlaubt eine Betrachtung der
								räumlichen Verteilung bestimmter Branchentypen sowie der
								zeitlichen Entwicklung der Gewerbelandschaft.
								<br />
								<br />
								Die Standorte, als Punkte bzw. bei kleiner Zoomstufe als Heatmap
								dargestellt, entsprechen dem Sitz des Mitgliedsunternehmes der
								IHK Berlin. Die Unternehmen können nach Informationen wie
								Branchen- und Gewerbetyp, Neueintragungen, Beschäftigtenzahl
								oder Unternehmensalter gefiltert werden. Außerdem ist eine
								räumliche Differenzierung auf Ebene der verschiedenen
								Lebensweltlich orientierten Räume (offizielle in Berlin
								verwendete Raumeinheiten) möglich. Durch die Zeitraumauswahl ist
								darüber hinaus eine zeitliche Entwicklung erkundbar, wie z.B.
								Neuansiedlungen und Geschäftsaufgaben. Dazu können mehrere
								Ansichten geöffnet und miteinander verglichen werden.
							</p>
						}
					/>

					<Accordion
						title={"Wem nutzt der Branchenpuls?"}
						content={
							<p>
								Mit dem <span className="italic"> Branchenpuls</span> haben
								Verwaltung, Wirtschaft, Wissenschaft und Zivilgesellschaft ein
								Tool zur Hand, um einen tiefen Einblick in die Berliner
								Gewerbelandschaft zu gewinnen, Veränderungen zu erkennen und
								datenbasierte Analysen durchzuführen.
								<br /> Das Tool ermöglichst es, sich durch die Filterfunktionen
								die für die eigenen Fragestellungen relevanten Teil-Datensätze
								zusammenzustellen und über den Download-Button zu exportieren.
								Somit dient die Anwendung zum einen dazu, eine erste
								unkomplizierte Exploration zu ermöglichen, zum anderern stellt
								sie die Dateien für weitere, datengestützte Analysen
								leichtzugänglich zur Verfügung.
								<br />
								<br />
								Der <span className="italic">Branchenpuls</span> ist ein
								Open-Source-Projekt und läuft unter der MIT Lizenz.
								Dementsprechend können Idee und Quellcode für die Umsetzung in
								anderen Städten kostenlos genutzt, angepasst und
								weiterentwickelt werden. Wenn Du dich dafür interessierst, schau
								gerne im{" "}
								<a
									className="font-medium text-primary"
									href="https://github.com/technologiestiftung/branchenpuls"
								>
									GitHub-Repository
								</a>{" "}
								vorbei.
							</p>
						}
					/>

					<Accordion
						title={"Woher stammen die Daten?"}
						content={
							<p>
								Die dem Branchenpuls zugrundeliegenden Daten werden von der IHK
								Berlin seit April 2023 als offene Daten veröffentlicht. Die
								Daten können über das zentrale{" "}
								<a
									className="font-medium text-primary"
									href="https://daten.berlin.de/datensaetze/gewerbedaten-der-ihk-berlin"
								>
									Berliner Datenportal
								</a>{" "}
								heruntergeladen werden. Die IHK Berlin fragt die Informationen
								von ihren Mitgliedsunternehmen ab und aktualisiert die Daten
								monatlich. Bei Fragen zu den Daten wende dich an den Bereich
								Datenmanagement bei der{" "}
								<a
									className="font-medium text-primary"
									href="https://www.ihk.de/berlin/berliner-wirtschaft/anzeige-nach-ausgaben/bw-2023-april/bw-2023-04-fokus-wer-teilt-gewinnt-5770438"
								>
									IHK Berlin
								</a>
								.
							</p>
						}
					/>

					<Accordion
						title={"Wie zuverlässig sind die Daten?"}
						content={
							<p>
								Der Datensatz beinhaltet Standort- und Strukturinformationen von
								den über 350.000 Mitgliedsunternehmen inklusive deren
								Betriebsstätten der IHK Berlin. Darin enthalten sind neben den
								Geokoordinaten, auch Angaben zur Branche, Beschäftigtengröße und Alter des
								Unternehmens, wie sie der IHK bei der Anmeldung der Unternehmens gemeldet wurden. Aufgrund
								unregelmäßiger Aktualisierungsintervalle einzelner Daten, können
								Informationen vereinzelt nicht mehr aktuell oder veraltet sein.
								Die IHK Berlin hat ein FAQ geschrieben, in dem detaillierter auf die Datenqualität eingegangen wird.
							</p>
						}
					/>

					<Accordion
						title={"Was ist Open Data?"}
						content={
							<p>
								Open Data zeichen sich dadurch aus, dass sie in einem offenen
								und maschinenlesbaren Format vorliegen, unter einer freien
								Lizenz nutzbar sind, der Zugang diskriminierungsfrei und
								kostenlos ist und die Daten an einem zentralen Ort dauerhaft
								auffindbar sind.
								<br />
								<br />
								Open Data ist heute ein wichtiger Bestandteil im Berliner
								Verwaltungshandeln und schafft nicht nur Transparenz und
								Offenheit, sondern ermöglicht auch datenbasierte Tools wie den
								<span className="italic"> Branchenpuls</span>. Auch Akteur:innen
								aus Wirtschaft, Wissenschaft und Zivilgesellschaft profitieren
								von offenen Daten und veröffentlichen zunehmend selbst offene
								Daten. Die{" "}
								<a
									className="font-medium text-primary"
									href="https://odis-berlin.de/"
								>
									Open Data Informationsstelle Berlin (ODIS)
								</a>{" "}
								unterstützt Berliner Behörden und andere interessierte
								Akteur:innen bei der Nutzung und Bereit­stellung von offenen
								Daten. Mehr offene Daten findest Du im{" "}
								<a
									className="font-medium text-primary"
									href="https://daten.berlin.de/"
								>
									Berliner Datenportal
								</a>{" "}
								.
							</p>
						}
					/>

					<Accordion
						title={"Über uns"}
						content={
							<p>
								Der Branchenpuls ist ein Projekt der{" "}
								<a
									className="font-medium text-primary"
									href="https://odis-berlin.de/"
								>
									Open Data Informationsstelle Berlin (ODIS)
								</a>{" "}
								in Zusammenarbeit mit dem{" "}
								<a
									className="font-medium text-primary"
									href="https://citylab-berlin.org/de/start/"
								>
									CityLAB Berlin
								</a>{" "}
								in Kooperation mit der{" "}
								<a
									className="font-medium text-primary"
									href="https://www.ihk.de/berlin/"
								>
									IHK Berlin
								</a>
								. Die ODIS wird von der Senatskanzlei Berlin und der
								Investitionsbank Berlin aus den Mitteln des Landes Berlin
								gefördert und ist ein Projekt der{" "}
								<a
									className="font-medium text-primary"
									href="https://www.technologiestiftung-berlin.de/"
								>
									Technologiestiftung Berlin
								</a>
								. Seit 2018 begleiten wir als ODIS die Stadt auf dem Weg zu
								einer partizipativen, nachhaltigen und datengetriebenen
								Gesellschaft mit dem Schwerpunkt auf die Bereitstellung und
								Nutzung offener Daten.
							</p>
						}
					/>

					<p className="mt-[30px] text-xs font-medium text-light-grey">
						Eine Frage oder Feedback? Schreib uns an{" "}
						<a
							className="font-medium text-primary"
							href="mailto:odis@ts.berlin"
						>
							odis@ts.berlin
						</a>
						. Den Quellcode des Projekts findest du auf{" "}
						<a
							className="font-medium text-primary"
							href="https://github.com/technologiestiftung/branchenpuls"
						>
							GitHub
						</a>
						.
					</p>
				</div>

				<div className="mt-[19px] flex flex-col gap-[24px] text-xs">
					<div className="flex flex-col gap-[16px]">
						<div>Ein Projekt der</div>
						<div className="h-[49px] w-[160px]">
							<a
								href="https://www.technologiestiftung-berlin.de"
								target="_blank"
							>
								<TSBLogo />
							</a>
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<div className="h-[40px] w-[160px]">
							<a href="https://odis-berlin.de" target="_blank">
								<OdisLogo />
							</a>
						</div>
					</div>

					<div className="flex flex-col gap-[16px]">
						<div>in Zusammenarbeit mit</div>
						<div className="flex gap-[16px]">
							<div className="h-[34px] w-[140px]">
								<a href="https://citylab-berlin.org/de/start/" target="_blank">
									<CityLabLogo />
								</a>
							</div>
							<div className="mr-[12px] h-[20px] w-[100px] ">
								<a href="https://www.ihk.de/berlin/" target="_blank">
									<IHKLogo />
								</a>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<div>Gefördert von </div>
						<div className="flex gap-[16px]">
							<div className="h-auto w-[160px]">
								<a href="https://www.berlin.de/rbmskzl/" target="_blank">
									<BerlinLogo />
								</a>
							</div>
							<div className="-mr-[12px] h-auto w-auto">
								<a
									href="https://www.ibb.de/de/startseite/startseite.html"
									target="_blank"
								>
									<IBBLogo />
								</a>
							</div>
						</div>
					</div>
				</div>

				<p className="mb-[41px] mt-[40px] text-xs">
					&copy; {new Date().getFullYear()} Technologiestiftung Berlin
					<br />
					<a
						className="font-medium text-primary"
						href="https://www.technologiestiftung-berlin.de/impressum"
						target="_blank"
					>
						Impressum
					</a>{" "}
					<a
						className="font-medium text-primary"
						href="https://www.technologiestiftung-berlin.de/datenschutz"
						target="_blank"
					>
						Datenschutzerklärung
					</a>
				</p>
			</SidebarBody>
		</>
	);
};
