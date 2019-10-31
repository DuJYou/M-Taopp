import movieHotView from '../views/movie_hot.art'
import httpModel from '../models/http'    
//export const list = async (req, res, next) => {
//   let result = await httpModel.get({
//     url: '/api/movie'
//   })
// console.log(result);

//   if (result.ret) {
//     res.render(movieHotView())
//    } 
//   //  else {
//     // res.go('/index')
//   // }
// }
export const list = (req, res, next) => {
  res.render(movieHotView())
}