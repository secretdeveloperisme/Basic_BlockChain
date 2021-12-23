const Block = require('./Block').Block;
const util = require('util');

class BlockChain{
  constructor(){
    this.length = 0;
    this.head = this.generateGenesisBlock();
    this.difficulty = 4;
    
  }
  addBlock(data){  
    let lastedBlock = this.getLastedBlock();
    let block = new Block(++this.length, data, lastedBlock.hash,null,1);
    block.mineBlock(this.difficulty)
    lastedBlock.nextBlock = block;
  }
  generateGenesisBlock(){
    return (new Block(this.length,"Genesis Block", "0",null,1));
  }
  getLastedBlock(){
    let temp = this.head;
    while(temp.nextBlock != null){
      temp = temp.nextBlock;
    }
    return temp;
  }
  isValidBlockChain(){
    let temp = this.head;
    while(temp.nextBlock != null){
      // console.log(temp.hash,temp.calculateHash());
      if(temp.hash != temp.calculateHash()){
        return false;
      }
      if(temp.hash != temp.nextBlock.previousHash){
        return false;
      }
      temp = temp.nextBlock;
    }
    return true;
  }
  printBlockChain(){
    let temp = this.head;
    console.log("Genesis Block");
    while(temp.nextBlock != null){
      console.log("========"+"Block "+temp.index+"========");
      console.log(util.inspect(temp,false,0,true))
      console.log(util.inspect(temp.data,false,0,true))
      temp = temp.nextBlock;
    }
    console.log("========"+"Block "+temp.index+"========");
    console.log(util.inspect(temp,false,0,true))
    console.log(util.inspect(temp.data,false,0,true))
  }
}

let blockChain = new BlockChain();
blockChain.addBlock(data={amount:5});
blockChain.addBlock(data={amount:10});
blockChain.printBlockChain();
console.log("Is valid Block Chain ? "+blockChain.isValidBlockChain());
blockChain.head.nextBlock.data = {amount : 1000};
blockChain.head.nextBlock.hash = blockChain.head.nextBlock.calculateHash()
// console.log(util.inspect(blockChain,true,null,true))
console.log("Is valid Block Chain ? "+blockChain.isValidBlockChain());
// blockChain.printBlockChain()