import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";
import { Product } from "../_settings/interfaces";

export default function useProducts() {
    const db = getFirestore(app);
    const [updated, setUpdated] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [restaurants, setRestaurants] = useState<String[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<any>();
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const querySnapshot = await getDocs(collection(db, "FuYuan"));
            const restaurantList: string[] = [];
            const menuPromises: any[] = []; //等待異步

            querySnapshot.forEach(async (shop) => {
                const querySnapshotMenu = await getDocs(collection(db, "FuYuan/" + shop.id + "/menu"));
                if (!restaurantList.includes(shop.id)) {
                    restaurantList.push(shop.id)
                }

                querySnapshotMenu.forEach(async (menu) => {
                    const menuItem = {
                        desc: menu.data().desc,
                        price: menu.data().price,
                        type: menu.data().type,
                        res_name: menu.data().res_name
                    };
                    menuPromises.push(Promise.resolve(menuItem));
                })

                //使用Promise.all等待所有異步操作完成
                Promise.all(menuPromises).then((menuItemsArrays) => {
                    // Concatenate all menu items from different shops
                    const allMenuItems = menuItemsArrays.flat();
                    // Set the products state with all menu items
                    setProducts(allMenuItems);

                })
            });
            setRestaurants(restaurantList);
            setIsLoading(false);
        }
        fetchData();
    }, [db, updated]);

    //利用子集合menu中的res_name與doc.id一致，找到正確餐廳修改其collection中的資料
    async function addProduct(product: Product, res_name: string) {
        const docRef = await addDoc(collection(db, `FuYuan/${res_name}/menu`),
            { desc: product.desc, price: product.price, type: product.type, res_name: product.res_name });
        console.log("Document written with ID: ", docRef.id);
        setUpdated((currentValue) => currentValue + 1)
    }

    async function deleteProduct(id: string, res_name: string) {
        try {
            const db = getFirestore(app);
            await deleteDoc(doc(db, `FuYuan/${res_name}/menu`, id));
            setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
            console.error(error);
        }

    }
    async function updateProduct(product: Product, res_name: string) {
        try {
            const db = getFirestore(app);
            await updateDoc(doc(db, `FuYuan/${res_name}/menu`, product.id),
                { desc: product.desc, price: product.price, type: product.type, res_name: product.res_name });
            setUpdated((currentValue) => currentValue + 1)
        }
        catch (error) {
            console.error(error);
        }

    }


    const handleRestaurantClick = async (event: React.SyntheticEvent, restaurantId: String) => {
        setSelectedRestaurant(restaurantId);
    }

    return { products, addProduct, deleteProduct, updateProduct, handleRestaurantClick, isLoading, restaurants, selectedRestaurant };

}
