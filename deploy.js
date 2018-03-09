const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  // NOTE insert mnemonic here __________ // my account mnemonic
  'https://rinkeby.infura.io/PcoQkPnG5QBh9kTHJ8xr', // my test netowrk link
  2, // address index (my dev account)
  10 // # of addresses to return (not working)
)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  const tx = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['first deploy to rinkeby'] })
    .send({ gas: 1000000, from: accounts[0] })

  console.log('contract successfully deployed, tx:', tx.options.address)
}
deploy()
