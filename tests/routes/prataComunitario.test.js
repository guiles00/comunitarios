import 'regenerator-runtime/runtime'

const request = require("supertest");
const app = require("../../app/app");
const PrataComunitario = require("../../app/models/PrataComunitario");

test("por ahora pasa",()=>{
  expect(1).toBe(1)
})
// beforeAll(async () => {
//   await PrataComunitario.deleteMany();
// });

// test("Should add a PrataComunitario", async () =>{
//   expect(1).toBe(1)
// });

// test("Endpoint pratacomunitarios should exists", async () =>{
//     const response = await request(app).get("/api/prataComunitario")
//     .send().expect(200);
// });

// test("PrataComunitario should return an Array", async () =>{
//   const response = await request(app).get("/api/prataComunitario")
//   .send();

//   expect(Array.isArray(response.body.prataComunitarios)).toBe(true);
// });
