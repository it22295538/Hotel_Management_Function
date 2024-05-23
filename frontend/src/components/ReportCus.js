import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GeneratePDFReport() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const ApiURL = "http://localhost:8070";

  const generatePDFReport = async () => {
    if (!month || !year) {
      setError('Please select a month and year.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${ApiURL}/Hotel/Customer/generatePDF/${month}/${year}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setLoading(false);
      setError('');
    } catch (error) {
      console.error('Error generating PDF report:', error);
      setLoading(false);
      setError('An error occurred while generating the PDF report.');
    }
  };

  // Function to generate options for all months (January to December)
  const generateMonthOptions = () => {
    const options = [];
    for (let i = 1; i <= 12; i++) {
      options.push(<option key={i} value={i}>{getMonthName(i)}</option>);
    }
    return options;
  };

  // Function to get the name of the month based on its index (1 to 12)
  const getMonthName = (monthIndex) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex - 1];
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Generate PDF Report</h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="month" style={{ display: 'block', marginBottom: '5px' }}>Month:</label>
        <select id="month" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          {generateMonthOptions()}
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="year" style={{ display: 'block', marginBottom: '5px' }}>Year:</label>
        <input type="text" id="year" style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }} value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
      <button style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={generatePDFReport} disabled={loading}>Generate Report</button>
      {loading && <div style={{ marginTop: '20px', fontSize: '18px' }}>Loading...</div>}
      {pdfUrl && (
        <div style={{ marginTop: '20px' }}>
          <object data={pdfUrl} type="application/pdf" width="100%" height="600px" style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
            <p>It appears you don't have a PDF plugin for this browser. No worries, you can <a href={pdfUrl}>click here to download the PDF file.</a></p>
          </object>
        </div>
      )}
    </div>
  );
}  
export default GeneratePDFReport;
