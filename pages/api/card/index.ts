import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import * as yup from 'yup'

import * as models from '../../../lib/models'
import Card from '../../../components/Card'


const cardSchema = yup.object({
  stats: models.gameStatsSchema,
  explorations: yup.array(models.explorationSchema),
  teapot: models.teapotSchema,
})

interface CardProps extends yup.InferType<typeof cardSchema> {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!['GET', 'POST'].includes(req.method || '')) {
    return res.status(405).json({ error: 'method not supported' })
  }

  //const data = cardSchema.cast(req.body)
  //const data = cardSchema.cast(req.query)
  //console.log(data)

  const addr: any = req.socket.address()
  const port = typeof addr.port === 'number' ? addr.port : 3000
  const browser = await puppeteer.launch(getPuppeteerLaunchOptions())
  try {
    //const data = JSON.parse(req.body)
    const page = await browser.newPage()
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    })
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: ['load', 'domcontentloaded'] })
    const content = await page.screenshot({ path: 'tmp/card.png', fullPage: true })
    //const genBtn = await page.waitForSelector('#svg-generate-button')
    //await genBtn?.click()
    //const svgAnchor = await page.waitForSelector('#genshin-card-svg')
    //const svgDataHandler = await svgAnchor?.getProperty('href')
    //const svgData = await svgDataHandler?.jsonValue()
    //await page.goto(`${svgData}`, { waitUntil: ['load']})
    //const content = await page.content()
    return res.status(200)
      //.setHeader('content-type', 'image/svg+xml;charset=utf-8')
      .setHeader('content-type', 'image/png')
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
