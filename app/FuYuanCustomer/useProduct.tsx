import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";
import { Product } from "../_settings/interfaces";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export default function useProducts() {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [restaurants, setRestaurants] = useState<string[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState('1');

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const querySnapshop = await getDocs(collection(db, "FuYuan"));
            const restaurantList: string[] = [];
            const menuPromises: any[] = []; //等待異步
            //let photo = '鍋貼.jpg';
            for (const shop of querySnapshop.docs) {
                const querySnapshotMenu = await getDocs(collection(db, "FuYuan/" + shop.id + "/menu"));
                restaurantList.push(shop.id);

                for (const menu of querySnapshotMenu.docs) {
                    //if (menu.exists()) {
                    //photo = menu.data().photo ? menu.data().photo : '鍋貼.jpg';
                    //}

                    //const starsRef = ref(storage, photo);
                    //const photoURL = await getDownloadURL(starsRef);

                    const menuItem = {
                        id: menu.id,
                        desc: menu.data().desc,
                        price: menu.data().price,
                        type: menu.data().type,
                        res_name: menu.data().res_name,
                        //photo: photoURL
                    };
                    menuPromises.push(Promise.resolve(menuItem));
                }
            }
            //使用Promise.all等待所有異步操作完成
            Promise.all(menuPromises).then((menuItemsArrays) => {
                // Concatenate all menu items from different shops
                const allMenuItems = menuItemsArrays.flat();
                // Set the products state with all menu items
                setProducts(allMenuItems);
            })
            //});
            setRestaurants(restaurantList);
            setIsLoading(false);
        }
        fetchData();
    }, [db]);

    const handleRestaurantClick = async (event: React.SyntheticEvent, restaurantId: string) => {
        setSelectedRestaurant(restaurantId);
    }

    return { products, handleRestaurantClick, isLoading, restaurants, selectedRestaurant } as const;

}
