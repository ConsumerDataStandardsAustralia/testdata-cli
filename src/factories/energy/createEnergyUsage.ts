import { EnergyDerRecord, EnergyPlan, EnergyUsageRead } from 'consumer-data-standards/energy';
import { RandomEnergy, ReadUTYpe } from '../../random-generators';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { EnergyServicePointWrapper } from '../../logic/schema/cdr-test-data-schema';


const factoryId: string = "create-energy-usage";


export class CreateEnergyUsage extends Factory {
    public get briefDescription(): string {
        return "Create some Usage for a service point";
    }
    public get detailedDescription(): string {
        let st = `
Create some Usage for a service point.

This factory will accept the following options
        
    readUType:              This should be intervalRead OR basicRead (Default random selection)
    intervalReadCount:      An integer value for the number of interval reads (Default to 5)

Key values randomly allocated:

    The quality of the read taken:   ACTUAL, SUBSTITUTE, or FINAL_SUBSTITUTE
`;
    return st;
    } 

    public static id: string = factoryId;
    private count: number | unknown;
    private readType : ReadUTYpe = RandomEnergy.ReadUTYpe();
    private intervalReadCount: number = 5;

    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.count = options.options?.count;
        this.readType = options?.options?.readUType ? options?.options?.readUType: RandomEnergy.ReadUTYpe();
        this.intervalReadCount = options?.options?.intervalReadCount ? options?.options?.intervalReadCount as number: 5;
      }



      public canCreateEnergyUsage(): boolean { return true; };
      public generateEnergyUsage(servicePoint: EnergyServicePointWrapper): EnergyUsageRead[] | undefined { 
        // TODO bug fix in @types/consumer-data-standards required to enable this
        let usageList: EnergyUsageRead[] = [];
        //let usageList: any[] = [];
        let cnt = this.count != undefined ? this.count as number : 1;
        for (let i = 0; i < cnt; i++) {
             // TODO bug fix in @types/consumer-data-standards required to make this EnergyUsageRead
            let usage: EnergyUsageRead = {
            //let usage: any = {
                readStartDate: Helper.randomDateTimeInThePast(),
                readUType: this.readType,
                registerSuffix: "",
                servicePointId: servicePoint.servicePoint.servicePointId
            }
            if (this.readType == ReadUTYpe.basicRead){
                usage.basicRead = {
                    value: parseFloat(Helper.generateRandomDecimalInRange(-10, 100)),              
                };
                if (Math.random() > 0.5) usage.basicRead.quality = RandomEnergy.BasicReadQuality();
            }
            if (this.readType == ReadUTYpe.intervalRead){
                let aggregateValue: number = 0;
                let intervalReads: number[] = [];
                for (let i = 0; i < this.intervalReadCount; i ++) {
                    let val = parseFloat(Helper.generateRandomDecimalInRange(0, 1, 3));
                    aggregateValue += val;
                    intervalReads.push(val);
                }
                usage.intervalRead = {
                    aggregateValue: parseFloat(aggregateValue.toFixed(3))
                }

                usage.intervalRead.intervalReads = intervalReads;

                usage.intervalRead.readIntervalLength = Helper.generateRandomIntegerInRange(5,120);
                let start = Helper.generateRandomIntegerInRange(10, 100);
                let end = Helper.generateRandomIntegerInRange(101, 200);
                let readQualities: any[] = [];
                let  readQuality: any = {
                    startInterval: start, endInterval: end, quality: RandomEnergy.IntervalReadQuality()
                };
                readQualities.push(readQuality);              
                usage.intervalRead.readQualities = readQualities;

            }
            usageList.push(usage);
        }
        return usageList;
      }

}

