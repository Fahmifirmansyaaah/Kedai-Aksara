import styles from "./Home.module.css";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMenus } from "../../../services/menu.service";
import { Imenu } from "../../../types/order";

const Home = () => {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    const fetchMenu = async () => {
      const result = await getMenus();
      setMenus(result.data);
    };
    fetchMenu();
  });
  return (
    <main>
      <nav className={styles.navbar}>
        <div>
          <a href="" className={styles.logo}>
            Kedai Kopi Aksara
          </a>
        </div>

        <div>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/login">
            <Button className={styles.button}>Login</Button>
          </Link>
        </div>
      </nav>
      <div className={styles.hero} id="home">
        <div className={styles.container}>
          <img src="/cafe.jpg" className={styles.image} alt="hero-section" />
          <h1 className={styles.textHero}> Selamat Datang di Kedai Kopi Aksara</h1>
        </div>
      </div>

      <div className={styles.menu} id="menu">
        <h2>Menu Kami</h2>
        <div className={styles.list}>
          {menus.slice(0, 9).map((item: Imenu) => (
            <div className={styles.item} key={item.id}>
              <img src={item.image_url} alt={item.name} className={styles.image} />
              <h2>{item.name}</h2>
              <div className={styles.bottom}>
                <p className={styles.price}>${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.about} id="about">
        <div className={styles.content}>
          <div className={styles.text}>
            <h2>Tentang Kami</h2>
            <p>
              Kedai Kopi Aksara bukan sekadar tempat ngopi, tapi ruang untuk bertukar cerita. Kami percaya setiap cangkir kopi punya kisah, dan kami ingin jadi bagian dari kisahmu. Dengan bahan
              berkualitas dan suasana yang hangat, kami hadir untuk menemani harimu.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src="/about.jpg" alt="Tentang Kedai Kopi Aksara" className={styles.img} />
          </div>
        </div>
      </div>

      <div>
        <h2 className={styles.footer}>&copy; {new Date().getFullYear()} Kedai Kopi Aksara. All rights reserved.</h2>
      </div>
    </main>
  );
};

export default Home;
