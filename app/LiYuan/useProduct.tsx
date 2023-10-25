'use client'
import { addDoc, collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";


function useProducts() {
  const db = getFirestore(app);
  const [products, setProducts] = useState<{ desc: string, price: number, type: string}[]>([
  ])

  const [updated, setUpdated] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // fecthData();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      let data: { desc: string, price: number ,type: string }[] = [];
      const querySnapshot = await getDocs(query(collection(db, "ChengYuan"), orderBy("type")));
      querySnapshot.forEach((doc) => {
        data.push({ desc: doc.data().desc, price: doc.data().price ,type:doc.data().type })
        console.log(`${doc.id} => ${doc.data()}`);
      });
      setProducts(() => [...data]);
      setIsLoading(false);
    }
    fetchData();
  }, [db,updated]);

  async function addProduct(product: { desc: string, price: number,type: string }) {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "LiYuan2"),
      { desc: product.desc, price: product.price, type:product.type });
    console.log("Document written with ID: ", docRef.id);
    setUpdated((currentValue) => currentValue + 1)
  }
  
  return [products, setProducts, addProduct, isLoading] as const;
}
export default useProducts;