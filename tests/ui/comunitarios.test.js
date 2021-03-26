import Enzyme, { shallow, mount } from 'enzyme';
import React  from "react";

import Comunitarios from "../../app/ui/Comunitarios";
import hookActions  from "../../app/actions/hookActions";
import fixtureComunitarios from "../fixture/comunitarios";

describe("Comunitario",()=>{
  
    const setup = ()=>{
        return shallow(<Comunitarios />);     
    }

    test("It Renders ok",() =>{
      const wrapper = setup();
      expect(wrapper.find("#comunitarios-list").length).toBe(1)
    });
});

describe("Testing Hooks",()=>{
    
    const  mockGetComunitarios = jest.fn();

    const setup = () =>{
        mockGetComunitarios.mockClear();
        hookActions.getComunitarios = mockGetComunitarios;
        
        const mockUseReducer = jest.fn()
          .mockReturnValue([
            fixtureComunitarios,
            jest.fn()
          ])
        
        React.useReducer = mockUseReducer;
      
        return mount(<Comunitarios />);   
      }
    
    xtest("Expect listado de comunitarios",() =>{
    
        setup();

        expect(mockGetComunitarios).toHaveBeenCalled();
    });
});

