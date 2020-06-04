const ffs = require("fs");
const PDFDocument = require("pdfkit");
const path = require('path');
function createInvoice(invoice, fileName) {

    let invoicePath = path.join(__dirname, '../../client/public/invoices/');


    if (process.env.NODE_ENV === 'production') {
        invoicePath = path.join(__dirname, '../../client/build/invoices/');
    }

    const filePath = invoicePath + fileName + ".pdf";

    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
    doc.pipe(ffs.createWriteStream(filePath));
    return {
        fileName : fileName + ".pdf",
        filePath : filePath
    };
}

function generateHeader(doc) {
    doc
        .image("logo.png", 50, 45, { width: 120 })
        .fillColor("#444444")
        .fontSize(10)
        .text("601 St Andrews", 200, 50, { align: "right" })
        .text("Links Business park", 200, 65, { align: "right" })
        .text("De Beers Avenue", 200, 80, { align: "right" })
        .text("Somerset West 7129", 200, 95, { align: "right" })
        .fillColor("#313cff")
        .fontSize(12)
        .text("www.imaginesignage.com", 200, 110, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(10)
        .text("Invoice Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.invoice_num, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text("Balance Due:", 50, customerInformationTop + 30)
        .text(
            formatCurrency(invoice.total),
            150,
            customerInformationTop + 30
        )

        .font("Helvetica-Bold")
        .text(invoice.buyerInfo.firstName + " " + invoice.buyerInfo.lastName, 300, customerInformationTop)
        .font("Helvetica")
        .text(invoice.buyerInfo.address, 300, customerInformationTop + 15)
        .font("Helvetica")
        .text(
            invoice.buyerInfo.townCity +
            ", " +
            invoice.buyerInfo.stateCounty +
            ", " +
            invoice.buyerInfo.country,
            300,
            customerInformationTop + 30
        )
        .font("Helvetica")
        .text(
            "postcode : " + invoice.buyerInfo.postCode, 300, customerInformationTop + 45
        )
        .moveDown();

    generateHr(doc, 265);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "No",
        "Items",
        "Unit Cost",
        "Quantity",
        "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    let keys = Object.keys(invoice.items);

    for (i = 0; i < keys.length; i++) {

        let tempKey = keys[i];
        const item = invoice.items[tempKey];

        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            i + 1,
            item.productName,
            formatCurrency(item.price_rand),
            item.quantity,
            formatCurrency(item.price_rand * item.quantity)
        );

        generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        "",
        formatCurrency(invoice.subTotal)
    );

    const taxPosition = subtotalPosition + 20;

    generateTableRow(
        doc,
        taxPosition,
        "",
        "",
        "Tax",
        "",
        formatCurrency(invoice.tax)
    );

    const shippingPosition = taxPosition + 20;

    generateTableRow(
        doc,
        shippingPosition,
        "",
        "",
        "Shipping",
        "",
        formatCurrency(invoice.shipping)
    );

    const totalPosition = shippingPosition + 20;
    generateTableRow(
        doc,
        totalPosition,
        "",
        "",
        "Total",
        "",
        formatCurrency(invoice.total)
    );
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Thank you for your business.",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    no,
    item,
    unitCost,
    quantity,
    lineTotal
) {
    doc
        .fontSize(10)
        .text(no, 30, y)
        .text(item, 50, y)
        .text(unitCost, 280, y, { width: 90, align: "center" })
        .text(quantity, 370, y, { width: 90, align: "center" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(25, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(cents) {
    var realCents = parseFloat(cents);
    return "$" + realCents.toFixed(2);
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

module.exports = {
    createInvoice
};
