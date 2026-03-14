const PDFDocument = require('pdfkit');

const buildPDF = (dataCallback, endCallback, donationData) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  // -- Header --
  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('AWADH VIDYA AROGYA FOUNDATION', { align: 'center' });
  
  doc.moveDown();
  doc
    .fontSize(10)
    .font('Helvetica')
    .text('Niti Aayog Verified | Reg. No: AVAF-2024-X', { align: 'center' });

  doc.moveDown();
  doc.moveTo(50, 100).lineTo(550, 100).stroke(); // Line separator

  // -- Receipt Details --
  doc.moveDown(2);
  doc.fontSize(14).font('Helvetica-Bold').text('DONATION RECEIPT', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).font('Helvetica').text(`Date: ${new Date().toLocaleDateString()}`);
  doc.text(`Receipt ID: ${donationData.transactionId || 'N/A'}`);
  doc.moveDown();

  // -- Donor Info --
  doc.text(`Received with gratitude from: ${donationData.name}`);
  doc.text(`Email: ${donationData.email}`);
  doc.moveDown();
  
  doc.font('Helvetica-Bold').text(`Amount Donated: ₹${donationData.amount}`, { align: 'left' });
  
  doc.moveDown(2);
  doc.font('Helvetica-Oblique').text('"Your contribution helps us build a better future."', { align: 'center', color: 'grey' });

  // -- Footer --
  doc.moveDown(4);
  doc.fontSize(10).font('Helvetica').text('Authorized Signatory', { align: 'right' });
  doc.text('Awadh Vidya Arogya Foundation', { align: 'right' });

  doc.end();
};

module.exports = { buildPDF };