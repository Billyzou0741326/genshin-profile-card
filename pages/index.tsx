import type { GetServerSideProps, NextPage } from 'next'
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

  // Background style
  const backgroundStyle = {
    backgroundImage: 'url(/97b7049e-69d7-4035-bb34-8b2d47d7a209.jfif)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backgroundSize: 'cover',
    backgroundBlendMode: 'lighten',
    zIndex: -50,
  }

  return (
    <div className="relative max-w-screen min-h-screen">
      <Head>
        <title>Profile Generator | GI</title>
      </Head>

      {/* Background */}
      <div className="absolute inset-0 min-h-screen bg-repeat" style={backgroundStyle} />

      <div className="relative p-8 w-full h-full flex flex-col gap-4 items-center">

        {/* Top */}
        <div className="flex flex-row gap-x-6 w-full">
          {/* User Profile 用户信息 */}
          <div className="flex flex-col gap-4 w-full w-64 px-auto justify-center">
            {/* User Avatar */}
            <div className="rounded-full w-64 h-64 bg-white shadow-md"></div>
            {/* Username */}
            <div className="flex flex-col gap-1 items-start w-full">
              <span className="text-3xl">洛水居士</span>
              <div className="border-b"></div>
              <span className="text-md font-thin">UID: 164635231</span>
              <span className="text-xs">Lv. 58</span>
            </div>
          </div>

          {/* Genshin Stats 玩家信息卡 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-blue-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-blue-400">Genshin Stats</span>
              </div>
            </div>
            <div className="h-full rounded-md shadow-md bg-blue-200 border border-blue-600 opacity-70"></div>
          </div>

          {/* Character preview 角色预览 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-purple-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-purple-400">Characters</span>
              </div>
            </div>
            <div className="h-full rounded-md shadow-md bg-purple-200 border border-purple-600 opacity-70"></div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b w-full border-gray-400 my-4"></div>

        {/* Bottom */}
        <div className="flex flex-row w-full gap-x-6">
          {/* Exploration progress 探索进度 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-orange-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-orange-400">Exploration</span>
              </div>
            </div>
            <div className="h-72 rounded-md shadow-md bg-orange-200 border border-orange-600 opacity-70"></div>
          </div>

          {/* Teapot info 茶壶 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-green-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-green-400">Teapot</span>
              </div>
            </div>
            <div className="h-72 rounded-md shadow-md bg-green-200 border border-green-600 opacity-70"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPage
