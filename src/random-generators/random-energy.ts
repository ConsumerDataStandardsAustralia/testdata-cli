
export enum FuelType {
    GAS = "GAS",
    ELECTRICITY = "ELECTRICITY",
    DUAL = "DUAL"
}

export enum PlanType {
    STANDING = "STANDING",
    MARKET = "MARKET",
    REGULATED = "REGULATED"
}

export enum CustomerType {
    RESIDENTIAL = "RESIDENTIAL",
    BUSINESS = "BUSINESS"
}

export enum Brand {
    AGL = "AGL", ORIGIN = "ORIGIN", ENERGY_AUSTRALIA = "ENERGY AUSTRALIA",
    RED_ENERGY = "RED ENERGY", ERGON = "ERGON", AURORO_ENERGY = "AURORO ENERGY",
    ALINTA_ENERGY = "ALINTA ENERGY", ACETEWAGL = "ACETEWAGL"
}

export enum EnergyOpenStatus {
    CLOSED = "CLOSED", OPEN = "OPEN"
}

export enum EnergyEligibilityType {
    EXISTING_CUST = "EXISTING_CUST"
    , EXISTING_POOL = "EXISTING_POOL"
    , EXISTING_SOLAR = "EXISTING_SOLAR"
    , EXISTING_BATTERY = "EXISTING_BATTERY"
    , EXISTING_SMART_METER = "EXISTING_SMART_METER"
    , EXISTING_BASIC_METER = "EXISTING_BASIC_METER"
    , SENIOR_CARD = "SENIOR_CARD"
    , SMALL_BUSINESS = "SMALL_BUSINESS"
    , NO_SOLAR_FIT = "NO_SOLAR_FIT"
    , NEW_CUSTOMER = "NEW_CUSTOMER"
    , ONLINE_ONLY = "ONLINE_ONLY"
    , REQ_EQUIP_SUPPLIER = "REQ_EQUIP_SUPPLIER"
    , THIRD_PARTY_ONLY = "THIRD_PARTY_ONLY"
    , SPORT_CLUB_MEMBER = "SPORT_CLUB_MEMBER"
    , ORG_MEMBER = "ORG_MEMBER"
    , SPECIFIC_LOCATION = "SPECIFIC_LOCATION"
    , MINIMUM_USAGE = "MINIMUM_USAGE"
    , LOYALTY_MEMBER = "LOYALTY_MEMBER"
    , GROUP_BUY_MEMBER = "GROUP_BUY_MEMBER"
    , CONTINGENT_PLAN = "CONTINGENT_PLAN"
    , OTHER = "OTHER"
}

export enum PricingModel {
    SINGLE_RATE = "SINGLE_RATE"
    , SINGLE_RATE_CONT_LOAD = "SINGLE_RATE_CONT_LOAD"
    , TIME_OF_USE = "TIME_OF_USE"
    , TIME_OF_USE_CONT_LOAD = "TIME_OF_USE_CONT_LOAD"
    , FLEXIBLE = "FLEXIBLE"
    , FLEXIBLE_CONT_LOAD = "FLEXIBLE_CONT_LOAD"
    , QUOTA = "QUOTA"
}

export enum PaymentOptions {
    OTHER = 'OTHER', PAPER_BILL = 'PAPER_BILL', CREDIT_CARD = 'CREDIT_CARD', DIRECT_DEBIT = 'DIRECT_DEBIT', BPAY = 'BPAY'
}

export enum TimeZones {
    AEST = 'AEST', UTC = 'UTC', ACST = 'ACST', AWST = 'AWST'
}

export enum RateBlockUTypeForTariff {
    singleRate = "singleRate", timeOfUseRates = "timeOfUseRates", demandCharges = "demandCharges"
}

export enum RateBlockUTypeControlledLoad {
    singleRate = "singleRate", timeOfUseRates = "timeOfUseRates"
}

export enum ChargePeriod {
    DAY = "DAY", MONTH = "MONTH", TARIFF_PERIOD = "TARIFF_PERIOD"
}

export enum MeasureUnit {
    KWH = "KWH", KVA = "KVA", KVAR = "KVAR", KVARH = "KVARH", KW = "KW", DAYS = "DAYS", METER = "METER", MONTH = "MONTH"
}

export enum Days {
    SUN = "SUN", MON = "MON", TUE = "TUE", WED = "WED", THU = "THU", FRI = "FRI", SAT = "SAT"
}

export enum PlanTariffUsageType {
     PEAK = "PEAK", OFF_PEAK = "OFF_PEAK", SHOULDER = "SHOULDER", SHOULDER1 = "SHOULDER1", SHOULDER2 = "SHOULDER2"
}

export enum MeasurementPeriod {
    DAY = "DAY", MONTH = "MONTH", TARIFF_PERIOD = "TARIFF_PERIOD"
}

export enum EnergyDiscountType {
    CONDITIONAL = "CONDITIONAL", GUARANTEED = "GUARANTEED", OTHER = "OTHER"
}

export enum EnergyDiscountCategory {
    PAY_ON_TIME = "PAY_ON_TIME", DIRECT_DEBIT = "DIRECT_DEBIT", GUARANTEED_DISCOUNT = "GUARANTEED_DISCOUNT", OTHER = "OTHER"
}

export enum MethodUType {
    percentOfBill = "percentOfBill", percentOfUse = "percentOfUse", fixedAmount = "fixedAmount", percentOverThreshold = "percentOverThreshold"
}

export enum EnergyIncentiveCategory {
    GIFT = "GIFT", ACCOUNT_CREDIT = "ACCOUNT_CREDIT", OTHER = "OTHER"
}

export enum PowerChargeType {
    FIXED_PER_DAY = "FIXED_PER_DAY", FIXED_PER_WEEK = "FIXED_PER_WEEK", FIXED_PER_MONTH = "FIXED_PER_MONTH",
    FIXED_PER_UNIT = "FIXED_PER_UNIT", PERCENT_OF_USE = "PERCENT_OF_USE", PERCENT_OF_BILL = "PERCENT_OF_BILL"
}

export enum PowerScheme {
    GREENPOWER = "GREENPOWER", OTHER = "OTHER"
}

export enum EnergyFeeType {
    EXIT = "EXIT"
    , ESTABLISHMENT = "ESTABLISHMENT"
    , LATE_PAYMENT = "LATE_PAYMENT"
    , DISCONNECTION = "DISCONNECTION"
    , DISCONNECT_MOVE_OUT = "DISCONNECT_MOVE_OUT"
    , DISCONNECT_NON_PAY = "DISCONNECT_NON_PAY"
    , RECONNECTION = "RECONNECTION"
    , CONNECTION = "CONNECTION"
    , PAYMENT_PROCESSING = "PAYMENT_PROCESSING"
    , CC_PROCESSING = "CC_PROCESSING"
    , CHEQUE_DISHONOUR = "CHEQUE_DISHONOUR"
    , DD_DISHONOUR = "DD_DISHONOUR"
    , MEMBERSHIP = "MEMBERSHIP"
    , CONTRIBUTION = "CONTRIBUTION"
    , PAPER_BILL = "PAPER_BILL"
    , OTHER = "OTHER"
}

export enum FeeTerm {
    FIXED = "FIXED"
    , YEAR_1 = "1_YEAR"
    , YEAR_2 = "2_YEAR"
    , YEAR_3 = "3_YEAR"
    , YEAR_4 = "4_YEAR"
    , YEAR_5 = "5_YEAR"
    , PERCENT_OF_BILL = "PERCENT_OF_BILL"
    , ANNUAL = "ANNUAL"
    , DAILY = "DAILY"
    , WEEKLY = "WEEKLY"
    , MONTHLY = "MONTHLY"
    , BIANNUAL = "BIANNUAL"
    , VARIABLE = "VARIABLE"
}

export enum SolarScheme {
    PREMIUM = "PREMIUM", OTHER = "OTHER"
}

export enum SolarPayerType {
    GOVERNMENT = "GOVERNMENT", RETAILER = "RETAILER"
}

export enum SolarTariffUType {
    singleTariff = "singleTariff", timeVaryingTariffs = "timeVaryingTariffs"
}

export enum SolarFeedType {
    PEAK = "PEAK", OFF_PEAK = "OFF_PEAK", SHOULDER = "SHOULDER"
}

export enum SolarFeedDays {
    SUN = "SUN", MON = "MON", TUE = "TUE", WED = "WED", THU = "THU", FRI = "FRI", SAT = "SAT", PUBLIC_HOLIDAYS = "PUBLIC_HOLIDAYS"
}

export enum EneryInvoicePaymentStatus {
    PAID = "PAID", PARTIALLY_PAID = "PARTIALLY_PAID", NOT_PAID = "NOT_PAID"
}

export enum ServicePointStatus {
    OFF_MARKET = "OFF_MARKET" , ACTIVE = "ACTIVE" , DE_ENERGISED = "DE_ENERGISED" , EXTINCT = "EXTINCT" , GREENFIELD = "GREENFIELD"
}

export enum ServicePointMeterStatus {
    CURRENT = "CURRENT" , DISCONNECTED = "DISCONNECTED"
}

export enum ServicePointClassification {
    EXTERNAL_PROFILE = "EXTERNAL_PROFILE"
    , GENERATOR = "GENERATOR"
    , LARGE = "LARGE"
    , SMALL = "SMALL"
    , WHOLESALE = "WHOLESALE"
    , NON_CONTEST_UNMETERED_LOAD = "NON_CONTEST_UNMETERED_LOAD"
    , NON_REGISTERED_EMBEDDED_GENERATOR = "NON_REGISTERED_EMBEDDED_GENERATOR"
    , DISTRIBUTION_WHOLESALE = "DISTRIBUTION_WHOLESALE"
}

export enum ServicePointJurisdiction {
    ALL = "ALL" , ACT = "ACT" , NEM = "NEM" , NSW = "NSW" ,
    QLD = "QLD" , SA = "SA" , TAS = "TAS" , VIC = "VIC"
}

export enum ServicePointConsumerClassification {
    BUSINESS = "BUSINESS" , RESIDENTIAL = "RESIDENTIAL"
}

export enum ServicePointThreshold {
    LOW = "LOW", MEDIUM = "MEDIUM", HIGH = "HIGH"
}

export enum ServicePointParticipantRole {
    FRMP = "FRMP" , LNSP = "LNSP" , DRSP = "DRSP"
}

export enum ServicePointInstallationType {
    BASIC = "BASIC"
    , COMMS1 = "COMMS1"
    , COMMS2 = "COMMS2"
    , COMMS3 = "COMMS3"
    , COMMS4 = "COMMS4"
    , COMMS4C = "COMMS4C"
    , COMMS4D = "COMMS4D"
    , MRAM = "MRAM"
    , MRIM = "MRIM"
    , PROF = "PROF"
    , SAMPLE = "SAMPLE"
    , UMCP = "UMCP"
    , VICAMI = "VICAMI"
    , NCOLNUML = "NCOLNUML"
}

export enum ServicePointRegisterConsumptionType {
    INTERVAL = "INTERVAL"
    , BASIC = "BASIC"
    , PROFILE_DATA = "PROFILE_DATA"
    , ACTIVE_IMPORT = "ACTIVE_IMPORT"
    , ACTIVE = "ACTIVE"
    , REACTIVE_IMPORT = "REACTIVE_IMPORT"
    , REACTIVE = "REACTIVE"   
}

export enum TimeOfDay {
    ALLDAY = "ALLDAY"
    , INTERVAL = "INTERVAL"
    , PEAK = "PEAK"
    , BUSINESS = "BUSINESS"
    , SHOULDER =  "SHOULDER"
    , EVENING = "EVENING"
    , OFFPEAK = "OFFPEAK"
    , CONTROLLED = "CONTROLLED"
    , DEMAND = "DEMAND"
}
export enum ServicePointConsumtionType {
    ACTUAL = "ACTUAL", CUMULATIVE = "CUMULATIVE"
}

export enum AcEquipmentType {
    INVERTER = "INVERTER", OTHER = "OTHER"
}

export enum AcInverterStatus {
    ACTIVE = "ACTIVE" , INACTIVE = "INACTIVE" , DECOMMISSIONED = "DECOMMISSIONED"
}

export enum DerDeviceType {
    FOSSIL = "FOSSIL" , HYDRO = "HYDRO" , WIND = "WIND" , SOLAR_PV = "SOLAR_PV" , 
    RENEWABLE = "RENEWABLE" , GEOTHERMAL = "GEOTHERMAL" , STORAGE = "STORAGE" , OTHER = "OTHER"
}

export  enum ReadUTYpe {
    basicRead = "basicRead", intervalRead = "intervalRead"
}

export enum BasicReadQuality {
    ACTUAL = "ACTUAL", SUBSTITUTE = "SUBSTITUTE", FINAL_SUBSTITUTE = "FINAL_SUBSTITUTE"
}

export enum IntervalReadQuality {
    SUBSTITUTE = "SUBSTITUTE", FINAL_SUBSTITUTE = "FINAL_SUBSTITUTE"
}

export enum OtherUsageChargesType {
    ENVIRONMENTAL = "ENVIRONMENTAL", REGULATED = "REGULATED", NETWORK = "NETWORK",
    METERING = "METERING", RETAIL_SERVICE = "RETAIL_SERVICE", RCTI = "RCTI", OTHER = "OTHER"
}

export enum TimeOfUseRateType {
    PEAK = "PEAK", OFF_PEAK = "OFF_PEAK", SHOULDER = "SHOULDER", SOLAR_SPONGE = "SOLAR_SPONGE"
}

export enum TariffPeriodTimezone {
    LOCAL = "LOCAL", AEST = "AEST"
}

export enum TransactionUType {
    usage = "usage", demand = "demand", onceOff = "onceOff", otherCharges = "otherCharges", payment = "payment"
}

export enum TimeOfUseTypeV1 {
    PEAK = "PEAK", OFF_PEAK = "OFF_PEAK", OFF_PEAK_DEMAND_CHARGE = "OFF_PEAK_DEMAND_CHARGE", SHOULDER = "SHOULDER",
    SHOULDER1 = "SHOULDER1", SHOULDER2 = "SHOULDER2", CONTROLLED_LOAD = "CONTROLLED_LOAD",
    SOLAR = "SOLAR", AGGREGATE = "AGGREGATE"
}

export enum TimeOfUseTypeDemand {
    PEAK = "PEAK", OFF_PEAK = "OFF_PEAK", OFF_PEAK_DEMAND_CHARGE = "OFF_PEAK_DEMAND_CHARGE", SHOULDER = "SHOULDER",
    SHOULDER1 = "SHOULDER1", SHOULDER2 = "SHOULDER2", CONTROLLED_LOAD = "CONTROLLED_LOAD",
    SOLAR = "SOLAR", AGGREGATE = "AGGREGATE", ALL_DAY = "ALL_DAY", EXCESS = "EXCESS"
}

export enum TimeOfUseTypeUsage {
    PEAK = "PEAK", OFF_PEAK = "OFF_PEAK", OFF_PEAK_DEMAND_CHARGE = "OFF_PEAK_DEMAND_CHARGE", SHOULDER = "SHOULDER",
    SHOULDER1 = "SHOULDER1", SHOULDER2 = "SHOULDER2", CONTROLLED_LOAD = "CONTROLLED_LOAD",
    SOLAR = "SOLAR", AGGREGATE = "AGGREGATE", ALL_DAY = "ALL_DAY"
}

export enum CalculationFactorType {
    DLF = "DLF", MLF = "MLF"
}

export enum EnergyBillPaymentMethod {
        OTHER = 'OTHER', CHEQUE = 'CHEQUE', DIRECT_DEBIT = 'DIRECT_DEBIT',
        BPAY = 'BPAY', CARD = "CARD", TRANSFER = "TRANSFER", CASH = "CASH"
}

export enum PaymentScheduleUType {
    cardDebit = "cardDebit", directDebit = "directDebit", manualPayment="manualPayment", digitalWallet="digitalWallet"
}

export enum CardScheme {
    MASTERCARD="MASTERCARD", VISA="VISA", AMEX="AMEX", DINERS="DINERS", OTHER="OTHER", UNKNOWN="UNKNOWN"
}

export enum ScheduleCalculationType {
    STATIC="STATIC", BALANCE="BALANCE", CALCULATED="CALCULATED"
}

export enum DigitialWalletIdType {
    EMAIL="EMAIL", CONTACT_NAME="CONTACT_NAME", TELEPHONE="TELEPHONE"
}

export enum DigitalWalletProvider {
    PAYPAL_AU="PAYPAL_AU", OTHER="OTHER"
}

export enum ConcessionCalculationType {
    FIXED_AMOUNT="FIXED_AMOUNT", FIXED_PERCENTAGE="FIXED_PERCENTAGE", VARIABLE="VARIABLE"
}

export enum ConcessionAppliedTo{
    INVOICE="INVOICE", USAGE="USAGE", SERVICE_CHARGE="SERVICE_CHARGE", CONTROLLED_LOAD="CONTROLLED_LOAD"
}

export enum PlanTermType {
    YEAR_1 = "1_YEAR"
    , YEAR_2 = "2_YEAR"
    , YEAR_3 = "3_YEAR"
    , YEAR_4 = "4_YEAR"
    , YEAR_5 = "5_YEAR"  
    , ONGOING = "ONGOING"
    , OTHER = "OTHER"
}

export enum EnergyAccountName {
    VALUE_SAVER = "Value Saver",
    SOLAR_SAVER = "Solar Saver",
    STANDARD_ACCOUNT = "Standard Account",
    PENSIONER_ACCOUNT = "Pensioner Account",
    COMBINATION_ACCOUNT = "Combination Account",
}

export class RandomEnergy {

    public static GetRandomValue(enumeration: any) {
        const values = Object.keys(enumeration);
        let interval = 1 / values.length;
        let rv = Math.random();
        let intervalSum = 0;
        let found: boolean = false;
        let idx: number = 0;
        while (found == false) {
            intervalSum += interval;
            if (rv <= intervalSum || idx >= values.length - 1) {
                found = true;
            }
            else {
                idx++;
            }
        }
        const enumKey = values[idx];
        return enumeration[enumKey];
    }

    public static FuelType(): FuelType {
        return this.GetRandomValue(FuelType)
    }

    public static PlanType(): PlanType {
        return this.GetRandomValue(PlanType)
    }

    public static CustomerType(): CustomerType {
        return this.GetRandomValue(CustomerType)
    }

    public static Brand(): string {
        return this.GetRandomValue(Brand)
    }
    public static OpenStatus(): any {
        return this.GetRandomValue(EnergyOpenStatus)
    }

    public static PricingModel(): any {
        return this.GetRandomValue(PricingModel);
    }

    public static PaymentOption(): any {
        return this.GetRandomValue(PaymentOptions)
    }

    public static GenerateNMI(): string {
        const min = 10000000000;
        const max = 99999999999;
        let value = Math.floor(Math.random() * (max - min + 1) + min);
        return value.toString();
    }

    public static AdditionalFeeInformation(): string {
        // TODO create something meaningful
        return "Some additional fee information"
    }

    public static TimeZone(): any {
        return this.GetRandomValue(TimeZones)
    }

    public static RateBlockUTypeForTariff(): any {
        return this.GetRandomValue(RateBlockUTypeForTariff)
    }

    public static RateBlockUTypeControlledLoad(): any {
        return this.GetRandomValue(RateBlockUTypeControlledLoad)
    }
    public static ChargePeriod(): any {
        return this.GetRandomValue(ChargePeriod)
    }

    public static MeasureUnit(): any {
        return this.GetRandomValue(MeasureUnit)
    }

    public static Days(): any {
        return this.GetRandomValue(Days)
    }

    public static PlanTariffUsageType(): any {
        return this.GetRandomValue(PlanTariffUsageType)
    }
    public static MeasurementPeriod(): any {
        return this.GetRandomValue(MeasurementPeriod)
    }
    public static DiscountType(): any {
        return this.GetRandomValue(EnergyDiscountType)
    }
    public static DiscountCategory(): any {
        return this.GetRandomValue(EnergyDiscountCategory)
    }
    public static MethodUType(): any {
        return this.GetRandomValue(MethodUType)
    }

    public static EnergyIncentiveCategory(): any {
        return this.GetRandomValue(EnergyIncentiveCategory)
    }

    public static PowerChargeType(): any {
        return this.GetRandomValue(PowerChargeType)
    }
    public static PowerScheme(): any {
        return this.GetRandomValue(PowerScheme)
    }
    public static EnergyEligibilityType(): any {
        return this.GetRandomValue(EnergyEligibilityType)
    }
    public static EnergyFeeType(): any {
        return this.GetRandomValue(EnergyFeeType)
    }
    public static FeeTerm(): any {
        return this.GetRandomValue(FeeTerm)
    }
    public static SolarScheme(): any {
        return this.GetRandomValue(SolarScheme)
    }
    public static SolarPayerType(): any {
        return this.GetRandomValue(SolarPayerType)
    }
    public static SolarTariffUType(): any {
        return this.GetRandomValue(SolarTariffUType)
    }
    public static SolarFeedType(): any {
        return this.GetRandomValue(SolarFeedType)
    }
    public static SolarFeedDays(): any {
        return this.GetRandomValue(SolarFeedDays)
    }

    public static EneryInvoicePaymentStatus(): any {
        return this.GetRandomValue(EneryInvoicePaymentStatus)
    }

    public static ServicePointStatus(): any {
        return this.GetRandomValue(ServicePointStatus)
    }

    public static ServicePointMeterStatus(): any {
        return this.GetRandomValue(ServicePointMeterStatus)
    }

    public static ServicePointClassification(): any {
        return this.GetRandomValue(ServicePointClassification)
    }

    public static ServicePointJurisdiction(): any {
        return this.GetRandomValue(ServicePointJurisdiction)
    }   
    
    public static ServicePointConsumerClassification(): ServicePointConsumerClassification {
        return this.GetRandomValue(ServicePointConsumerClassification)
    }   
    
    public static ServicePointParticipantRole(): any {
        return this.GetRandomValue(ServicePointParticipantRole)
    } 

    public static ServicePointInstallationType(): ServicePointInstallationType {
        return this.GetRandomValue(ServicePointInstallationType)
    } 

    public static ServicePointRegisterConsumptionType(): any {
        return this.GetRandomValue(ServicePointRegisterConsumptionType)
    } 
    
    public static TimeOfDay(): any {
        return this.GetRandomValue(TimeOfDay)
    } 
    
    public static ServicePointThreshold(): any {
        return this.GetRandomValue(ServicePointThreshold)
    }  

    public static AcEquipmentType(): any {
        return this.GetRandomValue(AcEquipmentType)
    }  

    public static AcInverterStatus(): any {
        return this.GetRandomValue(AcInverterStatus)
    }   
    
    public static DerDeviceType(): any {
        return this.GetRandomValue(DerDeviceType)
    } 
    
    public static BasicReadQuality(): any {
        return this.GetRandomValue(BasicReadQuality)
    } 

    public static IntervalReadQuality(): any {
        return this.GetRandomValue(IntervalReadQuality)
    } 
    
    public static ReadUTYpe(): any {
        return this.GetRandomValue(ReadUTYpe)
    } 
    
    public static OtherUsageChargesType(): any {
        return this.GetRandomValue(OtherUsageChargesType)
    }  

    public static TimeOfUseRateType(): any {
        return this.GetRandomValue(TimeOfUseRateType)
    }
    
    public static TariffPeriodTimezone(): any {
        return this.GetRandomValue(TariffPeriodTimezone)
    }

    public static TransactionUType(): any {
        return this.GetRandomValue(TransactionUType)
    }

    public static TimeOfUseType(): any {
        return this.GetRandomValue(TimeOfUseTypeV1)
    }


    public static TimeOfUseTypeDemand(): any {
        return this.GetRandomValue(TimeOfUseTypeDemand)
    }

    public static TimeOfUseTypeUsage(): any {
        return this.GetRandomValue(TimeOfUseTypeUsage)
    }    

    public static CalculationFactorType(): any {
        return this.GetRandomValue(CalculationFactorType)
    }

    public static EnergyBillPaymentMethod(): any {
        return this.GetRandomValue(EnergyBillPaymentMethod)
    } 

    public static CardScheme(): any {
        return this.GetRandomValue(CardScheme)
    } 
    
    public static PaymentScheduleUType(): any {
        return this.GetRandomValue(PaymentScheduleUType)
    }  
    
    public static ScheduleCalculationType(): any {
        return this.GetRandomValue(ScheduleCalculationType);
    }

    public static DigitialWalletIdType(): any {
        return this.GetRandomValue(DigitialWalletIdType);
    }

    public static DigitalWalletProvider(): any {
        return this.GetRandomValue(DigitalWalletProvider);
    }

    public static ConcessionCalculationType(): any {
        return this.GetRandomValue(ConcessionCalculationType);
    }

    public static ConcessionAppliedTo(): any {
        return this.GetRandomValue(ConcessionAppliedTo);
    }

    public static PlanTermType(): any {
        return this.GetRandomValue(PlanTermType);
    }

    public static EnergyAccountName(): any {
        return this.GetRandomValue(EnergyAccountName);
    }
}