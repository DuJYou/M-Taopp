module.exports = {
    get({data,cityId,district,area,brandId,hallType,serviceId,stationId,lineId}) {
     return $.ajax({
       url: `api/ajax/cinemaList?day=${data}&offset=0&limit=20&districtId=${district}&lineId=${lineId}&hallType=${hallType}&brandId=${brandId}&serviceId=${serviceId}&areaId=${area}&stationId=${stationId}&item=&updateShowDay=true&reqId=1571640290077&cityId=${cityId}`,
     })
   }
 }