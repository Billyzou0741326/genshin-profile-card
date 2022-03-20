import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { toSvg } from 'html-to-image'
import getRawBody from 'raw-body'
import * as yup from 'yup'

import { cardSchema } from '../lib/validators/card'


const CardPage: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Html element reference
  const cardRef = React.useRef(null)
  // Image base64 data
  const [ imageData, setImageData ] = React.useState('')

  // UserProfile 玩家信息
  const userInfo: yup.InferType<typeof cardSchema> = props.userInfo
  //console.log(userInfo)

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

  //React.useEffect(() => {
  //  cardToSvg()
  //}, [])

  return (
    <div className="relative max-w-screen min-h-screen">
      <Head>
        <title>Profile Generator | GI</title>
      </Head>

      {/* Background */}
      <div className="absolute inset-0 min-h-screen bg-repeat" style={backgroundStyle} />

      <div className="relative p-8 w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-4">

        {/* Left */}
        <div className="flex flex-col gap-6 w-full">
          {/* User Profile 用户信息 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-blue-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-blue-400">User Profile</span>
              </div>
            </div>
            {/* Content */}
            <div className="h-40 flex flex-row gap-4 items-center p-4 w-full rounded-xl shadow-md bg-blue-50 border border-blue-400 opacity-80">
              {/* User avatar */}
              <div className="rounded-full w-28 h-28 inline-block bg-white shadow-md"></div>
              {/* User info */}
              <div className="mr-2 flex flex-col">
                <span className="text-4xl font-thin text-blue-500 mb-2">{ userInfo.hoyolab.nickname }</span>
                <span className="text-lg font-medium text-blue-400">{ `UID: ${userInfo.hoyolab.uid}` }</span>
                <span className="text-lg font-medium text-blue-400">{ `Lv. ${userInfo.hoyolab.level}` }</span>
              </div>
              {/* Space */}
              <div className="grow"></div>
              {/* Stats card */}
              <div className="text-center h-28 flex flex-row divide-x rounded-3xl shadow-md bg-gray-50">
                <div className="basis-1/3 flex-none flex flex-col px-8 py-4 gap-2">
                  <span className="text-md font-semibold tracking-widest text-blue-300 whitespace-nowrap">Days Active</span>
                  <span className="text-5xl font-thin text-blue-500">{ userInfo.stats.days_active }</span>
                </div>
                <div className="basis-1/3 flex-none flex tracking-widest flex-col px-8 py-4 gap-2">
                  <span className="text-md font-semibold text-blue-300 whitespace-nowrap">Characters</span>
                  <span className="text-5xl font-thin text-blue-500">{ userInfo.stats.characters }</span>
                </div>
                <div className="basis-1/3 flex-none flex tracking-widest flex-col px-8 py-4 gap-2">
                  <span className="text-md font-semibold text-blue-300 whitespace-nowrap">Spiral Abyss</span>
                  <span className="text-5xl font-thin text-blue-500">{ userInfo.stats.spiral_abyss }</span>
                </div>
              </div>
            </div>
          </div>

          {/* Genshin Stats 玩家信息卡 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-green-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-green-400">Genshin Stats</span>
              </div>
            </div>
            {/* Content */}
            <div className="h-56 grid grid-cols-5 text-center items-center p-2 w-full rounded-xl shadow-md bg-green-50 border border-green-400 opacity-80">
              {/* Common chests 普通宝箱 */}
              <div className="basis-1/5 flex-none flex flex-col px-8 py-4 gap-2">
                <span className="text-xs text-green-300 whitespace-nowrap">Common chests</span>
                <span className="text-4xl text-green-500">{ userInfo.stats.common_chests }</span>
              </div>
              {/* Exquisite chests 精致宝箱 */}
              <div className="basis-1/5 flex flex-col px-8 py-4 gap-2">
                <span className="text-xs text-green-300 whitespace-nowrap">Exquisite chests</span>
                <span className="text-4xl text-green-500">{ userInfo.stats.exquisite_chests }</span>
              </div>
              {/* Precious chests 珍贵宝箱 */}
              <div className="basis-1/5 flex flex-col px-8 py-4 gap-2">
                <span className="text-xs text-green-300 whitespace-nowrap">Precious chests</span>
                <span className="text-4xl text-green-500">{ userInfo.stats.precious_chests }</span>
              </div>
              {/* Luxurious chests 华丽宝箱 */}
              <div className="basis-1/5 flex flex-col px-8 py-4 gap-2">
                <span className="text-xs text-green-300 whitespace-nowrap">Luxurious chests</span>
                <span className="text-4xl text-green-500">{ userInfo.stats.luxurious_chests }</span>
              </div>
              {/* Remarkable chests 奇馈宝箱 */}
              <div className="basis-1/5 flex flex-col px-8 py-4 gap-2">
                <span className="text-xs text-green-300 whitespace-nowrap">Remarkable chests</span>
                <span className="text-4xl text-green-500">{ userInfo.stats.remarkable_chests }</span>
              </div>
              {/* Unlocked waypoints 锚点解锁 */}
              <div className="basis-1/5 flex flex-col px-8 py-4 gap-2">
                <span className="text-xs text-green-300 whitespace-nowrap">Unlocked waypoints</span>
                <span className="text-4xl text-green-500">{ userInfo.stats.unlocked_waypoints }</span>
              </div>
              {/* Unlocked domains 秘境解锁 */}
              <div className="basis-1/5 flex flex-col px-8 py-4 gap-2">
                <span className="text-xs text-green-300 whitespace-nowrap">Unlocked domains</span>
                <span className="text-4xl text-green-500">{ userInfo.stats.unlocked_domains }</span>
              </div>
            </div>
          </div>

          {/* Exploration progress 探索进度 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-orange-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-orange-400">Exploration</span>
              </div>
            </div>
            {/* Content */}
            <div className="h-48 grid grid-cols-4 gap-4 rounded-xl opacity-70">
              { Array(8).fill(0).map((_, i) => (
                <div key={`${i}`} className="w-full h-full bg-orange-50 border border-orange-400 rounded-md shadow-lg">
                </div>
              )) }
            </div>
          </div>

          {/* Teapot info 茶壶 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-pink-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-pink-400">Teapot</span>
              </div>
            </div>
            {/* Content */}
            <div className="h-24 flex flex-row gap-4 items-center w-full opacity-70">
              { Array(1).fill(0).map((_, i) => (
                <div key={`${i}`} className="w-full h-full bg-pink-50 border border-pink-400 rounded-md shadow-lg">
                </div>
              )) }
            </div>
          </div>
        </div>

        {/* Divider */}
        {/*<div className="border-r h-96 border-gray-400 mx-4"></div>*/}

        {/* Right */}
        <div className="flex flex-row w-full gap-6">
          {/* Character preview 角色预览 */}
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-row">
              <div className="border-l-4 border-purple-500 h-full" />
              <div className="px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-purple-400">Characters</span>
              </div>
            </div>
            { Array(8).fill(0).map((_, i) => (
              <div key={`${i}`} className="h-28 rounded-xl shadow-md bg-purple-50 border border-purple-400 opacity-70">
              </div>
            )) }
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req
  console.log(req.method)
  if (req.method === 'POST') {
    try {
      if (/^application\/json/.test(req.headers['content-type'] || '')) {
        const body = await getRawBody(req)
        const str = body.toString()
        const data = JSON.parse(str)
        const userInfo = await cardSchema.validate(data)
        return {
          props: {
            userInfo,
          },
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  const data = JSON.parse(JSON.stringify(cardSchema.getDefault()))
  return {
    props: {
      userInfo: data,
    },
  }
}

export default CardPage
