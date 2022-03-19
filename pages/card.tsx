import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Tab } from '@headlessui/react'
import { toSvg } from 'html-to-image'

import Card, { CardPulse } from '../components/Card'
import UidForm from '../components/forms/UidForm'
import { UserProfile } from '../lib/models'
import { ParsedUrlQuery } from 'querystring'

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

      <div className="container mx-auto max-w-xl mt-8 flex flex-col gap-4 items-center">
        {/* UserProfile card 玩家信息卡 */}
        <div className="text-2xl font-thin self-start">Preview</div>
        <Card userProfile={userProfile} ref={cardRef} />

        <div className="flex flex-row w-full justify-between gap-2">
          {/* Uid input form 玩家id输入条 */}
          <UidForm />
          {/* Actions */}
          <div className="flex flex-col gap-2">
            {/* Click to generate image 点击转图片 */}
            <button
              id="svg-generate-button"
              onClick={cardToSvg}
              className={`text-sm uppercase leading-3 text-blue-600 bg-blue-200 dark:bg-blue-300
                hover:text-white hover:bg-blue-400 hover:dark:bg-blue-500 h-8
                py-2 px-4 rounded-md ease-in-out duration-300`}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="border-b w-full"></div>

        {/* Generated 生成结果 */}
        <div className="text-2xl font-thin self-start">Generated</div>
        { imageData !== '' ? (
          <div className="w-full flex flex-col">
            {/* Right click to download image 点击下载图片 */}
            <div className="relative w-full max-w-xl h-64">
              <Image src={imageData} alt="generated user profile card" layout="fill" />
            </div>
            {/* Click to download image 点击下载图片 */}
            <div className="flex flex-row justify-end mt-4">
              <a
                id="genshin-card-svg"
                href={imageData}
                download="genshin-card.svg"
                className={`text-sm uppercase leading-3 text-green-600 bg-green-200 dark:bg-green-300
                  hover:text-white hover:bg-green-400 hover:dark:bg-green-500
                  py-2 px-4 rounded-md ease-in-out duration-300`}
              >
                Download
              </a>
            </div>
          </div>
        ) : <></> }

        <div className="mt-20"></div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query)
  return {
    props: {},
  }
}

function parseUserProfile(query: ParsedUrlQuery) {
  const username = query["username"] || ""
  const uid = Number.parseInt(`${query["uid"]}`) || 0
  const level = Number.parseInt(`${query["level"]}`) || 0
  const daysActive = Number.parseInt(`${query["daysActive"]}`) || 0
  const characterCount = Number.parseInt(`${query["characterCount"]}`) || 0
  const achievements = Number.parseInt(`${query["achievements"]}`) || 0
  const spiralAbyss = query["spiralAbyss"] || ''
}

export default CardPage

