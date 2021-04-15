import Enzyme, { mount, shallow } from 'enzyme';
import React  from "react";
import { Provider } from "react-redux";
import {BrowserRouter as Router } from "react-router-dom";
import PrataComunitario from "../../app/ui/PrataComunitario";


import { storeFactory } from "../helpers/testUtils";



describe("PrataComunitario", ()=>{

  const setup = (initialState)=>{
    const store = storeFactory(initialState);
    return mount(
      <Provider store={store}>
        <Router>
        <PrataComunitario />
        </Router>
      </Provider>)
  }

  test("it renders ok",()=>{
    const wrapper = setup({
      prataComunitarios: { 
        listadoPrataComunitarios: [], 
        startDate: new Date(),
        endDate: new Date}
    })
    
  })
});


//Lo dejo para probar el testing solamente con shallow
xtest("Should render ok(Shallow)",() =>{
  //const wrapper = shallow(<PrataComunitario />);
  //expect(wrapper.find("#prataComunitario-component").exists()).toBe(true);
});
