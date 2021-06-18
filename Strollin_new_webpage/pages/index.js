import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import PartnerArea from '../component/PartnerArea';
import LoginArea from '../component/LoginArea';
import FeaturesArea from '../component/FeaturesArea';
import Header from '../component/Header';
import DownloadArea from '../component/DownloadArea';
import AboutUsArea from '../component/AboutUsArea';
import FaqArea from '../component/FaqArea';
import PartnerLoginArea from '../component/PartnerLoginArea';
import ApkInstallArea from '../component/ApkInstallArea';

/*export async function getStaticProps() {
  // Call an external API endpoint to get posts
  //const res = await fetch('https://.../posts')
  //const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      test : "test props",
    },
  }
}*/


export async function getServerSideProps() {
  // Fetch data from external API
  //const res = await fetch(`https://.../data`)
  //const data = await res.json()

  // Pass data to the page via props
  return { props: { test: "test server" } }
}

export default function Home(props) {



  return (
    <div className={styles.container}>
      <Header/>

      <main className={styles.main}>
        <LoginArea/>
        {/* <p>{props.test}</p> */}
        <PartnerArea/>
        <FeaturesArea/>
        <DownloadArea/>
        <AboutUsArea/>
        <FaqArea/>
        <PartnerLoginArea/>
        <ApkInstallArea/>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
