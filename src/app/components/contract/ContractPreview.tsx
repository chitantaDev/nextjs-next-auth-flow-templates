'use client'
import { ContractData } from "@/app/components/contract-interface";
import { useState } from "react";
import { generateContractHtml } from "./lib/contractTemplate";
import "./ContractPreview.css";

interface ContractPreviewProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   contractFormData: ContractData;
}

export const ContractPreview = ({open, onOpenChange, contractFormData}: ContractPreviewProps) => {
   const [email, setEmail] = useState("");
   const [isSending, setIsSending] = useState(false);

   const handleSend = async () => {
      if (!email) {
         alert("Bitte geben Sie eine E-Mail-Adresse ein");
         return;
      }

      setIsSending(true);
      try {
         const response = await fetch('/api/send-contract', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               email,
               contractData: contractFormData,
            }),
         });

         const data = await response.json();

         if (response.ok) {
            alert('Vertrag erfolgreich versendet!');
            onOpenChange(false);
            setEmail('');
         } else {
            alert(`Fehler: ${data.error || 'Vertrag konnte nicht versendet werden'}`);
         }
      } catch (error) {
         console.error('Error sending contract:', error);
         alert('Fehler beim Versenden des Vertrags. Bitte versuchen Sie es später erneut.');
      } finally {
         setIsSending(false);
      }
   };

   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
         onOpenChange(false);
      }
   };

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
               <iframe
                  srcDoc={generateContractHtml(contractFormData)}
                  style={{width: '100%', height: '600px', border: '1px solid #ddd'}}
                  title="Contract Preview"
               />
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
               <button
                  onClick={handleSend}
                  className="send-button"
                  disabled={isSending}
               >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <line x1="22" y1="2" x2="11" y2="13"></line>
                     <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                  {isSending ? 'Wird versendet...' : 'Vertrag versenden'}
               </button>
            </div>
         </div>
      </div>
   );
};