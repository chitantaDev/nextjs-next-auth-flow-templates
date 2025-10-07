import { ContractData } from "@/app/components/contract-interface";
import { contractContent } from "./contractText";

interface PartyAddressInput {
   clientGender?: string;
   clientFirstName?: string;
   clientLastName?: string;
   clientStreet?: string;
   clientStreetNumber?: string;
   clientPostalCode?: string;
   clientCity?: string;

   contractorGender?: string;
   contractorFirstName?: string;
   contractorLastName?: string;
   contractorStreet?: string;
   contractorStreetNumber?: string;
   contractorPostalCode?: string;
   contractorCity?: string;
}

/**
 * Generates the HTML template for the contract
 * Used by both the preview component and PDF generation service
 */
export function generateContractHtml(contractData: ContractData): string {
   const {
      contractSignatureDate = "_______",
      activity = "_______",
      serviceStartDate = "_______",
      endDate = "_______",
      totalAmount = "_______",
      liabilityLimit = "_______",
      penaltyAmount = "_______",
      terminationPeriod = "_______",
      terminationPeriodUnit = "",
      venue = "_______",
      jurisdiction = "_______",
   } = contractData.contractDetails;

   const formatPartyAddress = (party: PartyAddressInput, label: string) => `
    <p class="contract-party">
      <strong class="contract-value">${party.clientGender || party.contractorGender} ${party.clientFirstName || party.contractorFirstName} ${party.clientLastName || party.contractorLastName}</strong><br />
      <strong class="contract-value">${party.clientStreet || party.contractorStreet} ${party.clientStreetNumber || party.contractorStreetNumber}</strong><br />
      <strong class="contract-value">${party.clientPostalCode || party.contractorPostalCode} ${party.clientCity || party.contractorCity}</strong>
    </p>
    <p class="contract-party-label">- nachfolgend „${label}" genannt -</p>
  `;

   return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        .contract-preview-title {
          text-align: center;
          font-size: 24px;
          margin-bottom: 30px;
        }
        .contract-section {
          margin-bottom: 20px;
        }
        .contract-heading {
          font-size: 18px;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        .contract-value {
          font-weight: bold;
        }
        .contract-party {
          margin-left: 40px;
        }
        .contract-party-label {
          margin-left: 40px;
          font-style: italic;
        }
        .contract-signatures {
          margin-top: 60px;
        }
        .signature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 20px;
        }
        .signature-line {
          border-bottom: 1px solid #000;
          margin-bottom: 5px;
          padding-top: 30px;
        }
        .signature-label {
          font-size: 12px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1 class="contract-preview-title">${contractContent.title}</h1>

      <div class="contract-section">
        <p>Zwischen</p>
        ${formatPartyAddress(contractData.client, contractContent.clientLabel)}

        <p>und</p>
        ${formatPartyAddress(contractData.contractor, contractContent.contractorLabel)}

        <p>${contractContent.agreementStatement}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingI}</h2>
      <div class="contract-section">
        <p>${contractContent.activityParagraph1(activity, contractSignatureDate, serviceStartDate, endDate)}</p>
        <p>${contractContent.activityParagraph2}</p>
        <p>${contractContent.activityParagraph3}</p>
        <p>${contractContent.activityParagraph4}</p>
        <p>${contractContent.activityParagraph5}</p>
        <p>${contractContent.activityParagraph6}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingII}</h2>
      <div class="contract-section">
        <p>${contractContent.serviceProvisionParagraph1}</p>
        <p>${contractContent.serviceProvisionParagraph2}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingIII}</h2>
      <div class="contract-section">
        <p>${contractContent.remunerationParagraph1(totalAmount)}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingIV}</h2>
      <div class="contract-section">
        <p>${contractContent.claimsParagraph1}</p>
        <p>${contractContent.claimsParagraph2}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingV}</h2>
      <div class="contract-section">
        <p>${contractContent.liabilityParagraph1}</p>
        <p>${contractContent.liabilityParagraph2(liabilityLimit)}</p>
        <p>${contractContent.liabilityParagraph3}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingVI}</h2>
      <div class="contract-section">
        <p>${contractContent.confidentialityParagraph1}</p>
        <p>${contractContent.confidentialityParagraph2}</p>
        <p>${contractContent.confidentialityParagraph3(penaltyAmount)}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingVII}</h2>
      <div class="contract-section">
        <p>${contractContent.terminationParagraph1(contractSignatureDate, terminationPeriod, terminationPeriodUnit)}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingVIII}</h2>
      <div class="contract-section">
        <p>${contractContent.jurisdictionParagraph1(venue, jurisdiction)}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingIX}</h2>
      <div class="contract-section">
        <p>${contractContent.severabilityParagraph1}</p>
        <p>${contractContent.severabilityParagraph2}</p>
      </div>

      <h2 class="contract-heading">${contractContent.headingX}</h2>
      <div class="contract-section">
        <p>${contractContent.handoverParagraph1}</p>
      </div>

      <div class="contract-signatures">
        <div class="signature-grid">
          <div>
            <p class="signature-line"></p>
            <p class="signature-label">${contractContent.signatureDateLabel}</p>
          </div>
          <div></div>
        </div>
        <div class="signature-grid">
          <div>
            <p class="signature-line"></p>
            <p class="signature-label">${contractContent.signatureClientLabel}</p>
          </div>
          <div>
            <p class="signature-line"></p>
            <p class="signature-label">${contractContent.signatureContractorLabel}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}