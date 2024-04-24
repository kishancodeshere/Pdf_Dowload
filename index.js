const express = require('express')
const path = require('path')

//      -------dotenv config---------

require("dotenv").config(); 


const fs=require('fs')
const app = express()

//      --------import pdf logic file----------
const generatePDFFromHTML=require('./createpdf')


const port = process.env.PORT || 3000

//      ----------find path of html page--------
const fileLocation=path.join(__dirname +"/public/k.html")

//      ----------- Route file-------------
app.get("/",(req,res)=>{

    return res.sendFile(path.join(__dirname +"/public/file.html"))
})

app.get('/generate-pdf', async (req, res) => {
    // Input HTML file path

    const htmlFilePath = fileLocation;

    // Output PDF file path
    const pdfFilePath = 'bill.pdf';

    // Generate PDF from HTML
await generatePDFFromHTML(htmlFilePath, pdfFilePath);

    // Send the generated PDF as a downloadable file
    const pdfStream = fs.createReadStream(pdfFilePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${pdfFilePath}.pdf`);
    pdfStream.pipe(res);
});


app.listen(port,()=>{
    console.log(`Server is runing on ${port}`);
})
