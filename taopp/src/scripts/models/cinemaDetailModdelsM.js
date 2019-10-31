module.exports = {
    get({Cid,Mid}) {
     return $.ajax({
       url: `api/ajax/cinemaDetail?cinemaId=${Cid}&movieId=${Mid}`,
     })
   }
 }
 //&movieId=1230121