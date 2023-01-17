
import "../core/strings"
import stringData from "../core/strings";
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function getDomDocument(pageNumber, countryName) {
    try {
        const uri = `${stringData.alarbiyaMainUrl}/${countryName}/archive?pageNo=${pageNumber}`
        console.log(uri)
        const response = await fetch(encodeURI(uri));
        const json = await response.text();
        const dom = new JSDOM(json);
        return dom.window.document
    } catch (error) {
        console.log("ERROR-----" + error)
    }
}

async function getDomSingle(pageLink) {
    try {
        const uri = `${stringData.alarbiyaMainUrl}${pageLink}`
        console.log(uri)
        const response = await fetch(encodeURI(uri));
        const json = await response.text();

        const dom = new JSDOM(json);
        return dom.window.document
    } catch (error) {
        console.log("ERROR-----" + error)
    }
}

export async function getSingleNews(pageLink) {
    console.log(pageLink)
    try {
        var des = ""
        const page = await getDomSingle(pageLink)
        var title = page.getElementsByClassName("headingInfo_title")[0].innerHTML
        var location = page.getElementsByClassName("aa-geo-location")[0].nextElementSibling.innerHTML
        console.log(location)
        var timeDate = page.getElementsByClassName("timeDate_element")[0].childNodes[0].nextSibling.innerHTML
        console.log(timeDate)
        var media = ""
        var type = ""
       var isExistedImage = page.getElementsByClassName("image-wrapper")[0].querySelector("img")
       if(isExistedImage != undefined){
        var media = isExistedImage.getAttribute('src')
        type = "image"
       }else{
        var media = page.querySelector("video-js").childNodes[3].getAttribute('src');
        type = "video"
       }           
    
        var description = page.getElementsByClassName("paragraph")
        for (let index = 0; index < description.length; index++) {
            const element = description[index];
            des += " /n " + element.textContent.trim()
        }
        return {
            "timeDate": timeDate,
            "title": title.trim(),
            "description": des,
            "media": media,
            "type":type,
            "topic": location
        }
    } catch (error) {
        console.log(error)
    }
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
            "title": title.replace("&nbsp;","").trim(),
            "description": description,
            "image": image,
            "link": newsLink,
            "topic": topic,
            "type":"image"
        })
    }
    return {
        "data": news,
        "current_page": `${pageNo} of 1000 pages`,
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
        "sport",
        "aswaq",
        "variety",
        "coronavirus"]
    return {
        "data": country,
        "total": country.length
    }
}