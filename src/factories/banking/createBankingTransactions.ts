
import { BankingTransactionDetail } from "consumer-data-standards/banking";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { CustomerWrapper, BankAccountWrapper } from "../../logic/schema/cdr-test-data-schema";
import { ExtensionUType, RandomBanking, TransactionStatus, TransactionType, generateRandomDecimalInRangeFormatted } from "../../random-generators";

import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";

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
              
        count:             The number of transactions to be issued for each account. Default is 1
        type:              The type of transaction to be created. This should be one of the values as defined inhttps://consumerdatastandardsaustralia.github.io/standards/#tocSbankingtransaction
                           If none specified, the type will be randomly assigned
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
        let detailIsAvailable: boolean = Helper.randomBoolean(0.5);

        let executionDateTime = Helper.randomDateTimeInThePast();
        let valueDateTime = Helper.generateRandomDateTimeInRange(executionDateTime, Date());
        let postingDateTime = Helper.generateRandomDateTimeInRange(valueDateTime, Date());
        

        let transaction: BankingTransactionDetail = {
            extendedData: {
                service: "X2P1.01"  
            },
            accountId: account.account.accountId,
            amount: this.generateTransactionAmount(this.transactionType),
            description: faker.finance.transactionDescription(),
            isDetailAvailable: detailIsAvailable,
            reference: "",
            status: this.transactionStatus,
            type: this.transactionType
        };
        if (Math.random() > 0.5) transaction.extendedData.extensionUType = "x2p101Payload";
        if (transaction.extendedData?.extensionUType) {
            transaction.extendedData.x2p101Payload = {
                
                extendedDescription: faker.random.words(6),
                endToEndId: randomUUID(),
                // NPP typically uses 4 letter code
                purposeCode: faker.random.alpha({count: 4, casing: 'upper'})
            };
        }
        if (detailIsAvailable == true) transaction.transactionId = randomUUID();
        if (transaction.status == TransactionStatus.POSTED || Math.random() > 0.5) transaction.postingDateTime = postingDateTime;
        if (Math.random() > 0.5) transaction.valueDateTime = valueDateTime;
        if (Math.random() > 0.5) transaction.executionDateTime = executionDateTime;
        if (Math.random() > 0.5) transaction.apcaNumber = Helper.randomId(6);
        if (Math.random() > 0.5) transaction.currency = RandomBanking.Currency();
        if (Math.random() > 0.2) transaction.reference = faker.finance.routingNumber();
        let companyName = faker.company.name();
        // for outgoing transactiosn set merchant info
        if (parseFloat(transaction.amount) < 0) {
            transaction.merchantName = companyName;
            transaction.merchantCategoryCode = Helper.randomId(4);
            transaction.extendedData.payee = `xxx-xxx xxxx${Helper.generateRandomIntegerInRange(1000, 9999)}`
        } else {
            transaction.extendedData.payer = faker.name.fullName()
        }
        // some transactions could be BPAY
        if (this.transactionType == TransactionType.PAYMENT && Math.random() > 0.75){
            // biller code is between 3 and 10 digits
            let cnt = Helper.generateRandomIntegerInRange(3, 10);
            transaction.billerCode = Helper.randomId(cnt);
            transaction.billerName = companyName;
            transaction.crn = `xxxx-xxxx-xxxx-${Helper.randomId(4)}`
        }
        return transaction;
    }

    private generateTransactionAmount(transType: TransactionType): string {
        let ret = "1.00";
        switch (transType) {
            case TransactionType.DIRECT_DEBIT: ret = generateRandomDecimalInRangeFormatted(-5000, -10, 2);
                break;
            case TransactionType.FEE: ret = generateRandomDecimalInRangeFormatted(-100, -0.5, 2);
                break;
            case TransactionType.INTEREST_CHARGED: ret = generateRandomDecimalInRangeFormatted(-10000, -10, 2);
                break;
            case TransactionType.INTEREST_PAID: ret = generateRandomDecimalInRangeFormatted(10, 10000, 2);
                break;
            case TransactionType.OTHER: ret = generateRandomDecimalInRangeFormatted(10, 5000, 2);
                break;
            case TransactionType.PAYMENT: ret = generateRandomDecimalInRangeFormatted(-10000, -0.01, 2);
                break;
            case TransactionType.TRANSFER_INCOMING: ret = generateRandomDecimalInRangeFormatted(1, 100000, 2);
                break;
            case TransactionType.TRANSFER_OUTGOING: ret = generateRandomDecimalInRangeFormatted(-100000, -0.5, 2);
                break;   
            default: break;             
        }
        return ret;
    }
}