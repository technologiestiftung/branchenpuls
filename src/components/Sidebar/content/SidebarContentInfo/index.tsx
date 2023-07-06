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
				<div className="pr-[16px]">
					<p className="text-sm text-dark-grey">
						Berlin ist Hauptstadt, Start-Up Metropole, Exzellenzcluster, Stadt
						der Künstler:innen, der Kreativen und immer im Wandel. Entsprechend
						vielfältig und dynamisch ist auch die Berliner Wirtschaft. Mit dem
						<span className="italic"> BranchenPuls</span> wird eine Betrachtung
						und Analyse der Berliner Gewerbelandschaft erstmalig möglich. In
						welchen Kiezen konzentrieren sich bestimmte Branchen? Wo dominieren
						ältere Unternehmen, wo siedeln sich neue Unternehmen an? Und wie
						entwickelt sich die Berliner Gewerbelandschaft im Lauf der Zeit?
						<br />
						<br />
						Mit dem <span className="italic"> BranchenPuls</span> haben
						Verwaltung, Wirtschaft und Zivilgesellschaft ein Tool zur Hand, um
						einen tiefen Einblick in die Berliner Gewerbelandschaft zu gewinnen,
						Veränderungen zu erkennen und datenbasierte Analysen zu machen. Der
						<span className="italic"> BranchenPuls</span> ist ein Projekt der{" "}
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
						.
					</p>

					<Accordion
						title={"Was ist der BranchenPuls?"}
						content={
							<p>
								Der <span className="italic">BranchenPuls</span> ist ein auf
								offenen Daten basierendes Tool, mit dem die Branchenvielfalt der
								Berliner Wirtschaft durch eine Vielzahl an Filtermöglichkeiten
								erkundet werden kann. Das Tool erlaubt eine Betrachtung der
								räumlichen Verteilung bestimmter Branchentypen sowie eine
								zeitliche Entwicklung der Gewerbelandschaft.
								<br />
								<br />
								Die Standorte als Punkte dargestellt, entsprechen dem Sitz des
								Mitgliedsunternehmen der IHK Berlin. Neben der Punktedarstellung
								ist eine Heatmap-Darstellung auswählbar, um
								Branchenkonzentrationen zu visualisieren. Die Unternehmen können
								nach Informationen wie Branchen- und Gewerbetyp,
								Neueintragungen, Beschäftigtenzahl oder Unternehmensalter
								gefiltert werden. Außerdem ist eine räumliche Differenzierung
								auf Bezirksebene möglich. Durch die Zeitraumauswahl ist darüber
								hinaus eine zeitliche Entwicklung erkundbar, wie z.B.
								Neuansiedlungen, Umzüge oder Geschäftsaufgaben. Dazu können
								mehrere Ebenen geöffnet und miteinander verglichen werden.
								<br />
								<br />
								Der <span className="italic">BranchenPuls</span> ist ein
								Open-Source-Projekt und läuft unter einer MIT Lizenz.
								Dementsprechend können Idee und Quellcode für die Umsetzung in
								anderen Städten kostenlos genutzt, angepasst und
								weiterentwickelt werden. Wenn Du dich dafür interessierst, schau
								gerne im{" "}
								<a
									className="font-medium text-primary"
									href="https://github.com/IHKBerlin/IHKBerlin_Gewerbedaten/blob/595d12d0fdc3d94c613411d0742e7efb598ef853/README.md"
								>
									GitHub-Repository
								</a>{" "}
								vorbei.
							</p>
						}
					/>

					<Accordion
						title={"Woher kommen die Daten?"}
						content={
							<p>
								Die dem BranchenPuls zugrundeliegenden Daten werden von der IHK
								Berlin seit April 2023 als offene Daten veröffentlicht. Die
								Daten sind sowohl über das{" "}
								<a
									className="font-medium text-primary"
									href="https://daten.berlin.de/datensaetze/gewerbedaten-der-ihk-berlin"
								>
									Berliner Datenportal
								</a>{" "}
								als auch auf{" "}
								<a
									className="font-medium text-primary"
									href="https://github.com/IHKBerlin/IHKBerlin_Gewerbedaten/blob/595d12d0fdc3d94c613411d0742e7efb598ef853/README.md]"
								>
									GitHub
								</a>{" "}
								zu finden. Die IHK Berlin fragt die Informationen von ihren
								Mitgliedsunternehmen ab und aktualisiert die Daten monatlich.
								Bei Fragen zu den Daten wende dich gerne an den Bereich
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
						title={"Was ist Open Data?"}
						content={
							<p>
								Offene Daten definieren sich dadurch, dass sie in einem offenen
								und maschinenlesbaren Format vorliegen, unter einer freien
								Lizenz nutzbar sind, der Zugang diskriminierungsfrei und
								kostenlos ist und die Daten an einem zentralen Ort dauerhaft
								auffindbar sind.
								<br />
								<br />
								Open Data ist heute ein wichtiger Bestandteil im Berliner
								Verwaltungshandeln und schafft nicht nur Transparenz und
								Offenheit, sondern ermöglicht auch datenbasierte Tools wie den
								<span className="italic">BranchenPuls</span>. Auch Akteur:innen
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
								Der BranchenPuls ist ein Projekt der{" "}
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
								Nutzung offener Daten. Du hast Feedback oder willst mehr
								erfahren? Schau dich auf unserer Webseite um oder{" "}
								<a
									className="font-medium text-primary"
									href="https://odis-berlin.de/contact/"
								>
									kontaktiere uns
								</a>
								.
							</p>
						}
					/>

					<p className="mt-[30px] text-xs font-medium text-light-grey">
						Auf GitHub findest du den{" "}
						<a
							className="font-medium text-primary"
							href="https://github.com/technologiestiftung/ihk-vis"
						>
							Quellcode des Projekts
						</a>
						.
						<br />
						<br />
						Eine Frage oder Feedback? Schreib uns an{" "}
						<a
							className="font-medium text-primary"
							href="mailto:odis@ts.berlin"
						>
							odis@ts.berlin
						</a>
						.
					</p>
				</div>

				<p className="mt-[19px] flex flex-col gap-[24px] text-xs">
					<div className="flex flex-col gap-[16px]">
						<div>Ein Projekt der</div>
						<div className="h-[49px] w-[160px]">
							<TSBLogo />
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<div>Durchgeführt von der </div>
						<div className="h-[40px] w-[160px]">
							<OdisLogo />
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<div>in Zusammenarbeit mit dem </div>
						<div className="flex gap-[16px]">
							<div className="h-[34px] w-[160px]">
								<CityLabLogo />
							</div>
							<div className="-mr-[12px] h-[37px] w-[120px] ">
								<IHKLogo />
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-[16px]">
						<div>Gefördert von </div>
						<div className="flex gap-[16px]">
							<div className="h-auto w-[160px]">
								<BerlinLogo />
							</div>
							<div className="-mr-[12px] h-[33px] w-[120px]">
								<IBBLogo />
							</div>
						</div>
					</div>
				</p>

				<p className="mb-[41px] mt-[40px] text-xs">
					&copy; {new Date().getFullYear()} Technologiestiftung Berlin
					<br />
					<a
						className="font-medium text-primary"
						href="https://www.technologiestiftung-berlin.de/impressum"
					>
						Impressum
					</a>{" "}
					<a
						className="font-medium text-primary"
						href="https://www.technologiestiftung-berlin.de/datenschutz"
					>
						Datenschutzerklärung
					</a>
				</p>
			</SidebarBody>
		</>
	);
};
