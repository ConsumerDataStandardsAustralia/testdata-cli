import { BankingProductDepositRate, BankingProductDiscount, BankingProductFeatureV2, BankingProductFee, BankingProductLendingRateV2, BankingProductRateCondition, BankingProductRateTierV3 } from "consumer-data-standards/banking";
import { DepositRateType, FeatureType, FeeType, LendingRateType, PayIDType, RandomBanking } from '../../random-generators/random-banking'
import { faker } from "@faker-js/faker";
import { Helper } from "src/logic/factoryService";

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
    if (Math.random() > 0.5) depositRate.tiers = generateBankingProductRateTiers(brandBaseUri);

    depositRates.push(depositRate);
    return depositRates;
}

export function generateBankingProductFeatures(brandBaseUri: string): BankingProductFeatureV2[] {
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

export function generateLendingRateArray(brandBaseUri: string): BankingProductLendingRateV2[] {

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
    if (Math.random() > 0.5) lendingRate.tiers = generateBankingProductRateTiers(brandBaseUri);

    lendingRates.push(lendingRate);
    return lendingRates;
}

export function generateBankingProductRateTiers(brandBaseUri: string): BankingProductRateTierV3[] | undefined {
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

export function generateABN(): string {
    return `${Helper.randomId(11)}`;
}

