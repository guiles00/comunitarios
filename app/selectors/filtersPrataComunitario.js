import { isBefore, isAfter, isSameDay } from 'date-fns'

const sumEstudios = (estudios)=>{
  
  const { cantidadDoppler, valorDoppler, cantidadDoble, valorDoble, cantidadBidi, valorBidi, cantidadConsultorio, valorConsultorio } = estudios; 

  const suma = (cantidadDoppler * valorDoppler) + (cantidadDoble * valorDoble) 
  + (cantidadBidi * valorBidi) + (cantidadConsultorio * valorConsultorio);
 
  return suma;
}
const getPrataComunitarioSum = (listadoPrataComunitarios, startDate, endDate) =>{
  
 const suma = listadoPrataComunitarios.filter((pc)=>{
  
    const fechaPrataComunitario = new Date(pc.fecha+"T00:00:00");
    const startD = new Date(startDate+"T00:00:00");
    const endD = new Date(endDate+"T00:00:00");
    
    const startDateMatch = startD ? isBefore(startD,fechaPrataComunitario) || isSameDay(startD,fechaPrataComunitario) :true;
    const endDateMatch = endD ? isAfter(endD,fechaPrataComunitario) || isSameDay(endD,fechaPrataComunitario) :true;

    return startDateMatch && endDateMatch; 

 }).reduce((acc,curr)=>{
    

    acc = acc + sumEstudios(curr.cantidadEstudios);
  
    return acc;
  },0)

  return suma;
}

const getListadoPorComunitario = (listadoPrataComunitarios, startDate, endDate)=>{
  
  const comunitarios = listadoPrataComunitarios.filter((pc)=>{
  
    const fechaPrataComunitario = new Date(pc.fecha+"T00:00:00");
    const startD = new Date(startDate+"T00:00:00");
    const endD = new Date(endDate+"T00:00:00");
    
    const startDateMatch = startD ? isBefore(startD,fechaPrataComunitario) || isSameDay(startD,fechaPrataComunitario) :true;
    const endDateMatch = endD ? isAfter(endD,fechaPrataComunitario) || isSameDay(endD,fechaPrataComunitario) :true;

    return startDateMatch && endDateMatch; 

 }).reduce((acc,curr)=>{
  
  const fecha = curr.fecha;
  
  if(acc[curr.comunitario.nombre] === undefined){
  
    const newArr = new Array(Object.assign({},curr.cantidadEstudios,{fecha}));
    acc[curr.comunitario.nombre] = {suma: sumEstudios(curr.cantidadEstudios), totalEstudios:newArr };
  }else{
  
    const auxSum = acc[curr.comunitario.nombre].suma + sumEstudios(curr.cantidadEstudios);
    const estudios = acc[curr.comunitario.nombre].totalEstudios.concat(Object.assign({},curr.cantidadEstudios,{fecha}));
    
    acc[curr.comunitario.nombre] = {
      suma: auxSum,
      totalEstudios: estudios
    }   
  }
  
  return acc; 
 },{});
console.log(comunitarios);
 return comunitarios;
}

export {
  getPrataComunitarioSum,
  getListadoPorComunitario
};