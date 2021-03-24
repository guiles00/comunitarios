import Enzyme from 'enzyme';
import { shallow } from "enzyme";
import React  from "react";

import toJson from 'enzyme-to-json';

import Home from "../../app/ui/Home";

test("Should Match Snapshot",() =>{
  const wrapper = shallow(<Home />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

test("Should Match Snapshot",() =>{
  const wrapper = shallow(<Home />);
  expect(wrapper.find("h4").length).toBe(2);
});