import Head from 'next/head'
import { DynaPuff, Comfortaa } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const puff = DynaPuff({ subsets: ['latin'], weight: ['400'] })
const comfort = Comfortaa({ subsets: ['latin'], weight: ['700'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>ArtiNFT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <p className={puff.className} style={{ fontSize: "60px" }}>Arti</p>
          <p className={puff.className} style={{ fontSize: "60px", color: "#0B2447" }}>NFT</p>
        </header>
        <div className={styles.main_body}>
          <p className={comfort.className} style={{ fontSize: "45px" }}> CREATE NFT's with WORDS</p>
          <br />
          <br />
          <p className={comfort.className} style={{ fontSize: "25px" }}>ArtiNFT is a blockchain tool that lets you create NFTs from a text or description </p>
          <br />
          <p className={comfort.className} style={{ fontSize: "25px" }}>using stable diffusion text-to-image model API from StabilityAI.</p>
        </div>
      </main>
    </>
  )
}
