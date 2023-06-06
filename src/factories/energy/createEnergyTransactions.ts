import { EnergyBillingDemandTransaction, EnergyBillingOnceOffTransaction, EnergyBillingOtherTransaction, EnergyBillingPaymentTransaction, EnergyBillingTransaction, EnergyBillingUsageTransaction, EnergyPlan, EnergyPlanDetailV2} from "consumer-data-standards/energy";
import { EnergyAccountBalance, EnergyAccountWrapper, EnergyServicePointWrapper } from "../../logic/schema/cdr-test-data-schema";
import { TransactionUType } from "../../random-generators";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { RandomEnergy } from '../../random-generators';

const factoryId: string = "create-energy-transactions";

export class CreateEnergyTransaction extends Factory {

    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.transactionUType = options?.options?.transactionUType ? options?.options?.transactionUType: RandomEnergy.TransactionUType();
    }

    public static id: string = factoryId;
    private transactionUType: TransactionUType;

    private accountWrapper: EnergyAccountWrapper | undefined;
    private servicePointWrapper: EnergyServicePointWrapper[] | undefined;

    public get briefDescription(): string {
        return "This factory will create some EnergyBillingTransactions";
    }
    public get detailedDescription(): string {
        let st =`
This factory will create some EnergyBillingTransactions.

The factory will accept the following options:

        count:             The number of transactions to be issued for each account
        transactionUType:  Should be 'usage', 'demand', 'onceOff', 'payment', or 'other'.
                           The default is a random assignment

Key values randomly allocated:

        The calculation factor for usage and demand transactions
`
        return st;
    } 

    public canCreateEnergyBalance(): boolean { return true};

    public generateEnergyBalance(account: EnergyAccountWrapper): EnergyAccountBalance | undefined {
        let accBalance: EnergyAccountBalance = {
            balance: Helper.generateRandomDecimalInRange(-500, 5000, 2)
        }
        return account.balance = accBalance;
    }

    public canCreateEnergyTransaction(): boolean { return true; };
    public generateEnergyTransaction(account: EnergyAccountWrapper, servicePoints: EnergyServicePointWrapper[]): EnergyBillingTransaction | undefined 
    { 
        this.accountWrapper = account;
        this.servicePointWrapper = servicePoints;

        let id = this.accountWrapper.account.accountId;
        
        let transaction : EnergyBillingTransaction = {
            accountId: account.account.accountId,
            executionDateTime: "",
            transactionUType: this.transactionUType
        }

        if (this.transactionUType == TransactionUType.demand) transaction.demand = this.generateBillingDemand();
        if (this.transactionUType == TransactionUType.onceOff) transaction.onceOff = this.generateBillingOnceOff();
        if (this.transactionUType == TransactionUType.payment) transaction.payment = this.generateBillingPayment();
        if (this.transactionUType == TransactionUType.usage) transaction.usage = this.generateBillingUsage();
        if (this.transactionUType == TransactionUType.otherCharges) transaction.otherCharges = this.generateBillingOther();
        
        return transaction;
    }
  
    public canCreateEnergyTransactions(): boolean { return true; };
    public generateEnergyTransactions(account: EnergyAccountWrapper, servicePoints: EnergyServicePointWrapper[] ): any[] | undefined { 
        let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;
        let ret: EnergyBillingTransaction[] = [];
        for (let i = 0; i < count; i++) {
            const el = this.generateEnergyTransaction(account, servicePoints);
            if (el) ret.push(el);
        }
        return ret;
    }

    private generateBillingUsage(): EnergyBillingUsageTransaction {
        let ret: EnergyBillingUsageTransaction = {
            amount: Helper.generateRandomDecimalInRange(-100, 100, 2),
            endDate: Helper.randomDateTimeInTheFuture(),
            startDate: Helper.randomDateTimeInThePast(),
            timeOfUseType: RandomEnergy.TimeOfUseType(),
            usage: Helper.generateRandomIntegerInRange(-100, 100),
        }
        let spID = this.getServicePointId();
        if (spID != null) ret.servicePointId = spID;
        let invoiceNumber = this.getInvoiceNumber();
        if (invoiceNumber != null) ret.invoiceNumber = invoiceNumber;
        if (Math.random() > 0.5) ret.description = "An optional description for billing usage transaction";
        if (Math.random() > 0.5) ret.isEstimate = Helper.randomBoolean(0.5);
        if (Math.random() > 0.1) ret.measureUnit = RandomEnergy.MeasureUnit();
        if (Math.random() > 0.1) {
            ret.calculationFactors = this.getCalcualtionFactors();
        }
        if (Math.random() > 0.1) {
            ret.adjustments = this.getAdjustments();
        }        
        return ret;
    }

    private generateBillingDemand(): EnergyBillingDemandTransaction {
        let ret: EnergyBillingDemandTransaction = {
            endDate: Helper.randomDateTimeInTheFuture(),
            startDate: Helper.randomDateTimeInThePast(),
            timeOfUseType: RandomEnergy.TimeOfUseType(),
            rate: Helper.generateRandomIntegerInRange(-100, 100),
            amount: Helper.generateRandomDecimalInRange(-100, 100, 2),
        }
        let spID = this.getServicePointId();
        if (spID != null) ret.servicePointId = spID;
        let invoiceNumber = this.getInvoiceNumber();
        if (invoiceNumber != null) ret.invoiceNumber = invoiceNumber;
        if (Math.random() > 0.5) ret.description = "An optional description for billing demand transaction";
        if (Math.random() > 0.5) ret.isEstimate = Helper.randomBoolean(0.5);

        if (Math.random() > 0.1) {
            ret.calculationFactors = this.getCalcualtionFactors();
        }
        if (Math.random() > 0.1) {
            ret.adjustments = this.getAdjustments();
        }  
        return ret;
    }

    private generateBillingOnceOff(): EnergyBillingOnceOffTransaction {
        let ret: EnergyBillingOnceOffTransaction = {
            amount: Helper.generateRandomDecimalInRange(-100, 100, 2),
            description: "Mandatory description for a once off billing charge"
        }
        let spID = this.getServicePointId();
        if (spID != null) ret.servicePointId = spID;
        let invoiceNumber = this.getInvoiceNumber();
        if (invoiceNumber != null) ret.invoiceNumber = invoiceNumber;
        return ret;
    }


    private generateBillingOther(): EnergyBillingOtherTransaction {
        let ret: EnergyBillingOtherTransaction = {
            amount: Helper.generateRandomDecimalInRange(-100, 100, 2),
            description: "Mandatory description for other billing charge"
        }
        if (Math.random() > 0.5) ret.type = RandomEnergy.OtherUsageChargesType();
        ret.endDate = Helper.randomDateTimeInTheFuture();
        ret.startDate = Helper.randomDateTimeInThePast();
        let spID = this.getServicePointId();
        if (spID != null) ret.servicePointId = spID;
        let invoiceNumber = this.getInvoiceNumber();
        if (invoiceNumber != null) ret.invoiceNumber = invoiceNumber;

        if (Math.random() > 0.1) {
            ret.calculationFactors = this.getCalcualtionFactors();
        }
        if (Math.random() > 0.1) {
            ret.adjustments = this.getAdjustments();
        }  
        return ret;
    }

    private generateBillingPayment(): EnergyBillingPaymentTransaction {
        let ret: EnergyBillingPaymentTransaction = {
            amount: Helper.generateRandomDecimalInRange(-100, 100, 2),
            method: RandomEnergy.EnergyBillPaymentMethod()
        }
        return ret;
    }


    private getServicePointId(): string | null {
        let cnt = this.servicePointWrapper ? this.servicePointWrapper.length : 0;
        if (cnt > 0) {
            let randomIdx = Helper.generateRandomIntegerInRange(0, cnt-1);
            if (this.servicePointWrapper)
                return this.servicePointWrapper[randomIdx]?.servicePoint?.servicePointId;
        }
        return null;
    }

    private getInvoiceNumber(): string | null {
        let cnt = this.accountWrapper ? this.accountWrapper?.invoices?.length as number : 0;
        if (cnt > 0) {
            let randomIdx = Helper.generateRandomIntegerInRange(0, cnt-1);
            if (this.accountWrapper?.invoices)
                return this.accountWrapper?.invoices[randomIdx]?.invoiceNumber
        }
        return null;
    }

    private getCalcualtionFactors(): any {
        let calculationFactors: any[] = [];   
        let calcFactor: any = {};  
        calcFactor.value = Helper.generateRandomIntegerInRange(1,100);
        calcFactor.type = RandomEnergy.CalculationFactorType();
        calculationFactors.push(calcFactor)
        return calculationFactors;      
    }

    private getAdjustments(): any {
        let adjustments: any[] = [];   
        let adj: any = {};  
        adj.amount = Helper.generateRandomDecimalInRange(10,50);
        adj.description = "Mandatory description for billing usage transaction adjustments";
        adjustments.push(adj)
        return adjustments;     
    }


}