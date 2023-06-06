const express = require('express')
const axios = require('axios')
const faker = require('faker')
const fetch = require('node-fetch')

const port = process.env.PORT || 8080 || 5000 || 3000
const app = express()

app.get('/', (req, res) => res.send('Uptime berjalan'))
app.listen(port, () => {
  console.log('Server berjalan dengan port', port)
  setInterval(async () => {
    const userAgent = faker.internet.userAgent()
    const referer = faker.internet.url()
    const acceptLanguage = faker.random.locale()
    const urlUptime = await fetch('https://raw.githubusercontent.com/rere-xp/page-uptime/main/uptimeurl.json').then(response => response.json()).catch(() => false)
    if (urlUptime) {
      axios.get(urlUptime.url, {
        timeout: 30000,
        headers: {
          'User-Agent': userAgent,
          'Referer': referer,
          'Accept-Language': acceptLanguage
        }
      }).catch(() => console.log('Uptime gagal'))
    } else console.log('Url tidak dapat di muat')
  }, 120000)
})