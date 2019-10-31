module.exports = {
    get({one=1, two=10}) {
     return $.ajax({
       url: `/ajax/mostExpected?ci=${one}&limit=${two}&offset=0&token=`,
     })
   }
 }