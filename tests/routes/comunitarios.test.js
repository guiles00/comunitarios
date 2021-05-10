import 'regenerator-runtime/runtime'

const request = require("supertest");
const app = require("../../app/app");
const Comunitarios = require("../../app/models/Comunitarios");
const mongoose = require("mongoose");

test("Should add a Comunitario", async () =>{
  
  const comunitario  = { nombre:"comunitario", 
    doppler:0, bidi:0, doble:0, consultorio:0
  } 
  const result = await request(app)
    .post("/api/comunitarios")
    .send(comunitario)
    .expect(201); 

});

test("returns an error if has empty comunitario", async ()=>{

  const comunitario  = { doppler:0, bidi:0, doble:0, consultorio:0 }

  const result = await request(app)
    .post("/api/comunitarios")
    .send(comunitario)
    .expect(400);

});

test("returns an error Not Found when try to udpate a comunitario that not exists", async ()=>{
  const comunitario  = { nombre:"comunitario", 
    doppler:0, bidi:0, doble:0, consultorio:0
  } 
  const id = mongoose.Types.ObjectId().toHexString();
  const result = await request(app)
  .put(`/api/comunitarios/${id}`)
  .send(comunitario)
  .expect(404);

});

test.todo("returns an error if has empty name  when trying to update");
test.todo("update comunitario");