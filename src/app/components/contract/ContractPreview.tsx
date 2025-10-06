'use client'
import {ContractData} from "@/app/components/contract-interface";
import {useState} from "react";
import "./ContractPreview.css";

interface ContractPreviewProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   contractFormData: ContractData;
}

export const ContractPreview = ({ open, onOpenChange, contractFormData }: ContractPreviewProps) => {
   const [email, setEmail] = useState("");

   const handleSend = () => {
      if (!email) {
         alert("Bitte geben Sie eine E-Mail-Adresse ein");
         return;
      }
      alert("Vertrag wurde vorbereitet. Implementieren Sie die E-Mail-Versandfunktion.");
      console.log("Send contract to:", email, contractFormData);
   };

   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         onOpenChange(false);
      }
   };

   const V = ({ children }: { children: React.ReactNode }) => (
      <strong className="contract-value">{children}</strong>
   );

   if (!open) return null;

   return (
      <div className="dialog-overlay" onClick={handleBackdropClick}>
         <div className="dialog-content">
            <div className="dialog-header">
               <h2 className="dialog-title">Vertragsvorschau</h2>
               <button
                  className="dialog-close"
                  onClick={() => onOpenChange(false)}
                  aria-label="Schließen"
               >
                  ×
               </button>
            </div>

            <div className="dialog-body">
               <div className="contract-preview-content">
                  <h1 className="contract-preview-title">Vertrag über freie Mitarbeit</h1>

                  <div className="contract-section">
                     <p>Zwischen</p>
                     <p className="contract-party">
                        <V>{contractFormData.client.clientGender} {contractFormData.client.clientFirstName} {contractFormData.client.clientLastName}</V><br />
                        <V>{contractFormData.client.clientStreet} {contractFormData.client.clientStreetNumber}</V><br />
                        <V>{contractFormData.client.clientPostalCode} {contractFormData.client.clientCity}</V>
                     </p>
                     <p className="contract-party-label">- nachfolgend „Auftraggeber&#34; genannt -</p>

                     <p>und</p>
                     <p className="contract-party">
                        <V>{contractFormData.contractor.contractorGender} {contractFormData.contractor.contractorFirstName} {contractFormData.contractor.contractorLastName}</V><br />
                        <V>{contractFormData.contractor.contractorStreet} {contractFormData.contractor.contractorStreetNumber}</V><br />
                        <V>{contractFormData.contractor.contractorPostalCode} {contractFormData.contractor.contractorCity}</V>
                     </p>
                     <p className="contract-party-label">- nachfolgend „Auftragnehmer&#34; genannt -</p>

                     <p>wird folgendes vereinbart:</p>
                  </div>

                  <h2 className="contract-heading">I. Tätigkeit</h2>
                  <div className="contract-section">
                     <p>
                        Der Auftragnehmer wird ab dem <V>{contractFormData.contractDetails.contractSignatureDate || "_______"}</V> für den Auftraggeber folgende Tätigkeiten als Auftragnehmer übernehmen: <V>{contractFormData.contractDetails.activity}</V>. Die Tätigkeit soll im Zeitraum von <V>{contractFormData.contractDetails.serviceStartDate || "_______"}</V> bis <V>{contractFormData.contractDetails.endDate || "_______"}</V> ausgeführt werden.
                     </p>
                     <p>
                        Der Auftragnehmer hat die Durchführung und den Ablauf seiner Leistung selbst zu organisieren. Er unterliegt keinen Weisungen des Auftraggebers und ist in der Gestaltung seiner Tätigkeit frei. Ein Arbeitsverhältnis wird nicht begründet. Auf besondere betriebliche Belange im Zusammenhang mit seiner Tätigkeit ist jedoch Rücksicht zu nehmen.
                     </p>
                     <p>
                        Der Auftragnehmer ist an keinerlei Vorgaben zum Arbeitsort oder Arbeitszeit gebunden. Projektbezogene Zeitvorgaben des Auftraggebers sind ebenso einzuhalten wie fachliche Vorgaben, soweit diese zur ordnungsgemäßen Vertragsdurchführung erforderlich sind.
                     </p>
                     <p>
                        Der Auftragnehmer ist ferner berechtigt, Aufträge des Auftraggebers ohne Angaben von Gründen abzulehnen.
                     </p>
                     <p>
                        Beide Vertragsparteien verpflichten sich zur gegenseitigen Kenntnisgabe, sofern sich bei der Vertragsdurchführung Abwicklungsschwierigkeiten oder aber vorhersehbare Zeitverzögerungen ergeben sollten.
                     </p>
                     <p>
                        Der freie Mitarbeiter ist berechtigt, auch für andere Auftraggeber tätig zu sein. Er verpflichtet sich jedoch, während der Dauer des Vertragsverhältnisses nicht für ein Unternehmen tätig zu werden, das mit dem Auftraggeber oder einem mit ihm verbundenen Unternehmen im Wettbewerb steht.
                     </p>
                  </div>

                  <h2 className="contract-heading">II. Leistungserbringung</h2>
                  <div className="contract-section">
                     <p>
                        Der Auftragnehmer erbringt die Arbeitsleistung in der Regel höchstpersönlich. Er kann sich zur Erfüllung des Auftrags auch anderer Personen bedienen. Die Hinzuziehung eigener Mitarbeiter oder die Vergabe von Unteraufträgen erfolgt in Abstimmung mit dem Auftraggeber. Für die ordnungsgemäße Erfüllung der vertraglichen Leistungen bleibt er dem Auftraggeber gegenüber verantwortlich. Für die steuerlichen und sozialversicherungsrechtlichen Belange hat der freie Mitarbeiter selbst Sorge zu tragen, insbesondere auch für eine angemessene Versicherung für die Altersvorsorge wie auch zum Schutz gegen Krankheiten und den Pflegefall.
                     </p>
                     <p>
                        Der Auftragnehmer übt seine Tätigkeit in seinen eigenen Räumlichkeiten aus. Soweit in Einzelfällen eine betriebliche Anwesenheit erforderlich wird, stellt der Auftraggeber nach jeweiliger vorheriger Absprache die entsprechenden betrieblichen Einrichtungen zur Verfügung. Der Auftraggeber stellt dem Auftragnehmer alle zur Ausübung seiner Tätigkeiten erforderlichen Informationen, Hilfsmittel und Unterlagen zur Verfügung.
                     </p>
                  </div>

                  <h2 className="contract-heading">III. Vergütung</h2>
                  <div className="contract-section">
                     <p>
                        Als Vergütung wird ein Gesamtbetrag von <V>{contractFormData.contractDetails.totalAmount || "_______"} €</V> zuzüglich der jeweiligen gesetzlichen Mehrwertsteuer vereinbart. Der Auftragnehmer ist verpflichtet, eine spezifizierte Abrechnung in Form einer Rechnung zu erstellen. Die Auszahlung erfolgt unbar.
                     </p>
                  </div>

                  <h2 className="contract-heading">IV. Aufwendungsersatz und sonstige Ansprüche</h2>
                  <div className="contract-section">
                     <p>
                        Mit der Zahlung der in diesem Vertrag vereinbarten Vergütung sind alle Ansprüche des Auftragnehmers gegen den Auftraggeber aus diesem Vertrag erfüllt.
                     </p>
                     <p>
                        Für die Versteuerung der Vergütung hat der Auftragnehmer selbst zu sorgen. Der Auftragnehmer wird darauf hingewiesen, dass er nach § 2 Nr. 9 SGB VI rentenversicherungspflichtig sein kann, wenn er auf Dauer und im Wesentlichen nur für einen Auftraggeber tätig ist.
                     </p>
                  </div>

                  <h2 className="contract-heading">V. Haftung und Gewährleistung</h2>
                  <div className="contract-section">
                     <p>
                        Sollte der Auftraggeber auf Grund von Leistungen, die vom Auftragnehmer erbracht wurden, von Dritten in Haftung genommen werden, so verpflichtet sich der Auftragnehmer gegenüber dem Auftraggeber, diesen von derlei Haftung freizustellen.
                     </p>
                     <p>
                        Für Schäden, die durch Zeitüberschreitung des Auftragnehmers erfolgen, ist die Haftung des Auftragnehmers auf die Höhe von <V>{contractFormData.contractDetails.liabilityLimit || "_______"} €</V> begrenzt. Im Übrigen verpflichtet sich der Auftragnehmer zur kostenlosen Nacharbeit und Beseitigung der von ihm verursachten Mängel.
                     </p>
                     <p>
                        Der freie Mitarbeiter versichert, dass er über eine ausreichende Berufshaftpflichtversicherung verfügt, die auch die Tätigkeit innerhalb dieser Vereinbarung abdeckt und diese für die Dauer der Vereinbarung aufrechterhalten wird. Auf Verlangen des Auftraggebers wird er dies durch Vorlage geeigneter Nachweise belegen.
                     </p>
                  </div>

                  <h2 className="contract-heading">VI. Verschwiegenheit, Aufbewahrung und Rückgabe von Unterlagen</h2>
                  <div className="contract-section">
                     <p>
                        Die Vertragsparteien verpflichten sich, alle ihnen im Rahmen des Vertrages zugänglich gemachten, sowie bei Gelegenheit der Zusammenarbeit erlangten Informationen über Angelegenheiten der anderen Partei, die als vertraulich gekennzeichnet sind; die bei einer mündlichen Übermittlung als vertraulich bezeichnet werden; oder die aus Sicht eines objektiven Beobachters als vertraulich erkennbar sind; sowie Geschäfts- und Betriebsgeheimnisse vertraulich zu behandeln. Vertrauliche Informationen dürfen ohne schriftliche Einwilligung der anderen Vertragspartei zu einem anderen als dem zur vertragsgemäßen Aufgabenerfüllung vorgesehenen Zweck nicht verwertet, Dritten zugänglich gemacht oder sonst genutzt werden.
                     </p>
                     <p>
                        Die Parteien tragen dafür Sorge, dass Dritte, derer sie sich als Erfüllungsgehilfen bedienen, ebenfalls die Geheimhaltungspflicht beachten. Diese Pflicht besteht auch nach Beendigung der Tätigkeit fort.
                     </p>
                     <p>
                        Für jeden Fall der schuldhaften Verletzung dieser Verpflichtungen wird eine Vertragsstrafe in Höhe von <V>{contractFormData.contractDetails.penaltyAmount || "_______"} €</V> vereinbart. Weitergehender Schadensersatz sowie die Geltendmachung von Unterlassungsansprüchen bleiben vorbehalten.
                     </p>
                  </div>

                  <h2 className="contract-heading">VII. Vertragsdauer und Kündigung</h2>
                  <div className="contract-section">
                     <p>
                        Der Auftragnehmer nimmt die Tätigkeit am <V>{contractFormData.contractDetails.contractSignatureDate || "_______"}</V> auf. Das Vertragsverhältnis kann unter Einhaltung einer Frist von <V>{contractFormData.contractDetails.terminationPeriod || "_______"} {contractFormData.contractDetails.terminationPeriodUnit}</V> gekündigt werden. Das Recht zur außerordentlichen Kündigung bleibt hiervon unberührt. Jede Kündigung bedarf zu ihrer Wirksamkeit der Schriftform.
                     </p>
                  </div>

                  <h2 className="contract-heading">VIII. Erfüllungsort und Gerichtsstand</h2>
                  <div className="contract-section">
                     <p>
                        Erfüllungsort und Gerichtsstand ist <V>{contractFormData.contractDetails.venue || "_______"}</V> bzw. <V>{contractFormData.contractDetails.jurisdiction || "_______"}</V>
                     </p>
                  </div>

                  <h2 className="contract-heading">IX. Nebenabreden und salvatorische Klausel</h2>
                  <div className="contract-section">
                     <p>
                        Nebenabreden und Änderungen des Vertrages bedürfen zu ihrer Wirksamkeit der Schriftform. Dieses Formerfordernis kann weder mündlich noch stillschweigend aufgehoben oder außer Kraft gesetzt werden.
                     </p>
                     <p>
                        Die teilweise oder vollständige Unwirksamkeit einzelner Bestimmungen dieses Vertrages berührt nicht die Wirksamkeit der übrigen Regelungen des Vertrages.
                     </p>
                  </div>

                  <h2 className="contract-heading">X. Vertragsaushändigung</h2>
                  <div className="contract-section">
                     <p>
                        Jede der Vertragsparteien hat eine schriftliche Ausfertigung dieses Vertrages erhalten.
                     </p>
                  </div>

                  <div className="contract-signatures">
                     <div className="signature-grid">
                        <div>
                           <p className="signature-line">_____________________</p>
                           <p className="signature-label">Ort, Datum</p>
                        </div>
                        <div></div>
                     </div>
                     <div className="signature-grid">
                        <div>
                           <p className="signature-line">_____________________</p>
                           <p className="signature-label">Unterschrift Auftraggeber</p>
                        </div>
                        <div>
                           <p className="signature-line">_____________________</p>
                           <p className="signature-label">Unterschrift Auftragnehmer</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="contract-footer">
               <div className="email-field">
                  <label htmlFor="email">E-Mail-Adresse für Versand</label>
                  <input
                     id="email"
                     type="email"
                     placeholder="email@beispiel.de"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <button onClick={() => {
                  handleSend();
                  //window.print();
               }}  className="send-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <line x1="22" y1="2" x2="11" y2="13"></line>
                     <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  Vertrag versenden
               </button>
            </div>
         </div>
      </div>
   );
};