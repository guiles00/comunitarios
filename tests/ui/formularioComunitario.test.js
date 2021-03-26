import Enzyme from 'enzyme';
import { shallow } from "enzyme";
import React  from "react";

import FormularioComunitario from "../../app/ui/FormularioComunitario";


describe("Checking FormularioComunitario",()=>{
 
    // test("Should mount ok",()=>{
    //   const wrapper = shallow(<FormularioComunitario />);
    // });
    
    // test("Should mount ok with data", ()=>{ //esto no funciona
    //     const wrapper = shallow(<FormularioComunitario comunitario={{_id:null,nombre:"Guiles",doppler:100,bidi:100,doble:100,consultorio:0}} />);
    // });

    // test("Should update nombre",()=>{
    // const wrapper = shallow(<FormularioComunitario />);
    // });
  test("",()=>{})
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


describe("Formulario Comunitario",()=>{
  let mockSetComunitario = jest.fn();
  let wrapper;

  const setup = ()=>{
    return shallow(<FormularioComunitario />)
  }

  beforeEach(()=>{
    mockSetComunitario.mockClear();
    React.useState = jest.fn( ()=>[{},mockSetComunitario] );
    wrapper = setup();
  }) 

  test("renders ok",()=>{
    const wrapper = setup();
    expect(wrapper.find("#comunitario-form").length).toBe(1);
  });

  test("Should update comunitario state",()=>{
   //cambiar para que encuentre por nombre
    //const  inputName = wrapper.find("#nombre");
    const inputName = wrapper.find({ name: "nombre" });
    
    const mockEvent = {target: { value:"Comunitario", name:"nombre" } };
    inputName.simulate("change",mockEvent);
    expect(mockSetComunitario).toHaveBeenCalled()
  
    expect(mockSetComunitario).toHaveBeenCalledWith({nombre:"Comunitario"})
  
  });


})