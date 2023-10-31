import { Factory } from '../logic/factoryService'


export const factories: any = {}

// General loading factories
import { LoadStatic } from './static-factories/loadStatic';
factories[LoadStatic.id] = (options: any): Factory => { return new LoadStatic(options) }

// Simple factories
import { SimpleFull } from './static-factories/simpleFull';
factories[SimpleFull.id] = (options: any): Factory => { return new SimpleFull(options) }

// Create data holder
import { CreateHolder } from './createHolder';
factories[CreateHolder.id] = (options: any): Factory => { return new CreateHolder(options) }

// create banking products
import { CreateCustomers} from './common/createCustomers';
factories[CreateCustomers.id] = (options: any): Factory => { return new CreateCustomers(options) }

// create energy plans
import { CreateEnergyAccountData} from './energy/createEnergyAccountData';
factories[CreateEnergyAccountData.id] = (options: any): Factory => { return new CreateEnergyAccountData(options) }

// create energy invoice data
import { CreateEnergyInvoiceData} from './energy/createEnergyInvoiceData';
factories[CreateEnergyInvoiceData.id] = (options: any): Factory => { return new CreateEnergyInvoiceData(options) }

// create energy service data
import { CreateEnergyServicePoints} from './energy/createServicePoints';
factories[CreateEnergyServicePoints.id] = (options: any): Factory => { return new CreateEnergyServicePoints(options) }

// create der data
import { CreateDerData} from './energy/createDERData';
factories[CreateDerData.id] = (options: any): Factory => { return new CreateDerData(options) }

// create energy usage data
import { CreateEnergyUsage} from './energy/createEnergyUsage';
factories[CreateEnergyUsage.id] = (options: any): Factory => { return new CreateEnergyUsage(options) }

// create invaliddata
import { CreateInvalidCustomers} from './invalid-factories/createInvalidCustomers';
factories[CreateInvalidCustomers.id] = (options: any): Factory => { return new CreateInvalidCustomers(options) }

import { CreateInvalidEnergyAccountData } from './invalid-factories/createInvalidEnergyAccountData';
factories[CreateInvalidEnergyAccountData.id] = (options: any): Factory => { return new CreateInvalidEnergyAccountData(options)}

import { CreateEnergyTransaction } from './energy/createEnergyTransactions';
factories[CreateEnergyTransaction.id] = (options: any): Factory => { return new CreateEnergyTransaction(options)}

import { CreateEnergyTransactionV2 } from './energy/createEnergyTransactionsV2';
factories[CreateEnergyTransactionV2.id] = (options: any): Factory => { return new CreateEnergyTransactionV2(options)}

import { CreateEnergyConcessions } from './energy/createConcessions';
factories[CreateEnergyConcessions.id] = (options: any): Factory => { return new CreateEnergyConcessions(options)}

import { CreateEnergyPaymentSchedules} from './energy/createPaymentSchedules';
factories[CreateEnergyPaymentSchedules.id] = (options: any): Factory => { return new CreateEnergyPaymentSchedules(options)}

import { CreateEnergyPlanData} from './energy/createEnergyPlans';
factories[CreateEnergyPlanData.id] = (options: any): Factory => { return new CreateEnergyPlanData(options)}

import { CreateProducts} from './banking/createProducts';
factories[CreateProducts.id] = (options: any): Factory => { return new CreateProducts(options)}

import { CreateBankingAccounts} from './banking/createBankingAccounts';
factories[CreateBankingAccounts.id] = (options: any): Factory => { return new CreateBankingAccounts(options)}

import { CreateBankingTransactions} from './banking/createBankingTransactions';
factories[CreateBankingTransactions.id] = (options: any): Factory => { return new CreateBankingTransactions(options)}

import { CreateDirectDebits} from './banking/createBankingDirectDebits';
factories[CreateDirectDebits.id] = (options: any): Factory => { return new CreateDirectDebits(options)}

import { CreatePayees} from './banking/createBankingPayees';
factories[CreatePayees.id] = (options: any): Factory => { return new CreatePayees(options)}

import { CreateScheduledPayments} from './banking/createBankingPayments';
factories[CreateScheduledPayments.id] = (options: any): Factory => { return new CreateScheduledPayments(options)}

import { CreateBalances} from './banking/createBankingBalances';
factories[CreateBalances.id] = (options: any): Factory => { return new CreateBalances(options)}

export * from './common/utils';




