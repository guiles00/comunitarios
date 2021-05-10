const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { promisify } = require("util");
const { scrypt, randomBytes } = require("crypto");
const scryptAsync = promisify(scrypt);

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  toJSON: {
    transform(doc, ret){
      delete ret.password;
    }
  }
});

userSchema.pre("save", async function(done){
  if (this.isModified("password")){

    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(this.password, salt, 64));

    const hashed = `${buf.toString("hex")}.${salt}`;

    this.set("password", hashed); 
  }
  done();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
