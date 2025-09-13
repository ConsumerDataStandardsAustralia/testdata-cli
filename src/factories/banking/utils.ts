import { BankingFeeDiscountRate, BankingFeeDiscountAmount, BankingProductDepositRateV2, BankingProductDepositRate, BankingProductDiscount, BankingProductDiscountEligibility, 
    BankingProductDiscountV2, BankingProductFeatureV2, BankingProductFeatureV3, BankingProductFeatureV4, BankingProductFee, BankingProductLendingRateV3, BankingProductRateCondition, BankingProductRateConditionV2, BankingProductRateTierV3,
    BankingProductRateTierV4, BankingFeeDiscountRange, BankingProductFeeV2, BankingFeeRange, BankingFeeRate, BankingFeeAmount, BankingProductLendingRateV2} from "consumer-data-standards/banking";
import { DepositRateType, DigitalWalletPayeeType, DiscountMethodUType, FeatureType, FeeMethodUType, FeeType, FeeTypeV2, LendingRateType, PayIDType, ProductApplicationType, RandomBanking, RateApplicationMethod, RateApplicationType } from '../../random-generators/random-banking'
import { faker } from "@faker-js/faker";
import { Helper } from "../../logic/factoryService";
import Utils from "../common/utils";
import { generateRandomDecimalInRangeFormatted } from "../../random-generators"

export function generateDepositRateArray(brandBaseUri: string): BankingProductDepositRate[] {
    let depositRates: BankingProductDepositRate[] = [];
    let depositRate: BankingProductDepositRate = {
        depositRateType: RandomBanking.DepositRateType(),
        rate: "0.04"
    };
    if (Math.random() > 0.5) depositRate.calculationFrequency = "P1D";
    if (Math.random() > 0.5) depositRate.applicationFrequency = "P1M";
    if (Math.random() > 0.5) depositRate.additionalInfo = "These rates are the standard rates";
    if (Math.random() > 0.5) depositRate.additionalInfoUri = `${brandBaseUri}rates`;

    //let featureType = RandomBanking.FeatureType();
    let val = depositRateAdditionalValue(depositRate.depositRateType as DepositRateType);
    if (val != undefined) {
        depositRate.additionalValue = val;
    }

    // create the tiers
    if (Math.random() > 0.5) depositRate.tiers = generateBankingProductRateTiersV3(brandBaseUri);

    depositRates.push(depositRate);
    return depositRates;
}

export function generateDepositRateArrayV2(brandBaseUri: string): BankingProductDepositRateV2[] {
    let depositRates: BankingProductDepositRateV2[] = [];
    let depositRate: BankingProductDepositRateV2 = {
        applicationType: RandomBanking.ProductApplicationType(),
        depositRateType: RandomBanking.DepositRateType(),
        rate: "0.04"
    };
    if (Math.random() > 0.5) depositRate.calculationFrequency = "P1D";
    if (Math.random() > 0.5) depositRate.applicationFrequency = "P1M";
    if (Math.random() > 0.5) depositRate.additionalInfo = "These rates are the standard rates";
    if (Math.random() > 0.5) depositRate.additionalInfoUri = `${brandBaseUri}rates`;

    //let featureType = RandomBanking.FeatureType();
    let val = depositRateAdditionalValue(depositRate.depositRateType as DepositRateType);
    if (val != undefined) {
        depositRate.additionalValue = val;
    }

    // create the tiers
    if (Math.random() > 0.5) depositRate.tiers = generateBankingProductRateTiersV4(brandBaseUri);

    depositRates.push(depositRate);
    return depositRates;
}

export function generateBankingProductFeaturesV2(brandBaseUri: string): BankingProductFeatureV2[] {
    let features: BankingProductFeatureV2[] = [];
    let feature: BankingProductFeatureV2 = {
        featureType: RandomBanking.FeatureType()
    };
    //let featureType = RandomBanking.FeatureType();
    let val = featureAdditionalValue(feature.featureType as FeatureType)
    if (val != undefined) {
        feature.additionalValue = val;
    }
    if (feature.featureType == FeatureType.OTHER) feature.additionalInfo = "Additional feature info";
    if (Math.random() > 0.5) feature.additionalInfoUri = `${brandBaseUri}features`;
    features.push(feature);
    return features;
}

export function generateBankingProductFeaturesV3(brandBaseUri: string): BankingProductFeatureV3[] {
    let features: BankingProductFeatureV3[] = [];
    let feature: BankingProductFeatureV3 = {
        featureType: RandomBanking.FeatureType()
    };
    //let featureType = RandomBanking.FeatureType();
    let val = featureAdditionalValue(feature.featureType as FeatureType)
    if (val != undefined) {
        feature.additionalValue = val;
    }
    if (feature.featureType == FeatureType.OTHER) feature.additionalInfo = "Additional feature info";
    if (Math.random() > 0.5) feature.additionalInfoUri = `${brandBaseUri}features`;
    features.push(feature);
    return features;
}


export function generateBankingProductFeaturesV4(brandBaseUri: string): BankingProductFeatureV4[] {
    let features: BankingProductFeatureV4[] = [];
    let feature: BankingProductFeatureV4 = {
        featureType: RandomBanking.FeatureType()
    };
    //let featureType = RandomBanking.FeatureType();
    let val = featureAdditionalValue(feature.featureType as FeatureType)
    if (val != undefined) {
        feature.additionalValue = val;
    }
    if (feature.featureType == FeatureType.OTHER) feature.additionalInfo = "Additional feature info";
    if (Math.random() > 0.5) feature.additionalInfoUri = `${brandBaseUri}features`;
    features.push(feature);
    return features;
}

export function generateLendingRateArrayV2(brandBaseUri: string): BankingProductLendingRateV2[] {

    let lendingRates: BankingProductLendingRateV2[] = [];
    let lendingRate: BankingProductLendingRateV2 = {
        lendingRateType: RandomBanking.LendingRateType(),
        rate: '0.04'
    };
    if (Math.random() > 0.5) lendingRate.comparisonRate = "0.04";
    if (Math.random() > 0.5) lendingRate.applicationFrequency = "P1M";
    if (Math.random() > 0.5) lendingRate.calculationFrequency = "P1D";
    if (Math.random() > 0.5) lendingRate.interestPaymentDue = "IN_ARREARS";
    if (Math.random() > 0.5) lendingRate.repaymentType = "PRINCIPAL_AND_INTEREST";
    if (Math.random() > 0.5) lendingRate.loanPurpose = "INVESTMENT";
    if (Math.random() > 0.5) lendingRate.additionalInfo = "These rates are the standard lending rates";
    if (Math.random() > 0.5) lendingRate.additionalInfoUri = `${brandBaseUri}rates`;

    //let featureType = RandomBanking.FeatureType();
    let val = lendingRateAdditionalValue(lendingRate.lendingRateType as LendingRateType);
    if (val != undefined) {
        lendingRate.additionalValue = val;
    }

    // create the tiers
    if (Math.random() > 0.5) lendingRate.tiers = generateBankingProductRateTiersV3(brandBaseUri);

    lendingRates.push(lendingRate);
    return lendingRates;
}

export function generateLendingRateArrayV3(brandBaseUri: string): BankingProductLendingRateV3[] {

    let lendingRatesArray: BankingProductLendingRateV3[] = [];

    let lendingRateType : LendingRateType = RandomBanking.LendingRateType();

    let lendingRate: BankingProductLendingRateV3 = {
        lendingRateType: lendingRateType,
        applicationType: RandomBanking.ProductApplicationType(),
        repaymentType: RandomBanking.RepaymentType(),
        loanPurpose: RandomBanking.LoanPurpose(),        
        rate: '0.04'
    };

    if (Math.random() > 0.5) lendingRate.comparisonRate = "0.04";
    if (Math.random() > 0.5) lendingRate.calculationFrequency = "P1D";
    if (Math.random() > 0.5 || lendingRate.applicationType == "PERIODIC") lendingRate.applicationFrequency = "P1M";
    if (Math.random() > 0.5) lendingRate.interestPaymentDue = RandomBanking.InterestPaymentDueType();
    if (Math.random() > 0.5) lendingRate.interestPaymentDue = "IN_ARREARS";
    if (Math.random() > 0.5) lendingRate.repaymentType = "PRINCIPAL_AND_INTEREST";
    if (Math.random() > 0.5) lendingRate.loanPurpose = "INVESTMENT";
    if (lendingRate.lendingRateType == LendingRateType.FLOATING) lendingRate.additionalValue = "Details of the float parameters"
    if (lendingRate.lendingRateType == LendingRateType.MARKET_LINKED) lendingRate.additionalValue = "Details of the market linkage"
    if (lendingRate.lendingRateType == LendingRateType.FIXED) lendingRate.additionalValue = "P4Y"
    if (Math.random() > 0.5) lendingRate.additionalInfo = "These rates are the standard lending rates";
    if (Math.random() > 0.5) lendingRate.additionalInfoUri = `${brandBaseUri}rates`;
    if (Math.random() > 0.5) lendingRate.tiers = generateBankingProductRateTiersV4(`${brandBaseUri}`); 
    if (Math.random() > 0.5) lendingRate.applicabilityConditions = generateBankingProductRateConditionV2(); 

    lendingRatesArray.push(lendingRate);
    return lendingRatesArray;
}

export function generateBankingProductRateConditionV2(): BankingProductRateConditionV2[] {
    let applicableConditionsArray: BankingProductRateConditionV2[] = [];
    const conditionCount = Helper.generateRandomIntegerInRange(1,3);

    for (let i=0; i <= conditionCount; i++) {
        let applicableConditions: BankingProductRateConditionV2 = {
            rateApplicabilityType: RandomBanking.RateApplicationType()
        }
        if (applicableConditions.rateApplicabilityType == RateApplicationType.MIN_DEPOSITS) applicableConditions.additionalValue = Helper.generateRandomIntegerInRange(1,5).toString()
        if (applicableConditions.rateApplicabilityType == RateApplicationType.MIN_DEPOSIT_AMOUNT)  applicableConditions.additionalValue = Helper.generateRandomDecimalInRange(0, 500, 2)
        if (applicableConditions.rateApplicabilityType == RateApplicationType.DEPOSIT_BALANCE_INCREASED)  applicableConditions.additionalValue = Helper.generateRandomDecimalInRange(0, 500, 2).toString()
        if (applicableConditions.rateApplicabilityType == RateApplicationType.MIN_PURCHASES) applicableConditions.additionalValue = Helper.generateRandomIntegerInRange(1,10).toString()
        if (applicableConditions.rateApplicabilityType == RateApplicationType.MAX_WITHDRAWALS) applicableConditions.additionalValue = Helper.generateRandomIntegerInRange(1,20).toString()
        if (applicableConditions.rateApplicabilityType == RateApplicationType.MAX_WITHDRAWAL_AMOUNT)applicableConditions.additionalValue = Helper.generateRandomDecimalInRange(1, 1000, 2)
        if (Math.random() > 0.5 || applicableConditions.rateApplicabilityType == RateApplicationType.OTHER) applicableConditions.additionalInfo  = "Display text providing more information on the condition.";                         
        if (Math.random() > 0.5) applicableConditions.additionalInfoUri = "https://someinfo.additional"; 
        applicableConditionsArray.push(applicableConditions)
    }

    return applicableConditionsArray; 
}

export function generateBankingProductRateTiersV3(brandBaseUri: string): BankingProductRateTierV3[] | undefined {
    let tiers: BankingProductRateTierV3[] = [];
    let tier: BankingProductRateTierV3 = {
        minimumValue: 0,
        name: 'Base tier',
        unitOfMeasure: 'DAY'
    };
    let applicableConditions: BankingProductRateCondition;
    if (Math.random() > 0.5) tier.rateApplicationMethod = "WHOLE_BALANCE";
    if (Math.random() > 0.5) tier.maximumValue = 365;
    if (Math.random() > 0.5) tier.additionalInfo = "This tier applies to the entire balance";
    if (Math.random() > 0.5) tier.additionalInfoUri = `${brandBaseUri}rates`;
    if (Math.random() > 0.5) {
        applicableConditions = {};
        applicableConditions.additionalInfo = "Additional conditions apply for this specific rate";
        if (Math.random() > 0.5) applicableConditions.additionalInfoUri = `${brandBaseUri}rates`;
        tier.applicabilityConditions = applicableConditions;
    }
    tiers.push(tier);
    return tiers;
}

export function generateBankingProductRateTiersV4(brandBaseUri: string): BankingProductRateTierV4[] | undefined {
    let tiers: BankingProductRateTierV4[] = [];
    let tier: BankingProductRateTierV4 = {
        minimumValue: Helper.generateRandomDecimalInRange(0, 10, 2),
        name: 'Base tier',
        unitOfMeasure: 'DAY'
    };
    if (Math.random() > 0.5) tier.rateApplicationMethod = "WHOLE_BALANCE";
    if (Math.random() > 0.5) tier.maximumValue = String("365");
    if (Math.random() > 0.5) tier.additionalInfo = "This tier applies to the entire balance";
    if (Math.random() > 0.5) tier.additionalInfoUri = `${brandBaseUri}rates`;
    tiers.push(tier);
    return tiers;
}

export function generateBankingProductFeeArray(brandBaseUri: string): BankingProductFee[] {
    let fees: BankingProductFee[] = [];
    let fee: BankingProductFee = {
      feeType: RandomBanking.FeeType(),
      name: `Fee - ${faker.finance.transactionType()}`
    };
    //let featureType = RandomBanking.FeatureType();
    let val = feeAdditionalValue(fee.feeType as FeeType);
    if (fee.feeType != FeeType.VARIABLE) fee.amount = "0.05";
    if (fee.feeType != FeeType.VARIABLE) fee.balanceRate = "0.02" ;
    if (fee.feeType != FeeType.VARIABLE) fee.transactionRate = "0.01" ;
    if (val != undefined) {
      fee.additionalValue = val;
    } 
    if (Math.random() > 0.5) fee.additionalInfo = "Additional fees may be payable";
    if (Math.random() > 0.5) fee.currency = "AUD";
    if (Math.random() > 0.5) fee.accrualFrequency = "P6M";
    if (Math.random() > 0.5) fee.additionalInfoUri = `${brandBaseUri}fees`;

    let discounts: BankingProductDiscount[] = [];
    if (Math.random() > 0.5) {
      let discount: BankingProductDiscount = {
        description: 'A discount offered for this product',
        discountType: RandomBanking.DiscountType()
      };
      discounts?.push(discount);
      fee.discounts = discounts;
    }

    fees.push(fee);
    return fees;      
}

export function generateBankingProductFeeArrayV2(brandBaseUri: string): BankingProductFeeV2[] {
    let fees: BankingProductFeeV2[] = [];
    let fee: BankingProductFeeV2 = {
      feeType: RandomBanking.FeeTypeV2(),
      feeMethodUType: RandomBanking.FeeMethodUType(),
      name: `Fee - ${faker.finance.transactionType()}`
    };
    if (Math.random() > 0.5 || fee.feeType == FeeTypeV2.OTHER) fee.additionalInfo = "Additional fees may be payable";
    if (Math.random() > 0.5) fee.additionalInfoUri = "https://randomuri.com";
    if (Math.random() > 0.5) fee.currency = "AUD";
    const feeAmount: BankingFeeAmount = {
        amount: generateRandomDecimalInRangeFormatted(0.5, 50, 2)
    }
    if (fee.feeMethodUType == FeeMethodUType.fixedAmount) fee.fixedAmount = feeAmount;
    // Decalre a Fee rate and assign if required

         // Decalre a Fee range and assign if required
    let feeRange: BankingFeeRange = {
        feeMaximum: "0.8",
        feeMinimum: "0.01"
    }
    let bankFeeRate: BankingFeeRate = {
        accrualFrequency: "P6M",
        amountRange: feeRange,
        rate: "0.023",
        rateType: "INTEREST_ACCRUED"
    }
    if (fee.feeMethodUType == FeeMethodUType.rateBased) fee.rateBased = bankFeeRate;
    if (fee.feeMethodUType == FeeMethodUType.variable) fee.variable = feeRange;

    if (Math.random() > 0.5) fee.feeCap = generateRandomDecimalInRangeFormatted(0.5, 50, 2);
    if (fee.feeCap) fee.feeCapPeriod = generateRandomDecimalInRangeFormatted(1, 12, 0);

    // if (Math.random() > 0.5) fee.accrualFrequency = "P6M";

    let discounts: BankingProductDiscountV2[] = [];

    let eligibility: BankingProductDiscountEligibility = {
        discountEligibilityType: RandomBanking.DiscountEligibilityType()
        
    }
    const dicMethUType = RandomBanking.DiscountMethodUType();
    const discountAmount: BankingFeeDiscountAmount = {
         amount: "12.0" 
    }
    const feeDiscountRange: BankingFeeDiscountRange = {
        discountMaximum: "1.50",
        discountMinimum: "0.1"
    }
    const discountRate: BankingFeeDiscountRate = {
        amountRange: feeDiscountRange,
        rate: "0.5",
        rateType: "FEE"

    }
    if (Math.random() > 0.5) {
      let discount: BankingProductDiscountV2 = {
        description: 'A discount offered for this product',
        discountType: RandomBanking.DiscountType(),
        discountMethodUType: RandomBanking.DiscountMethodUType(),
        rateBased: dicMethUType == DiscountMethodUType.rateBased ? discountRate : undefined,
        fixedAmount: dicMethUType == DiscountMethodUType.fixedAmount? discountAmount : undefined
      };
      discounts?.push(discount);
      fee.discounts = discounts;
    }

    fees.push(fee);
    return fees;      
}

export function depositRateAdditionalValue(type: DepositRateType): string | undefined {
    switch (type) {
        case DepositRateType.FIXED: return "P1Y";
        case DepositRateType.FLOATING: return "Mostly fixed";
        case DepositRateType.MARKET_LINKED: return "ASX200";
        default: return undefined;
    }

}

export function lendingRateAdditionalValue(type: LendingRateType): string | undefined {
    switch (type) {
        case LendingRateType.FIXED: return "P6M";
        case LendingRateType.FLOATING: return "Mostly fixed";
        case LendingRateType.MARKET_LINKED: return "SMP";
        default: return undefined;
    }
}

export function featureAdditionalValue(type: FeatureType): string | undefined {

    switch (type) {
        case FeatureType.ADDITIONAL_CARDS: return "3";
        case FeatureType.BILL_PAYMENT: return "Optional name";
        case FeatureType.BONUS_REWARDS: return "25000";
        case FeatureType.CARD_ACCESS: return "All credit cards";
        case FeatureType.CASHBACK_OFFER: return "$125";
        case FeatureType.COMPLEMENTARY_PRODUCT_DISCOUNTS: return "Gift cards";
        case FeatureType.DIGITAL_WALLET: return "Common wallet brand";
        case FeatureType.FREE_TXNS: return "10";
        case FeatureType.FREE_TXNS_ALLOWANCE: return "$45";
        case FeatureType.INSURANCE: return "Travel Insurance";
        case FeatureType.INTEREST_FREE: return "P6M";
        case FeatureType.INTEREST_FREE_TRANSFERS: return "P9M";
        case FeatureType.LOYALTY_PROGRAM: return "Global Alliance";
        case FeatureType.NOTIFICATIONS: return "Push based notifications";
        default: return undefined;
    }

}

export function feeAdditionalValue (type: FeeType): string | undefined {
    switch (type) {
      case FeeType.PERIODIC: return "P6M";
      default: return undefined;
    }
}

export function generateBSB(): string {
    return `${Helper.randomId(3)}-${Helper.randomId(3)}`;
}

export function generateBPAYBillerCode(): string {
    // biller code is between 3 and 10 digits
    let cnt = Helper.generateRandomIntegerInRange(3, 10);
    return Helper.randomId(cnt);
}

export function generateMaskedPAN(): string {
    return `xxxx-xxxx-xxxx-${Helper.randomId(4)}`;
}

export function generatePayIdNameFromType(type: PayIDType): string {
    switch (type) {
        case PayIDType.ABN: return generateABN();
        case PayIDType.EMAIL: return faker.internet.email();
        case PayIDType.TELEPHONE: return faker.phone.number('04########');
        case PayIDType.ORG_IDENTIFIER: return faker.company.name();
        default: return "";
      }
}

export function generateDigitalWalletNameFromType(type: DigitalWalletPayeeType): string {
    switch (type) {
        case DigitalWalletPayeeType.CONTACT_NAME: return faker.name.fullName();
        case DigitalWalletPayeeType.EMAIL: return faker.internet.email();
        case DigitalWalletPayeeType.TELEPHONE: return faker.phone.number('04########');
        default: return "";
      }
}


export function generateABN(): string {
    return `${Helper.randomId(11)}`;
}

export function generateACN(): string {
    return `55${Helper.randomId(9)}`;
}

export function generateBIC(): string {
    let bankCode = faker.random.alpha({count: 4, casing: 'upper'});
    let countryCode = faker.address.countryCode('alpha-2');
    var locationCode ;
    // location code can be 2 letters or digits, more often it is letters
    if (Math.random() > 0.2)
        locationCode = faker.random.alpha({count: 2, casing: 'upper'});
    else
      locationCode = faker.datatype.number({min: 10, max: 99 })
    return `${bankCode}${countryCode}${locationCode}XXX`;
}

export function generateFedWireNumber(): string {
    //YYYYMMDD ABCDXXXX 012345
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDay();
    let sourceId = faker.random.alpha({count: 8, casing: 'upper'});
    let sequenceNumber = faker.datatype.number({min: 100000, max: 999999 });
    return `${year}${month}${day}${sourceId}${sequenceNumber}`;
}

export function generateBankRoutingNumber(): string {
    return `${faker.datatype.number({min: 100000000, max: 999999999 })}`;
}

export function generateBankSortCode(): string {
    return `${faker.datatype.number({min: 10, max: 99 })}-${faker.datatype.number({min: 10, max: 99 })}-${faker.datatype.number({min: 10, max: 99 })}`;
}

export function generateLegalEntityId(): string {
    return `${faker.datatype.number({min: 1000, max: 9999 })} 00 ${faker.random.alpha({count: 12, casing: 'upper'})} ${faker.datatype.number({min: 10, max: 99 })}`;
}

export function generatISODuration(): string {
    return `P${faker.random.numeric()}Y${faker.random.numeric()}M${faker.random.numeric()}DT${faker.random.numeric()}`
}


