import { isBefore, isAfter } from 'date-fns'

const getVisiblePrataComunitario = (listadoPrataComunitarios, startDate, endDate) =>{
  
  return listadoPrataComunitarios.filter((prataComunitario)=>{

    const fechaPrataComunitario = new Date(prataComunitario.fecha);

     const startDateMatch = startDate ? isBefore(startDate,fechaPrataComunitario) :true;
     const endDateMatch = endDate ?  isAfter(endDate,fechaPrataComunitario) :true;

    return startDateMatch && endDateMatch;

  })
}

export default getVisiblePrataComunitario;

