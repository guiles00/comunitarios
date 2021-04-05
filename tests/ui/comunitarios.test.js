import Enzyme, { shallow, mount } from 'enzyme';
import React  from "react";
import {BrowserRouter as Router } from "react-router-dom";
import Comunitarios from "../../app/ui/Comunitarios";
import fixtureComunitarios from "../fixture/comunitarios";

import { storeFactory }  from "../helpers/testUtils";

const initialState = {
  isLoading: false,
  error:"",
  comunitarios: []
}

describe("Comunitario",()=>{

    const setup = (initialState)=>{

      const store = storeFactory(initialState);
   
      return mount(
          <Provider store={store}>
            <Router>

            <Comunitarios comunitarios={[]}/>
            </Router>
          </Provider>
           );
    }

    test("It Renders ok",() =>{
      const wrapper = setup();
      expect(wrapper.find("#comunitarios-list").length).toBe(1)
    });
});
