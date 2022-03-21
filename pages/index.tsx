import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { toSvg } from "html-to-image";
import getRawBody from "raw-body";
import * as yup from "yup";

import * as models from "../lib/models";
import { cardSchema } from "../lib/validators/card";

const CardPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // Html element reference
  const cardRef = React.useRef(null);
  // Image base64 data
  const [imageData, setImageData] = React.useState("");

  // UserProfile 玩家信息
  const userInfo: yup.InferType<typeof cardSchema> = props.userInfo;
  //console.log(userInfo)

  // Html to svg
  const cardToSvg = React.useCallback(async () => {
    if (cardRef.current === null) return;
    const dataUrl = await toSvg(cardRef.current, { cacheBust: true });
    setImageData(dataUrl);
  }, [cardRef]);

  // Background style
  const backgroundStyle = {
    backgroundImage: "url(/97b7049e-69d7-4035-bb34-8b2d47d7a209.jfif)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backgroundSize: "cover",
    backgroundBlendMode: "lighten",
    zIndex: -50,
  };

  //React.useEffect(() => {
  //  cardToSvg()
  //}, [])

  return (
    <div className="relative max-w-screen min-h-screen">
      <Head>
        <title>Profile Generator | GI</title>
      </Head>

      {/* Background */}
      <div
        className="absolute inset-0 min-h-screen bg-repeat"
        style={backgroundStyle}
      />

      <div className="relative p-8 w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-4">
        {/* Left */}
        <div className="flex flex-col w-full gap-6">
          {/* User Profile 用户信息 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-blue-500 px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-blue-400">
                  User Profile
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="h-40 flex flex-row gap-4 items-center p-4 w-full rounded-xl shadow-md bg-blue-50 border border-blue-400 opacity-80">
              {/* User avatar */}
              <div className="rounded-full w-28 h-28 inline-block bg-white shadow-md"></div>
              {/* User info */}
              <div className="mr-2 flex flex-col">
                <span className="text-4xl font-thin text-blue-500 mb-2">
                  {userInfo.hoyolab.nickname}
                </span>
                <span className="text-lg font-medium text-blue-400">{`UID: ${userInfo.hoyolab.uid}`}</span>
                <span className="text-lg font-medium text-blue-400">{`Lv. ${userInfo.hoyolab.level}`}</span>
              </div>
              {/* Space */}
              <div className="grow"></div>
              {/* Stats card */}
              <div className="text-center h-28 flex flex-row divide-x rounded-3xl shadow-md bg-gray-50">
                <div className="basis-1/3 flex-none flex flex-col px-8 py-4 gap-2">
                  <span className="text-md font-semibold tracking-widest text-blue-300 whitespace-nowrap">
                    Days Active
                  </span>
                  <span className="text-5xl font-thin text-blue-500">
                    {userInfo.stats.days_active}
                  </span>
                </div>
                <div className="basis-1/3 flex-none flex tracking-widest flex-col px-8 py-4 gap-2">
                  <span className="text-md font-semibold text-blue-300 whitespace-nowrap">
                    Characters
                  </span>
                  <span className="text-5xl font-thin text-blue-500">
                    {userInfo.stats.characters}
                  </span>
                </div>
                <div className="basis-1/3 flex-none flex tracking-widest flex-col px-8 py-4 gap-2">
                  <span className="text-md font-semibold text-blue-300 whitespace-nowrap">
                    Spiral Abyss
                  </span>
                  <span className="text-5xl font-thin text-blue-500">
                    {userInfo.stats.spiral_abyss}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Genshin Stats 玩家信息卡 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-green-500 px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-green-400">
                  Genshin Stats
                </span>
              </div>
            </div>
            {/* Content */}
            <div
              className={`h-52 grid grid-cols-5 text-center tracking-wider items-center
              p-2 w-full rounded-xl shadow-md bg-green-50 border border-green-400 opacity-80`}
            >
              {/* Common chests 普通宝箱 */}
              <div className="basis-1/5 flex flex-col px-2 py-4 gap-2">
                <span className="text-xs font-black text-green-500 whitespace-nowrap">
                  Common chests
                </span>
                <span className="text-4xl font-thin text-green-600">
                  {userInfo.stats.common_chests}
                </span>
              </div>
              {/* Exquisite chests 精致宝箱 */}
              <div className="basis-1/5 flex flex-col px-2 py-4 gap-2">
                <span className="text-xs font-black text-green-500 whitespace-nowrap">
                  Exquisite chests
                </span>
                <span className="text-4xl font-thin text-green-600">
                  {userInfo.stats.exquisite_chests}
                </span>
              </div>
              {/* Precious chests 珍贵宝箱 */}
              <div className="basis-1/5 flex flex-col px-2 py-4 gap-2">
                <span className="text-xs font-black text-green-500 whitespace-nowrap">
                  Precious chests
                </span>
                <span className="text-4xl font-thin text-green-600">
                  {userInfo.stats.precious_chests}
                </span>
              </div>
              {/* Luxurious chests 华丽宝箱 */}
              <div className="basis-1/5 flex flex-col px-2 py-4 gap-2">
                <span className="text-xs font-black text-green-500 whitespace-nowrap">
                  Luxurious chests
                </span>
                <span className="text-4xl font-thin text-green-600">
                  {userInfo.stats.luxurious_chests}
                </span>
              </div>
              {/* Remarkable chests 奇馈宝箱 */}
              <div className="basis-1/5 flex flex-col px-2 py-4 gap-2">
                <span className="text-xs font-black text-green-500 whitespace-nowrap">
                  Remarkable chests
                </span>
                <span className="text-4xl font-thin text-green-600">
                  {userInfo.stats.remarkable_chests}
                </span>
              </div>
              {/* Unlocked waypoints 锚点解锁 */}
              <div className="basis-1/5 flex flex-col px-2 py-4 gap-2">
                <span className="text-xs font-black text-green-500 whitespace-nowrap">
                  Unlocked waypoints
                </span>
                <span className="text-4xl font-thin text-green-600">
                  {userInfo.stats.unlocked_waypoints}
                </span>
              </div>
              {/* Unlocked domains 秘境解锁 */}
              <div className="basis-1/5 flex flex-col px-2 py-4 gap-2">
                <span className="text-xs font-black text-green-500 whitespace-nowrap">
                  Unlocked domains
                </span>
                <span className="text-4xl font-thin text-green-600">
                  {userInfo.stats.unlocked_domains}
                </span>
              </div>
            </div>
          </div>

          {/* Exploration progress 探索进度 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-orange-500 px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-orange-400">
                  Exploration
                </span>
              </div>
            </div>
            {/* Content (h-48) */}
            <div
              className={`grid grid-cols-4 items-center bg-orange-50 border border-orange-400
              rounded-xl shadow-md opacity-70`}
            >
              {takeMultipleOf(
                sortExplorationById(userInfo.explorations),
                4
              ).map((exploration, i) => (
                <div
                  key={exploration.id}
                  className="flex flex-row w-full h-full p-4 "
                >
                  {/* Left - Region info */}
                  <div className="grow flex flex-col tracking-wide">
                    {/* Region name */}
                    <div className="">
                      <span className="text-lg font-black text-orange-500 whitespace-nowrap">
                        {exploration.name}
                      </span>
                    </div>
                    {/* Region level */}
                    <div>
                      <span className="text-md text-orange-400">{`Lv. ${exploration.level}`}</span>
                    </div>
                    {/* Percent explored */}
                    <div className="overflow-hidden w-full bg-orange-200 rounded">
                      <div
                        className="whitespace-nowrap bg-orange-300 text-xs font-medium text-orange-700 px-2 py-0.5"
                        style={{ width: `${exploration.percentage}%` }}
                      >
                        {`${exploration.percentage}%`}
                      </div>
                      {/*<span className="text-md text-orange-400">{ `${exploration.percentage}%` }</span>*/}
                    </div>
                  </div>
                  {/* Region icon */}
                  <div className="relative w-12 h-12 self-center">
                    <Image
                      src={exploration.icon}
                      alt="region icon"
                      layout="fill"
                      className="w-full h-full invert"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teapot info 茶壶 */}
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row">
              <div className="border-l-4 border-pink-500 px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-pink-400">Teapot</span>
              </div>
            </div>
            {/* Content */}
            <div
              className={`px-4 py-2 flex flex-col items-center gap-2 w-full bg-pink-50 border border-pink-400
                rounded-xl shadow-md opacity-70`}
            >
              {/* Stats */}
              <div className="flex flex-row gap-2 tracking-widest text-pink-500">
                {/* Heroicon - sparkles */}
                <div className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <span className="text-md">{`Lv.${userInfo.teapot.level}`}</span>
                </div>
                {/* Heroicon - fire */}
                <div className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                  <span className="text-md">{userInfo.teapot.comfort}</span>
                </div>
                {/* Heroicon - user-circle */}
                <div className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-md">{userInfo.teapot.visitors}</span>
                </div>
              </div>
              {/* Unlocked realms */}
              <div className="h-28 w-full flex flex-row gap-4">
                {userInfo.teapot.realms
                  .filter((realm) => realm.id > 0 && realm.id <= 3)
                  .map((realm, i) => (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div key={`${i}`} className="relative w-full h-full">
                        {/* Realm background */}
                        <Image
                          src={`/serenitea/UI_HomeworldModule_${realm.id}_Pic.png`}
                          alt={`serenitea realm ${i}`}
                          layout="fill"
                          className="w-full h-full opacity-50 rounded-xl"
                        />
                        {/* Realm info */}
                      </div>
                      <span className="text-xl tracking-widest font-thin text-pink-400 opacity-100">
                        {realm.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-row w-full gap-6">
          {/* Character preview 角色预览 */}
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-row">
              <div className="border-l-4 border-purple-500 px-4 py-2 bg-white opacity-90 rounded-r-full">
                <span className="text-3xl font-thin text-purple-400">
                  Characters
                </span>
              </div>
            </div>
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`${i}`}
                  className="h-28 rounded-xl shadow-md bg-purple-50 border border-purple-400 opacity-70"
                ></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  if (req.method === "POST") {
    try {
      if (/^application\/json/.test(req.headers["content-type"] || "")) {
        const body = await getRawBody(req);
        const str = body.toString();
        const data = JSON.parse(str);
        const userInfo = await cardSchema.validate(data);
        return {
          props: {
            userInfo,
          },
        };
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  //import cardSample from '../lib/data/cardSample';
  const cardSample = (await import("../lib/data/cardSample")).default;
  const cardData = await cardSchema.validate(cardSample);
  const data = JSON.parse(JSON.stringify(cardData));
  //const data = JSON.parse(JSON.stringify(cardSchema.getDefault()));
  return {
    props: {
      userInfo: data,
    },
  };
};

function sortExplorationById(
  explorations: models.Exploration[]
): models.Exploration[] {
  const newExplr = Array.from(explorations);
  return newExplr.sort((a, b) =>
    a["id"] === b["id"] ? 0 : a["id"] > b["id"] ? 1 : -1
  );
}

function takeMultipleOf<T>(arr: Array<T>, value: number): Array<T> {
  if (arr.length === 0 || value < 1) {
    return [];
  }
  const takeN = arr.length - (arr.length % value);
  return arr.slice(0, takeN);
}

export default CardPage;
