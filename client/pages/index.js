import Head from 'next/head'
import { Comfortaa } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header/header.component'
import { useState } from 'react'

const comfort = Comfortaa({ subsets: ['latin'], weight: ['700'] })

export default function Home() {

  const [accountAddress, setAccountAddress] = useState("");
  const [userConnected, setUserConnected] = useState(false);

  return (
    <>
      <Head>
        <title>ArtNFT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header
          accountAddress={accountAddress}
          setAccountAddress={setAccountAddress}
          setUserConnected={setUserConnected}
        />
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
