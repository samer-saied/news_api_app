import { getNews, getSingleNews } from '../../../core/generate'

export default function handler(req, res) {
    if (req.method == "GET") {
        var subject = req.body['subject']
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