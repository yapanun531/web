import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";
import { Store } from "../_settings/interfaces";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React from "react";

export default function SetAccounts() {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [updated, setUpdated] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [accounts, setAccounts] = useState<Store[]>([]);

    useEffect(() => {
        async function fetchData() {
          let data: Store[] = [];
          const querySnapshot = await getDocs(collection(db, "storeAccount"));
          querySnapshot.forEach((doc) => {
            data.push({ id:doc.id,name: doc.data().name, account:doc.data().account, password: doc.data().password })
          });
          setAccounts(() => [...data]);
        }
        fetchData();
      }, [db]);
    

    async function addAccount(account: Store) {
        const docRef = await addDoc(collection(db, "storeAccount"),
        { name: account.name, account: account.account, password: account.password });
        console.log("Document written with ID: ", docRef.id);
        setUpdated((currentValue) => currentValue + 1)
    }

    async function deleteAccount(id: string) {
        try {
            const db = getFirestore(app);
            await deleteDoc(doc(db, `storeAccount`, id));
            setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
            console.error(error);
        }

    }
    async function updateAccount(account: Store) {
        try {
            const db = getFirestore(app);
            await updateDoc(doc(db, `storeAccount`, 'R7CgLFZ07dBeAaPbJ4Vb'),
            { name: account.name, account: account.account, password: account.password });
            setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
            console.error(error);
        }

    }

    return { accounts, addAccount, deleteAccount, updateAccount, isLoading} as const;

}
