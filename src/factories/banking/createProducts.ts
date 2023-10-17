import { BankingProductV4 } from 'consumer-data-standards/banking';

import { HolderWrapper } from '../../logic/schema/cdr-test-data-schema';
import { ProductCategory, RandomBanking } from '../../random-generators/random-banking';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { CustomerType } from 'src/random-generators';
import { randomUUID } from 'crypto';

const factoryId: string = "create-products";


export class CreateProducts extends Factory {

    private category: ProductCategory;

    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.category = options?.options?.productCategory ? options?.options?.productCategory as ProductCategory: RandomBanking.ProductCategory();   
      }
    
    public static id: string = factoryId;


    private getProductInfo(category: string): any {
       // default is savings account
       let ret = RandomBanking.SelectBaseBankingProductInfo(category);
       return ret;
    }

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
    
    public canCreateHolder(): boolean { return true; };
    public generateHolder(): HolderWrapper | undefined {
       let result : HolderWrapper = {
         holderId: Helper.randomId(),
         holder : {
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

      // get a random product name/description based on category

      // create product with mandatory fields
      let product: BankingProductV4 = {
        brand: brandInfo.brand,
        description: productInfo.description,
        isTailored: false,
        lastUpdated: lastUpdatedTime,
        name: productInfo.name,
        productCategory: this.category,
        productId: randomUUID()
      };

      if (Math.random() > 0.5) product.effectiveFrom = effectiveFromDate;
      if (Math.random() > 0.5) product.effectiveTo = effectiveToDate;
      if (Math.random() > 0.5) product.brandName = brandInfo.brandName;
      if (Math.random() > 0.5) product.applicationUri = `${brandBaseUri}${categoryLowerCase}`,
      product.cardArt = [
        {
          title: "Title",
          imageUri: `${brandBaseUri}${categoryLowerCase}`
        }
      ],
      product.additionalInformation = {
          overviewUri: `${brandBaseUri}overview`,
          termsUri:`${brandBaseUri}terms`,
          eligibilityUri: `${brandBaseUri}conditions`,
          feesAndPricingUri: `${brandBaseUri}fees`,
          bundleUri: `${brandBaseUri}bundles`
        },

      product.bundles = [
        {
          name: "Name",
          description: "Description",
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}bundles-info`,
          productIds: [
            Helper.randomId()
          ]
        }
      ],
      product.features = [
        {
          featureType: RandomBanking.FeatureType(),
          additionalValue: "3",
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}features`
        }
      ],
      product.constraints = [
        {
          constraintType: RandomBanking.ContraintType(),
          additionalValue: "1000.00",
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}conditions`
        }
      ],
      product.eligibility = [
        {
          eligibilityType: RandomBanking.EligibilityType(),
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}conditions`
        }
      ],
      product.fees = [
        {
          name: "Name",
          feeType: RandomBanking.FeeType(),
          amount: "10.00",
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}fees`
        }
      ],
      product.depositRates = [
        {
          depositRateType: RandomBanking.DepositRateType(),
          rate: "0.01",
          calculationFrequency: "P1D",
          applicationFrequency: "P1M",
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}deposits`
        }
      ],
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
          additionalInfo: "Additional info",
          additionalInfoUri: `${brandBaseUri}lending`
        }
      ]

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