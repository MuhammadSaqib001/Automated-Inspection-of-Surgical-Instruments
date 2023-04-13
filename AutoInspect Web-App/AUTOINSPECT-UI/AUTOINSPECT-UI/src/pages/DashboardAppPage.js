// import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { ref, onValue } from 'firebase/database';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import React, { useState, useLayoutEffect, useEffect } from "react";
import { dbfireStore } from "../firebase2/MyComponent";
// import { db } from "../firebase2/MyComponent";
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  // const instrumentsRef = dbfireStore.collection('instruments');
  // const [instruments = [], loading, error] = useCollectionData(
  //   instrumentsRef.select('instrument_label'),
  //   { idField: 'id' }
  // );
  // const [chartData, setChartData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const snapshot = await dbfireStore.collection('Instruments').get();
  //     const data = snapshot.docs.map((doc) => ({
  //       label: doc.data().label,
  //       value: doc.data().value,
  //     }));
  //     setChartData(data);
  //   };
  // }, []);

  // const faultyInstruments = await dbfireStore.collection('instruments').where('instrument_label', '==', 'faulty').get();
  // fetchData();

  // DATA PROCESSING FOR PIE CHART
//   const [chartData, setChartData] = useState([]);
// // defect_count
//   useEffect(() => {
//     const dbRef = ref(db, 'faultLog');
//     onValue(dbRef, (snapshot) => {
//       const records = snapshot.val();
//       const counts = records.reduce((acc, curr) => {
//         const { classification, defectCount } = curr;
//         acc[classification] = (acc[classification] || 0) + defectCount;
//         return acc;
//       }, {});
//       const chartData = Object.entries(counts).map(([label, value]) => ({ label, value }));
//       setChartData(chartData);
//     });
//   }, []);
  // console.log(chartData);


  // OLD
  const [numFaultyDocs, setnumFaultyDocs] = useState('0');
  const [numnonFaultyDocs, setnonnumFaultyDocs] = useState('0'); 
  const [totalDocs, settotalDocs] = useState('0'); 


  const myCollection = collection(dbfireStore, "Instruments");

  const faultyDocsQuery = query(myCollection, where("instrument_label", "==", "Faulty"));
  const nonfaultyDocsQuery = query(myCollection, where("instrument_label", "==", "Non-Faulty"));

  getDocs(myCollection).then((querySnapshot) => {
    settotalDocs(querySnapshot.size)
    // const numDocuments = querySnapshot.size;
    console.log(`Total number of documents in 'Instruments' collection: ${totalDocs}`);
  });

  // Use the getDocs function to fetch the documents that match the query
  getDocs(faultyDocsQuery)
    .then((querySnapshot) => {
      // Get the number of documents that match the query
      //  numFaultyDocs = querySnapshot.size;
       setnumFaultyDocs(querySnapshot.size);

      // Log the number of faulty documents to the console
      console.log(`Number of faulty documents: ${numFaultyDocs}`);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

    getDocs(nonfaultyDocsQuery)
    .then((querySnapshot) => {
      // Get the number of documents that match the query
      //  numFaultyDocs = querySnapshot.size;
      setnonnumFaultyDocs(querySnapshot.size);

      // Log the number of faulty documents to the console
      console.log(`Number of non faulty documents: ${numnonFaultyDocs}`);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });


  // DATA PROCESSING FOR BAR GRAPH

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



  // --
    const chartData = Object.keys(FaultCounts).map((fault) => ({
      label: fault,
      value: FaultCounts[fault],
    }));
  // console.log(data);
  // console.log(mydata.length);

  // const data2 = Object.keys(faultCounts).map((fault) => ({
  //   label: fault,
  //   value: faultCounts[fault],
  // }));




  const itemData = [
    {
      img: 'http://localhost:3000/assets/images/products/product_1.jpg',
      title: 'Corrosion - Scissors',
      size: '2.2mm',
    },
    {
      img: 'http://localhost:3000/assets/images/products/product_2.jpg',
      title: 'Crack - Scissors',
      size: '3.6mm',
    },
    {
      img: 'http://localhost:3000/assets/images/products/product_3.jpg',
      title: 'Corrosion - Tweezers',
      size: '2.8mm',
    },
    {
      img: 'http://localhost:3000/assets/images/products/product_4.jpg',
      title: 'Corrosion - Tweezers',
      size: '2.8mm',
    },
  ];
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | AutoInspect </title>
      </Helmet>

      {/* <Link href="http://localhost:3000/dashboard/products" underline="hover">
        {'See more'}
      </Link> */}

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>


        {/* <ImageList sx={{ width: 950, height: 340 }} cols={4} >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={<span>size: {item.size}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList> */}
        {/* <Typography variant="h6" sx={{ mb: 5 }}>
        <Link href="http://localhost:3000/dashboard/products" underline="hover">
          {'  See more'}
        </Link>
        </Typography> */}



        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Instruments Scanned" total={totalDocs} icon={'carbon:scalpel'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Faulty Instruments" total= {numFaultyDocs} color="info" icon={'material-symbols:disabled-by-default'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Non-Faulty Instruments" total={numnonFaultyDocs} color="warning" icon={'icon-park-solid:check-correct'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Fault Types" total={7} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Fault Log"
              subheader="(+43%) than last scan"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
              ]}
              chartData={[
                {
                  name: 'Pores',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Cracks',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Corrosion',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits

              title="Current Defects"
              // chartData={chartData}
              chartData={[
                // { label: 'Faulty', value: 9 },
                // { label: 'Non-Faulty', value: 1 },
                { label: 'Faulty', value: numFaultyDocs },
                { label: 'Non-Faulty', value: numnonFaultyDocs },
                // { label: 'Pores', value: 1443 },
                // { label: 'Tucks', value: 4443 },
              ]}
              chartColors={[
                theme.palette.error.main,
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Defect Types"
              // chartData={[
              //   { label: 'Corrosion', value: 4 },
              //   { label: 'Cracks', value: 9 },
              //   { label: 'Pores', value: 7 },
              //   { label: 'Tucks', value: 2 },
              //   { label: 'Scratch', value: 3 },
              //   // { label: 'Germany', value: 580 },
              //   // { label: 'South Korea', value: 690 },
              //   // { label: 'Netherlands', value: 1100 },
              //   // { label: 'United States', value: 1200 },
              //   // { label: 'United Kingdom', value: 1380 },
              // ]}
            // subheader="(+43%) than last year"
            chartData={chartData}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
