import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Button from "../Button";
import { removeLocalStorage } from "../../../utils/storage";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeLocalStorage("auth");
    return navigate("/login");
  };
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>Dashboard</h2>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/orders" className={styles.link}>
          Order List
        </NavLink>
        <NavLink to="/create" className={styles.link}>
          Pesanan
        </NavLink>
        <Button color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;
