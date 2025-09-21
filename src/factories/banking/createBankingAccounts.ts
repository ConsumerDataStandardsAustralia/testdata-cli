import { BankingAccountDetailV3, BankingAccountDetailV4, BankingAccountDetailV5, BankingAccountId, BankingCreditCardAccount, BankingLoanAccountV3,
    BankingTermDepositAccount, CommonPhysicalAddress, BankingBalance, BankingLoanAccountV2 } from "consumer-data-standards/banking";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { CustomerWrapper, BankAccountWrapper } from "../../schema/cdr-test-data-schema";
import { AccountOwnership, Currency, OpenStatus, ProductCategory, RandomBanking, SpecificAccountUType } from '../../random-generators/random-banking'
import { generateDepositRateArray,generateDepositRateArrayV2, generateLendingRateArrayV2, generateLendingRateArrayV3, 
     generateBankingProductFeaturesV2, generateBankingProductFeaturesV3, generateBankingProductFeaturesV4, generateBankingProductFeeArray, generateBankingProductFeeArrayV2 } from "./utils";
import Utils from "../common/utils";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { BankingBalancePurse } from "consumer-data-standards/banking";

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

    - count:            The number of accounts to be created for each account. Default is 1        
    - productCategory:  This should be BankingProductCategory as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingproductcategory
                        If not specified it will be randomnly assigned.
    - accountOwnership: This should be one of the values as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingaccountv2
                        If not specified it will be randomnly assigned.
    - openStatus:       This should be one of the values as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingaccountv2
                        If not specified it will be randomnly assigned.                       
    - version:          version of BankingAccountDetail schema. Default is latest (5)
Key values randomly allocated:
    - Dates, numeric values, and other enumerated types
           `;
        return st;
    }

    private category: ProductCategory;
    private openStatus: OpenStatus;
    private accountOwnership: AccountOwnership
    private detailVersion: number | null;

    constructor(options: FactoryOptions) {
      super(options, factoryId);
      this.category = options?.options?.productCategory ? options?.options?.productCategory as ProductCategory : RandomBanking.ProductCategory();
      this.openStatus = options?.options?.openStatus ? options?.options?.openStatus as OpenStatus : RandomBanking.OpenStatus();
      this.accountOwnership = options?.options?.accountOwnership ? options?.options?.accountOwnership as AccountOwnership : RandomBanking.AccountOwnership();
      this.detailVersion = options?.options?.version ? options?.options?.version as number : 4;
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

    public canCreateBankAccount(): boolean { return true; };
    public generateBankAccount(customer: CustomerWrapper): BankAccountWrapper | undefined {
        var bankingAccount: any;
        if (this.detailVersion == 5) {
            bankingAccount = this.generateBankingAccountDetailsV5(customer)
        }
        if (this.detailVersion == 4) {
            bankingAccount = this.generateBankingAccountDetailsV4(customer)
        }
        if (this.detailVersion == 3) {
            bankingAccount = this.generateBankingAccountDetailsV3(customer)
        }
        let bal = this.generateBankingAccountBalance(bankingAccount.accountId);
        let result: BankAccountWrapper = {
            account: bankingAccount,
            balance: bal
        };
        return result;
    }

    private generateBankingAccountBalance(accountId: string): BankingBalance {
        let purses: BankingBalancePurse[] = [];
        let purseCount = Helper.generateRandomIntegerInRange(0, 3);
        for (let i = 0; i < purseCount; i++) {
            let purse: BankingBalancePurse = {
                amount:  Helper.generateRandomDecimalInRange(10, 10000, 2)
            }
            if (Math.random() > 0.5) purse.currency =  RandomBanking.Currency();
            purses.push(purse)
        }

        let balance: BankingBalance = {
            accountId: accountId,
            currentBalance: Helper.generateRandomDecimalInRange(-5000, 1000000, 2),
            availableBalance: Helper.generateRandomDecimalInRange(0, 1000000, 2)
        }
        if (Math.random() > 0.5) balance.purses =  purses;
        if (Math.random() > 0.5) balance.creditLimit =  Helper.generateRandomDecimalInRange(5000, 1000000, 2);
        if (Math.random() > 0.5) balance.amortisedLimit =  Helper.generateRandomDecimalInRange(5000, 1000000, 2);;
        return balance
    }

    private generateBankingAccountDetailsV3(customer: CustomerWrapper) : BankingAccountDetailV3{

        // basic properties from BankingAccount
        let bankingAccount: BankingAccountDetailV3 = {
            accountId: randomUUID(),
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

        // create a url used for fees, rates, etc. Normally these should correspond to a brand, similar to how this occurs in the products factory
        let baseUrl = faker.internet.url();

        let uType = this.generateSpecificUType(this.category);
        if (uType)
            bankingAccount.specificAccountUType = uType
        if (bankingAccount?.specificAccountUType != null) {
            switch (bankingAccount.specificAccountUType) {
                case SpecificAccountUType.creditCard: bankingAccount.creditCard = this.generateBankingCreditCardAccount();
                    break;
                case SpecificAccountUType.loan: bankingAccount.loan = this.generateBankingLoanAccountV2();
                    break;
                case SpecificAccountUType.termDeposit: bankingAccount.termDeposit = this.generateBankingTermDepositAccount();
                    break;                                           
            }
        }
        if (Math.random() > 0.5) bankingAccount.depositRates = generateDepositRateArray(baseUrl);
        if (Math.random() > 0.5) bankingAccount.lendingRates = generateLendingRateArrayV2(baseUrl);

        if (Math.random() > 0.5) {
            let objArray = generateBankingProductFeaturesV2(baseUrl);
            objArray.forEach((obj: any) => {
                if (Math.random() > 0.5) obj.isActivated = Helper.randomBoolean(0.5);
            })
            bankingAccount.features = objArray;

        }
        if (Math.random() > 0.5) bankingAccount.fees = generateBankingProductFeeArray(baseUrl);
        if (Math.random() > 0.5) { 
            let addresses: CommonPhysicalAddress[] = [];
            // create either 1 or two addresses
            let cnt = Helper.generateRandomIntegerInRange(1,2);
            for (let i = 0; i < cnt; i++) {
                let address = Utils.createCommPhysicalAddress(customer.customer.customerUType as string);
                addresses.push(address)       
            }
            bankingAccount.addresses = addresses;
        }

        return bankingAccount;
    }

    private generateBankingAccountDetailsV4(customer: CustomerWrapper) : BankingAccountDetailV4 {
        // basic properties from BankingAccount
        let bankingAccount: BankingAccountDetailV4 = {
            accountId: randomUUID(),
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

        // create a url used for fees, rates, etc. Normally these should correspond to a brand, similar to how this occurs in the products factory
        let baseUrl = faker.internet.url();

        let uType = this.generateSpecificUType(this.category);
        if (uType)
            bankingAccount.specificAccountUType = uType
        if (bankingAccount?.specificAccountUType != null) {
            switch (bankingAccount.specificAccountUType) {
                case SpecificAccountUType.creditCard: bankingAccount.creditCard = this.generateBankingCreditCardAccount();
                    break;
                case SpecificAccountUType.loan: bankingAccount.loan = this.generateBankingLoanAccountV3();
                    break;
                case SpecificAccountUType.termDeposit: bankingAccount.termDeposit = this.generateBankingTermDepositAccount();
                    break;                                           
            }
        }
        if (Math.random() > 0.5) bankingAccount.depositRates = generateDepositRateArrayV2(baseUrl);
        if (Math.random() > 0.5) bankingAccount.lendingRates = generateLendingRateArrayV3(baseUrl);

        if (Math.random() > 0.5) {
            let objArray = generateBankingProductFeaturesV3(baseUrl);
            objArray.forEach((obj: any) => {
                if (Math.random() > 0.5) obj.isActivated = Helper.randomBoolean(0.5);
            })
            bankingAccount.features = objArray;

        }
        if (Math.random() > 0.5) bankingAccount.fees = generateBankingProductFeeArrayV2(baseUrl);
        if (Math.random() > 0.5) { 
            customer.customer.customerUType
            let addresses: CommonPhysicalAddress[] = [];
            // create either 1 or two addresses
            let cnt = Helper.generateRandomIntegerInRange(1,2);
            for (let i = 0; i < cnt; i++) {
                let address = Utils.createCommPhysicalAddress(customer.customer.customerUType as string);
                addresses.push(address)       
            }
            bankingAccount.addresses = addresses;
        }
        return bankingAccount;        
    }
    
    private generateBankingAccountDetailsV5(customer: CustomerWrapper) : BankingAccountDetailV5 {
        // basic properties from BankingAccount
        let bankingAccount: BankingAccountDetailV5 = {
            accountId: randomUUID(),
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

        // create a url used for fees, rates, etc. Normally these should correspond to a brand, similar to how this occurs in the products factory
        let baseUrl = faker.internet.url();

        let uType = this.generateSpecificUType(this.category);
        if (uType)
            bankingAccount.specificAccountUType = uType
        if (bankingAccount?.specificAccountUType != null) {
            switch (bankingAccount.specificAccountUType) {
                case SpecificAccountUType.creditCard: bankingAccount.creditCard = this.generateBankingCreditCardAccount();
                    break;
                case SpecificAccountUType.loan: bankingAccount.loan = this.generateBankingLoanAccountV3();
                    break;
                case SpecificAccountUType.termDeposit: bankingAccount.termDeposit = this.generateBankingTermDepositAccount();
                    break;                                           
            }
        }
        if (Math.random() > 0.5) bankingAccount.depositRates = generateDepositRateArrayV2(baseUrl);
        if (Math.random() > 0.5) bankingAccount.lendingRates = generateLendingRateArrayV3(baseUrl);

        if (Math.random() > 0.5) {
            let objArray = generateBankingProductFeaturesV4(baseUrl);
            objArray.forEach((obj: any) => {
                if (Math.random() > 0.5) obj.isActivated = Helper.randomBoolean(0.5);
            })
            bankingAccount.features = objArray;

        }
        if (Math.random() > 0.5) bankingAccount.fees = generateBankingProductFeeArrayV2(baseUrl);
        if (Math.random() > 0.5) { 
            let addresses: CommonPhysicalAddress[] = [];
            // create either 1 or two addresses
            let cnt = Helper.generateRandomIntegerInRange(1,2);
            for (let i = 0; i < cnt; i++) {
                let address = Utils.createCommPhysicalAddress(customer.customer.customerUType as string);
                addresses.push(address)       
            }
            bankingAccount.addresses = addresses;
        }
        return bankingAccount;        
    }    

    private generateBankingTermDepositAccount(): BankingTermDepositAccount[] {

        let ret : BankingTermDepositAccount[] = [];
        let cnt = Helper.generateRandomIntegerInRange(1,3);
        for (let i = 0; i <= cnt; i++) {
            let obj: BankingTermDepositAccount = {
                lodgementDate: Helper.randomDateTimeInThePast(),
                maturityDate: Helper.randomDateTimeInTheFuture(),
                maturityInstructions: RandomBanking.MaturityInstructions()
            }
            RandomBanking
            // randonly assign a maturity amount
            if (Math.random() > 0.5) obj.maturityAmount = (parseFloat(Helper.generateRandomDecimalInRange(0, 100000))* 0.1).toFixed(2);
            if (Math.random() > 0.5) obj.maturityCurrency = this.getRandomCurrency();
            ret.push(obj);
        }
        return ret;
    }

    private generateBankingCreditCardAccount(): BankingCreditCardAccount {
        let amount= Math.random() * 45000;
        let minAmount = amount * 0.012;

        let ret: BankingCreditCardAccount = {
            minPaymentAmount: amount.toFixed(2).toString(),
            paymentDueAmount: minAmount.toFixed(2).toString(),
            paymentDueDate: Helper.randomDateTimeInTheFuture()
        }
        if (Math.random() > 0.5) ret.paymentCurrency = this.getRandomCurrency();
        return ret;
    }

    private generateBankingLoanAccountV2(): BankingLoanAccountV2 {
        let ret: BankingLoanAccountV2 = {
        }
        const loanAmount = Helper.generateRandomDecimalInRange(5000, 1000000, 2);
        let offsetAccountIds: BankingAccountId[] = [];
        const numOfAccountIds =  Helper.generateRandomIntegerInRange(0,5);
        for (let i=0; i < numOfAccountIds; i++){
            let accId: BankingAccountId = randomUUID();
            offsetAccountIds.push(accId)
        }
        if (Math.random() > 0.5) ret.repaymentType =  RandomBanking.RepaymentType()
        if (Math.random() > 0.5) ret.originalStartDate =  Helper.randomDateTimeInThePast();
        if (Math.random() > 0.5) ret.originalLoanAmount =  loanAmount
        if (Math.random() > 0.5) ret.originalLoanCurrency =  "AUD";
        if (Math.random() > 0.5) ret.loanEndDate =  Helper.randomDateTimeInTheFuture();
        if (Math.random() > 0.5) ret.loanEndDate =  Helper.randomDateTimeInTheFuture();
        if (Math.random() > 0.5) ret.nextInstalmentDate =  Helper.randomDateTimeInTheFuture();
        if (Math.random() > 0.5) ret.minInstalmentAmount =  Helper.generateRandomDecimalInRange(+loanAmount/100, +loanAmount/4, 2);
        if (Math.random() > 0.5) ret.minInstalmentCurrency =  "AUD";
        if (Math.random() > 0.5) ret.maxRedraw =  Helper.generateRandomDecimalInRange(+loanAmount/100, +loanAmount/4, 2);
        if (Math.random() > 0.5) ret.maxRedrawCurrency =  "AUD";
        if (Math.random() > 0.5) ret.minRedraw =  Helper.generateRandomDecimalInRange(+loanAmount/1000, +loanAmount/10, 2);
        if (Math.random() > 0.5) ret.offsetAccountEnabled =   Helper.randomBoolean(0.5);;    
        if (Math.random() > 0.5) ret.minRedrawCurrency =  "AUD";     
        if (Math.random() > 0.5) ret.offsetAccountIds =  offsetAccountIds; 
        if (Math.random() > 0.5) ret.repaymentFrequency =  "P1M"; 
        return ret;
    }

    private generateBankingLoanAccountV3(): BankingLoanAccountV3 {
        let ret: BankingLoanAccountV3 = {
            repaymentType: RandomBanking.RepaymentType()
        }
        const loanAmount = Helper.generateRandomDecimalInRange(5000, 1000000, 2);
        let offsetAccountIds: BankingAccountId[] = [];
        const numOfAccountIds =  Helper.generateRandomIntegerInRange(0,5);
        for (let i=0; i < numOfAccountIds; i++){
            let accId: BankingAccountId = randomUUID();
            offsetAccountIds.push(accId)
        }

        if (Math.random() > 0.5) ret.originalStartDate =  Helper.randomDateTimeInThePast();
        if (Math.random() > 0.5) ret.originalLoanAmount =  loanAmount
        if (Math.random() > 0.5) ret.originalLoanCurrency =  "AUD";
        if (Math.random() > 0.5) ret.loanEndDate =  Helper.randomDateTimeInTheFuture();
        if (Math.random() > 0.5) ret.loanEndDate =  Helper.randomDateTimeInTheFuture();
        if (Math.random() > 0.5) ret.nextInstalmentDate =  Helper.randomDateTimeInTheFuture();
        if (Math.random() > 0.5) ret.minInstalmentAmount =  Helper.generateRandomDecimalInRange(+loanAmount/100, +loanAmount/4, 2);
        if (Math.random() > 0.5) ret.minInstalmentCurrency =  "AUD";
        if (Math.random() > 0.5) ret.maxRedraw =  Helper.generateRandomDecimalInRange(+loanAmount/100, +loanAmount/4, 2);
        if (Math.random() > 0.5) ret.maxRedrawCurrency =  "AUD";
        if (Math.random() > 0.5) ret.minRedraw =  Helper.generateRandomDecimalInRange(+loanAmount/1000, +loanAmount/10, 2);
        if (Math.random() > 0.5) ret.offsetAccountEnabled =   Helper.randomBoolean(0.5);;    
        if (Math.random() > 0.5) ret.minRedrawCurrency =  "AUD";     
        if (Math.random() > 0.5) ret.offsetAccountIds =  offsetAccountIds; 
        if (Math.random() > 0.5) ret.repaymentFrequency =  "P1M"; 
        return ret;
    }

    private generateMaskedAccountString(cat: ProductCategory): string {
        let ret: string = "";
        switch (cat) {
            case ProductCategory.CRED_AND_CHRG_CARDS: {
                let intSt = Helper.generateRandomIntegerInRange(1000, 9999);
                ret = `xxxx xxxx xxxx ${intSt}`
                break;
            }
            case ProductCategory.TRANS_AND_SAVINGS_ACCOUNTS: {
                let intSt = Helper.generateRandomIntegerInRange(1000, 9999);
                ret = `xxx-xxx xxxxx${intSt}`;
                break;
            }
            default: {
                let intSt = Helper.generateRandomIntegerInRange(1000, 9999);
                ret = `xxxxx${intSt}`;
                break;             
            }
        }
        return ret;
    }

    private getRandomCurrency(): string {
        let curr: string[] = [
            "AUD" , "USD" , "GPB" 
        ] ;
        let idx = Helper.generateRandomIntegerInRange(0,curr.length-1);
        return curr[idx];
    }

    private generateSpecificUType(cat: ProductCategory): SpecificAccountUType | null {

        if (cat in [ProductCategory.CRED_AND_CHRG_CARDS, ProductCategory.TRAVEL_CARDS]) {
            return SpecificAccountUType.creditCard
        }
        else if (cat in [ProductCategory.RESIDENTIAL_MORTGAGES, ProductCategory.OVERDRAFTS, ProductCategory.PERS_LOANS, ProductCategory.MARGIN_LOANS]) {
            return SpecificAccountUType.loan
        }
        else if (cat in [ProductCategory.TERM_DEPOSITS, ProductCategory.REGULATED_TRUST_ACCOUNTS]) {
            return SpecificAccountUType.termDeposit
        } else {
            return null
        }        
    }

    private generateDisplayName(cat: ProductCategory): string {
        let ret: string = '';
        switch (cat) {
            case ProductCategory.BUSINESS_LOANS: ret = "Standard Business Loan";
                break;
            case ProductCategory.CRED_AND_CHRG_CARDS: ret = "Super Platinum Card";
                break;
            case ProductCategory.LEASES: ret = "Novated Lease Account";
                break;
            case ProductCategory.OVERDRAFTS: ret = "Overdraft Account";
                break;
            case ProductCategory.PERS_LOANS: ret = "Unsecured Personal Loan";
                break;
            case ProductCategory.RESIDENTIAL_MORTGAGES: ret = "Standard Rate Mortgage";
                break; 
            case ProductCategory.TERM_DEPOSITS: ret = "5yr Term Deposit Account";
                break;
            case ProductCategory.MARGIN_LOANS: ret = "Investment Loan Account";
                break;
            case ProductCategory.REGULATED_TRUST_ACCOUNTS: ret = "Trust Account";
                break;
            case ProductCategory.TRADE_FINANCE: ret = "Trade Finance Account";
                break;  
            case ProductCategory.TRANS_AND_SAVINGS_ACCOUNTS: ret = "Everyday Transaction Account";
                break;
            case ProductCategory.TRAVEL_CARDS: ret = "International Travel Card";
                break;
            default: ret = "Standard Bank Account";
                break;                                                                   
        }
        return ret;
    }

    private generateProductName(cat: ProductCategory): string {
        let ret: string = '';
        switch (cat) {
            case ProductCategory.BUSINESS_LOANS: ret = "Standard Business Loan";
                break;
            case ProductCategory.CRED_AND_CHRG_CARDS: ret = "Super Platinum Card";
                break;
            case ProductCategory.LEASES: ret = "Novated Lease Account";
                break;
            case ProductCategory.OVERDRAFTS: ret = "Overdraft Account";
                break;
            case ProductCategory.PERS_LOANS: ret = "Unsecured Personal Loan";
                break;
            case ProductCategory.RESIDENTIAL_MORTGAGES: ret = "Standard Rate Mortgage";
                break; 
                case ProductCategory.TERM_DEPOSITS: ret = "5yr Term Deposit Account";
                break;
            case ProductCategory.MARGIN_LOANS: ret = "Investment Loan Account";
                break;
            case ProductCategory.REGULATED_TRUST_ACCOUNTS: ret = "Trust Account";
                break;
            case ProductCategory.TRADE_FINANCE: ret = "Trade Finance Account";
                break;  
            case ProductCategory.TRANS_AND_SAVINGS_ACCOUNTS: ret = "Everyday Transaction Account";
                break;
            case ProductCategory.TRAVEL_CARDS: ret = "International Travel Card";
                break;
            default: ret = "Standard Bank Account";
                break;                                                                   
        }
        return ret;
    }
  


}