import React from 'react';
import UPOlogo from '../../public/UPOBankMedium.jpg';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Transaction, TransactionDetailDTO } from './services/TransactionService';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  logo: {
    width: 400,
    height: 200,
    margin: '0 auto',
    marginBottom: 30,
  },
  text: {
    margin: 10,
    fontSize: 14,
    textAlign: 'justify',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  line: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  footer: {
    marginTop: 'auto',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export const PDFFile = ({ transaction }: {transaction: TransactionDetailDTO}) => (
  <Document>
    <Page style={styles.page}>
        <Image 
          src={UPOlogo} 
          style={styles.logo}
        /> 
        <Text style={styles.title}>Confirmation of Payment</Text>
        <View style={styles.line} />
        <View>
          <Text style={styles.text}>Transaction ID: {transaction.id}</Text>
          <Text style={styles.text}>Amount: {transaction.amount}</Text>
          <Text style={styles.text}>Transaction Title: {transaction.message}</Text>
          <Text style={styles.text}>Transaction Date: {transaction.transactionDate}</Text>
          <Text style={styles.text}>Sender Account Number: {transaction.senderAccountNumber}</Text>
          <Text style={styles.text}>Recipient Account Number: {transaction.recipientAccountNumber}</Text>
        </View>
        <Text style={styles.footer}>© 2022 UPO Bank. All rights reserved.</Text>
    </Page>
  </Document>
);