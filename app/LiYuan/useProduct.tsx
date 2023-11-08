'use client'
import { addDoc, collection, getDocs,deleteDoc,updateDoc,doc, getFirestore, orderBy, query } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";
import { Product } from "../_settings/interfaces";


function useProducts() {
  const db = getFirestore(app);
    // const [products, setProducts] = useState<{ desc: string, price: number }[]>([
  // ]);
  const [products, setProducts] = useState<Product[]>([]);

  const [updated, setUpdated] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // fecthData();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // let data: { desc: string, price: number }[] = [];
      let data: Product[] = [];
      const querySnapshot = await getDocs(query(collection(db, "ChengYuan"), orderBy("type")));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id,desc: doc.data().desc, price: doc.data().price , type:doc.data().type, res_name:doc.data().res_name })
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

  async function deleteProduct(id: string) {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "ChengYuan", id));
      setUpdated((currentValue) => currentValue + 1)
    }
    catch (error) {
      console.error(error);
    }

  }
    // async function updateProduct(product: { id: string, desc: string, price: number }) {
      async function updateProduct(product: Product)  {
    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, "ChengYuan", product.id),
        { desc: product.desc, price: product.price });
      setUpdated((currentValue) => currentValue + 1)
    }
    catch (error) {
      console.error(error);
    }

  }
  
  return [products, setProducts, addProduct,deleteProduct, updateProduct, isLoading] as const;
}
export default useProducts;