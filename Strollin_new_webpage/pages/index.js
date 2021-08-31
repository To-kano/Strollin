import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import PartnerArea from '../component/PartnerArea';
import RegisterArea from '../component/RegisterArea';
import FeaturesArea from '../component/FeaturesArea';
import Header from '../component/Header';
import DownloadArea from '../component/DownloadArea';
import AboutUsArea from '../component/AboutUsArea';
import FaqArea from '../component/FaqArea';
import LoginArea from '../component/LoginArea';
import ApkInstallArea from '../component/ApkInstallArea';
import Footer from '../component/Footer';

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
        <RegisterArea/>
        {/* <a href='#'>{props.test}</a> */}
        <FeaturesArea/>
        <PartnerArea/>
        <DownloadArea/>
        <AboutUsArea/>
        {/* <FaqArea/>
        <LoginArea/>
        <ApkInstallArea/> */}

      </main>
        <Footer/>
    </div>
  )
}