import React, { useState, useLayoutEffect } from "react";
import { ref, onValue } from "firebase/database";
import { Table } from "react-bootstrap";
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { db }  from '../firebase2/MyComponent';
// import { dbfireStore } from '../firebase2/MyComponent';

// ----------------------------------------------------------------------
// const db = StartFirebase();

// function User(){
  
// }
//   // const [t, sett] = useState();
  let al = [];
  const dbRef = ref(db, '/');
  console.log(dbRef);
  onValue(dbRef, (snapshot) => {
    const records = [];
    snapshot.forEach(childSnapshot => {
      const keyName = childSnapshot.key;
      const data = childSnapshot.val();
      records.push({ "key": keyName, "data": data });

    });
    al = records;
    console.log("al global have ");
    console.log(al);
    console.log("al o  have ");
    console.log(al[0]);
  });

 
  
 

//   // useLayoutEffect(() => {
//   //   // check local token or something

//   //   sett("b")
//   // }, []);
//   // console.log(t);
  
  // const user2 = al.map((row) => ({
  //   id: faker.datatype.uuid(),
  //   // avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  //   name: row.data.instrument_name,
  //   company: row.data.defect_name,
  //   isVerified: row.data.defect_count,
  //   status: row.data.classification,
  //   role: sample(['2.0 mm','1.9 mm',]),
  // }));

  // return (user2)

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  // avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: sample(['GUtg42NghjRLnpSCHPoY', '3gzCK9g9T4Qe1OAtEIJk', '0YYSHRxzj1Gs7vz8Yixf', 'WsVGQlhjyszYGmb8qi61', 'f5SYEl1dDjYwXUq4fnyL', 'k7dgXnjqiPS9S4ma9vYq']),
  // sample(['Scissors', 'Scalpel', 'Forceps', 'Needle Holders']),
  company: sample(['3', '2', '1', '6']),
  role: sample(['April 3, 2023', 'April 2, 2023', 'April 13, 2023', 'April 4, 2023']),
  // isVerified: sample(['Faulty']),
  status: sample(['Faulty']),
  
}));
// console.log(user2);
export default users;
