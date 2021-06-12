import Head from 'next/head'
import Image from 'next/image'
import styles from './Header.module.css'

export default function Header(props) {

  return (
    <div className={styles.container}>
      <header>
          <a href="#" className={styles.headerTitle}>STROLLIN</a>
          <span>
              <a href="#">Home</a>
              <a href="#">Features</a>
              <a href="#">About us</a>
              <a href="#">FAQ</a>
              <a href="#">Partner</a>
              <a href="#" className={styles.headerDownload}>Download now</a>
          </span>
      </header>
      <div className={styles.socialNetwork}>
        <span>Follow us on our socials network to donʼt miss our update</span>
        <span>
          <a href="#">Instagram</a>
          <a href="#">Tweeter</a>
          <a href="#">Facebook</a>
        </span>
      </div>
    </div>
  )
}
