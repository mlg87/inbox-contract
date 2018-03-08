const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')

const provider = ganache.provider()
const web3 = new Web3(provider)

let accounts
let inbox
const INITIAL_MESSAGE = 'init message'
const NEW_MESSAGE = 'new message'

// deploy contract before each test
beforeEach(async () => {
  // get list of all accounts
  accounts = await web3.eth.getAccounts()
  // use one account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' })

  inbox.setProvider(provider)
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('sets the initial message to: init message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, INITIAL_MESSAGE)
  })

  it('updates the value of message when setMessage is called', async () => {
    await inbox.methods.setMessage(NEW_MESSAGE).send({ from: accounts[0] })
    const newMessage = await inbox.methods.message().call()
    assert.equal(newMessage, NEW_MESSAGE)
  })
})
