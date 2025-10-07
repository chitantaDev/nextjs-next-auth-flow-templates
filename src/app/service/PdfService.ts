import puppeteer from 'puppeteer';
import { ContractData } from '@/app/components/contract-interface';
import {generateContractHtml} from "@/app/components/contract/lib/contractTemplate";

export interface PdfGenerationOptions {
   format?: 'A4' | 'Letter';
   margin?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
   };
   printBackground?: boolean;
}

export class PdfService {
   private static defaultOptions: PdfGenerationOptions = {
      format: 'A4',
      printBackground: true,
      margin: {
         top: '20mm',
         right: '20mm',
         bottom: '20mm',
         left: '20mm',
      },
   };

   /**
    * Generates a PDF from HTML content
    * @param htmlContent - The HTML string to convert to PDF
    * @param options - Optional PDF generation settings
    * @returns PDF as Buffer
    */
   static async generatePdfFromHtml(htmlContent: string, options: PdfGenerationOptions = {}): Promise<Buffer> {
      const mergedOptions = { ...this.defaultOptions, ...options };

      let browser;
      try {
         browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
         });

         const page = await browser.newPage();

         await page.setContent(htmlContent, {
            waitUntil: 'networkidle0',
         });

         const pdfBuffer = await page.pdf({
            format: mergedOptions.format,
            printBackground: mergedOptions.printBackground,
            margin: mergedOptions.margin,
         });

         return Buffer.from(pdfBuffer);
      } catch (error) {
         console.error('PDF generation error:', error);
         throw new Error('Failed to generate PDF');
      } finally {
         if (browser) {
            await browser.close();
         }
      }
   }

   /**
    * Generates a PDF from contract data
    * @param contractData - Contract data object
    * @param options - Optional PDF generation settings
    * @returns PDF as Buffer
    */
   static async generateContractPdf(contractData: ContractData, options: PdfGenerationOptions = {}): Promise<Buffer> {
      const html = generateContractHtml(contractData);
      return this.generatePdfFromHtml(html, options);
   }
}