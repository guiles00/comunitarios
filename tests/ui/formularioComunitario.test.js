import Enzyme from 'enzyme';
import { shallow } from "enzyme";
import React  from "react";

 import toJson from 'enzyme-to-json';


import FormularioComunitario from "../../app/ui/FormularioComunitario";


describe("Checking FormularioComunitario",()=>{
 
    test("Should mount ok",()=>{
      const wrapper = shallow(<FormularioComunitario />);
    });
    
    test("Should mount ok with data", ()=>{ //esto no funciona
        const wrapper = shallow(<FormularioComunitario comunitario={{_id:null,nombre:"Guiles",doppler:100,bidi:100,doble:100,consultorio:0}} />);
    });

    test("Should update nombre",()=>{
    const wrapper = shallow(<FormularioComunitario />);

    });

})

// describe('<FormularioComunitario />', () => {
  
//     it('calls componentDidMount', () => {
//     sinon.spy(FormularioComunitario);
//     const wrapper = mount(<FormularioComunitario />);
//     //expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
//   });

// });
// // test("component should mount ok", ()=>{
// //     //const wrapper = shallow(<FormularioComunitario />);
// //    // const wrapper = mount(<FormularioComunitario />);

// // });


test("Expect listado de comunitarios",() =>{
    expect(1).toBe(1);
});
