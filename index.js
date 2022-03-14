const express = require("express");
const mongoose = require("mongoose");

let app = express();
app.use(express.json());
const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/bankSystem");
};

// user schema
// step 1: create user schema

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String },
  },

  {
    timestamps: true,
  }
);

// step 2: create the model
const User = mongoose.model("User", userSchema);

// Branch schema
// step 1: create Branch schema
const branchDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    IFSC: { type: String, required: true },
    MICR: { type: String, required: true },
  },
  { timestamps: true, required: true }
);

// step 2: create the model
const Branch = mongoose.model("BranchDetails", branchDetailsSchema);

// masterAccount schema
// step 1: create masterAccount schema
const masterAccountSchema = new mongoose.Schema(
  {
    balance: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BranchDetails",
      required: true,
    },
  },
  { timestamps: true }
);
// step 2: create the model
const MasterAccount = mongoose.model("MasterAccount", masterAccountSchema); // s adds automatically

// savingsAccount schema
// step 1: create savingsAccount schema
const savingsAccountSchema = new mongoose.Schema(
  {
    account_number: { type: Number, required: true },
    balance: { type: Number, required: true },
    intrestRate: { type: Number, required: true },
    masterAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterAccounts",
      required: true,
    },
  },
  { timestamps: true }
);
// step 2: create the model
const SavingsAccount = mongoose.model("SavingsAccount", savingsAccountSchema);
// FixedAccounts schema
// step 1: create FixedAccounts schema
const fixedAccountSchema = new mongoose.Schema(
  {
    account_number: { type: Number, required: true },
    balance: { type: Number, required: true },
    intrestRate: { type: Number, required: true },
    startDate: { type: Date, required: true },
    maturityDate: { type: Date, required: true },
    masterAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterAccounts",
      required: true,
    },
  },
  { timestamps: true }
);
// step 2: create the model
const FixedAccounts = mongoose.model("FisedAccounts", fixedAccountSchema);

// now we have to create crud operations

//master account_number

app.get("/masterAccounts", async (req, res) => {
  try {
    const masterAccount = await MasterAccount.find().lean().exec();
    return res.status(200).send({ masterAccount: masterAccount });
  } catch (err) {
      res.send({message: err.message})
    console.log("Something went wrong", err);
  }
});

app.listen(6500, () => {
  console.log("listing to the port 6500");
});
