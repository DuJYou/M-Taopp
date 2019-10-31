module.exports = {
    get() {
     return $.ajax({
       url: `api/ajax/filterCinemas?ci=1`,
     })
   }
 }