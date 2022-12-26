import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>News Api</title>
        <meta name="description" content="Developed By Samer Saied" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
 

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/samer.svg"
            alt="Next.js Logo"
            width={200}
            height={75}
            priority
          />
          {/* <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div> */}
        </div>

       
      </main>
    </>
  )
}
