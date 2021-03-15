import 'regenerator-runtime/runtime'

const request = require("supertest");
const app = require("../../app/app");
const Comunitarios = require("../../app/models/Comunitarios");

beforeAll(async () => {
  await Comunitarios.deleteMany();
});

test("Should add a Comunitario", async (done) =>{
  const comunitario  = { nombre:"comunitario", 
    doppler:0, bidi:0, doble:0, consultorio:0
  } 
  const result = await request(app).post("/api/comunitarios").send(comunitario).expect(200); 
  done();
});

test("Endpoint should exists", async () =>{
    const response = await request(app).get("/api/comunitarios")
    .send().expect(200);
});

test("Comunitarios should return an Array", async () =>{
  const response = await request(app).get("/api/comunitarios")
  .send();

  expect(Array.isArray(response.body.comunitarios)).toBe(true);
});  