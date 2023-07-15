import React, { useEffect, useState } from 'react'; // Example using QuaggaJS for barcode scanning
import { ref, get, child } from 'firebase/database';
import { database } from '../firebase';
import  Quagga  from 'quagga';


const BarcodeScanner = () => {
  const [barcodeValue, setBarcodeValue] = useState('');
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const scanBarcode = () => {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#barcode-scanner'),
          },
          decoder: {
            readers: ['ean_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error('Error initializing Quagga:', err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((result) => {
        Quagga.stop();
        setBarcodeValue(result.codeResult.code);
      });
    };
    scanBarcode();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (barcodeValue) {
        try {
          const productRef = ref(database, 'products');
          const snapshot = await get(child(productRef, barcodeValue));
          if (snapshot.exists()) {
            setProductDetails(snapshot.val());
          } else {
            console.log('Product not found');
            setProductDetails(null);
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
          setProductDetails(null);
        }
      }
    };

    fetchProductDetails();
  }, [barcodeValue]);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <div id="barcode-scanner" />
      {productDetails ? (
        <div>
          <p>Name: {productDetails.name}</p>
          <p>Price: {productDetails.price}</p>
          {/* Display other product details as needed */}
        </div>
      ) : (
        <p>No product details found</p>
      )}
    </div>
  );
};

export default BarcodeScanner;

