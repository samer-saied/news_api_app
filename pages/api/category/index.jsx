import {getCategories} from '../../../core/generate'
export default function handler(req, res) {
   if (req.method == "GET") {
      const country = getCategories()
      res.status(200).json(country)
   } else {
      res.status(400).json({
         message: "Not auth"
      })

   }

}