import {getNews} from '../../../core/generate'

export default function handler(req, res) {
   if (req.method == "GET") {
      const { pid, country } = req.query
      getNews(pid, country).then((data) => {
         res.status(200).json(data)
      })
   } else {
      res.status(400).json({
         message: "Not auth"
      })
   }
}