import { BankingProductBundle , BankingProductConstraintV2,  BankingProductDetailV5,  BankingProductEligibility,} from 'consumer-data-standards/banking';

import { HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ContraintType, EligibilityType,  ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { CustomerType, RandomEnergy } from 'src/random-generators';
import { randomUUID } from 'crypto';
import { generateDepositRateArray, generateLendingRateArray, generateBankingProductFeatures, generateBankingProductFeeArray } from './utils';
import Utils from '../common/utils';

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
  
  - count:            The number of products to be created for each account. Default is 1   
  - productCategory:  This should be BankingProductCategory as defined in https://consumerdatastandardsaustralia.github.io/standards/#tocSbankingproductcategory
                      If not specified it will be randomnly assigned.

Key values randomly allocated:
  - Dates, numeric values, and other enumerated types
            `;
    return st;
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
  public generateBankProduct(): BankingProductDetailV5 {

    let categoryLowerCase = this.category.replace(/['_']/g, '-').toLowerCase();
    let brandInfo = RandomBanking.SelectBaseBrandInfo();
    let productInfo = RandomBanking.SelectBaseBankingProductInfo(categoryLowerCase)
    let brandBaseUri = this.createBaseUriForBrand(brandInfo.brand);

    let lastUpdatedTime = Helper.randomDateTimeInThePast();
    let effectiveToDate = Helper.randomDateTimeInTheFuture();
    let effectiveFromDate = Helper.randomDateTimeBeforeDateString(effectiveToDate);

    // create product with mandatory fields
    // populate the base product properties, ie BankingProductV4
    let product: BankingProductDetailV5 = {
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
    // populate BankignProductDetailV5.features
    if (Math.random() > 0.5) {
      product.features = generateBankingProductFeatures(brandBaseUri);
    }

    // populate BankignProductDetailV4.constraints
    if (Math.random() > 0.5) {
      let constraints: BankingProductConstraintV2[] = [];
      let constraint: BankingProductConstraintV2 = {
        constraintType: RandomBanking.ContraintType(),
        additionalValue: "None",
        additionalInfo: "Automatically generated by test data factory",
        additionalInfoUri: ""
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

      product.fees = generateBankingProductFeeArray(brandBaseUri);      
    }

    // populate BankignProductDetailV4.depositRates
    if (Math.random() > 0.5) {
      product.depositRates = generateDepositRateArray(brandBaseUri);      
    }

    // populate BankignProductDetailV4.lendingRates
    if (Math.random() > 0.5) {

      product.lendingRates = generateLendingRateArray(brandBaseUri);   
    }

    return product;
  }


  public canCreateBankProducts(): boolean { return true; };
  public generateBankProducts(): BankingProductDetailV5[] | undefined {
    let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

    let ret: BankingProductDetailV5[] = [];
    for (let i = 0; i < count; i++) {
      const el = this.generateBankProduct();
      if (el) ret.push(el);
    }
    return ret;
  }
}