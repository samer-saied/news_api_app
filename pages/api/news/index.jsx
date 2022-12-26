import { getNews } from '../../../core/generate'

export default function handler(req, res) {
   if (req.method == "GET") {
      const { pid, country } = req.query
      if (pid && country) {
         getNews(pid, country).then((data) => {
            res.status(200).json(data)
         })
      } else if (country) {
         getNews("1", country).then((data) => {
            res.status(200).json(data)
         })
      } else if (pid) {
         getNews(pid, "arab-and-world/egypt").then((data) => {
            res.status(200).json(data)
         })
      }
      else {
         getNews("1", "arab-and-world/egypt").then((data) => {
            res.status(200).json(data)
         })
      }
   } else {
      res.status(400).json({
         message: "Not auth"
      })
   }
}