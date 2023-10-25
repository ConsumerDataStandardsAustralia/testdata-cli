
import { BankingTransactionDetail } from "consumer-data-standards/banking";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { CustomerWrapper, BankAccountWrapper } from "../../logic/schema/cdr-test-data-schema";

const factoryId: string = "create-banking-transactions";

export class CreateBankingTransactions extends Factory {
    
    public static id: string = factoryId;

    public get briefDescription(): string {
       return  "Create a number of number of banking transactions.";
    }
    public get detailedDescription(): string {
        let st = `
        Create a number of number of banking transactions.

        This factory will accept the following options
              
        count:             The number of transactions to be issued for each account                    

        Key values randomly allocated:
           Dates, numeric values, and other enumerated types`;
        return st;
    }
  
    constructor(options: FactoryOptions) {
        super(options, factoryId);
      }

    public canCreateBankTransactions(): boolean { return true; };
    public generateBankTransactions(account: BankAccountWrapper): any[] | undefined {
        let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

        let ret: BankingTransactionDetail[] = [];
        for (let i = 0; i < count; i++) {
            const el = this.generateBankTransaction(account);
            if (el) ret.push(el);
        }
        return ret;

     }

    public canCreateBankTransaction(): boolean { return true; };
    public generateBankTransaction(account: BankAccountWrapper): any | undefined { 
        let transaction: BankingTransactionDetail = {
            extendedData: {
                payer: undefined,
                payee: undefined,
                extensionUType: undefined,
                x2p101Payload: undefined,
                service: "X2P1.01"
            },
            accountId: "",
            amount: "",
            description: "",
            isDetailAvailable: false,
            reference: "",
            status: "PENDING",
            type: "OTHER"
        };
        return transaction;
    }
}