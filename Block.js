const sha256 = require('crypto-js/sha256');
class Block{
  /*
    index, hash, timestamp, data, previousHash, nextBlock
  */
  constructor(index, data, previousHash,nextBlock=null,nonce){
    this.index = index;
    this.timestamp = Date.now().toString();
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.hash = this.calculateHash();
    this.nextBlock = nextBlock;
    
  } 
  calculateHash() {
    return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash +this.nonce).toString()
  }
  // Proof of Work
  mineBlock(difficulty){
    console.log("Mining.......");
    while(!this.hash.startsWith(Array(difficulty+1).join("0"))){
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}
module.exports.Block = Block;