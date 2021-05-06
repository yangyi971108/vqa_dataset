import React, { Component, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

function PDFPage () {
  const pdfFile = require('../../assets/IEEEtrans.pdf');
  console.log('pdfFile', pdfFile)
  const [numPages, setnumPages] = useState();
  const [pageNumber, setpageNumber] = useState(1);
  const pdfWidth = window.innerWidth;
  var onDocumentLoadSuccess = (numPages) => {
    console.log('numPages', numPages._pdfInfo.numPages)
    setnumPages(numPages._pdfInfo.numPages);
  };
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  return (
    <Document file={pdfFile}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={console.error}
      loading="正在努力加载中"
      externalLinkTarget="_blank"
    >

      {
        numPages ? (new Array(numPages).fill('').map((item, index) => {
          return <Page  className='page' width={pdfWidth} key={index} pageNumber={index + 1} />
        })) : (
          null
        )

      }
    </Document>
  )
}

export default PDFPage;