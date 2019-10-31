module.exports = {
    get({Cid}) {
     return $.ajax({
       url: `api/ajax/cinemaDetail?cinemaId=${Cid}`,
     })
   }
 }
 //&movieId=1230121