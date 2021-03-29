const puppeteer = require('puppeteer-core')
const findChrome = require('chrome-finder')


class Crawler {
    constructor(profile) {
        this.profile = profile
        this.url = "https://yozay.com/register.html"
    }


    async createBrowser() {
        this.browser = await puppeteer.launch({
            executablePath: findChrome(),
            headless: false,
            defaultViewport: {
                width: 1268,
                height: 880
            },
        })
        this.page = (await this.browser.pages())[0]
        return this.start()
    }


    async start() {
        await this.page.goto(this.url)
        await this.page.waitForSelector('#submit-name')
        await this.page.type('#submit-name', this.profile.name)
        await this.page.waitForSelector('#submit-lastname')
        await this.page.type('#submit-lastname', this.profile.lastName)
        /*
        какие-то еще кнопки)
        */
        await this.page.click('#form-signup > button')
    }
}

let profile = {name: 'Egor', lastName: 'Kolovertnykh'}
let bot = new Crawler(profile)
bot.createBrowser()