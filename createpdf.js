const puppeteer = require('puppeteer');
const fs = require('fs');

async function generatePDFFromHTML(htmlPath, pdfPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Read HTML content from file
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Set the HTML content of the page
    await page.setContent(htmlContent);

    // Generate PDF from HTML
    await page.pdf({ path: pdfPath, format: 'A4' });

    await browser.close();
    
    console.log(`PDF generated successfully at: ${pdfPath}`);
}




module.exports=generatePDFFromHTML;
