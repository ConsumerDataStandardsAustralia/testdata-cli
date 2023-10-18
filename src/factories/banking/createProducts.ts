import { BankingProductBundle , BankingProductConstraint, BankingProductDepositRate, BankingProductDetailV4, BankingProductDiscount, BankingProductEligibility,
  BankingProductFeatureV2, BankingProductFee, BankingProductV4, BankingProductRateTierV3, BankingProductRateCondition, BankingProductLendingRateV2 } from 'consumer-data-standards/banking';

import { HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, DepositRateType, EligibilityType, FeatureType, FeeType, LendingRateType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { CustomerType } from 'src/random-generators';
import { randomUUID } from 'crypto';

const factoryId: string = "create-products";


export class CreateProducts extends Factory {

  private category: ProductCategory;

  constructor(options: FactoryOptions) {
    super(options, factoryId);
    this.category = options?.options?.productCategory ? options?.options?.productCategory as ProductCategory : RandomBanking.ProductCategory();
  }

  public static id: string = factoryId;

  public createBaseUriForBrand(brand: string): string {
    // use the brand property, remove spaces and other invalid url characters
    let st = brand.replace(' ', '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
    return `https://www.${st}.com.au/`
  }

  public get briefDescription(): string {
    return "Create a number of number of banking products.";
  }
  public get detailedDescription(): string {
    let st = `
          Create a number of number of banking products.

          This factory will accept the following options
                
            productCategory:  This should be BankingProductCategory as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingproductcategory
                              If not specified it will be randomnly assigned.

          Key values randomly allocated:
            Dates, numeric values, and other enumerated types`;
    return st;
  }

  private featureAdditionalValue (type: FeatureType): string | undefined {

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

  private constraintAdditionalValue (type: ContraintType): string | undefined {
    switch (type) {
      case ContraintType.MAX_BALANCE: return "250000.00";
      case ContraintType.MAX_LIMIT: return "250000.00";
      case ContraintType.MIN_BALANCE: return "10.00";
      case ContraintType.MIN_LIMIT: return  "1000.00";
      case ContraintType.OPENING_BALANCE: return "1.00";
      default: return undefined;
    }

  }

  private eligibilityAdditionalValue (type: EligibilityType): string | undefined {
    switch (type) {
      case EligibilityType.EMPLOYMENT_STATUS: return "Employed";
      case EligibilityType.MAX_AGE: return "35";
      case EligibilityType.MIN_AGE: return "18";
      case EligibilityType.MIN_INCOME: return  "85000.00";
      case EligibilityType.MIN_TURNOVER: return "500000.00";
      case EligibilityType.RESIDENCY_STATUS: return "Austrailan Citizen";
      default: return undefined;
    }

  }

  private lendingRateAdditionalValue (type: LendingRateType): string | undefined {
    switch (type) {
      case LendingRateType.FIXED: return "P6M";
      case LendingRateType.FLOATING: return "Mostly fixed";
      case LendingRateType.MARKET_LINKED: return "SMP";
      default: return undefined;
    }

  }

  private depositRateAdditionalValue (type: DepositRateType): string | undefined {
    switch (type) {
      case DepositRateType.FIXED: return "P1Y";
      case DepositRateType.FLOATING: return "Mostly fixed";
      case DepositRateType.MARKET_LINKED: return "ASX200";
      default: return undefined;
    }

  }

  private feeAdditionalValue (type: FeeType): string | undefined {
    switch (type) {
      case FeeType.PERIODIC: return "P6M";
      default: return undefined;
    }

  }

  private generateAdditionalInfo(baseUri: string, suffix: string): any {
    let cnt = Helper.generateRandomIntegerInRange(0, 3);
    let objArray: any[] = [];
    for (let i = 0; i < cnt; i++) {
      let obj: any = {};
      obj.description = `More info ${i} here`,
      obj.additionalInfoUri = `${baseUri}${suffix}-${i}`;
      objArray.push(obj);
    }
    return objArray;
  }

  private generateBankingProductRateTiers(brandBaseUri: string): BankingProductRateTierV3[] | undefined {
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


  public canCreateHolder(): boolean { return true; };
  public generateHolder(): HolderWrapper | undefined {
    let result: HolderWrapper = {
      holderId: Helper.randomId(),
      holder: {
        unauthenticated: {},
        authenticated: {}
      }
    }
    return result;
  }

  public canCreateBankProduct(): boolean { return true; };
  public generateBankProduct(): BankingProductDetailV4 {

    let categoryLowerCase = this.category.replace(/['_']/g, '-').toLowerCase();
    let brandInfo = RandomBanking.SelectBaseBrandInfo();
    let productInfo = RandomBanking.SelectBaseBankingProductInfo(categoryLowerCase)
    let brandBaseUri = this.createBaseUriForBrand(brandInfo.brand);

    let lastUpdatedTime = Helper.randomDateTimeInThePast();
    let effectiveToDate = Helper.randomDateTimeInTheFuture();
    let effectiveFromDate = Helper.randomDateTimeBeforeDateString(effectiveToDate);

    // create product with mandatory fields
    // populate the base product properties, ie BankingProductV4
    let product: BankingProductDetailV4 = {
      brand: brandInfo.brand,
      description: productInfo.description,
      isTailored: Helper.randomBoolean(0.3),
      lastUpdated: lastUpdatedTime,
      name: productInfo.name,
      productCategory: this.category,
      productId: randomUUID()
    };

    if (Math.random() > 0.5) product.effectiveFrom = effectiveFromDate;
    if (Math.random() > 0.5) product.effectiveTo = effectiveToDate;
    if (Math.random() > 0.5) product.brandName = brandInfo.brandName;
    if (Math.random() > 0.5) product.applicationUri = `${brandBaseUri}${categoryLowerCase}`;
    if (Math.random() > 0.5) {
      product.cardArt = [
        {
          title: `Display label for ${brandInfo.brand}`,
          imageUri: `${brandBaseUri}${categoryLowerCase}`
        }
      ]
    }
    let additionalOverviewRequired: boolean = Math.random() > 0.5;
    let additionalTermsRequired: boolean = Math.random() > 0.5;
    let additionalEligibilityRequired: boolean = Math.random() > 0.5;
    let additionalFeesRequired: boolean = Math.random() > 0.5;
    let additionalBundleRequired: boolean = Math.random() > 0.5;


    product.additionalInformation = {};
    if (additionalOverviewRequired == true) { product.additionalInformation.overviewUri = `${brandBaseUri}overview`; }
    if (additionalTermsRequired == true) { product.additionalInformation.termsUri = `${brandBaseUri}terms`; }
    if (additionalEligibilityRequired == true) { product.additionalInformation.eligibilityUri = `${brandBaseUri}conditions`; }
    if (additionalFeesRequired == true) { product.additionalInformation.feesAndPricingUri = `${brandBaseUri}fees`; }
    if (additionalBundleRequired == true) { product.additionalInformation.bundleUri = `${brandBaseUri}bundles`; }

    if (additionalOverviewRequired == true && Math.random() > 0.5) product.additionalInformation.additionalOverviewUris = this.generateAdditionalInfo(brandBaseUri, "overview");
    if (additionalTermsRequired == true && Math.random() > 0.5) product.additionalInformation.additionalTermsUris = this.generateAdditionalInfo(brandBaseUri, "terms")
    if (additionalEligibilityRequired == true && Math.random() > 0.5) product.additionalInformation.additionalEligibilityUris = this.generateAdditionalInfo(brandBaseUri, "eligibility")
    if (additionalFeesRequired == true && Math.random() > 0.5) product.additionalInformation.additionalFeesAndPricingUris = this.generateAdditionalInfo(brandBaseUri, "fees")
    if (additionalBundleRequired == true && Math.random() > 0.5) product.additionalInformation.additionalBundleUris = this.generateAdditionalInfo(brandBaseUri, "bundles")

    // populate BankignProductDetailV4.bundles
    if (Math.random() > 0.5) {
      let bundles: BankingProductBundle[] = [];
      let bundle: BankingProductBundle = {
        description: `A bundle available only from ${brandInfo.brandName} `,
        name: `${brandInfo.brand} - Bundle`
      };
      if (Math.random() > 0.5) bundle.additionalInfo = `Additional info for '${bundle.name}'`;
      if (Math.random() > 0.5) bundle.additionalInfoUri = `${brandBaseUri}bundles-info`;
      bundles.push(bundle);
      product.bundles = bundles;
    }
    // populate BankignProductDetailV4.features
    if (Math.random() > 0.5) {
      let features: BankingProductFeatureV2[] = [];
      let feature: BankingProductFeatureV2 = {
        featureType: RandomBanking.FeatureType()
      };
      //let featureType = RandomBanking.FeatureType();
      let val = this.featureAdditionalValue(feature.featureType as FeatureType)
      if (val != undefined) {
        feature.additionalValue = val;
      } 
      if (feature.featureType == FeatureType.OTHER) feature.additionalInfo = "Additional feature info";
      if (Math.random() > 0.5) feature.additionalInfoUri = `${brandBaseUri}features`;
      features.push(feature);
      product.features = features;
    }

    // populate BankignProductDetailV4.constraints
    if (Math.random() > 0.5) {
      let constraints: BankingProductConstraint[] = [];
      let constraint: BankingProductConstraint = {
        constraintType: RandomBanking.ContraintType()
      };
      //let featureType = RandomBanking.FeatureType();
      constraint.constraintType = RandomBanking.ContraintType();
      let val = this.constraintAdditionalValue(constraint.constraintType as ContraintType)
      if (val != undefined) {
        constraint.additionalValue = val;
      } 
      if (Math.random() > 0.5) constraint.additionalInfoUri = `${brandBaseUri}constraints`;
      constraints.push(constraint);
      product.constraints = constraints;
      
    }

    // populate BankignProductDetailV4.eligibility
    if (Math.random() > 0.5) {
      let eligibilities: BankingProductEligibility[] = [];
      let eligibility: BankingProductEligibility = {
        eligibilityType: RandomBanking.EligibilityType()
      };
      //let featureType = RandomBanking.FeatureType();
      let val = this.eligibilityAdditionalValue(eligibility.eligibilityType as EligibilityType)
      if (val != undefined) {
        eligibility.additionalValue = val;
      } 
      if (Math.random() > 0.5) eligibility.additionalInfoUri = `${brandBaseUri}eligibility`;
      eligibilities.push(eligibility);
      product.eligibility = eligibilities;      
    }

    // populate BankignProductDetailV4.fees
    if (Math.random() > 0.5) {
      let fees: BankingProductFee[] = [];
      let fee: BankingProductFee = {
        feeType: RandomBanking.FeeType(),
        name: ''
      };
      //let featureType = RandomBanking.FeatureType();
      let val = this.feeAdditionalValue(fee.feeType as FeeType);
      if (fee.feeType != FeeType.VARIABLE) fee.amount = "0.05" ;
      if (fee.feeType != FeeType.VARIABLE) fee.balanceRate = "0.02" ;
      if (fee.feeType != FeeType.VARIABLE) fee.transactionRate = "0.03" ;
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
      }

      fees.push(fee);
      product.fees = fees;      
    }

    // populate BankignProductDetailV4.depositRates
    if (Math.random() > 0.5) {
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
      let val = this.depositRateAdditionalValue(depositRate.depositRateType as DepositRateType);
      if (val != undefined) {
        depositRate.additionalValue = val;
      } 

      // create the tiers
      if (Math.random() > 0.5) depositRate.tiers = this.generateBankingProductRateTiers(brandBaseUri);

      depositRates.push(depositRate);
      product.depositRates = depositRates;      
    }

    // populate BankignProductDetailV4.lendingRates
    if (Math.random() > 0.5) {
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
      let val = this.lendingRateAdditionalValue(lendingRate.lendingRateType as LendingRateType);
      if (val != undefined) {
        lendingRate.additionalValue = val;
      } 

      // create the tiers
      if (Math.random() > 0.5) lendingRate.tiers = this.generateBankingProductRateTiers(brandBaseUri);

      lendingRates.push(lendingRate);
      product.lendingRates = lendingRates;   
    }

    return product;
  }


  public canCreateBankProducts(): boolean { return true; };
  public generateBankProducts(): BankingProductV4[] | undefined {
    let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

    let ret: BankingProductV4[] = [];
    for (let i = 0; i < count; i++) {
      const el = this.generateBankProduct();
      if (el) ret.push(el);
    }
    return ret;
  }
}