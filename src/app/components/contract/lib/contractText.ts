// src/lib/contractText.ts (or wherever you prefer)

export const contractContent = {
   // Title
   title: "Vertrag über freie Mitarbeit",

   // Party Labels
   clientLabel: "Auftraggeber",
   contractorLabel: "Auftragnehmer",
   agreementStatement: "wird folgendes vereinbart:",

   // Section Headings
   headingI: "I. Tätigkeit",
   headingII: "II. Leistungserbringung",
   headingIII: "III. Vergütung",
   headingIV: "IV. Aufwendungsersatz und sonstige Ansprüche",
   headingV: "V. Haftung und Gewährleistung",
   headingVI: "VI. Verschwiegenheit, Aufbewahrung und Rückgabe von Unterlagen",
   headingVII: "VII. Vertragsdauer und Kündigung",
   headingVIII: "VIII. Erfüllungsort und Gerichtsstand",
   headingIX: "IX. Nebenabreden und salvatorische Klausel",
   headingX: "X. Vertragsaushändigung",

   // Section I: Tätigkeit (Activity)
   activityParagraph1: (activity: string, signatureDate: string, startDate: string, endDate: string) =>
      `Der Auftragnehmer wird ab dem <strong class="contract-value">${signatureDate}</strong> für den Auftraggeber folgende Tätigkeiten als Auftragnehmer übernehmen: <strong class="contract-value">${activity}</strong>. Die Tätigkeit soll im Zeitraum von <strong class="contract-value">${startDate}</strong> bis <strong class="contract-value">${endDate}</strong> ausgeführt werden.`,
   activityParagraph2: `Der Auftragnehmer hat die Durchführung und den Ablauf seiner Leistung selbst zu organisieren. Er unterliegt keinen Weisungen des Auftraggebers und ist in der Gestaltung seiner Tätigkeit frei. Ein Arbeitsverhältnis wird nicht begründet. Auf besondere betriebliche Belange im Zusammenhang mit seiner Tätigkeit ist jedoch Rücksicht zu nehmen.`,
   activityParagraph3: `Der Auftragnehmer ist an keinerlei Vorgaben zum Arbeitsort oder Arbeitszeit gebunden. Projektbezogene Zeitvorgaben des Auftraggebers sind ebenso einzuhalten wie fachliche Vorgaben, soweit diese zur ordnungsgemäßen Vertragsdurchführung erforderlich sind.`,
   activityParagraph4: `Der Auftragnehmer ist ferner berechtigt, Aufträge des Auftraggebers ohne Angaben von Gründen abzulehnen.`,
   activityParagraph5: `Beide Vertragsparteien verpflichten sich zur gegenseitigen Kenntnisgabe, sofern sich bei der Vertragsdurchführung Abwicklungsschwierigkeiten oder aber vorhersehbare Zeitverzögerungen ergeben sollten.`,
   activityParagraph6: `Der freie Mitarbeiter ist berechtigt, auch für andere Auftraggeber tätig zu sein. Er verpflichtet sich jedoch, während der Dauer des Vertragsverhältnisses nicht für ein Unternehmen tätig zu werden, das mit dem Auftraggeber oder einem mit ihm verbundenen Unternehmen im Wettbewerb steht.`,

   // Section II: Leistungserbringung (Service Provision)
   serviceProvisionParagraph1: `Der Auftragnehmer erbringt die Arbeitsleistung in der Regel höchstpersönlich. Er kann sich zur Erfüllung des Auftrags auch anderer Personen bedienen. Die Hinzuziehung eigener Mitarbeiter oder die Vergabe von Unteraufträgen erfolgt in Abstimmung mit dem Auftraggeber. Für die ordnungsgemäße Erfüllung der vertraglichen Leistungen bleibt er dem Auftraggeber gegenüber verantwortlich. Für die steuerlichen und sozialversicherungsrechtlichen Belange hat der freie Mitarbeiter selbst Sorge zu tragen, insbesondere auch für eine angemessene Versicherung für die Altersvorsorge wie auch zum Schutz gegen Krankheiten und den Pflegefall.`,
   serviceProvisionParagraph2: `Der Auftragnehmer übt seine Tätigkeit in seinen eigenen Räumlichkeiten aus. Soweit in Einzelfällen eine betriebliche Anwesenheit erforderlich wird, stellt der Auftraggeber nach jeweiliger vorheriger Absprache die entsprechenden betrieblichen Einrichtungen zur Verfügung. Der Auftraggeber stellt dem Auftragnehmer alle zur Ausübung seiner Tätigkeiten erforderlichen Informationen, Hilfsmittel und Unterlagen zur Verfügung.`,

   // Section III: Vergütung (Remuneration)
   remunerationParagraph1: (totalAmount: string) =>
      `Als Vergütung wird ein Gesamtbetrag von <strong class="contract-value">${totalAmount} €</strong> zuzüglich der jeweiligen gesetzlichen Mehrwertsteuer vereinbart. Der Auftragnehmer ist verpflichtet, eine spezifizierte Abrechnung in Form einer Rechnung zu erstellen. Die Auszahlung erfolgt unbar.`,

   // Section IV: Aufwendungsersatz und sonstige Ansprüche (Expense Reimbursement and other claims)
   claimsParagraph1: `Mit der Zahlung der in diesem Vertrag vereinbarten Vergütung sind alle Ansprüche des Auftragnehmers gegen den Auftraggeber aus diesem Vertrag erfüllt.`,
   claimsParagraph2: `Für die Versteuerung der Vergütung hat der Auftragnehmer selbst zu sorgen. Der Auftragnehmer wird darauf hingewiesen, dass er nach § 2 Nr. 9 SGB VI rentenversicherungspflichtig sein kann, wenn er auf Dauer und im Wesentlichen nur für einen Auftraggeber tätig ist.`,

   // Section V: Haftung und Gewährleistung (Liability and Warranty)
   liabilityParagraph1: `Sollte der Auftraggeber auf Grund von Leistungen, die vom Auftragnehmer erbracht wurden, von Dritten in Haftung genommen werden, so verpflichtet sich der Auftragnehmer gegenüber dem Auftraggeber, diesen von derlei Haftung freizustellen.`,
   liabilityParagraph2: (liabilityLimit: string) =>
      `Für Schäden, die durch Zeitüberschreitung des Auftragnehmers erfolgen, ist die Haftung des Auftragnehmers auf die Höhe von <strong class="contract-value">${liabilityLimit} €</strong> begrenzt. Im Übrigen verpflichtet sich der Auftragnehmer zur kostenlosen Nacharbeit und Beseitigung der von ihm verursachten Mängel.`,
   liabilityParagraph3: `Der freie Mitarbeiter versichert, dass er über eine ausreichende Berufshaftpflichtversicherung verfügt, die auch die Tätigkeit innerhalb dieser Vereinbarung abdeckt und diese für die Dauer der Vereinbarung aufrechterhalten wird. Auf Verlangen des Auftraggebers wird er dies durch Vorlage geeigneter Nachweise belegen.`,

   // Section VI: Verschwiegenheit, Aufbewahrung und Rückgabe von Unterlagen (Confidentiality, Storage and Return of Documents)
   confidentialityParagraph1: `Die Vertragsparteien verpflichten sich, alle ihnen im Rahmen des Vertrages zugänglich gemachten, sowie bei Gelegenheit der Zusammenarbeit erlangten Informationen über Angelegenheiten der anderen Partei, die als vertraulich gekennzeichnet sind; die bei einer mündlichen Übermittlung als vertraulich bezeichnet werden; oder die aus Sicht eines objektiven Beobachters als vertraulich erkennbar sind; sowie Geschäfts- und Betriebsgeheimnisse vertraulich zu behandeln. Vertrauliche Informationen dürfen ohne schriftliche Einwilligung der anderen Vertragspartei zu einem anderen als dem zur vertragsgemäßen Aufgabenerfüllung vorgesehenen Zweck nicht verwertet, Dritten zugänglich gemacht oder sonst genutzt werden.`,
   confidentialityParagraph2: `Die Parteien tragen dafür Sorge, dass Dritte, derer sie sich als Erfüllungsgehilfen bedienen, ebenfalls die Geheimhaltungspflicht beachten. Diese Pflicht besteht auch nach Beendigung der Tätigkeit fort.`,
   confidentialityParagraph3: (penaltyAmount: string) =>
      `Für jeden Fall der schuldhaften Verletzung dieser Verpflichtungen wird eine Vertragsstrafe in Höhe von <strong class="contract-value">${penaltyAmount} €</strong> vereinbart. Weitergehender Schadensersatz sowie die Geltendmachung von Unterlassungsansprüchen bleiben vorbehalten.`,

   // Section VII: Vertragsdauer und Kündigung (Contract Duration and Termination)
   terminationParagraph1: (signatureDate: string, period: string, unit: string) =>
      `Der Auftragnehmer nimmt die Tätigkeit am <strong class="contract-value">${signatureDate}</strong> auf. Das Vertragsverhältnis kann unter Einhaltung einer Frist von <strong class="contract-value">${period} ${unit}</strong> gekündigt werden. Das Recht zur außerordentlichen Kündigung bleibt hiervon unberührt. Jede Kündigung bedarf zu ihrer Wirksamkeit der Schriftform.`,

   // Section VIII: Erfüllungsort und Gerichtsstand (Place of Performance and Jurisdiction)
   jurisdictionParagraph1: (venue: string, jurisdiction: string) =>
      `Erfüllungsort und Gerichtsstand ist <strong class="contract-value">${venue}</strong> bzw. <strong class="contract-value">${jurisdiction}</strong>`,

   // Section IX: Nebenabreden und salvatorische Klausel (Ancillary Agreements and Severability Clause)
   severabilityParagraph1: `Nebenabreden und Änderungen des Vertrages bedürfen zu ihrer Wirksamkeit der Schriftform. Dieses Formerfordernis kann weder mündlich noch stillschweigend aufgehoben oder außer Kraft gesetzt werden.`,
   severabilityParagraph2: `Die teilweise oder vollständige Unwirksamkeit einzelner Bestimmungen dieses Vertrages berührt nicht die Wirksamkeit der übrigen Regelungen des Vertrages.`,

   // Section X: Vertragsaushändigung (Contract Handover)
   handoverParagraph1: `Jede der Vertragsparteien hat eine schriftliche Ausfertigung dieses Vertrages erhalten.`,

   // Signatures
   signatureDateLabel: "Ort, Datum",
   signatureClientLabel: "Unterschrift Auftraggeber",
   signatureContractorLabel: "Unterschrift Auftragnehmer",
};