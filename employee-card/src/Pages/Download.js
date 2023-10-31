import React from 'react';
import firebase from 'firebase/database'; // Import the Firebase app (you may need to import additional Firebase modules depending on your needs)
import 'firebase/storage'; // Import the Firebase Storage module
import {  getDatabase, child, push, update , onValue} from "firebase/database";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { database , auth, storage} from '../firebase';

const Download= () => {
    const downloadFile = async () => {
        try {
            const storageRef = ref(getStorage(), 'gs://id-card-3506b.appspot.com'); // Correct the path here

            console.log("test",storageRef)
            // Get the download URL for the file
            const downloadURL = await getDownloadURL(storageRef);
      
            // Create a custom file name for the downloaded file
            const customFileName = 'file.txt';
      
            // Create an anchor element to trigger the download
            const anchor = document.createElement('a');
            anchor.href = downloadURL;
            anchor.download = customFileName;
        } catch (error) {
          console.error('Error downloading file:', error);
        }
      };

  return (
    <div>
      <button onClick={downloadFile}>Download File</button>
    </div>
  );
};

export default Download;
