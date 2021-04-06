import moment from "moment";

const getVisiblePrataComunitario = (listadoPrataComunitarios, startDate, endDate) =>{
  
  return listadoPrataComunitarios.filter((prataComunitario)=>{

    const fechaPrataComunitario = moment(prataComunitario.fecha);
     console.log(fechaPrataComunitario)
     const startDateMatch = startDate ? startDate.isSameOrBefore(fechaPrataComunitario, "day") :true;
     const endDateMatch = endDate ? endDate.isSameOrAfter(fechaPrataComunitario, "day") :true;

    return startDateMatch && endDateMatch;

  })
}

export default getVisiblePrataComunitario;

