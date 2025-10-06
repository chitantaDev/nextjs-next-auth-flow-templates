import {useState} from "react";
import {ContractData} from "@/app/components/contract-interface";
import './ContractForm.css';
import {ContractPreview} from "@/app/components/contract/ContractPreview";

export default function ContractForm() {

   const [showPreview, setShowPreview] = useState(false)
   const [formData, setFormData] = useState<ContractData>({
      contractor: {
         contractorGender: "",
         contractorFirstName: "",
         contractorLastName: "",
         contractorStreet: "",
         contractorStreetNumber: "",
         contractorCity: "",
         contractorPostalCode: "",
      },
      client: {
         clientGender: "",
         clientFirstName: "",
         clientLastName: "",
         clientStreet: "",
         clientStreetNumber: "",
         clientCity: "",
         clientPostalCode: "",
      },
      contractDetails: {
         serviceStartDate: "",
         endDate: "",
         activity: "Fotografieauftrag",
         totalAmount: "",
         venue: "",
         jurisdiction: "",
         contractSignatureDate: "",
         terminationPeriod: "",
         terminationPeriodUnit: "Wochen",
         penaltyAmount: "",
         liabilityLimit: "",
      },
   });

   function updateContractDataField(category: keyof ContractData, field: string, value: string) {
      setFormData((prev) => ({
         ...prev,
         [category]: {
            ...prev[category],
            [field]: value,
         },
      }));
   }


   return (
      <div className="contract-form-container">
         <div className="contract-form-wrapper">
            <div className="contract-form-header">
               <h1 className="contract-form-title">Vertragserstellung</h1>
               <p className="contract-form-subtitle">Erstellen Sie einen Vertrag über freie Mitarbeit</p>
            </div>

            <div className="contract-form-card">
               <form id="contractForm" className="contract-form-section">
                  {/* Auftraggeber */}
                  <div>
                     <h2 className="contract-form-section-title">Auftraggeber</h2>
                     <div className="form-grid">
                        <div className="form-field">
                           <label htmlFor="clientGender">Geschlecht</label>
                           <select
                              id="clientGender"
                              name="clientGender"
                              onChange={(e) => (
                                 updateContractDataField("client", e.target.name, e.target.value)
                              )}
                           >
                              <option value="">Auswählen</option>
                              <option value="Herr">Herr</option>
                              <option value="Frau">Frau</option>
                           </select>
                        </div>
                        <div className="form-field">
                           <label htmlFor="clientFirstName">Vorname</label>
                           <input
                              type="text"
                              id="clientFirstName"
                              name="clientFirstName"
                              onChange={(prev) => (
                                 updateContractDataField("client", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="clientLastName">Nachname</label>
                           <input
                              type="text"
                              id="clientLastName"
                              name="clientLastName"
                              onChange={(prev) => (
                                 updateContractDataField("client", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="clientStreet">Straße</label>
                           <input
                              type="text"
                              id="clientStreet"
                              name="clientStreet"
                              onChange={(prev) => (
                                 updateContractDataField("client", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="clientStreetNumber">Hausnummer</label>
                           <input
                              type="text"
                              id="clientStreetNumber"
                              name="clientStreetNumber"
                              onChange={(prev) => (
                                 updateContractDataField("client", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="clientCity">Stadt</label>
                           <input
                              type="text"
                              id="clientCity"
                              name="clientCity"
                              onChange={(prev) => (
                                 updateContractDataField("client", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="clientPostalCode">Postleitzahl</label>
                           <input
                              type="text"
                              id="clientPostalCode"
                              name="clientPostalCode"
                              onChange={(prev) => (
                                 updateContractDataField("client", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                     </div>
                  </div>
                  {/* Auftragnehmer */}
                  <div style={{marginTop: "2rem"}}>
                     <h2 className="contract-form-section-title">Auftragnehmer</h2>
                     <div className="form-grid">
                        <div className="form-field">
                           <label htmlFor="contractorGender">Geschlecht</label>
                           <select
                              id="contractorGender"
                              name="contractorGender"
                              onChange={(prev) => (
                                 updateContractDataField("contractor", prev.target.name, prev.target.value)
                              )}
                           >
                              <option value="">Auswählen</option>
                              <option value="Herr">Herr</option>
                              <option value="Frau">Frau</option>
                           </select>
                        </div>
                        <div className="form-field">
                           <label htmlFor="contractorFirstName">Vorname</label>
                           <input
                              type="text"
                              id="contractorFirstName"
                              name="contractorFirstName"
                              onChange={(prev) => (
                                 updateContractDataField("contractor", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="contractorLastName">Nachname</label>
                           <input
                              type="text"
                              id="contractorLastName"
                              name="contractorLastName"
                              onChange={(prev) => (
                                 updateContractDataField("contractor", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="contractorStreet">Straße</label>
                           <input
                              type="text"
                              id="contractorStreet"
                              name="contractorStreet"
                              onChange={(prev) => (
                                 updateContractDataField("contractor", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="contractorStreetNumber">Hausnummer</label>
                           <input
                              type="text"
                              id="contractorStreetNumber"
                              name="contractorStreetNumber"
                              onChange={(prev) => (
                                 updateContractDataField("contractor", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="contractorCity">Stadt</label>
                           <input
                              type="text"
                              id="contractorCity"
                              name="contractorCity"
                              onChange={(prev) => (
                                 updateContractDataField("contractor", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="contractorPostalCode">Postleitzahl</label>
                           <input
                              type="text"
                              id="contractorPostalCode"
                              name="contractorPostalCode"
                              onChange={(prev) => (
                                 updateContractDataField("contractor", "contractorPostalCode", prev.target.value)
                              )}
                           />
                        </div>
                     </div>
                  </div>
                  {/* Vertragsdaten */}
                  <div style={{marginTop: "2rem"}}>
                     <h2 className="contract-form-section-title">Vertragsdaten</h2>
                     <div className="form-grid">
                        <div className="form-field">
                           <label htmlFor="contractSignatureDate">Aufnahme der Tätigkeit am</label>
                           <input
                              type="date"
                              id="contractSignatureDate"
                              name="contractSignatureDate"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", "contractSignatureDate", prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="activity">Tätigkeit</label>
                           <input
                              type="text"
                              id="activity"
                              name="activity"
                              defaultValue="Fotografieauftrag"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", "activity", prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="serviceStartDate">Ausführung von</label>
                           <input
                              type="date"
                              id="serviceStartDate"
                              name="serviceStartDate"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", "serviceStartDate", prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="endDate">Ausführung bis</label>
                           <input
                              type="date"
                              id="endDate"
                              name="endDate"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", "endDate", prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="totalAmount">Vergütung (Gesamtbetrag in €)</label>
                           <input
                              type="number"
                              id="totalAmount"
                              name="totalAmount"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", "totalAmount", prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="venue">Erfüllungsort</label>
                           <input
                              type="text"
                              id="venue"
                              name="venue"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", "venue", prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="jurisdiction">Gerichtsstand</label>
                           <input
                              type="text"
                              id="jurisdiction"
                              name="jurisdiction"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", "jurisdiction", prev.target.value)
                              )}
                           />
                        </div>
                     </div>
                  </div>
                  {/* Weitere Vertragsdaten */}
                  <div style={{marginTop: "2rem"}}>
                     <h2 className="contract-form-section-title">Weitere Vertragsdetails</h2>
                     <div className="form-grid">
                        <div className="form-field">
                           <label htmlFor="terminationPeriod">Kündigungsfrist</label>
                           <input
                              type="number"
                              id="terminationPeriod"
                              name="terminationPeriod"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="terminationPeriodUnit">Einheit</label>
                           <select
                              id="terminationPeriodUnit"
                              name="terminationPeriodUnit"
                              onChange={(e) => (
                                 updateContractDataField("contractDetails", e.target.name, e.target.value)
                              )}
                           >
                              <option value="Wochen">Wochen</option>
                              <option value="Monaten">Monaten</option>
                           </select>
                        </div>
                        <div className="form-field">
                           <label htmlFor="liabilityLimit">Haftungsbegrenzung in €</label>
                           <input
                              type="number"
                              id="liabilityLimit"
                              name="liabilityLimit"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                        <div className="form-field">
                           <label htmlFor="penaltyAmount">Vertragsstrafe bei Verschwiegenheitsverletzung in €</label>
                           <input
                              type="number"
                              id="penaltyAmount"
                              name="penaltyAmount"
                              onChange={(prev) => (
                                 updateContractDataField("contractDetails", prev.target.name, prev.target.value)
                              )}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="form-actions">
                     <button type="button" className="btn" onClick={() => setShowPreview(true)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2">
                           <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                           <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        Vorschau anzeigen
                     </button>
                  </div>
               </form>
               {/* Preview-Button */}
               <ContractPreview
                  contractFormData={formData}
                  open={showPreview}
                  onOpenChange={setShowPreview}
               />
            </div>
         </div>
      </div>
   );
}