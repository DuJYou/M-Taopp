
module.exports = {
    get({key,cityId}) {
     return $.ajax({
       url: `api/ajax/search?kw=${key}&cityId=${cityId}&stype=2`,
     })
   }
 }