import { DigitalWalletProvider } from "./random-energy"


export const BaseBankingProduct = [
    {
        category: 'BUSINESS_LOANS',
        name: "Business Loan Fixed Rate Principal and Interest",
        description: "If you need to borrow money for your business, whether it’s to purchase a property or any other business purpose"
    },
    {
        category: 'BUSINESS_LOANS',
        name: "Business Variable Rate Principal and Interest",
        description: "If you need to borrow money for your business, whether it’s to purchase a property or any other business purpose"
    },    
    {
        category: 'BUSINESS_LOANS',
        name: "Business Loan Variable Rate Interest Only",
        description: "If you need to borrow money for your business, whether it’s to purchase a property or any other business purpose"
    },    
    {
        category: 'CRED_AND_CHRG_CARDS',
        name: "Premier Platinum credit card",
        description: "There’s more to enjoy with Premier Platinum. Your journey will feel special."
    },
    {
        category: 'CRED_AND_CHRG_CARDS',
        name: "Premier Gold credit card",
        description: "There’s more to enjoy with Premier Gold. Your journey will feel special."
    },
    {
        category: 'CRED_AND_CHRG_CARDS',
        name: "Premier Silver credit card",
        description: "There’s more to enjoy with Premier Silver. Your journey will feel special."
    },        
    {
        category: 'LEASES',
        name: "Standard Lease account",
        description: "An account designed to provide best benefits of a lease."
    },
    {
        category: 'LEASES',
        name: "Advanced Lease account",
        description: "An account designed to provide best benefits of a lease with advanced features."
    },
    {
        category: 'LEASES',
        name: "Long Lease account",
        description: "An account designed to provide best benefits of a long-term lease."
    },    
    {
        category: 'MARGIN_LOANS',
        name: "Standard margin loan account",
        description: "Margin loan account target at share market investors."
    },
    {
        category: 'MARGIN_LOANS',
        name: "Advanced margin loan account",
        description: "Margin loan account target at share market investors with more features"
    },
    {
        category: 'MARGIN_LOANS',
        name: "Premier margin loan account",
        description: "Margin loan account target at share market investors with premium features"
    },    
    {
        category: 'OVERDRAFTS',
        name: "Standard overdraft account",
        description: "An account specificvally designed for short term finance."
    },
    {
        category: 'OVERDRAFTS',
        name: "Premium overdraft account",
        description: "An account specificvally designed for short term finance with more features"
    },
    {
        category: 'OVERDRAFTS',
        name: "Extended overdraft account",
        description: "An account specificvally designed for medium term finance."
    },    
    {
        category: 'PERS_LOANS',
        name: "Standard personal loan account",
        description: "An account designed to finance captital purchases for individuals."
    },
    {
        category: 'PERS_LOANS',
        name: "Advanced personal loan account",
        description: "An account designed to finance captital purchases for individuals with more features"
    },
    {
        category: 'PERS_LOANS',
        name: "Premium personal loan account",
        description: "An account designed to finance captital purchases for individuals with all features"
    },    
    {
        category: 'REGULATED_TRUST_ACCOUNTS',
        name: "Trust Basic",
        description: "Basic trust account with minimum free transactactions."
    },
    {
        category: 'REGULATED_TRUST_ACCOUNTS',
        name: "Premium Trust Account",
        description: "Premium trust account with more features."
    },
    {
        category: 'REGULATED_TRUST_ACCOUNTS',
        name: "Trust Superior",
        description: "Most advanced trust account with all features"
    },    
    {
        category: 'RESIDENTIAL_MORTGAGES',
        name: "Standard Consumer Mortgage",
        description: "A standard mortgage account designed for residential property purchaes"
    } ,
    {
        category: 'RESIDENTIAL_MORTGAGES',
        name: "Variable Rate Mortgage",
        description: "A standard mortgage account designed for residential property purchaes"
    } ,
    {
        category: 'RESIDENTIAL_MORTGAGES',
        name: "Fixed-rate Mortgage",
        description: "A standard mortgage account designed for residential property purchaes"
    } ,
    {
        category: 'TERM_DEPOSITS',
        name: "1 Year Term Deposit",
        description: "A standard term deposit account."
    },
    {
        category: 'TERM_DEPOSITS',
        name: "3 Year Term Deposit",
        description: "A standard term deposit account."
    },
    {
        category: 'TERM_DEPOSITS',
        name: "5 Year Term Deposit",
        description: "A standard term deposit account."
    },
    {
        category: 'TRADE_FINANCE',
        name: "Standard Trade Account",
        description: "An account designed for finance trading."
    },
    {
        category: 'TRADE_FINANCE',
        name: "Premium Trade Account",
        description: "A premium account designed for finance trading with all features."
    },
    {
        category: 'TRADE_FINANCE',
        name: "Advanced Trade Account",
        description: "An advanced account designed for finance trading with more features"
    },    
    {
        category: 'TRANS_AND_SAVINGS_ACCOUNTS',
        name: "Standard Everyday Account",
        description: "An everyday account for transactions and savings."
    },
    {
        category: 'TRANS_AND_SAVINGS_ACCOUNTS',
        name: "Savings Account",
        description: "An everyday account for  better savings."
    },
    {
        category: 'TRANS_AND_SAVINGS_ACCOUNTS',
        name: "Transaction Account",
        description: "An everyday low fee account for transactions and savings."
    },    
    {
        category: 'TRAVEL_CARDS',
        name: "Standard Travel Card",
        description: "An travel card account."
    },
    {
        category: 'TRAVEL_CARDS',
        name: "Advanced Travel Card",
        description: "A better travel card account with more features"
    },  
    {
        category: 'TRAVEL_CARDS',
        name: "Premium Travel Card",
        description: "An premium travel card account with all features."
    }                   
]

export const BaseBrandInformation = [
    {
        brand: "ABB",
        brandName: "Australia Better Bank"
    },
    {
        brand: "SBA",
        brandName: "Savings Bank of Australia"
    },
    {
        brand: "My Bank",
        brandName: "MyBank Community Bank"
    },
    {
        brand: "DSB",
        brandName: "The Data Standards Body Bank"
    },
    {
        brand: "Loan TA",
        brandName: "The Loan to Anyone Finacial Service"
    }
]

export const randomLoanProducts: string[][]= [
    ['Business Loan Fixed Rate Principal and Interest', 'If you need to borrow money for your business, whether it’s to purchase a property or any other business purpose'],
    ['Home Loan Interest Only', 'A flexible loan to assist in the purchase of a home to live in.'],
    ['Home Loan Interest Only Fixed 1 year', 'A fixed rate loan to assist in the purchase of a home to live in.'],
    ['2 YEAR FIXED HOME LOAN - INVESTMENT (Principal and Interest)','A fixed rate for 2 years for investors wanting certainty of repayments for a period. Comes with a 100% offset account.'],
    ['BASIC VARIABLE LOAN','BASIC VARIABLE LOAN INVESTOR P&I'],
    ['Better Home Loan','Owner Occupied Variable Rate Home Loan'],
    ['Everyday Overdraft','EVERYDAY OVERDRAFT'],
    ['Personal Loan - Secured','Personal Loan - Secured secured against assets']
  ]


  export const randomSavingsProducts: string[][]= [
    ['Money Go Account', 'Bank like never before with a Money transaction account. Earn Virgin Money Points for how you spend and budget'],
    ['SMSF Saver','Specifically designed SMSF account product'],
    ['Club Community Saver','Club Community Saver'],
    ['Netbank Saver Account',''],
    ['Every Day Transaction Account',''],
    ['Easy Savings account','An online savings account that earns you interest every month on balances, regardless of how you save.'],
  ]


  export const randomCreditCardProducts: string[][]= [
    ['Premier Platinum credit card','There’s more to enjoy with Premier Platinum. Your journey will feel special.'],
  ]



  export  enum ProductCategory {
    BUSINESS_LOANS =  "BUSINESS_LOANS"
    , CRED_AND_CHRG_CARDS =  "CRED_AND_CHRG_CARDS"
    , LEASES = "LEASES"
    , MARGIN_LOANS = "MARGIN_LOANS"
    , OVERDRAFTS =  "OVERDRAFTS"
    , PERS_LOANS = "PERS_LOANS"
    , REGULATED_TRUST_ACCOUNTS = "REGULATED_TRUST_ACCOUNTS"
    , RESIDENTIAL_MORTGAGES = "RESIDENTIAL_MORTGAGES"
    , TERM_DEPOSITS = "TERM_DEPOSITS"
    , TRADE_FINANCE = "TRADE_FINANCE"
    , TRANS_AND_SAVINGS_ACCOUNTS = "TRANS_AND_SAVINGS_ACCOUNTS"
    , TRAVEL_CARDS = "TRAVEL_CARDS"
} 

export  enum OpenStatus {
    CLOSED = "CLOSED" , OPEN = "OPEN" 
} 

export  enum PayeeType {
    BILLER = "BILLER" , DIGITAL_WALLET = "DIGITAL_WALLET" , DOMESTIC = "DOMESTIC" , INTERNATIONAL = "INTERNATIONAL"
} 

export enum Effective {
   ALL =  "ALL", CURRENT = "CURRENT", FUTURE = "FUTURE"
}

export enum ExtensionUType {
    x2p101Payload = "x2p101Payload", X2P1_01 = "X2P1.01"
}


export enum EligibilityType {
    BUSINESS = "BUSINESS"
      , EMPLOYMENT_STATUS = "EMPLOYMENT_STATUS"
      , MAX_AGE = "MAX_AGE"
      , MIN_AGE = "MIN_AGE"
      , MIN_INCOME = "MIN_INCOME"
      , MIN_TURNOVER = "MIN_TURNOVER"
      , NATURAL_PERSON = "NATURAL_PERSON"
      , OTHER = "OTHER"
      , PENSION_RECIPIENT = "PENSION_RECIPIENT"
      , RESIDENCY_STATUS = "RESIDENCY_STATUS"
      , STAFF = "STAFF"
      , STUDENT = "STUDENT"
}

export enum UnitOfMeasure {
    DAY = "DAY" , DOLLAR = "DOLLAR" , MONTH = "MONTH" , PERCENT = "PERCENT"
}

export enum RateApplicationMethod {
    "PER_TIER" , "WHOLE_BALANCE" , null
}

export enum SpecificAccountUType {
    creditCard = "creditCard" , loan = "loan" , termDeposit = "termDeposit"
}

export enum TransactionStatus {
    POSTED = "POSTED" , PENDING = "PENDING" 
}

export enum MaturityInstructions {
    HOLD_ON_MATURITY = "HOLD_ON_MATURITY" , PAID_OUT_AT_MATURITY = "PAID_OUT_AT_MATURITY" , ROLLED_OVER = "ROLLED_OVER"
}

export enum PayeeUType {
    BILLER = "biller" , DIGITAL_WALLET = "digitalWallet" , DOMESTIC = "domestic" , INTERNATIONAL = "international"
}

export enum PayeeAccountType {
    account = "account" , card = "card" , payId = "payId"
}

export enum PayIDType {
    ABN = "ABN" , EMAIL = "EMAIL" , ORG_IDENTIFIER = "ORG_IDENTIFIER" , TELEPHONE = "TELEPHONE"
}

export enum DigitalWalletPayeeType {
    CONTACT_NAME = "CONTACT_NAME" , EMAIL = "EMAIL" , TELEPHONE = "TELEPHONE"
}

export enum ScheduledPaymentStatusType {
    ACTIVE = "ACTIVE" , INACTIVE = "INACTIVE" , SKIP = "SKIP"
}

export enum ScheduledPaymentToUType {
    accountId = "accountId" , biller = "biller" , domestic = "domestic" , international = "international" , payeeId  = "payeeId", digitalWallet = "digitalWallet"
}

export enum RecurrenceUType {
    eventBased = "eventBased" , intervalSchedule = "intervalSchedule" , lastWeekDay = "lastWeekDay" , onceOff = "onceOff"
}

export enum NonBusinessDayTreatment {
    AFTER = "AFTER" , BEFORE = "BEFORE" , ON = "ON" , ONLY = "ONLY" 
}

export enum LastWeekDay {
    FRI = "FRI" , MON = "MON" , SAT = "SAT" , SUN = "SUN" , THU = "THU" , TUE = "TUE" , WED = "WED"
}

export enum AddressUType {
    PAF = "paf", SIMPLE = "simple"
}

export enum DgitalWalletProvider {
    PAYPAL_AU = "PAYPAL_AU", OTHER = "OTHER"
}

export enum FeatureType {
    ADDITIONAL_CARDS = "ADDITIONAL_CARDS"
    , BALANCE_TRANSFERS = "BALANCE_TRANSFERS"
    , BILL_PAYMENT = "BILL_PAYMENT"
    , BONUS_REWARDS = "BONUS_REWARDS"
    , CARD_ACCESS = "CARD_ACCESS"
    , CASHBACK_OFFER = "CASHBACK_OFFER"
    , COMPLEMENTARY_PRODUCT_DISCOUNTS = "COMPLEMENTARY_PRODUCT_DISCOUNTS"
    , DIGITAL_BANKING = "DIGITAL_BANKING"
    , DIGITAL_WALLET = "DIGITAL_WALLET"
    , DONATE_INTEREST = "DONATE_INTEREST"
    , EXTRA_REPAYMENTS = "EXTRA_REPAYMENTS"
    , FRAUD_PROTECTION = "FRAUD_PROTECTION"
    , FREE_TXNS = "FREE_TXNS"
    , FREE_TXNS_ALLOWANCE= "FREE_TXNS_ALLOWANCE"
    , GUARANTOR = "GUARANTOR"
    , INSURANCE = "INSURANCE"
    , INSTALMENT_PLAN = "INSTALMENT_PLAN"
    , INTEREST_FREE = "INTEREST_FREE"
    , INTEREST_FREE_TRANSFERS = "INTEREST_FREE_TRANSFERS"
    , LOYALTY_PROGRAM = "LOYALTY_PROGRAM"
    , NOTIFICATIONS ="NOTIFICATIONS"
    , NPP_ENABLED = "NPP_ENABLED"
    , NPP_PAYID = "NPP_PAYID"
    , OFFSET = "OFFSET"
    , OTHER = "OTHER"
    , OVERDRAFT = "OVERDRAFT"
    , REDRAW = "REDRAW"
    , RELATIONSHIP_MANAGEMENT = "RELATIONSHIP_MANAGEMENT"
    , UNLIMITED_TXNS = "UNLIMITED_TXNS"   
}

export enum ContraintType {
    MAX_BALANCE = "MAX_BALANCE" , MAX_LIMIT = "MAX_LIMIT" , MIN_BALANCE = "MIN_BALANCE" ,
    MIN_LIMIT = "MIN_LIMIT" , OPENING_BALANCE = "OPENING_BALANCE"
}

export enum FeeType {
    DEPOSIT =  "DEPOSIT"
    , EVENT = "EVENT"
    , EXIT = "EXIT"
    , PAYMENT = "PAYMENT"
    , PERIODIC = "PERIODIC"
    , PURCHASE = "PURCHASE"
    , TRANSACTION = "TRANSACTION"
    , UPFRONT = "UPFRONT"
    , VARIABLE = "VARIABLE"
    , WITHDRAWAL = "WITHDRAWAL"
}

export enum DepositRateType {
    BONUS = "BONUS" , BUNDLE_BONUS = "BUNDLE_BONUS" , FIXED ="FIXED" , FLOATING="FLOATING" , INTRODUCTORY="INTRODUCTORY" , MARKET_LINKED="MARKET_LINKED" , VARIABLE="VARIABLE"
}

export enum LendingRateType {
    BUNDLE_DISCOUNT_FIXED = "BUNDLE_DISCOUNT_FIXED"
    , BUNDLE_DISCOUNT_VARIABLE ="BUNDLE_DISCOUNT_VARIABLE"
    , CASH_ADVANCE ="CASH_ADVANCE"
    , DISCOUNT ="DISCOUNT"
    , FIXED = "FIXED"
    , FLOATING = "FLOATING"
    , INTRODUCTORY = "INTRODUCTORY"
    , MARKET_LINKED = "MARKET_LINKED"
    , PENALTY = "PENALTY"
    , PURCHASE = "PURCHASE"
    , VARIABLE = "VARIABLE"
}

export enum RepaymentType {
    "INTEREST_ONLY" , "PRINCIPAL_AND_INTEREST",  null
}

export enum TransactionType {
    DIRECT_DEBIT =  "DIRECT_DEBIT"
    , FEE = "FEE"
    , INTEREST_CHARGED = "INTEREST_CHARGED"
    , INTEREST_PAID = "INTEREST_PAID"
    , OTHER = "OTHER"
    , PAYMENT = "PAYMENT"
    , TRANSFER_INCOMING = "TRANSFER_INCOMING"
    , TRANSFER_OUTGOING = "TRANSFER_OUTGOING"
}

export enum LoanPurpose {
    "INVESTMENT" , "OWNER_OCCUPIED",  null
}

export enum DiscountType {
    BALANCE =  "BALANCE" , DEPOSITS = "DEPOSITS" , ELIGIBILITY_ONLY = "ELIGIBILITY_ONLY" , FEE_CAP = "FEE_CAP" , PAYMENTS = "PAYMENTS"
}

export enum DiscountEligibilityType {
    BUSINESS =  "BUSINESS"
    , EMPLOYMENT_STATUS = "EMPLOYMENT_STATUS"
    , INTRODUCTORY = "INTRODUCTORY"
    , MAX_AGE = "MAX_AGE"
    , MIN_AGE = "MIN_AGE"
    , MIN_INCOME = "MIN_INCOME"
    , MIN_TURNOVER = "MIN_TURNOVER"
    , NATURAL_PERSON = "NATURAL_PERSON"
    , OTHER = "OTHER"
    , PENSION_RECIPIENT = "PENSION_RECIPIENT"
    , RESIDENCY_STATUS = "RESIDENCY_STATUS"
    , STAFF = "STAFF"
    , STUDENT = "STUDENT"
}

export enum AccountOwnership {
    UNKNOWN = "UNKNOWN",
    ONE_PARTY = "ONE_PARTY",
    TWO_PARTY = "TWO_PARTY",
    MANY_PARTY = "MANY_PARTY",
    OTHER = "OTHER"
}

export enum Currency {
    AUD = "AUD", GBP = "GBP", USD = "USD"
}

export class RandomBanking {
    public static GetRandomValue(enumeration: any) {
        const values = Object.keys(enumeration);
        let interval = 1 / values.length;
        let rv = Math.random();
        let intervalSum = 0;
        let found: boolean = false;
        let idx: number = 0;
        while (found == false) {
            intervalSum += interval;
            if (rv <= intervalSum || idx >= values.length - 1) {
                found = true;
            }
            else {
                idx++;
            }
        }
        const enumKey = values[idx];
        return enumeration[enumKey];
    }

    public static ProductCategory(): any {
        return this.GetRandomValue(ProductCategory)
    }

    public static FeatureType(): any {
        return this.GetRandomValue(FeatureType)
    }

    public static ContraintType(): any {
        return this.GetRandomValue(ContraintType)
    }

    public static FeeType(): any {
        return this.GetRandomValue(FeeType)
    }

    public static DepositRateType(): any {
        return this.GetRandomValue(DepositRateType)
    }

    public static LendingRateType(): any {
        return this.GetRandomValue(LendingRateType)
    }

    public static LoanPurpose(): any {
        return this.GetRandomValue(LoanPurpose)
    }

    public static RepaymentType(): any {
        return this.GetRandomValue(RepaymentType)
    }

    public static DiscountType(): any {
        return this.GetRandomValue(DiscountType)
    }

    public static DiscountEligibilityType(): any {
        return this.GetRandomValue(DiscountEligibilityType)
    }

    public static OpenStatus(): any {
        return this.GetRandomValue(OpenStatus)
    }

    public static PayeeType(): any {
        return this.GetRandomValue(PayeeType)
    }

    public static Effective(): any {
        return this.GetRandomValue(Effective)
    } 
    
    public static EligibilityType(): any {
        return this.GetRandomValue(EligibilityType)
    }  

    public static UnitOfMeasure(): any {
        return this.GetRandomValue(UnitOfMeasure)
    }   
    
    public static RateApplicationMethod(): any {
        return this.GetRandomValue(RateApplicationMethod)
    }  
    public static SpecificAccountUType(): any {
        return this.GetRandomValue(SpecificAccountUType)
    } 
    
    public static MaturityInstructions(): any {
        return this.GetRandomValue(MaturityInstructions)
    }
    
    public static PayeeUType(): any {
        return this.GetRandomValue(PayeeUType)
    }
    public static PayeeAccountType(): any {
        return this.GetRandomValue(PayeeAccountType)
    } 
    public static PayIDType(): any {
        return this.GetRandomValue(PayIDType)
    }   
    public static DigitalWalletPayeeType(): any {
        return this.GetRandomValue(DigitalWalletPayeeType)
    } 
    public static ScheduledPaymentStatusType(): any {
        return this.GetRandomValue(ScheduledPaymentStatusType)
    } 
    public static ScheduledPaymentToUType(): any {
        return this.GetRandomValue(ScheduledPaymentToUType)
    }  
    public static RecurrenceUType(): any {
        return this.GetRandomValue(RecurrenceUType)
    } 
    public static NonBusinessDayTreatment(): any {
        return this.GetRandomValue(NonBusinessDayTreatment)
    }  
    public static LastWeekDay(): any {
        return this.GetRandomValue(LastWeekDay)
    }  
    public static AddressUType(): any {
        return this.GetRandomValue(AddressUType)
    } 
    public static TransactionType(): any {
        return this.GetRandomValue(TransactionType)
    }  

    public static TransactionStatus(): any {
        return this.GetRandomValue(TransactionStatus)
    } 

    public static AccountOwnership(): any {
        return this.GetRandomValue(AccountOwnership)
    } 
    
    public static Currency(): any {
        return this.GetRandomValue(Currency)
    }      


    public static SelectBaseBankingProductInfo(category: string): any {
        let subSet = BaseBankingProduct.filter(x => x.category.replace(/['_']/g, '-').toLowerCase() == category);
        return this.GetRandomValue(subSet)
    }

    public static SelectBaseBrandInfo(): any {
        return this.GetRandomValue(BaseBrandInformation)
    }

    public static SelectRandomLoanProduct(): any {
        return this.GetRandomValue(randomLoanProducts)
    }

    public static SelectRandomSavingsProduct(): any {
        return this.GetRandomValue(randomSavingsProducts)
    } 
    
    public static SelectRandomCreditCardProduct(): any {
        return this.GetRandomValue(randomCreditCardProducts)
    }  

    public static SelectRandomExtensionUType(): any {
        return this.GetRandomValue(ExtensionUType)
    }
    
    public static SelectDigitalWalletProvider(): any {
        return this.GetRandomValue(DigitalWalletProvider)
    }     
}