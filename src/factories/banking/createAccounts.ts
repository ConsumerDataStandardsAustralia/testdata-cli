import { BankingAccountDetailV3, BankingCreditCardAccount, BankingLoanAccountV2, BankingTermDepositAccount, CommonPhysicalAddress } from "consumer-data-standards/banking";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { CustomerWrapper, BankAccountWrapper } from "../../logic/schema/cdr-test-data-schema";
import { AccountOwnership, OpenStatus, ProductCategory, RandomBanking, SpecificAccountUType } from '../../random-generators/random-banking'
import { generateDepositRateArray, generateLendingRateArray, generateBankingProductFeatures, generateBankingProductFeeArray } from "./utils";
import Utils from "../common/utils";

const factoryId: string = "create-banking-accounts";

export class CreateBankingAccounts extends Factory {
    
    public static id: string = factoryId;

    public get briefDescription(): string {
       return  "Create a number of number of banking accounts.";
    }
    public get detailedDescription(): string {
        let st = `
        Create a number of number of banking accounts.

        This factory will accept the following options
              
           productCategory:  This should be BankingProductCategory as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingproductcategory
                             If not specified it will be randomnly assigned.
           accountOwnership: This should be one of the values as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingaccountv2
                             If not specified UNKOWN is being assigned
           openStatus:       This should be one of the values as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingaccountv2
                             If not specified OPEN is being assigned                            

        Key values randomly allocated:
           Dates, numeric values, and other enumerated types`;
        return st;
    }

    private category: ProductCategory;
    private openStatus: OpenStatus;
    private accountOwnership: AccountOwnership
  
    constructor(options: FactoryOptions) {
      super(options, factoryId);
      this.category = options?.options?.productCategory ? options?.options?.productCategory as ProductCategory : RandomBanking.ProductCategory();
      this.openStatus = options?.options?.openStatus ? options?.options?.openStatus as OpenStatus : OpenStatus.OPEN;
      this.accountOwnership = options?.options?.accountOwnership ? options?.options?.accountOwnership as AccountOwnership : AccountOwnership.UNKNOWN;
    }

    public canCreateBankAccount(): boolean { return true; };
    public generateBankAccount(customer: CustomerWrapper): BankAccountWrapper | undefined {

        // basic properties from BankingAccount
        let bankingAccount: BankingAccountDetailV3 = {
            accountId: Helper.randomId(),
            accountOwnership: this.accountOwnership,
            displayName: this.generateDisplayName(this.category),
            maskedNumber: this.generateMaskedAccountString(this.category),
            productCategory: this.category,
            productName: this.generateProductName(this.category),
        };

        if (Math.random() > 0.5) bankingAccount.creationDate =  Helper.randomDateTimeInThePast();
        if (Math.random() > 0.5) bankingAccount.nickname =  "My account";
        if (Math.random() > 0.5) bankingAccount.openStatus =  this.openStatus;
        if (Math.random() > 0.5) bankingAccount.isOwned =  Helper.randomBoolean(0.8);

        
        // properties from BankingAccountDetail
        if (Math.random() > 0.5) bankingAccount.bsb = `${Helper.generateRandomIntegerInRange(100000, 999999)}`;
        if (Math.random() > 0.5) bankingAccount.accountNumber = `${Helper.generateRandomIntegerInRange(10000000, 99999999)}`;
        if (Math.random() > 0.5) bankingAccount.bundleName = "Professional Account Package";

        let specificAccountUType = RandomBanking.SpecificAccountUType();
        if (Math.random() > 0.25) bankingAccount.specificAccountUType = specificAccountUType;
        if (bankingAccount?.specificAccountUType != null) {
            switch (bankingAccount.specificAccountUType) {
                case SpecificAccountUType.creditCard: bankingAccount.creditCard = this.generateBankingCreditCardAccount();
                    break;
                case SpecificAccountUType.loan: bankingAccount.loan = this.generateBankingLoanAccount();
                    break;
                case SpecificAccountUType.termDeposit: bankingAccount.termDeposit = this.generateBankingTermDepositAccount();
                    break;                                           
            }
        }
        if (Math.random() > 0.5) bankingAccount.depositRates = generateDepositRateArray("tome");
        if (Math.random() > 0.5) bankingAccount.lendingRates = generateLendingRateArray("tome");

        if (Math.random() > 0.5) {
            let objArray = generateBankingProductFeatures("tome");
            objArray.forEach(obj => {
                if (Math.random() > 0.5) obj.isActivated = Helper.randomBoolean(0.5);
            })
            bankingAccount.features = objArray;

        }
        if (Math.random() > 0.5) bankingAccount.fees = generateBankingProductFeeArray("tome");
        if (Math.random() > 0.5) { 
            customer.customer.customerUType
            let addresses: CommonPhysicalAddress[] = [];
            let address = Utils.createCommPhysicalAddress(customer.customer.customerUType);
            addresses.push(address)
            bankingAccount.addresses = addresses;
        }
        // add balance
        // add transactions

        let result: BankAccountWrapper = {         
            account: bankingAccount
        };
        return result;
    }

    private generateBankingTermDepositAccount(): BankingTermDepositAccount[] {
        let ret : BankingTermDepositAccount[] = [];
        let obj: BankingTermDepositAccount = {
            lodgementDate: "",
            maturityDate: "",
            maturityInstructions: "HOLD_ON_MATURITY"
        }
        ret.push(obj);
        return ret;
    }

    private generateBankingCreditCardAccount(): BankingCreditCardAccount {
        let ret: BankingCreditCardAccount = {
            minPaymentAmount: "",
            paymentDueAmount: "",
            paymentDueDate: ""
        }
        return ret;
    }

    private generateBankingLoanAccount(): BankingLoanAccountV2 {
        let ret: BankingLoanAccountV2 = {

        }
        return ret;
    }

    private generateMaskedAccountString(cat: ProductCategory): string {
        let ret: string = "";
        switch (cat) {
            case ProductCategory.CRED_AND_CHRG_CARDS: {
                let intSt = Helper.generateRandomIntegerInRange(1000, 9999);
                let ret = `xxxx xxxx xxxx ${intSt}`
                break;
            }
            case ProductCategory.TRANS_AND_SAVINGS_ACCOUNTS: {
                let intSt = Helper.generateRandomIntegerInRange(1000, 9999);
                let ret = `xxx-xxx xxxxx${intSt}`;
                break;
            }
            default: {
                let intSt = Helper.generateRandomIntegerInRange(1000, 9999);
                let ret = `xxxxx${intSt}`;
                break;             
            }
        }
        return ret;
    }

    private generateDisplayName(cat: ProductCategory): string {
        let ret: string = '';
        return ret;
    }

    private generateProductName(cat: ProductCategory): string {
        let ret: string = '';
        return ret;
    }
  
    public canCreateBankAccounts(): boolean { return true; };
    public generateBankAccounts(customer: CustomerWrapper): BankAccountWrapper[] | undefined { 
        let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

        let ret: BankAccountWrapper[] = [];
        for (let i = 0; i < count; i++) {
            const el = this.generateBankAccount(customer);
            if (el) ret.push(el);
        }
        return ret;
    }

}