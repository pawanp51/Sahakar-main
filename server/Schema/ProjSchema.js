const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GraphSchema = new Schema({
  name: { type: String, required: true },
  income: { type: Number, required: true },
  expense: { type: Number, required: true }
});

const TransactionSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  Amount: { type: Number, required: true },
  Date: { type: String, required: true },
  Status: { type: String, enum: ['credited', 'Debited'], required: true }
});

const SavingPlanSchema = new Schema({
  name: { type: String, required: true },
  target: { type: Number, required: true },
  saving: { type: Number, required: true }
});

const ExpenseDataSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true }
});

const MainSchema = new Schema({
  projectid:{type:Number, required: true},
  projectname: { type:String, required: true},
  expense: { type: Number, required: true },
  profit: { type: Number, required: true },
  revenue: { type: Number, required: true },
  graph: [GraphSchema],
  transaction: [TransactionSchema],
  mydept: { type: String, required: true },
  investment: { type: Number, required: true },
  savingplan: [SavingPlanSchema],
  expenseData: [ExpenseDataSchema]
});

const project_db =  mongoose.model('view_project', MainSchema);
module.exports = project_db;
