import { Factory, FactoryOptions } from "src/logic/factoryService";
import { CustomerWrapper, BankAccountWrapper } from "src/logic/schema/cdr-test-data-schema";
import { AccountOwnership, OpenStatus, ProductCategory, RandomBanking } from "src/random-generators";

const factoryId: string = "create-pbanking-accounts";

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
    public generateBankAccount(customer: CustomerWrapper): BankAccountWrapper | undefined { return }
  
    public canCreateBankAccounts(): boolean { return false; };
    public generateBankAccounts(customer: CustomerWrapper): BankAccountWrapper[] | undefined { return }

}