import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Icart } from "../../../types/order";
import { getMenus } from "../../../services/menu.service";
import styles from "./CreateOrder.module.css";
import { filters } from "./CreateOrder.constans";
import Button from "../../ui/Button";

const CreateOrder = () => {
  const [menus, setMenus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [carts, setCarts] = useState<Icart[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getMenus(searchParams.get("category") as string);
      setMenus(result.data);
    };
    fetchOrder();
  }, [searchParams.get("category")]);
  return (
    <main className={styles.create}>
      <div className={styles.menu}>
        <h1>Explore Our Best Menu</h1>
        <div className={styles.filter}>
          {filters.map((filter) => (
            <Button type="button" color={(!searchParams.get("category") && filter === "All") || filter === searchParams.get("category") ? "primary" : "secondary"} key={filter} onClick={() => setSearchParams(filter === 'All' ? {} : {category: filter})}>
              {filter}
            </Button>
          ))}
        </div>
        <div className={}></div>
      </div>
    </main>
  );
};

export default CreateOrder;
