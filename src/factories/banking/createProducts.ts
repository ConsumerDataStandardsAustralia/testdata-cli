import { BankingProductV4 } from 'consumer-data-standards/banking';

import { HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { FeatureType, ProductCategory, RandomBanking } from '../../random-generators/random-banking';
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

  private featureAdditionalRequired(type: FeatureType): string | undefined {

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
  public generateBankProduct(): BankingProductV4 {

    let categoryLowerCase = this.category.replace(/['_']/g, '-').toLowerCase();
    let brandInfo = RandomBanking.SelectBaseBrandInfo();
    let productInfo = RandomBanking.SelectBaseBankingProductInfo(categoryLowerCase)
    let brandBaseUri = this.createBaseUriForBrand(brandInfo.brand);

    let lastUpdatedTime = Helper.randomDateTimeInThePast();
    let effectiveToDate = Helper.randomDateTimeInTheFuture();
    let effectiveFromDate = Helper.randomDateTimeBeforeDateString(effectiveToDate);

    // create product with mandatory fields
    let product: BankingProductV4 = {
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
          title: "Display label for image",
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


    if (Math.random() > 0.5) {
      product.bundles = [
        {
          name: "Name",
          description: "A banking product bundles",
          additionalInfo: "Additional bundle info",
          additionalInfoUri: `${brandBaseUri}bundles-info`,
          productIds: [
            this.id, Helper.randomId()
          ]
        }
      ]
    }
    if (Math.random() > 0.5) {
      let features: any = [];
      let feature: any = {};
      let featureType = RandomBanking.FeatureType();
      let val = this.featureAdditionalRequired(featureType)
      if (val != undefined) feature.additionalValue;
      if (featureType == FeatureType.OTHER) feature.additionalInfo = "Additional feature info";
      if (Math.random() > 0.5) feature.additionalInfoUri = `${brandBaseUri}features`;
      features.push(feature);
      product.features = features;
    }
    if (Math.random() > 0.5) {
      product.constraints = [
        {
          constraintType: RandomBanking.ContraintType(),
          additionalValue: "1000.00",
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}conditions`
        }
      ]
    }
    if (Math.random() > 0.5) {
      product.eligibility = [
        {
          eligibilityType: RandomBanking.EligibilityType(),
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}conditions`
        }
      ]
    }
    if (Math.random() > 0.5) {
      product.fees = [
        {
          name: "Name",
          feeType: RandomBanking.FeeType(),
          amount: "10.00",
          additionalInfo: "These fees are always applicable. More info in the PDS",
          additionalInfoUri: `${brandBaseUri}fees`
        }
      ]
    }
    if (Math.random() > 0.5) {
      product.depositRates = [
        {
          depositRateType: RandomBanking.DepositRateType(),
          rate: "0.01",
          calculationFrequency: "P1D",
          applicationFrequency: "P1M",
          additionalInfo: "These rates may not always be applicable ",
          additionalInfoUri: `${brandBaseUri}deposits`
        }
      ]
    }
    if (Math.random() > 0.5) {
      product.lendingRates = [
        {
          lendingRateType: RandomBanking.LendingRateType(),
          rate: "0.01",
          comparisonRate: "0.01",
          calculationFrequency: "P1D",
          applicationFrequency: "P1M",
          interestPaymentDue: "IN_ADVANCE",
          repaymentType: RandomBanking.RepaymentType(),
          loanPurpose: RandomBanking.LoanPurpose(),
          additionalInfo: "Lending rates mat vary over time. Read the PDS",
          additionalInfoUri: `${brandBaseUri}lending`
        }
      ]
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