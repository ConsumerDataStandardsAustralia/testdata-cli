
import { BankingTransactionDetail } from "consumer-data-standards/banking";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { CustomerWrapper, BankAccountWrapper } from "../../logic/schema/cdr-test-data-schema";
import { RandomBanking, TransactionStatus, TransactionType } from "../../random-generators";

const factoryId: string = "create-banking-transactions";

export class CreateBankingTransactions extends Factory {
    
    public static id: string = factoryId;


    private transactionType: TransactionType;
    private transactionStatus: TransactionStatus;
    private accountWrapper: BankAccountWrapper | undefined;

    public get briefDescription(): string {
       return  "Create a number of number of banking transactions.";
    }
    public get detailedDescription(): string {
        let st = `
        Create a number of number of banking transactions.

        This factory will accept the following options
              
        count:             The number of transactions to be issued for each account
        type:              The type of transaction to be created. This should be one of the values as defined inhttps://consumerdatastandardsaustralia.github.io/standards/#tocSbankingtransaction
                           If none specified, the type will be OTHER 
        status:            The status of transaction to be created. This should be one of the values as defined inhttps://consumerdatastandardsaustralia.github.io/standards/#tocSbankingtransaction
                           If none specified, the status will be POSTED                            

        Key values randomly allocated:
           Dates, numeric values, and other enumerated types`;
        return st;
    }
  
    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.transactionType = options?.options?.type ? options?.options?.type: RandomBanking.TransactionType();
        this.transactionStatus = options?.options?.status ? options?.options?.status as TransactionStatus: TransactionStatus.POSTED ;
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
            status: this.transactionStatus,
            type: this.transactionType
        };
        return transaction;
    }
}