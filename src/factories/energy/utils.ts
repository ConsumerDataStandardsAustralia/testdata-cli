import { EnergyPlanContractV2, EnergyPlanContractV2, EnergyPlanControlledLoad, EnergyPlanDiscounts, EnergyPlanEligibility, EnergyPlanFees, EnergyPlanGreenPowerCharges, EnergyPlanIncentives, EnergyPlanSolarFeedInTariffV2, EnergyPlanSolarFeedInTariffV2, EnergyPlanTariffPeriod } from "consumer-data-standards/energy";
import { Helper } from "../../logic/factoryService";
import { Days, EnergyDiscountType, FeeTerm, FuelType, generateRandomDecimalInRangeFormatted, generateRandomNumericInRangeFormatted, MethodUType, PowerChargeType, PricingModel, RandomEnergy, RateBlockUTypeControlledLoad, RateBlockUTypeForTariff, SolarFeedDays, SolarTariffUType } from "../../random-generators";

export function generateContract(pricingModel: PricingModel): any {
    let isFixed: boolean = Math.random() > 0.5 ? true : false;
    let paymentOtion = RandomEnergy.PaymentOption();
    let planTariffCnt: number = Math.ceil(Math.random() * 3);
    let tarrifPeriod: EnergyPlanTariffPeriod[] = generatePlanTariffPeriod(pricingModel, planTariffCnt);

    // For gas contracts this must be single rate
    let contract: EnergyPlanContractV2 = {
        isFixed: isFixed,
        paymentOption: [paymentOtion],
        pricingModel: pricingModel,
        tariffPeriod: tarrifPeriod
    };
    let additionalFeeInfo = Helper.randomBoolean(null) ? RandomEnergy.AdditionalFeeInformation() : null;
    if (additionalFeeInfo) contract.additionalFeeInformation = additionalFeeInfo;

    // time zone is optional in this case
    if (pricingModel == PricingModel.TIME_OF_USE) contract.timeZone = RandomEnergy.TariffPeriodTimezone();
    if (contract.isFixed == false) {
        contract.variation = "Variation details for this contract"
    }
    if (Math.random() > 0.5) contract.onExpiryDescription = 'This is what happens when prior to expiry of contract';
    if (Math.random() > 0.5) contract.intrinsicGreenPower = { "greenPercentage": generateRandomDecimalInRangeFormatted(0.3, 4.0, 2) }
    if (contract.pricingModel == PricingModel.SINGLE_RATE_CONT_LOAD ||
        contract.pricingModel == PricingModel.TIME_OF_USE_CONT_LOAD ||
        contract.pricingModel == PricingModel.FLEXIBLE_CONT_LOAD) {
        let cnt: number = Math.ceil(Math.random() * 3);
        contract.controlledLoad = generatePlanControlledLoad(cnt);
    }
    let incentiveCnt: number = Math.ceil(Math.random() * 3);
    if (Math.random() > 0.5) contract.incentives = generatePlanIncentives(incentiveCnt);
    let discountCnt: number = Math.ceil(Math.random() * 3);
    if (Math.random() > 0.5) contract.discounts = generatePlanDiscounts(discountCnt);
    let greenCnt: number = Math.ceil(Math.random() * 3);
    if (Math.random() > 0.5) contract.greenPowerCharges = generateGreenPowerCharges(greenCnt);
    let eligibilityCnt: number = Math.ceil(Math.random() * 3);
    if (Math.random() > 0.5) contract.eligibility = generatePlanEligibility(eligibilityCnt);
    let feeCnt: number = Math.ceil(Math.random() * 3);
    if (Math.random() > 0.5) contract.fees = generatePlanFees(feeCnt);
    let solarCnt: number = Math.ceil(Math.random() * 3);
    if (Math.random() > 0.5) contract.solarFeedInTariff = generateSolarFeedInTariffs(solarCnt);
    return contract;
}

export function generatePlanOverview(): any {
    // create a plan overview object
    let planOverview: any = {};
    planOverview['startDate'] = Helper.randomDateTimeInThePast();
    if (Math.random() > 0.2) planOverview['endDate'] = Helper.randomDateTimeInTheFuture();
    let planOverviewName = Helper.randomBoolean(null) ? "Display name" : null;
    if (planOverviewName) planOverview['displayName'] = planOverviewName;
    return planOverview;
}

export function generatePlanDetails(fuelType: FuelType): any {
    let planDetails: any = {};
    planDetails['fuelType'] = fuelType;
    if (fuelType != FuelType.DUAL) planDetails['isContingentPlan'] = Helper.randomBoolean(null);
    let includeCharges = Helper.randomBoolean(0.95);
    if (includeCharges) {
        let meteringCharges: any[] = [];
        let charge: any = {};
        charge['displayName'] = 'Metering Display Name';
        charge['minimumValue'] = Math.ceil(Math.random() * 100).toString();
        charge['period'] = 'P3Y6M4DT12H30M5S';
        charge['maximumValue'] = '999999';
        meteringCharges.push(charge);
        planDetails['meteringCharges'] = meteringCharges;
    }
    return planDetails;
}

function generatePlanTariffPeriod(pricingModel: PricingModel, planTariffCnt: number): EnergyPlanTariffPeriod[] {
    let result: EnergyPlanTariffPeriod[] = [];
    for (let cnt = 0; cnt <= planTariffCnt; cnt++) {
        let planTariffPeriod: EnergyPlanTariffPeriod = {
            displayName: 'Energy Tarrif Period Display Name',
            endDate: Helper.randomDateTimeInTheFuture(),
            rateBlockUType: RandomEnergy.RateBlockUTypeForTariff(),
            startDate: Helper.randomDateTimeInThePast()
        }

        if (Math.random() > 0.5) planTariffPeriod.dailySupplyCharges = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
        if (Math.random() > 0.5) planTariffPeriod.timeZone = RandomEnergy.TariffPeriodTimezone();

        if (planTariffPeriod.rateBlockUType == RateBlockUTypeForTariff.singleRate) {
            let singleRate: any = {};
            planTariffPeriod.singleRate = singleRate;
            if (planTariffPeriod.singleRate != null) {
                planTariffPeriod.singleRate.displayName = 'Single Rate Display Name';
                if (Math.random() > 0.5) planTariffPeriod.singleRate.description = "Optional description for single rate";
                planTariffPeriod.singleRate.generalUnitPrice = generateRandomDecimalInRangeFormatted(0.5, 3.0, 4);
                let cnt = Math.ceil(Math.random() * 3)
                planTariffPeriod.singleRate.rates = generateRates(cnt);
                if (Math.random() > 0.5) planTariffPeriod.singleRate.period = 'P3Y6M4DT12H30M5S';
                planTariffPeriod.singleRate = singleRate;
            }

        }
        if (planTariffPeriod.rateBlockUType == RateBlockUTypeForTariff.timeOfUseRates.toString()) {

            let timeOfUseRates: any[] = [];
            let rateCnt = Math.ceil(Math.random() * 3);
            // create random number of empty objects
            for (let i = 0; i < rateCnt; i++) timeOfUseRates.push({});
            planTariffPeriod.timeOfUseRates = timeOfUseRates;
            planTariffPeriod.timeOfUseRates.forEach(entry => {
                if (planTariffPeriod.timeOfUseRates != null) {
                    entry.displayName = 'Time Of Use Display Name';
                    if (Math.random() > 0.5) entry.description = 'Time Of Use Display Description';
                    let cnt = Math.ceil(Math.random() * 3)
                    entry.rates = generateRates(cnt);
                    let timeOfUse: any[] = [];
                    let timeOfUseDayCnt = Math.ceil(Math.random() * 3);
                    for (let i = 0; i < timeOfUseDayCnt; i++) timeOfUse.push({});
                    entry.timeOfUse = timeOfUse;
                    entry.timeOfUse.forEach(element => {
                        element.days = getRandomDays(3);
                        element.startTime = Helper.randomDateTimeInThePast();
                        element.endTime = Helper.randomDateTimeInTheFuture();
                        timeOfUse.push(element);
                    })
                    entry.timeOfUse = timeOfUse;
                    entry.type = RandomEnergy.PlanTariffUsageType();
                }
            })
        };
        if (planTariffPeriod.rateBlockUType == RateBlockUTypeForTariff.demandCharges) {
            let demandCharges: any[] = [];
            let demandChargesCount = Math.ceil(Math.random() * 2);
            for (let i = 0; i < demandChargesCount; i++) demandCharges.push({});
            planTariffPeriod.demandCharges = demandCharges;
            let idx: number = 0;
            planTariffPeriod.demandCharges.forEach(element => {
                //let charge: any = {};
                idx++;
                element.displayName = `Demand charge ${idx} display name`;
                if (Math.random() > 0.5) element.description = `Demand charge ${idx} detailed description`;
                element.amount = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
                if (Math.random() > 0.5) element.measureUnit = RandomEnergy.MeasureUnit();
                element.startTime = '00:43:00.12345Z';
                element.endTime = '15:43:00.12345Z';
                if (Math.random() > 0.5) element.days = getRandomDays(3);
                if (Math.random() > 0.5) element.minDemand = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
                if (Math.random() > 0.5) element.maxDemand = generateRandomDecimalInRangeFormatted(3.5, 8.8, 2);
                element.measurementPeriod = RandomEnergy.MeasurementPeriod();
                element.chargePeriod = RandomEnergy.ChargePeriod();
            })
        }
        result.push(planTariffPeriod);
    }
    return result;
}

function generateRates(rateCount: number): any {
    let rates: any = [];
    for (let i = 0; i < rateCount; i++) {
        let rate: any = {};
        rate['unitPrice'] = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
        if (Math.random() > 0.5) rate['measureUnit'] = RandomEnergy.MeasureUnit();
        if (Math.random() > 0.5) rate['description'] = "Optional description for single rate";
        rate['volume'] = generateRandomNumericInRangeFormatted(0.5, 1.5, 2);
        rates.push(rate);
    }
    return rates;
}

function generatePlanControlledLoad(controlledLoadCnt: number): EnergyPlanControlledLoad[] {
    let result: EnergyPlanControlledLoad[] = [];

    for (let i = 0; i < controlledLoadCnt; i++) {
        let rateBlockUType = RandomEnergy.RateBlockUTypeControlledLoad()
        let controlledLoad: EnergyPlanControlledLoad = {
            displayName: `Display name for controlled load ${i}`,
            rateBlockUType: rateBlockUType
        }
        if (Math.random() > 0.5) controlledLoad.startDate = Helper.randomDateTimeInThePast();
        if (Math.random() > 0.5) controlledLoad.endDate = Helper.randomDateTimeInTheFuture();

        if (controlledLoad.rateBlockUType == RateBlockUTypeControlledLoad.singleRate) {
            let singleRate: any = {};
            controlledLoad.singleRate = singleRate;
            if (controlledLoad.singleRate != null) {
                controlledLoad.singleRate.displayName = `Controlled Load single rate ${i} display name`;
                if (Math.random() > 0.5) controlledLoad.singleRate.description = `Controlled Load single rate ${i} description`;
                controlledLoad.singleRate.dailySupplyCharge = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
                let rateCount = Math.ceil(Math.random() * 2);
                controlledLoad.singleRate.rates = generateRates(rateCount);
            }
        }
        if (rateBlockUType == RateBlockUTypeControlledLoad.timeOfUseRates) {
            let timeOfUseRates: any[] = [];
            let timeOfUseRateCnt = Math.ceil(Math.random() * 3);
            for (let i = 0; i < timeOfUseRateCnt; i++) timeOfUseRates.push({});
            controlledLoad.timeOfUseRates = timeOfUseRates;
            controlledLoad.timeOfUseRates.forEach(elem => {
                elem.displayName = 'Time Of Use Display Name';
                if (Math.random() > 0.5) elem.description = 'Time Of Use Display Description';
                elem.dailySupplyCharge = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
                let cnt = Math.ceil(Math.random() * 3)
                elem.rates = generateRates(cnt);
                let timeOfUse: any[] = [];
                let timeOfUseDayCnt = Math.ceil(Math.random() * 2);
                for (let i = 0; i < timeOfUseDayCnt; i++) timeOfUse.push({});
                elem.timeOfUse = timeOfUse;
                elem.timeOfUse.forEach(x => {
                    let l = Object.keys(Days).length; 
                    if (Math.random() > 0.5) x.days = getRandomDays(3);
                    x.startTime = Helper.randomDateTimeInThePast();
                    x.endTime = Helper.randomDateTimeInTheFuture();
                    if (Math.random() > 0.5) x.additionalInfoUri = 'http://moreinfo';
                    if (elem.startTime == null || elem.endTime == null || elem.additionalInfoUri != null) x.additionalInfo = 'Additional info for Time of Use'
                })

                elem.timeOfUse = timeOfUse;
                elem.type = RandomEnergy.TimeOfUseRateType();
            })
        }
        result.push(controlledLoad);
    }
    return result;
}

function getRandomDays(cnt: number): Days[] {
    let days: Days[] = [];
    let l = Math.min(Object.values(Days).length, 7)
    do {
        let day = Object.values(Days)[Helper.generateRandomIntegerInRange(0,l-1)];
        if (days.indexOf(day) == -1)
            days.push(day);
    } while(days.length< cnt)
    return days;
}

function generatePlanEligibility(cnt: number): EnergyPlanEligibility[] {
    let result: EnergyPlanEligibility[] = [];
    for(let i =0; i < cnt; i++) {
        let eligibility: EnergyPlanEligibility = {
            information: 'Energy Plan Eligibility Information',
            type: RandomEnergy.EnergyEligibilityType()
        }
        if (Math.random() > 0.5) eligibility.description = 'Energy Plan Eligibility Description'
        result.push(eligibility);
    }
    return result;
}

function generatePlanFees(cnt: number): EnergyPlanFees[] {
    let result: EnergyPlanFees[] = [];
    for (let i= 0; i < cnt; i++) {
        let term = RandomEnergy.FeeTerm();
        let type = RandomEnergy.EnergyFeeType();
        let fees: EnergyPlanFees = {
            term: term,
            type: type
        }
        if (Math.random() > 0.5) fees.description = 'Optional description for this fee'
        if (term != FeeTerm.PERCENT_OF_BILL) {
            fees.amount = generateRandomDecimalInRangeFormatted(5, 15, 2);
        }
        if (term == FeeTerm.PERCENT_OF_BILL) {
            fees.rate = generateRandomDecimalInRangeFormatted(2.5, 15, 2);
        }
        result.push(fees);
    }    
    return result;
}

function generateSolarFeedInTariffs(cnt: number): EnergyPlanSolarFeedInTariffV2[] {
    let result: EnergyPlanSolarFeedInTariffV2[] = [];
    for (let i = 0; i < cnt; i++) {
        let tariffUtype = RandomEnergy.SolarTariffUType();
        let tariff: EnergyPlanSolarFeedInTariffV2 = {
            displayName: 'Mandatory display name for Solar Feed Tariff',
            payerType: RandomEnergy.SolarPayerType(),
            scheme: RandomEnergy.SolarScheme(),
            tariffUType: tariffUtype
        }
        if (Math.random() > 0.5) tariff.description = 'Optional description for Solar Feed Tariff';
        if (tariffUtype == SolarTariffUType.singleTariff) {
            let single: any = {};
            tariff.singleTariff = single;
            if (tariff.singleTariff != null) tariff.singleTariff.amount = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
        }
        if (tariffUtype == SolarTariffUType.timeVaryingTariffs) {
            let timeVarying: any = {};
            tariff.timeVaryingTariffs = timeVarying;
            if (tariff.timeVaryingTariffs != null) {
                if (Math.random() > 0.5) tariff.timeVaryingTariffs.type = RandomEnergy.SolarFeedType();
                tariff.timeVaryingTariffs.amount = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
                let timeVariations: any[] = []
                let cnt: number = Math.ceil(Math.random() * 3);
                for(let i = 0; i < cnt; i++) timeVariations.push({});
                tariff.timeVaryingTariffs.timeVariations = timeVariations;
                tariff.timeVaryingTariffs.timeVariations.forEach(variation => {
                    if (Math.random() > 0.5) variation.startTime = Helper.randomDateTimeInThePast();
                    if (Math.random() > 0.5) variation.endTime = Helper.randomDateTimeInTheFuture();
                    let days: SolarFeedDays[] = [];
                    let dayCount: number = Math.ceil(Math.random() * 5);
                    for(let i = 0; i < dayCount; i++) days.push(RandomEnergy.SolarFeedDays());                   
                    variation.days = days;
                })
            }
        }
        result.push(tariff);
    }
    return result;
}

function generateSolarFeedInTariffsV2(cnt: number): EnergyPlanSolarFeedInTariffV2[] {
    let result: EnergyPlanSolarFeedInTariffV2[] = [];
    for (let i = 0; i < cnt; i++) {
        let tariffUtype = RandomEnergy.SolarTariffUType();
        let tariff: EnergyPlanSolarFeedInTariffV2 = {
            displayName: 'Mandatory display name for Solar Feed Tariff',
            payerType: RandomEnergy.SolarPayerType(),
            scheme: RandomEnergy.SolarScheme(),
            tariffUType: tariffUtype
        }
        if (Math.random() > 0.5) tariff.description = 'Optional description for Solar Feed Tariff';
        if (tariffUtype == SolarTariffUType.singleTariff) {
            let single: any = {};
            tariff.singleTariff = single;
            // TODO singleTAriff structure different in EnergyPlanSolarFeedInTariffV2
            if (tariff.singleTariff != null) tariff.singleTariff.amount = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
        }
        if (tariffUtype == SolarTariffUType.timeVaryingTariffs) {
            let timeVarying: any = {};
            tariff.timeVaryingTariffs = timeVarying;
            if (tariff.timeVaryingTariffs != null) {
                if (Math.random() > 0.5) tariff.timeVaryingTariffs.type = RandomEnergy.SolarFeedType();
                tariff.timeVaryingTariffs.amount = generateRandomDecimalInRangeFormatted(0.5, 1.5, 2);
                let timeVariations: any[] = []
                let cnt: number = Math.ceil(Math.random() * 3);
                for(let i = 0; i < cnt; i++) timeVariations.push({});
                tariff.timeVaryingTariffs.timeVariations = timeVariations;
                tariff.timeVaryingTariffs.timeVariations.forEach(variation => {
                    if (Math.random() > 0.5) variation.startTime = Helper.randomDateTimeInThePast();
                    if (Math.random() > 0.5) variation.endTime = Helper.randomDateTimeInTheFuture();
                    let days: SolarFeedDays[] = [];
                    let dayCount: number = Math.ceil(Math.random() * 5);
                    for(let i = 0; i < dayCount; i++) days.push(RandomEnergy.SolarFeedDays());                   
                    variation.days = days;
                })
            }
        }
        result.push(tariff);
    }
    return result;
}

function generateGreenPowerCharges(greenCnt: number): EnergyPlanGreenPowerCharges[] {

    let result: EnergyPlanGreenPowerCharges[] = [];
    for (let i = 0; i < greenCnt; i++) {
        let chargeType = RandomEnergy.PowerChargeType();
        let greenPowerCharges: EnergyPlanGreenPowerCharges = {
            displayName: `Energy Green Power Charge ${i}`,
            scheme: RandomEnergy.PowerScheme(),
            tiers: [],
            type: chargeType
        }
        let rateCnt: number = Math.ceil(Math.random() * 3);
        let percCentageRates: number[] = [];
        for (let i = 0; i < rateCnt; i++) {
            let val = generateRandomNumericInRangeFormatted(0.01, 0.5, 2);
            percCentageRates.push(val);
        }
        percCentageRates.sort();
        let tiers: any[] = [];
        for (let i = 0; i < percCentageRates.length; i++) tiers.push({});
        greenPowerCharges.tiers = tiers;
        let idx: number = 0;
        greenPowerCharges.tiers.forEach(elem => {
            elem.percentGreen = percCentageRates[idx].toString();
            if (chargeType == PowerChargeType.PERCENT_OF_BILL
                || chargeType == PowerChargeType.PERCENT_OF_USE) elem.rate = generateRandomDecimalInRangeFormatted(0.5, 2.5, 2);
            if (chargeType == PowerChargeType.FIXED_PER_DAY
                 ||chargeType == PowerChargeType.FIXED_PER_WEEK
                 ||chargeType == PowerChargeType.FIXED_PER_MONTH
                 ||chargeType == PowerChargeType.FIXED_PER_UNIT )
                elem.amount = generateRandomDecimalInRangeFormatted(0.5, 2.5, 2);
            idx++;
        })
        result.push(greenPowerCharges);
    }
    return result;
}

function generatePlanIncentives(incenticeCnt: number): EnergyPlanIncentives[] {
    let result: EnergyPlanIncentives[] = [];
    for (let cnt = 0; cnt < incenticeCnt; cnt++) {
        let planIncentive: EnergyPlanIncentives = {
            category: RandomEnergy.EnergyIncentiveCategory(),
            description: 'Mandatory description for energy plan incentive',
            displayName: 'Plan Incentive'
        }
        if (Math.random() > 0.5) planIncentive.eligibility = 'Eligibility criteria for this incentive'
        result.push(planIncentive);
    }
    return result;
}

function generatePlanDiscounts(discountCnt: number): EnergyPlanDiscounts[] {
    let result: EnergyPlanDiscounts[] = [];
    for (let cnt = 0; cnt < discountCnt; cnt++) {
        let methodUType = RandomEnergy.MethodUType();
        let discountType = RandomEnergy.DiscountType();
        let planDiscount: EnergyPlanDiscounts = {
            displayName: 'Mandatory display name',
            methodUType: methodUType,
            type: discountType
        }
        if (discountType == EnergyDiscountType) planDiscount.category = RandomEnergy.DiscountCategory();
        if (Math.random() > 0.5) planDiscount.endDate = Helper.randomDateTimeInTheFuture();
        if (methodUType == MethodUType.percentOfBill) {
            let percBill: any = {};
            planDiscount.percentOfBill = percBill;
            if (planDiscount.percentOfBill) planDiscount.percentOfBill.rate = generateRandomDecimalInRangeFormatted(0.3, 4.0, 2);
        }
        if (methodUType == MethodUType.percentOfUse) {
            let percUse: any = {};
            planDiscount.percentOfUse = percUse;
            if (planDiscount.percentOfUse) planDiscount.percentOfUse.rate = generateRandomDecimalInRangeFormatted(0.3, 4.0, 2);

        }
        if (methodUType == MethodUType.fixedAmount) {
            let fixedAmt: any = {};
            planDiscount.fixedAmount = fixedAmt;
            if (planDiscount.fixedAmount) planDiscount.fixedAmount.amount = generateRandomDecimalInRangeFormatted(0.3, 4.0, 2);
        }
        if (methodUType == MethodUType.percentOverThreshold) {
            let percOver: any = {};
            planDiscount.percentOverThreshold = percOver;
            if (planDiscount.percentOverThreshold) planDiscount.percentOverThreshold.rate = generateRandomDecimalInRangeFormatted(0.3, 4.0, 2);
            if (planDiscount.percentOverThreshold) planDiscount.percentOverThreshold.usageAmount = generateRandomDecimalInRangeFormatted(10, 100, 2);
        }
        result.push(planDiscount);
    }
    return result;
}


