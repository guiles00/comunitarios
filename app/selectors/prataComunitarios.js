import { isBefore, isAfter, isSameDay } from 'date-fns'

const getVisiblePrataComunitario = (listadoPrataComunitarios, startDate, endDate) =>{
  
  return listadoPrataComunitarios.filter((prataComunitario)=>{
    const fechaPrataComunitario = new Date(prataComunitario.fecha+"T00:00:00");
    //Tengo que instanciar Date siempre, porque en el store se guarda String
    const startD = new Date(startDate+"T00:00:00");
    const endD = new Date(endDate+"T00:00:00");
    
    const startDateMatch = startD ? isBefore(startD,fechaPrataComunitario) || isSameDay(startD,fechaPrataComunitario) :true;
    const endDateMatch = endD ? isAfter(endD,fechaPrataComunitario) || isSameDay(endD,fechaPrataComunitario) :true;

    return startDateMatch && endDateMatch;

  }).sort((a,b)=>{ 
      const fechaA = new Date(a.fecha+"T00:00:00");
      const fechaB = new Date(b.fecha+"T00:00:00");
  
      return (isBefore(fechaB,fechaA))? -1:1; 
    });
}

export default getVisiblePrataComunitario;

