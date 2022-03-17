import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { toSvg } from 'html-to-image'

import Card, { CardPulse } from '../components/Card'
import { UserProfile } from '../lib/models'

function getSampleUserProfile(): UserProfile {
  return {
    username: '洛水居士',
    level: 58,
    uid: 164635231,
    daysActive: 450,
    characterCount: 38,
    achievements: 547,
    spiralAbyss: '12-3',
  }
}

const CardPage: NextPage = () => {
  // Html element reference
  const cardRef = React.useRef(null)
  // Image base64 data
  const [ imageData, setImageData ] = React.useState('')

  // UserProfile 玩家信息
  const userProfile = getSampleUserProfile()

  // Html to svg
  const cardToSvg = React.useCallback(async () => {
    if (cardRef.current === null) return
    const dataUrl = await toSvg(cardRef.current, { cacheBust: true })
    setImageData(dataUrl)
  }, [cardRef])

  return (
    <>
      <Head>
        <title>Profile Generator | GI</title>
      </Head>

      <div className="container mx-auto mt-8 flex flex-col gap-4 items-center">
        {/* UserProfile card 玩家信息卡 */}
        <Card userProfile={userProfile} ref={cardRef} />

        <div className="flex flex-row gap-2">
          {/* Click to generate image 点击转图片 */}
          <button
            onClick={cardToSvg}
            className={`text-sm uppercase leading-3 text-blue-600 bg-blue-200 dark:bg-blue-300
              hover:text-white hover:bg-blue-400 hover:dark:bg-blue-500
              py-2 px-4 rounded-full ease-in-out duration-300`}
          >
            Generate
          </button>
          { imageData !== '' && (
            /* Click to download image 点击下载图片 */
            <a
              href={imageData}
              download="genshin-card.svg"
              className={`text-sm uppercase leading-3 text-green-600 bg-green-200 dark:bg-green-300
                hover:text-white hover:bg-green-400 hover:dark:bg-green-500
                py-2 px-4 rounded-full ease-in-out duration-300`}
            >
              Download
            </a>
          ) }
        </div>

        { imageData !== '' ? (
          /* Right click to download image 点击下载图片 */
          <div className="relative w-full max-w-xl h-64">
            <Image src={imageData} alt="generated user profile card" layout="fill" />
          </div>
        ) : <></> }
      </div>
    </>
  )
}

export default CardPage
