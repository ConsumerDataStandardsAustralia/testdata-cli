import { EnergyPaymentSchedule, EnergyPlan, EnergyPlanDetailV2} from "consumer-data-standards/energy";
import { EnergyAccountWrapper } from "../../logic/schema/cdr-test-data-schema";
import { CardScheme, DigitialWalletIdType, PaymentScheduleUType, RandomEnergy, ScheduleCalculationType } from "../../random-generators";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";
import { faker } from "@faker-js/faker";

const factoryId: string = "create-energy-payment-schedules";

export class CreateEnergyPaymentSchedules extends Factory {

    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.paymentScheduleUType  = options?.options?.paymentScheduleUType ?  options?.options?.paymentScheduleUType as PaymentScheduleUType : RandomEnergy.PaymentScheduleUType();
        this.cardScheme  = options?.options?.cardScheme ?  options?.options?.cardScheme as CardScheme : RandomEnergy.CardScheme();
        this.calculationType  = options?.options?.calculationType ?  options?.options?.calculationType as ScheduleCalculationType : RandomEnergy.ScheduleCalculationType();

    }

    public static id: string = factoryId;

    private paymentScheduleUType: PaymentScheduleUType;
    private cardScheme: CardScheme;
    private calculationType: ScheduleCalculationType;

    public get briefDescription(): string {
        let st = "Create some EnergyPaymentSchedule structures";
        return st;
    }

    public get detailedDescription(): string {
      let st = `
This factory will create some EnergyPaymentSchedule structures.

The factory will accept the following options
        
    paymentScheduleUType:   cardDebit, directDebit, manualPayment, digitalWallet
    cardScheme:             VISA, MASTERCARD,AMEX,DINERS,OTHER,UNKOWN
    calculationType:        STATIC,BALANCE, CALCULATED

Key values randomly allocated:
    digitalWallet provider and type
`;
              return st;
    } 

    public canCreateEnergyPaymentSchedules(): boolean { return true; };
    public generateEnergyPaymentSchedules(account: EnergyAccountWrapper): any[] | undefined {
        let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

        let ret: EnergyPaymentSchedule[] = [];
        for (let i = 0; i < count; i++) {

          let entry: EnergyPaymentSchedule = {
            paymentScheduleUType: this.paymentScheduleUType
          }    
          entry.amount = Helper.generateRandomDecimalInRange(10, 500, 2);
          if (this.paymentScheduleUType == PaymentScheduleUType.cardDebit) {
              entry.cardDebit = {
                  cardScheme: this.cardScheme,
                  paymentFrequency: "P1M",
                  calculationType: this.calculationType
              }

          }
          if (this.paymentScheduleUType == PaymentScheduleUType.directDebit) {
              let dd: any = {}
              if (Math.random() > 0.25) { dd.isTokenised = Helper.randomBoolean(0.75)};
              if (dd.isTokenised == undefined || dd.isTokenised == false) dd.bsb = faker.finance.account(6);
              if (dd.isTokenised == undefined || dd.isTokenised == false) dd.accountNumber = faker.finance.account(8);
              dd.paymentFrequency = "P1M";
              dd.calculationType = this.calculationType;
              entry.directDebit = dd;
            
          }
          if (this.paymentScheduleUType == PaymentScheduleUType.digitalWallet) {
             let digitalWalletType = RandomEnergy.DigitialWalletIdType();
             let digitalWalletName = "";
             
             switch(digitalWalletType) {
                case DigitialWalletIdType.CONTACT_NAME: digitalWalletName = faker.name.fullName();
                  break;
                case DigitialWalletIdType.EMAIL: digitalWalletName = faker.internet.email();
                  break;
                case DigitialWalletIdType.TELEPHONE: digitalWalletName = faker.phone.number();
                  break;
                default: break;
             }
             entry.digitalWallet = {
                name: "Manadtory name for digital wallet",
                type: digitalWalletType,
                identifier: digitalWalletName,
                calculationType: this.calculationType,
                paymentFrequency: "P1M",
                provider: RandomEnergy.DigitalWalletProvider()
             }

            
          }
          if (this.paymentScheduleUType == PaymentScheduleUType.manualPayment) {
              entry.manualPayment = {
                billFrequency: "P1M"
              }
          }          
          ret.push(entry)
        }
        return ret;
        
    }
  
}