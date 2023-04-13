// import React from "react";
// import { ref, onValue } from "firebase/database"
// import { Table } from "react-bootstrap";
// import StartFirebase from "../../_mock/firebaseConfig/index";


// const db = StartFirebase();

// export class Realtimedata extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             tableData: []
//         }
//     }

//     componentDidMount() {
//         const dbRef = ref(db, 'Details');

//         onValue(dbRef, (snapshot) => {
//             const records = [];
//             snapshot.forEach(childSnapshot => {
//                 const keyName = childSnapshot.key;
//                 const data = childSnapshot.val();
//                 records.push({ "key": keyName, "data": data });
//             });
//             this.setState({ tableData: records });
//         });
//     }

//     render() {
     
//         return (
        
//             <Table>
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Instrument Type</th>
//                         <th>Fault Type</th>
//                         <th>Fault Size</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {this.state.tableData.map((row, index) => {
//                         return (
//                             <tr>
//                                 <td>{index}</td>
//                                 <td>{row.data.InstrumentType}</td>
//                                 <td>{row.data.FaultType}</td>
//                                 <td>{row.data.FaultSize}</td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </Table>
//         )
//     }
// }
