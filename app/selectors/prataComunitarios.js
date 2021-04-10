import { isBefore, isAfter, isSameDay } from 'date-fns'

const getVisiblePrataComunitario = (listadoPrataComunitarios, startDate, endDate) =>{
  
  return listadoPrataComunitarios.filter((prataComunitario)=>{
    const fechaPrataComunitario = new Date(prataComunitario.fecha+"T00:00:00");
    
    const startDateMatch = startDate ? isBefore(startDate,fechaPrataComunitario) || isSameDay(startDate,fechaPrataComunitario) :true;
    const endDateMatch = endDate ?  isAfter(endDate,fechaPrataComunitario) || isSameDay(endDate,fechaPrataComunitario) :true;

    return startDateMatch && endDateMatch;

  }).sort((a,b)=>{ 
      const fechaA = new Date(a.fecha+"T00:00:00");
      const fechaB = new Date(b.fecha+"T00:00:00");
  
      return (isBefore(fechaB,fechaA))? -1:1; 
    });
}

export default getVisiblePrataComunitario;

