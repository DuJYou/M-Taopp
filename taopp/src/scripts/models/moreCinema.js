module.exports = {
    get({data,key,cityId,district,area,brandId,hallType,serviceId,stationId,lineId}) {
     return $.ajax({
       url: `api/ajax/cinemaList?day=${data}&offset=${key}&limit=20&districtId=${district}&lineId=${lineId}&hallType=${hallType}&brandId=${brandId}&serviceId=${serviceId}&areaId=${area}&stationId=${stationId}&item=&updateShowDay=false&reqId=1570580455352&cityId=${cityId}`,
     })
   }
 }