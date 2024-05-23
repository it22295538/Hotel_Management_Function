import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

function GuestProfileSummary() {
  const [summaryData, setSummaryData] = useState(null);
  const ApiURL = "http://localhost:8070";
  
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get(`${ApiURL}/Hotel/Guest/summary`);
        setSummaryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSummaryData();
  }, []);

  if (!summaryData) {
    return <div>Loading...</div>;
  }

  const PDFReport = () => (
    <Document>
      <Page size="A4">
        <View style={styles.section}>
          <Text>Guest Profile Summary Report</Text>
          <Text>Total Number of Guest Profiles: {summaryData.totalProfiles}</Text>
          <Text>Average Number of Profiles Created per Month: {summaryData.averageProfilesPerMonth}</Text>
          <Text>Top Nationalities of Guests:</Text>
          <View>
            {summaryData.topNationalities.map((nationality, index) => (
              <Text key={index}>{nationality.country}: {nationality.count}</Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <div>
      <h2>Guest Profile Summary</h2>
      <p>Total Number of Guest Profiles: {summaryData.totalProfiles}</p>
      <p>Average Number of Profiles Created per Month: {summaryData.averageProfilesPerMonth}</p>
      <p>Top Nationalities of Guests:</p>
      <ul>
        {summaryData.topNationalities.map((nationality, index) => (
          <li key={index}>
            {nationality.country}: {nationality.count}
          </li>
        ))}
      </ul>
      
      s
      <PDFDownloadLink document={<PDFReport />} fileName="guest_profile_summary.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>
    </div>
  );
}

export default GuestProfileSummary;
