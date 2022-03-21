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
import { loadavg } from "os";

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
              <div className="border-l-4 border-blue-500 px-6 py-2 bg-white/90 rounded-r-full shadow-md">
                <span className="text-3xl font-thin tracking-wider text-blue-400">
                  User Profile
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="h-40 flex flex-row gap-4 items-center p-4 w-full rounded-xl shadow-md bg-blue-50/70 border border-blue-400">
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
              <div className="border-l-4 border-green-500 px-6 py-2 bg-white/90 rounded-r-full shadow-md">
                <span className="text-3xl font-thin tracking-wider text-green-400">
                  Genshin Stats
                </span>
              </div>
            </div>
            {/* Content */}
            <div
              className={`h-52 grid grid-cols-5 text-center tracking-wider items-center
              p-2 w-full rounded-xl shadow-md bg-green-50/80 border border-green-400`}
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
              <div className="border-l-4 border-orange-500 px-6 py-2 bg-white/90 rounded-r-full shadow-md">
                <span className="text-3xl font-thin tracking-wider text-orange-400">
                  Exploration
                </span>
              </div>
            </div>
            {/* Content (h-48) */}
            <div
              className={`grid grid-cols-4 items-center bg-orange-50/70 border border-orange-400
              rounded-xl shadow-md`}
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
              <div className="border-l-4 border-pink-500 px-6 py-2 bg-white/90 rounded-r-full shadow-md">
                <span className="text-3xl font-thin tracking-wider text-pink-400">
                  Teapot
                </span>
              </div>
            </div>
            {/* Content */}
            <div
              className={`px-4 py-2 flex flex-col items-center gap-2 w-full bg-pink-50/70 border border-pink-400
                rounded-xl shadow-md`}
            >
              {/* Stats */}
              <div className="flex flex-row gap-6 tracking-widest text-pink-500">
                {/* Heroicon - sparkles */}
                <div className="flex flex-row gap-1">
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
                <div className="flex flex-row gap-1">
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
                <div className="flex flex-row gap-1">
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
                    <div
                      key={`${i}`}
                      className="flex flex-col items-center justify-center w-full h-full"
                    >
                      <div className="relative w-full h-full">
                        {/* Realm background */}
                        <Image
                          src={`/serenitea/UI_HomeworldModule_${realm.id}_Pic.png`}
                          alt={`serenitea realm ${i}`}
                          layout="fill"
                          className="w-full h-full opacity-50 rounded-xl"
                        />
                        {/* Realm info */}
                      </div>
                      <span className="text-lg font-bold tracking-wider whitespace-nowrap text-pink-400">
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
              <div className="border-l-4 border-purple-500 px-6 py-2 bg-white/90 rounded-r-full shadow-md">
                <span className="text-3xl font-thin tracking-wider text-purple-400">
                  Characters
                </span>
              </div>
            </div>
            {userInfo.characters.slice(0, 8).map((character, i) => (
              <div
                key={`${i}`}
                className="h-28 rounded-xl shadow-md bg-purple-50 border border-purple-400/70"
              >
                {/* Content */}
                <div className="flex flex-row items-center p-4 gap-4 h-full">
                  {/* Character Avatar */}
                  <div
                    className="relative w-20 h-20 rounded-full"
                    style={{
                      backgroundImage: backgroundByRarity(character.rarity),
                    }}
                  >
                    <Image
                      src={character.icon}
                      alt={character.name}
                      layout="fill"
                      className={`w-full h-full rounded-full`}
                    />
                    {/* Character level */}
                    <div className="absolute inset-x-0 -bottom-4 text-center rounded-lg">
                      <span className="text-purple-400">{`Lv. ${character.level}`}</span>
                    </div>
                  </div>
                  {/* Character Profile */}
                  <div className="flex flex-col justify-center overflow-hidden gap-2 w-64 h-full text-purple-400">
                    <span className="text-xl font-medium whitespace-nowrap">
                      {character.name}
                    </span>
                    <span>{`Friendship: ${character.friendship}`}</span>
                  </div>
                  {/* Divider */}
                  <div className="border-r h-full"></div>
                  {/* Character cons & artifacts */}
                  <div></div>
                </div>
              </div>
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

function backgroundByRarity(value: number) {
  switch (value) {
    case 5:
      return "url(data:image/png;base64,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)";
    case 4:
      return "url(data:image/png;base64,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)";
  }
  return "url()";
}

export default CardPage;
