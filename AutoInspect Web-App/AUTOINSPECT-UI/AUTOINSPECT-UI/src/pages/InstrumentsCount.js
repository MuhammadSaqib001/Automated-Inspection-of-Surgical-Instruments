import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { dbfireStore } from "../firebase2/MyComponent";

export default function InstrumentsCount() {

  // Get a reference to the collection you want to fetch data from
  const myCollection = collection(dbfireStore, "Instruments");

  const faultyDocsQuery = query(myCollection, where("instrument_label", "==", "Faulty"));
  // Use the getDocs function to fetch the documents that match the query
  getDocs(faultyDocsQuery)
    .then((querySnapshot) => {
      // Get the number of documents that match the query
      const numFaultyDocs = querySnapshot.size;

      // Log the number of faulty documents to the console
      console.log(`Number of faulty documents: ${numFaultyDocs}`);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

// --- bar data here
  const [myData, setMyData] = useState([]);
  const [FaultCounts, setFaultCounts] = useState([]);

  // Fetch data from Firestore when the component mounts
  useEffect(() => {
    // const myCollection = collection(dbfireStore, "Instruments");
    const allDocsQuery = query(myCollection);
    getDocs(allDocsQuery)
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // Get the value of the "instruments_fault_types" field
          const instrumentsFaultTypes = doc.data().instruments_fault_types;
          data.push(instrumentsFaultTypes);
        });
        // console.log(data); // output the data array
        setMyData(data); // store the data array in state

      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  console.log(myData); // output the data array


  // Wait for the data to be loaded before counting faults
  useEffect(() => {
    if (myData.length > 0) {
      // Create an object to store fault counts for each defect
      const newFaultCounts = {};

      // Iterate over the data array and count each fault type
      myData.forEach((faults) => {
        faults.forEach((fault) => {
          if (fault in newFaultCounts) {
            newFaultCounts[fault] += 1;
          } else {
            newFaultCounts[fault] = 1;
          }
        });
      });

      // Set the fault counts in the state
      setFaultCounts(newFaultCounts);
    }
  }, [myData]);
  console.log(FaultCounts);
}
