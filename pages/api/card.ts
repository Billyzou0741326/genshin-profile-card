import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

import { UserProfile } from '../../lib/models'
import Card from '../../components/Card'

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

const getPuppeteerLaunchOptions = () => {
  return {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--no-gpu',
    ],
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not supported' })
  }


  const addr: any = req.socket.address()
  const port = typeof addr.port === 'number' ? addr.port : 3000
  const browser = await puppeteer.launch(getPuppeteerLaunchOptions())
  try {
    //const data = JSON.parse(req.body)
    const page = await browser.newPage()
    await page.goto(`http://127.0.0.1:${port}/card`, { waitUntil: ['load', 'domcontentloaded'] })
    const genBtn = await page.waitForSelector('#svg-generate-button')
    await genBtn?.click()
    const svgAnchor = await page.waitForSelector('#genshin-card-svg')
    //await page.screenshot({ path: 'tmp/card.png' })
    const svgDataHandler = await svgAnchor?.getProperty('href')
    const svgData = await svgDataHandler?.jsonValue()
    await page.goto(`${svgData}`, { waitUntil: ['load']})
    const content = await page.content()
    return res.status(200)
      .setHeader('content-type', 'image/svg+xml;charset=utf-8')
      .send(content)
  } catch (error: any) {
    if (/SyntaxError/.test(error.name)) {
      return res.status(400).json({ error: 'malformed json payload' })
    }
    return res.status(500).json({ error: `${error.message}` })
  } finally {
    await browser.close()
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
