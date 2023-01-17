import { getNews, getSingleNews } from '../../../core/generate'

export default function handler(req, res) {
    if (req.method == "POST") {
        var subject = req.body['subject']
        console.log(subject)
        getSingleNews(subject).then((data) => {
            console.log(data)
            res.status(200).json(data)
        })

    } else {
        res.status(400).json({
            message: "Not auth"
        })
    }
}