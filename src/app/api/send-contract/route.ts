import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PdfService } from "@/app/service/PdfService";

export async function POST(request: NextRequest) {
   try {
      const { email, contractData } = await request.json();

      // Validate input
      if (!email || !contractData) {
         return NextResponse.json(
            { error: 'Email und Vertragsdaten sind erforderlich' },
            { status: 400 }
         );
      }

      // Generate PDF directly from contract data
      const pdfBuffer = await PdfService.generateContractPdf(contractData);

      // Create email transporter
      const transporter = nodemailer.createTransport({
         host: process.env.EMAIL_SERVER_HOST,
         port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
         secure: false,
         auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
         },
      });

      // Email options
      const mailOptions = {
         from: process.env.EMAIL_FROM,
         to: email,
         subject: 'Vertrag über freie Mitarbeit',
         html: `
        <h2>Vertrag über freie Mitarbeit</h2>
        <p>Sehr geehrte Damen und Herren,</p>
        <p>anbei erhalten Sie den Vertrag über freie Mitarbeit zwischen:</p>
        <ul>
          <li><strong>Auftraggeber:</strong> ${contractData.client.clientGender} ${contractData.client.clientFirstName} ${contractData.client.clientLastName}</li>
          <li><strong>Auftragnehmer:</strong> ${contractData.contractor.contractorGender} ${contractData.contractor.contractorFirstName} ${contractData.contractor.contractorLastName}</li>
        </ul>
        <p>Bitte prüfen Sie den Vertrag und bewahren Sie ihn für Ihre Unterlagen auf.</p>
        <p>Mit freundlichen Grüßen</p>
      `,
         attachments: [
            {
               filename: 'Vertrag_freie_Mitarbeit.pdf',
               content: pdfBuffer,
               contentType: 'application/pdf',
            },
         ],
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return NextResponse.json(
         { message: 'Vertrag erfolgreich versendet' },
         { status: 200 }
      );
   } catch (error) {
      console.error('Error sending contract email:', error);
      return NextResponse.json(
         { error: 'Fehler beim Versenden des Vertrags' },
         { status: 500 }
      );
   }
}