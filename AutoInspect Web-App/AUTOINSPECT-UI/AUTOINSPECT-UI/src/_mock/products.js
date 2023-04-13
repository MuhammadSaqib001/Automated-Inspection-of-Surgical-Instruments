import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { ref, getDownloadURL, listAll } from "firebase/storage";
// import firebase from 'firebase/app';
// import  { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


// import { storage }  from '../firebase2/MyComponent';
import { dbfireStore } from '../firebase2/MyComponent';


// const PRODUCTS_COUNT = 8;
// // const [totalDocuments, setTotalDocuments] = useState(0);
// const PRODUCT_NAME = [
//   'Corrosion - Scissors',
//   'Crack - Scissors',
//   'Corrosion - Tweezers',
//   'Corrosion - Needle Holders',
//   'Pores - Wax Probes',
//   'Crack - Scissors',
//   'Crack - Scissors',
//   'Corrosion - Miscellaneous',
// ];
const PRODUCT_COLOR = [];
// '#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'

const products = [];
// const imagesRef = ref(storage, 'images/');

// async function fetchProductImages() {
//   const storageRef = ref(storage, 'images');
//   const imageUrls = [];
//   try {
//     const result = await listAll(storageRef);

//     await Promise.all(
//       result.items.map(async (item) => {
//         const url = await getDownloadURL(item);
//         imageUrls.push({ id: item.name, url });
//       })
//     );

//     return imageUrls;
//   }
//   catch (error) {
//     // console.log("EROROR");
//     console.error("Error fetching product images from Firebase Storage:", error);
//     return [];
//   }
// }

async function fetchProductImages() {
  const instrumentsRef = collection(dbfireStore, 'Instruments');
  const imageUrls = [];

  try {
    const snapshot = await getDocs(instrumentsRef);

    snapshot.forEach((doc) => {
      const imageUrl = doc.data().instrument_pic;
      const instrumentLabel = doc.data().instrument_label;
      const faultTypeCount = doc.data().instruments_fault_types.length;
      // const instrumentID = doc.data().instrument_id;
      imageUrls.push({ id: doc.id, url: imageUrl, label: instrumentLabel, count: faultTypeCount });
    });

    const totalDocuments = snapshot.size;
    console.log("Total number of documents in Instruments collection:", totalDocuments);

    return imageUrls;
  } catch (error) {
    console.error("Error fetching product images from Cloud Firestore:", error);
    return [];
  }
}


async function generateProducts() {
  const imageUrls = await fetchProductImages();
  console.log(imageUrls);
  for (let i = 0; i < imageUrls.length; i += 1) {
    
    const setIndex = i + 1;
    const productCover = imageUrls[i % imageUrls.length];
    // imageUrls.find((image) => image.id === `product_${setIndex}.jpg` || imageUrls[0]);
    const product = {
      id: faker.datatype.uuid(),
      cover: productCover?.url || '',
      name: `Fault Count: ${productCover?.count || ''} `,
      // \n Instrument ID: ${productCover?.id || ''}
      // name: `Count: ${productCover?.count || ''} Instrument ID: ${productCover?.id || ''} `,
      // PRODUCT_NAME[i % PRODUCT_NAME.length],
      colors: `Product ID: ${productCover?.id || ''} `,
        // (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        // (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        // (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        // (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        // (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
        // (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
        // PRODUCT_COLOR,
      status: productCover?.label || '',
    };
    products.push(product);
    // console.log(product);
  }
}

generateProducts();

export default products;
