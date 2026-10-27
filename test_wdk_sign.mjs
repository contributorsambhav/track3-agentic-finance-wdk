import WDK from '@tetherto/wdk'
import WalletManagerEvm, { WalletAccountReadOnlyEvm } from '@tetherto/wdk-wallet-evm'

const seed = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
const wdk = new WDK(seed).registerWallet('ethereum', WalletManagerEvm, {
  provider: 'https://polygon-rpc.com'
})

const customerAccount = await wdk.getAccount('ethereum', 0)
const customerAddress = await customerAccount.getAddress()

const merchantAccount = await wdk.getAccount('ethereum', 1)
const merchantAddress = await merchantAccount.getAddress()

const testVoucher = JSON.stringify({
  domain: { name: 'KibandaPay', version: '1', chainId: 137 },
  message: {
    sender: customerAddress,
    recipient: merchantAddress,
    amountUsdt: 15.00,
    nonce: 44,
    memo: 'Groceries: Sukuma Wiki'
  }
})

// 1. Customer signs offline
const signature = await customerAccount.sign(testVoucher)
console.log('Customer address:', customerAddress)
console.log('Signature:', signature)

// 2. Customer verifies own signature
const selfVerified = await customerAccount.verify(testVoucher, signature)
console.log('Customer self verification:', selfVerified)

// 3. Merchant verifies customer signature using customer address
const readOnlyCustomer = new WalletAccountReadOnlyEvm(customerAddress, {
  provider: 'https://polygon-rpc.com'
})
const merchantVerified = await readOnlyCustomer.verify(testVoucher, signature)
console.log('Merchant verified customer signature using customer public address:', merchantVerified)

wdk.dispose()
