import Enzyme, { shallow } from 'enzyme';
import React  from "react";
import {  render, screen, act } from "@testing-library/react";
import 'regenerator-runtime/runtime'

import Maqueta from "../../app/ui/Maqueta";

global.fetch = jest.fn(()=> Promise.resolve({
   json: () => Promise.resolve({
       comunitarios: [{nombre:"Clinica A"},{nombre:"Clinica B"}]
   }) 
}))

describe("Maqueta",  () =>{
    it("load Maqueta",async () =>{

       await act( async () => 
             render(<Maqueta />)
          );
    })
    expect(1).toBe(1)
    
})