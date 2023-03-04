import { EnergyConcession, EnergyPlan, EnergyPlanDetail} from "consumer-data-standards/energy";
import { EnergyAccountWrapper } from "src/logic/schema/cdr-test-data-schema";
import { ConcessionAppliedTo, ConcessionCalculationType, RandomEnergy } from "../../random-generators";
import { Factory, FactoryOptions, Helper } from "../../logic/factoryService";

const factoryId: string = "create-energy-concessions";

export class CreateEnergyConcessions extends Factory {

    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.calculationType  = options?.options?.calculationType ?  options?.options?.calculationType as ConcessionCalculationType : RandomEnergy.ConcessionCalculationType();
    }

    public static id: string = factoryId;

    private calculationType: ConcessionCalculationType;


    public get briefDescription(): string {
        return "This factory will generate EnergyConcessions"
    }
    public get detailedDescription(): string {
        let st = `
This factory will generate EnergyConcessions.

The factory will accept the following options:\n
        count:            The number of concessions to create.
        calculationType:  The calculation type for the concession. This is either
                          VARIABLE, FIXED_AMOUNT,or FIXED_PERCENTAGE (Default is randomly assigned)

 Key values randomly allocated:
        startDate (past), endDate (future)
`
        return st;
    } 

    public canCreateEnergyConcession(): boolean { return true; };
    public generateEnergyConcession(account: EnergyAccountWrapper): any | undefined {
        let concession: EnergyConcession = {
            displayName: "Mandatory description for EnergyConcession",
            type: this.calculationType 
        }
        if (this.calculationType == ConcessionCalculationType.VARIABLE) concession.additionalInfo = "Some more information on the concession";
        if (Math.random() > 0.25) concession.additionalInfoUri = "https://energy.concession.moreinfo"
        concession.startDate = Helper.randomDateTimeInThePast();
        concession.endDate = Helper.randomDateTimeInTheFuture();
        if (this.calculationType == ConcessionCalculationType.FIXED_AMOUNT
            || this.calculationType == ConcessionCalculationType.FIXED_PERCENTAGE) concession.discountFrequency = "P23DT23H"
        if (this.calculationType == ConcessionCalculationType.FIXED_AMOUNT) concession.amount = Helper.generateRandomDecimalInRange(100,200, 2);
        if (this.calculationType == ConcessionCalculationType.FIXED_PERCENTAGE) concession.percentage = Helper.generateRandomDecimalInRange(1,100, 2);
        let appliedToCount = Helper.generateRandomIntegerInRange(1,3);
        var appliedTo: ConcessionAppliedTo[] = [];
        for(let i =0; i < appliedToCount; i++) {
            appliedTo.push(RandomEnergy.ConcessionAppliedTo());
        }
        if (Math.random() > 0.25) concession.appliedTo = appliedTo;
        return concession;
    }
  
    public canCreateEnergyConcessions(): boolean { return true; };
    public generateEnergyConcessions(account: EnergyAccountWrapper): any[] | undefined {
        let count = Helper.isPositiveInteger(this.options.options?.count) ? (this.options.options?.count as number) : 1;

        let ret: any[] = [];
        for (let i = 0; i < count; i++) {
          const el = this.generateEnergyConcession(account);
          if (el) ret.push(el);
        }
        return ret;   
    }


}