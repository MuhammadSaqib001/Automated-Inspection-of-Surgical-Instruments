// import React from "react";
// import {ref, set, get, update, remove, child} from "firebase/database"
// import { th } from "date-fns/locale";
// import StartFirebase from "../../_mock/firebaseConfig/index";


// export class Crud extends React.Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             db: '',
//             instrtype:'',
//             faultType:'',
//             faultsize:''
//         }
//         this.interface = this.interface.bind(this);
//     }
    
//     componentDidMount(){
//         this.setState({
//             db: StartFirebase()
//         });
        
//     }

//     getAllInputs(){
//         return{
//             instrtype: this.state.instrtype,
//             faultType: this.state.faultType,
//             faultsize: this.state.faultsize
//         }
//     }

//     interface(event){
//         const id = event.target.id;

//         if (id === 'addBtn'){
//             this.insertData();
//         }

//         else if (id === 'updateBtn'){
//             // this.upadateData();
//         }

//         else if (id === 'deleteBtn'){
//             // this.deleteData();
//         }

//         else if (id === 'selectBtn'){
//             // this.selectData();
//         }
//     }

//     insertData(){
//         const db = this.state.db;
//         const data = this.getAllInputs();

//         set(ref(db,`Details/ ${data.instrtype}`),
//         {
//             InstrumentType: data.instrtype,
//             FaultType: data.faultType,
//             FaultSize: data.faultsize
//         }
//         )
        
//         .then(() => {alert('data was added successfully')})
//         .catch((error) => {alert('there was an error details: ' )});

//     }

//     render(){
//         return(
//             <>
//             <label htmlFor={"userbox"}>Enter instrument type
//             <input type='text' id='userbox' value={this.state.instrtype} 
//             onChange={e => {this.setState({instrtype: e.target.value});}}/> </label>
//             <br/>

//             <label htmlFor={"userbox"}>Enter fault type
//             <input type='text' id='userbox' value={this.state.faultType} 
//             onChange={e => {this.setState({faultType: e.target.value});}}/> </label>
//             <br/>

//             <label htmlFor={"userbox"}>Enter fault size
//             <input type='number' id='userbox' value={this.state.faultsize} 
//             onChange={e => {this.setState({faultsize: e.target.value});}}/> </label>
//             <br/>

//             <button id='addBtn' onClick={this.interface}> Add Data</button>
//             <button id='updateBtn' onClick={this.interface}> Update Data</button>
//             <button id='deleteBtn' onClick={this.interface}> Delete Data</button>
//             <button id='selectBtn' onClick={this.interface}> Get Data from DB</button>

//             </>
//         )
//     }
// }