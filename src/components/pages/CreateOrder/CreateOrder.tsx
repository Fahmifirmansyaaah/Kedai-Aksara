import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Icart, Imenu } from "../../../types/order";
import { getMenus } from "../../../services/menu.service";
import styles from "./CreateOrder.module.css";
import { filters, tables } from "./CreateOrder.constans";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import { createOrder } from "../../../services/order.service";

const CreateOrder = () => {
  const [menus, setMenus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [carts, setCarts] = useState<Icart[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const result = await getMenus(searchParams.get("category") as string);
      setMenus(result.data);
    };
    fetchMenu();
  }, [searchParams.get("category")]);

  const handleAddToCart = (type: string, id: string, name: string) => {
    const itemIsInCart = carts.find((item: Icart) => item.menuId === id);
    if (type === "increment") {
      if (itemIsInCart) {
        setCarts(carts.map((item: Icart) => (item.menuId === id ? { ...item, quantity: item.quantity + 1 } : item)));
      } else {
        setCarts([...carts, { menuId: id, name, quantity: 1 }]);
      }
    } else {
      if (itemIsInCart && itemIsInCart.quantity <= 1) {
        setCarts(carts.filter((item: Icart) => item.menuId !== id));
      } else {
        setCarts(carts.map((item: Icart) => (item.menuId === id ? { ...item, quantity: item.quantity - 1 } : item)));
      }
    }
  };

  const navigate = useNavigate();

  const handleOrder = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      customerName: form.customerName.value,
      tableNumber: form.tableNumber.value,
      cart: carts.map((item: Icart) => ({
        menuItemId: item.menuId,
        quantity: item.quantity,
        notes: "",
      })),
    };
    await createOrder(payload);
    return navigate("/orders");
  };
  return (
    <main className={styles.create}>
      <div className={styles.menu}>
        <h1>Explore Our Best Menu</h1>

        <div className={styles.filter}>
          {filters.map((filter) => (
            <Button
              type="button"
              color={(!searchParams.get("category") && filter === "All") || filter === searchParams.get("category") ? "primary" : "secondary"}
              key={filter}
              onClick={() => setSearchParams(filter === "All" ? {} : { category: filter })}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className={styles.list}>
          {menus.map((item: Imenu) => (
            <div className={styles.item} key={item.id}>
              <img src={item.image_url} alt={item.name} className={styles.image} />
              <h2>{item.name}</h2>
              <div className={styles.bottom}>
                <p className={styles.price}>${item.price}</p>
                <Button onClick={() => handleAddToCart("increment", `${item.id}`, `${item.name}`)}>Add To Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className={styles.form} onSubmit={handleOrder}>
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Customer Information</h2>
            <Link to="/orders">
              <Button color="secondary">Cancel</Button>
            </Link>
          </div>
          <div className={styles.input}>
            <Input id="name" label="name" name="customerName" placeholder="Insert Name" required />
            <Select id="tables" label="Table Number" name="tableNumber" options={tables} required />
          </div>
        </div>
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Current Order</h2>
          </div>
          {carts.length > 0 ? (
            <div className={styles.cart}>
              {carts.map((item: Icart) => (
                <div className={styles.item} key={item.menuId}>
                  <h4 className={styles.name}>{item.name}</h4>
                  <div className={styles.quantity}>
                    <Button type="button" onClick={() => handleAddToCart("decrement", `${item.menuId}`, `${item.name}`)} color="secondary">
                      -
                    </Button>
                    <div className={styles.number}>{item.quantity}</div>
                    <Button type="button" onClick={() => handleAddToCart("increment", `${item.menuId}`, `${item.name}`)}>
                      +
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="submit">Order</Button>
            </div>
          ) : (
            <div className={styles.cart}>
              <h4>Cart is Empty</h4>
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateOrder;
