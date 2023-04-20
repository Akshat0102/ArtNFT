import Head from 'next/head'
import { Comfortaa, DynaPuff } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const comfort = Comfortaa({ subsets: ['latin'], weight: ['700'] })
const puff = DynaPuff({ subsets: ['latin'], weight: ['400'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>ArtNFT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <p className={puff.className} style={{ fontSize: "60px", color: "white" }}>
            Art<span style={{ color: "#0B2447" }}>NFT</span>
          </p>
        </div>
        <div className={styles.main_body}>
          <p className={comfort.className} style={{ fontSize: "45px", color: "white" }}> CREATE NFT's with AI</p>
          <p className={comfort.className} style={{ fontSize: "25px", color: "white" }}>
            ArtNFT is a blockchain tool that lets you create NFTs from a text or description
            <br /> using stable diffusion text-to-image model API from StabilityAI.
          </p>
        </div>
      </main>
    </>
  )
}
