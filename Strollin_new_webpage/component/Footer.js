import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Header(props) {

  return (
      <footer className={styles.footer}>
        <div className={styles.footerImg}/>
        <div className={styles.list}>
          <h3>Company</h3>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/FaqScreen">
            <a>FAQ</a>
          </Link>
          <Link href="/PartnerScreen">
            <a>Partner</a>
          </Link>
          <Link href="/RegisterScreen">
            <a>Register</a>
          </Link>
          <Link href="/LoginScreen">
            <a>Login</a>
          </Link>
        </div>

        <div className={styles.list}>
          <h3>Region</h3>
          <a href='#'>French</a>
          <a href='#'>English</a>
          <a href='#'>Spannish</a>
          <a href='#'>Turkish</a>
        </div>

        <div className={styles.list}>
          <h3>Help</h3>
          <a href='#'>Help center</a>
          <a href='#'>Contact support</a>
          <a href='#'>Instruction</a>
          <a href='#'>How to install</a>
        </div>
      </footer>
  )
}
