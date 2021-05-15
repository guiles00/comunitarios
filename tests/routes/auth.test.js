import 'regenerator-runtime/runtime'

const request = require("supertest");
const app = require("../../app/app");
const User = require("../../app/models/User");
const mongoose = require("mongoose");

//test.only("skip all", ()=>{});

describe("Testing sign up", ()=>{

  beforeAll(async () => {
    await User.deleteMany();
  });
  
  test("returns a 201 on succeful signup", async () =>{
    
    const data = { 
      email: "test@test.com",
      password: "12345"
    }
  
    const result = await request(app)
      .post("/api/auth/signup")
      .send(data)
      .expect(201); 
  
  });
  
  test("it returns a 400 if has an invalid email",async () =>{
    
    const data = { 
      email: "test.com",
      password: "12345"
    }
  
    const result = await request(app)
      .post("/api/auth/signup")
      .send(data)
      .expect(400); 
  
  });
  
  test("it returns a 400 if the email already exists",async () =>{
    
    const data = { 
      email: "testdos@test.com",
      password: "12345"
    }
  
    await request(app)
      .post("/api/auth/signup")
      .send(data)
      .expect(201); 
  
    const result = await request(app)
      .post("/api/auth/signup")
      .send(data)
      .expect(400); 
  
  });
  test.todo("pw")
  test.todo("it returns a 400 if has an invalid password");

});

describe("Testing Sign In", ()=>{

  test.todo("returns a 400 if invalid email");
  test.todo("returns a 400 if invalid password");
  test.todo("returns a 400 if email not existis");
  test.todo("returns a 400 on invalid credentials");
  test.todo("returns a 200 on valid credentials");
  
});
//signin
it.todo("fails when a email that does not exist is supplied");
it.todo("fails when an incorrect password is supplied");
it.todo("responds with a cookie when given valid credentials");

//signout
it.todo("clreas the cookir after signing out");

//signup

it.todo("returns a 201 on successful signup");
it.todo("returns a 400 with an invalid email");
it.todo("returns a 400 with an invalid password");
it.todo("returns a 400 with missing email and password");
it.todo("disallows duplicate emails");
it.todo("sets a cookie after succesfull signup");