import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React  from "react";

import PrataComunitario from "../../app/ui/PrataComunitario";

Enzyme.configure({ adapter: new Adapter() });

test("Should render ok",() =>{
  const wrapper = shallow(<PrataComunitario />);
  expect(wrapper.find("#prataComunitario-component").exists()).toBe(true);  
});
