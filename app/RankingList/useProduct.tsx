import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/app/_firebase/Config"
import { useEffect, useState } from "react";
import { Product } from "../_settings/interfaces";

export default function useProducts() {
    const db = getFirestore(app);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [restaurants, setRestaurants] = useState<{ [key: string]: string[] }>({});
    const [selectedRestaurant, setSelectedRestaurant] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            const collections = ["LiYuan", "ChengYuan", "XinYuan", "FuYuan"];
            const restaurantLists: { [key: string]: string[] } = {};
            const menuPromises: any[] = []; //等待異步

            for (const collectionName of collections) {
                const querySnapshop = await getDocs(collection(db, collectionName));
                const restaurantList: string[] = [];

                for (const shop of querySnapshop.docs) {
                    const querySnapshotMenu = await getDocs(collection(db, `${collectionName}/${shop.id}/menu`));
                    restaurantList.push(shop.id);

                    for (const menu of querySnapshotMenu.docs) {

                        const menuItem = {
                            id: menu.id,
                            desc: menu.data().desc,
                            price: menu.data().price,
                            type: menu.data().type,
                            res_name: menu.data().res_name,
                        };
                        menuPromises.push(Promise.resolve(menuItem));
                    }
                }
                restaurantLists[collectionName] = restaurantList;
            }
            //使用Promise.all等待所有異步操作完成
            Promise.all(menuPromises).then((menuItemsArrays) => {
                // Concatenate all menu items from different shops
                const allMenuItems = menuItemsArrays.flat();
                // Set the products state with all menu items
                setProducts(allMenuItems);
            })
            //});
            setRestaurants(restaurantLists);
            setIsLoading(false);
        }
        fetchData();
    }, [db]);

    const handleRestaurantClick = async (event: React.SyntheticEvent, collectionName: string) => {
        setSelectedRestaurant(restaurants[collectionName]);
    }

    return { products, handleRestaurantClick, isLoading, selectedRestaurant } as const;

}
