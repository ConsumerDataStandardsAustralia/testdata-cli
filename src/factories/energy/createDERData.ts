import { EnergyDerRecord, EnergyPlan } from 'consumer-data-standards/energy';
import { RandomEnergy } from '../../random-generators';
import { Factory, FactoryOptions, Helper } from '../../logic/factoryService'
import { EnergyServicePointWrapper } from '../../logic/schema/cdr-test-data-schema';
import { AcEquipmentType, DerDeviceType } from '../../random-generators';

import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

const factoryId: string = "create-der-data";


export class CreateDerData extends Factory {
    public get briefDescription(): string {
        return "Create some Der data for a service point";
    }
    public get detailedDescription(): string {
        let st = `
This factory will create some Der data for a service points.

The factory will accept the following options
        
hasCentralProtectionControl:   This should be true or false
                               If absent it is false
equipmentType:                 INVERTER or OTHER
                               If no value is provided it will default to OTHER

Key values randomly allocated:
    The number of available and installed phases:  between 0 and 3
    Protection voltages and delays`;
        return st;
    }
    public static id: string = factoryId;

    private hasCentralProtectionControl: boolean;
    private equipmentType: AcEquipmentType;

    constructor(options: FactoryOptions) {
        super(options, factoryId);
        this.hasCentralProtectionControl = options?.options?.hasCentralProtectionControl ? options?.options?.hasCentralProtectionControl as boolean: false;
        this.equipmentType = options?.options?.equipmentType ? options?.options?.equipmentType as AcEquipmentType : AcEquipmentType.OTHER;

    }

    public canCreateEnergyDER(): boolean { return true; };
    public generateEnergyDER(servicePoint: EnergyServicePointWrapper): EnergyDerRecord | undefined {
        let capacity = Helper.generateRandomIntegerInRange(0, 1000);
        let availablePhases = Helper.generateRandomIntegerInRange(0, 3);
        let installedPhases = Helper.generateRandomIntegerInRange(0, 3);
        let der: EnergyDerRecord = {
            acConnections: [],
            approvedCapacity: capacity,
            availablePhasesCount: availablePhases,
            installedPhasesCount: installedPhases,
            islandableInstallation: false,
            servicePointId: servicePoint.servicePoint.servicePointId
        }

        if (Math.random() > 0.25) der.hasCentralProtectionControl = this.hasCentralProtectionControl;
        if (der?.hasCentralProtectionControl == true) {
            der.protectionMode = {
                exportLimitKva: Helper.generateRandomIntegerInRange(10, 500),
                underFrequencyProtection: parseFloat(Helper.generateRandomDecimalInRange(48.5, 49.8, 2)),
                underFrequencyProtectionDelay: parseFloat(Helper.generateRandomDecimalInRange(0.05, 1.5, 2)),
                overFrequencyProtection: parseFloat(Helper.generateRandomDecimalInRange(50.1, 51.1, 2)),
                overFrequencyProtectionDelay: parseFloat(Helper.generateRandomDecimalInRange(0.05, 1.5, 2)),
                underVoltageProtection: parseFloat(Helper.generateRandomDecimalInRange(230, 239, 2)),
                underVoltageProtectionDelay: parseFloat(Helper.generateRandomDecimalInRange(0.05, 1.5, 2)),
                overVoltageProtection: parseFloat(Helper.generateRandomDecimalInRange(241, 250, 2)),
                overVoltageProtectionDelay: parseFloat(Helper.generateRandomDecimalInRange(0.05, 1.5, 2)),
                sustainedOverVoltage: parseFloat(Helper.generateRandomDecimalInRange(241, 250, 2)),
                sustainedOverVoltageDelay: parseFloat(Helper.generateRandomDecimalInRange(0.05, 1.5, 2)),
                voltageVectorShift: parseFloat(Helper.generateRandomDecimalInRange(25, 70, 2)),
                frequencyRateOfChange: parseFloat(Helper.generateRandomDecimalInRange(5, 15, 2)),
                neutralVoltageDisplacement: parseFloat(Helper.generateRandomDecimalInRange(241, 250, 2)),
                interTripScheme: 'from local substation'
            }
        }
        //let equipmentType: AcEquipmentType = RandomEnergy.AcEquipmentType();
        let acConnections: any[] = [];
        let cnt = Helper.generateRandomIntegerInRange(1, 5);
        for (let i = 0; i < cnt; i++) {
            let ac: any = {
                commissioningDate: Helper.randomTimeInThePast(),
                connectionIdentifier: Helper.generateRandomIntegerInRange(10, 200),
                count: 1,
                derDevices: [],
                status: RandomEnergy.AcInverterStatus()
            }
            ac.equipmentType = this.equipmentType;
            if (this.equipmentType == AcEquipmentType.INVERTER) ac.manufacturerName = faker.company.name();
            if (this.equipmentType == AcEquipmentType.INVERTER) ac.series = faker.lorem.slug();
            if (this.equipmentType == AcEquipmentType.INVERTER) ac.inverterModelNumber = faker.random.alphaNumeric(10);
            if (this.equipmentType == AcEquipmentType.INVERTER) ac.inverterSeries = faker.random.alphaNumeric(5);
            if (this.equipmentType == AcEquipmentType.INVERTER) ac.status = RandomEnergy.AcInverterStatus();
            if (this.equipmentType == AcEquipmentType.INVERTER) ac.inverterDeviceCapacity = Helper.generateRandomIntegerInRange(100, 10000);
            let derDeviceType = RandomEnergy.DerDeviceType();
            let derDeviceCnt = Helper.generateRandomIntegerInRange(1, 5);
            let derDevices: any[] = []
            for (let i = 0; i < derDeviceCnt; i++) {
                let device: any = {};
                device.deviceIdentifier = Helper.generateRandomIntegerInRange(10000, 50000);
                device.count = Helper.generateRandomIntegerInRange(1, 5);
                device.manufacturer = faker.company.name();
                device.modelNumber = 'ABC';
                device.type = derDeviceType;
                device.status = RandomEnergy.AcInverterStatus();
                device.subtype = RandomEnergy.DerDeviceType();
                device.nominalRatedCapacity = Helper.generateRandomIntegerInRange(10, 500);
                if (derDeviceType == DerDeviceType.STORAGE) device.nominalStorageCapacity = Helper.generateRandomIntegerInRange(10, 1000);
                derDevices.push(device)
            }
            ac.derDevices = derDevices;
            acConnections.push(ac)
        }
        der.acConnections = acConnections;
        acConnections
        return der;
    }
}

