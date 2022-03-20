import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'
import * as yup from 'yup'

import * as models from '../../../lib/models'
import Card from '../../../components/Card'
import { cardSchema } from '../../../lib/validators/card'
import cardSample from '../../../lib/data/cardSample'


const [ getPage, closeBrowser ] = (() => {
  let browser: puppeteer.Browser | null = null
  return [
    // getPage
    async () => {
      if (browser === null) {
        browser = await puppeteer.launch(getPuppeteerLaunchOptions())
      }
      return await browser.newPage()
    },
    // closeBrowser
    async () => {
      const b = browser
      browser = null
      if (b !== null) {
        await b.close()
      }
    },
  ]
})()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startTime = (new Date()).getTime()
  let reqData: any = cardSample

  if (!['GET', 'POST'].includes(req.method || '')) {
    return res.status(405).json({ error: 'method not supported' })
  }
  if (req.method === 'POST') {
    reqData = req.body
  }

  // user info
  const data = cardSchema.cast(reqData)

  const addr: any = req.socket.address()
  const port = typeof addr.port === 'number' ? addr.port : 3000
  //const browser = await puppeteer.launch(getPuppeteerLaunchOptions())

  const page = await getPage()
  console.log(`Browser launch - (${(new Date()).getTime() - startTime})`)
  try {
    await Promise.all([
      page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1.5,
      }),
      page.setRequestInterception(true),
    ])
    page.once('request', (request) => {
      page.removeAllListeners('request')
      const extraOptions = {
        method: 'POST',
        postData: JSON.stringify(data),
        headers: Object.assign({}, request.headers(), {
          'content-type': 'application/json',
        }),
      }
      request.continue(extraOptions)
      page.setRequestInterception(false)
      console.log(`Send post - (${(new Date()).getTime() - startTime})`)
    })
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: ['load', 'domcontentloaded'] })
    console.log(`Page loaded - (${(new Date()).getTime() - startTime})`)
    const content = await page.screenshot({ path: 'tmp/reqcard.png', fullPage: true })
    console.log(`Screenshot taken - (${(new Date()).getTime() - startTime})`)
    return res.status(200)
      .setHeader('content-type', 'image/png')
      .send(content)
  } catch (error: any) {
    console.log(error)
    if (/SyntaxError/.test(error.name)) {
      return res.status(400).json({ error: 'malformed json payload' })
    }
    return res.status(500).json({ error: `${error.message}` })
  } finally {
    page.removeAllListeners()
    page.close()
  }
}

const getPuppeteerLaunchOptions = () => {
  return {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-zygote',
      '--no-gpu',
    ],
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}
