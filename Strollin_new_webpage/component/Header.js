import Head from 'next/head';
import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header(props) {

  return (
    <div className={styles.container}>
      <header>
          <a href="#" className={styles.headerTitle}>STROLLIN</a>
          <span>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/FaqScreen">
                <a>FAQ</a>
              </Link>
              <Link href="/PartnerScreen">
                <a>Partner</a>
              </Link>
              <Link href="/TutoApkScreen">
                <a>How to install</a>
              </Link>
              <Link href="/RegisterScreen">
                <a>Register</a>
              </Link>
              <Link href="/LoginScreen">
                <a>Login</a>
              </Link>
              <a href="/apk/Strollin.apk" className={styles.headerDownload}>Download now</a>
          </span>
      </header>
      <div className={styles.socialNetwork}>
        <span>Follow us on our socials network to donʼt miss our update</span>
        <span>
        
          <a href="https://www.instagram.com/TokanoFR/" target="_blank" title="Follow us on Instagram!">Instagram</a>
          <a href="https://twitter.com/StrollinApp" target="_blank" title="Follow us on Twitter!">Twitter</a>
          <a href="https://www.facebook.com/pg/Strollin-109109370759775/posts/?ref=page_internal" target="_blank"
             title="Like us on Facebook!">Facebook</a>
        </span>
      </div>
    </div>
  )
}
