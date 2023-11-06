import { BankAccountWrapper } from '../../logic/schema/cdr-test-data-schema';
import {  RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { BankingBalance, BankingBalancePurse, BankingTransaction } from 'consumer-data-standards/banking';

const factoryId: string = "create-banking-balances";


export class CreateBalances extends Factory {

  constructor(options: FactoryOptions) {
    super(options, factoryId);

  }

  public static id: string = factoryId;


  public get briefDescription(): string {
    return "Create a number of banking balances.";
  }
  public get detailedDescription(): string {
    let st = `
Create the bankign balances based on account transactions.

    - This factory does not accept options
    
Key values randomly allocated:
    - Dates, numeric values, and other enumerated types
            `;
    return st;
  }

  public canCreateBankBalance(): boolean { return true; };
  public generateBankBalance(account: BankAccountWrapper): BankingBalance | undefined {
    let balance = this.calculateBalanceFromTransactions(account);
    let creditLimit = "50000.00";
    let availableBalance = Math.max(0, (parseFloat(creditLimit) + parseFloat(balance))).toFixed(2);
    let ret: BankingBalance = {
      accountId: account.account.accountId,
      availableBalance: availableBalance,
      currentBalance: balance
    }
    if (Math.random() > 0.25) ret.creditLimit = creditLimit;
    if (Math.random() > 0.25) ret.amortisedLimit = "25000.00";
    if (Math.random() > 0.25) ret.pusess = this.generateBalancePurses(Helper.generateRandomIntegerInRange(1,5));
    if (Math.random() > 0.75) ret.currency = RandomBanking.Currency();
    return ret;
  }

  private calculateBalanceFromTransactions(account: BankAccountWrapper): string {
    let startBalance = 0;
    account?.transactions?.forEach((tr:BankingTransaction) => {
      startBalance += parseFloat(tr.amount)
    })
    return startBalance.toFixed(2);
  }


  private generateBalancePurses(cnt: number): BankingBalancePurse[] {
    let purses: BankingBalancePurse[] = [];
    for(let i = 0; i < cnt; i++) {
      let purse: BankingBalancePurse = {
        amount: Helper.generateRandomDecimalInRange(-2500, 50000, 2),      
      }
      if (Math.random() > 0.5) purse.currency = RandomBanking.Currency();
      purses.push(purse);
    }
    return purses;

  }
}