
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;



async function getDomDocument(pageNumber, countryName) {
    const uri = `https://www.alarabiya.net/${countryName}/archive?pageNo=${pageNumber}`
    const html = await axios.get(encodeURI(uri));
    const dom = new JSDOM(html.data);
    return dom.window.document

}

export async function getNews(pageNo, countryName) {
    const page = await getDomDocument(pageNo, countryName)
    const news = []
    const latest = page.getElementsByClassName('latest_element')
    for (let index = 0; index < latest.length; index++) {
        const element = latest.item(index = index)
        const title = element.getElementsByClassName('latest_news')[0].innerHTML
        const description = element.getElementsByClassName('latest_description')[0].innerHTML
        const image = element.getElementsByClassName('latest_img')[0].children[0].getAttribute('src')
        const newsLink = element.getElementsByClassName('latest_img')[0].getAttribute('href')
        const topic = element.getElementsByClassName('latest_section')[0].children[1].innerHTML
        // const newsLink = element.children[0].getAttribute('href')
        news.push({
            "title": title.trim(),
            "description": description,
            "image": image,
            "link": newsLink,
            "topic":topic
        })
    }
    return {
        "data": news,
        "current_page": `${pageNo} of 100 pages`,
        "total": news.length
    }
}

export function getCategories() {
    const country = [
        "arab-and-world",
        "arab-and-world/egypt",
        "arab-and-world/north-africa",
        "arab-and-world/iraq",
        "arab-and-world/american-elections-2016",
        "arab-and-world/gulf",
        "arab-and-world/yemen",
        "arab-and-world/syria",
        "iran",
        "saudi-today",
        "sport", "aswaq", "variety", "coronavirus"]
    return {
        "data": country,
        "total": country.length
    }
}