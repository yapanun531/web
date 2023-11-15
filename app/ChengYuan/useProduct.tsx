import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";
import { Product } from "../_settings/interfaces";

export default function useProducts() {
    const db = getFirestore(app);
    const [updated, setUpdated] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            let data: Product[] = [];
            const querySnapshot = await getDocs(collection(db, "ChengYuan"));
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, desc: doc.data().desc, price: doc.data().price, type: doc.data().type, res_name: doc.data().res_name })
                console.log(`${doc.id} => ${doc.data()}`);
            });
            setProducts(() => [...data]);
            setIsLoading(false);
        }
        fetchData();
    }, [db, updated]);

    async function addProduct(product: Product) {
        const docRef = await addDoc(collection(db, "ChengYuan"),
            { desc: product.desc, price: product.price, type: product.type, res_name: product.res_name });
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
    async function updateProduct(product: Product) {
        try {
            const db = getFirestore(app);
            await updateDoc(doc(db, "ChengYuan", product.id),
                { desc: product.desc, price: product.price, type: product.type, res_name: product.res_name });
            setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
            console.error(error);
        }

    }

    return [products, addProduct, deleteProduct, updateProduct, isLoading] as const;

}