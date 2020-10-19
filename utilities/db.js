const mongoose = require('mongoose');
const User = require('../models/user');

const ObjectId = mongoose.Types.ObjectId;



async function findOrCreate(model, searchParameter, document) {
  const modelFound = await mongoose.model(model);
  let resultPromise = await modelFound.findOne(searchParameter, (erro, loc) => {
    if (erro) {
      console.log(erro);
    }    
  })
  if (resultPromise === null){
    resultPromise = await modelFound.create(document);
  }  
  return resultPromise;
}

async function findOneAndUpdate(model, searchParameter, changes) {
  const modelFound = await mongoose.model(model);
  const resultPromise = await modelFound.findOneAndUpdate(searchParameter, changes, (erro, loc) => {
    if (erro) {
      console.log(erro);
    }
  });
  return resultPromise;
}

async function findOneAndDelete(model, searchParameter) {
  const modelFound = await mongoose.model(model);
  const resultPromise = await modelFound.findOneAndDelete(searchParameter, (erro, loc) => {
    if (erro) {
      console.log(erro);
    }
  });
}

async function getFromDB(model, attribute, limit, sort, selection) {
  let maxLimit = 100;
  const modelFound = await mongoose.model(model);
  limit = (limit) ? limit : 1;
  limit = (limit>maxLimit||limit<1) ? maxLimit : limit;
  sort = (sort) ? sort : '_id';
  selection = (selection) ? selection : '';
  const resultPromise = await modelFound.find(attribute,).sort(sort).limit(limit).select(selection);
  return resultPromise;
}

module.exports = {
  getFromDB, findOrCreate,  findOneAndUpdate, findOneAndDelete
};
