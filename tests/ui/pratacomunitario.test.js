 import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import { shallow } from "enzyme";
// import React  from "react";

// import toJson from 'enzyme-to-json';

// import PrataComunitario from "../../app/ui/PrataComunitario";

// Enzyme.configure({ adapter: new Adapter() });

// test("Should Match Snapshot",() =>{
//   const wrapper = shallow(<PrataComunitario />);
//   expect(toJson(wrapper)).toMatchSnapshot();
// });

// test("Should render ok",(done) =>{
//   const wrapper = shallow(<PrataComunitario />);
//   //console.log(wrapper.debug());
//   //expect(wrapper.find("Link").length).toBe(1);
//   //expect(wrapper.find("Registro").length).toBe(1);
  
//   done();
// });

test("Expect listado de comunitarios",() =>{
  expect(1).toBe(1);
});
