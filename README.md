#  Testdata Cli

## Overview

The CDR Test Data CLI tool has been created by the [Data Standards Body](https://consumerdatastandards.gov.au/) (DSB) to provide diverse test datasets to the Consumer Data Right (CDR) community to assist with the development and delivery of various CDR solutions.  

This versatile tool showcases its ability to create synthetic datasets that can be tailored to specific requirements using configurable option files. This enables developers to use these tailored datasets for testing, experimentation, or development purposes within their CDR projects.

The goal of the Test Data CLI is to provide support for CDR participants seeking to test their implementations to ensure confidence that they have covered a wide range of possible scenarios likely to be encountered in production scenarios.

## Using the Test Data CLI

The Test Data CLI can be used to generate manufactured test data for the [Consumer Data Standards](https://consumerdatastandardsaustralia.github.io/standards/#introduction) (CDS). This CLI allows the configuration, through an option file, of a variety of data `factories` that can be used to generate test files with different scenarios. 

The DSB offers the Test Data CLI as an [npm package](https://www.npmjs.com/package/@cds-au/testdata) available in the NPM registry. You can easily install this package in your project using npm. For more information, refer to the [Quick Start](#quick-start) section below.

You can also set up a local instance of the Test Data CLI tool for customised and extended use cases. For more information, refer to the [Local Setup and Customisation](#local-setup-and-customisation) section below.

For detailed examples and practical applications, please refer to the [Example Use Cases](#example-use-cases) section below.

## Quick Start

To install the Test Data CLI tool globally, ensure npm is installed on your system and run the following command:

```bash
npm install @cds-au/testdata -g
```

This makes the CLI available globally on your system.

### Generating Test Data

To generate test data, you will need an options file that specifies the configuration for data generation:

```bash
testdata generate <options-file> <destination-file>
```

| Argument | Required | Description |
| --- | --- | --- |
| options-file | mandatory | The options file indicating the factories to execute, in what order and with what options specified. |
| destination-file | optional | The destination file where the generated JSON test data will be saved. The contents will always be JSON consistent with the test data schema. |

To learn more about the Data Generator and how it works, refer to the **Data Generation Process** section below.

### Common Commands

- **Schema Display**: Run**`testdata schema`** to view the current JSON schema used for test data. Use **`vonly`** option to view the version of the current JSON schema.
- **List Factories**: Run **`testdata factories`** to view the list of all the currently implemented factories, along with a short description of each factory describing its purpose.
- **Factory Details**: Run **`testdata factory <factory-id>`** to view detailed information about a specific factory, including the purpose of the factory, the data that it generates or modifies and the options that it consumes.
    
    
| Argument | Required | Description |
| --- | --- | --- |
| factory-id | mandatory | The ID of the factory that documentation is requested for |
    
    For example, **`testdata factory create-customers`** will return:
    
    ```bash
    Supported capabilities include:
        create a customer
        create a set of customers
        ...
    ```
    

## Example Use Cases

In this section, you will find practical use cases for the Test Data CLI, each designed to show how the tool can be used to generate synthetic data for a variety of scenarios. To facilitate ease of use and understanding, each use case is accompanied by a specific command. These commands use specific sample options files from the repository, located in the **`samples/options`** directory, which define the necessary parameters for generating targeted datasets. You can run these commands to generate a JSON file with the test data output and use them for development or testing of your CDR application.

- **Use Case 1 (UC1):** Generate CDS-compliant test energy plan data to simulate realistic API responses in your mock Data Holder’s Product Reference Data API.
    
    ```bash
    testdata generate ./samples/options/uc1.json ./samples/output/u1-output.json
    ```
    
- **Use Case 2 (UC2):** Generate a mix of residential and business customer profiles to enhance testing of varied customer interactions.
    
    ```bash
    testdata generate ./samples/options/uc2.json ./samples/output/u2-output.json
    ```
    
- **Use Case 3 (UC3):** Create a dataset for a single residential customer with an energy account to test personalised service scenarios.
    
    ```bash
    testdata generate ./samples/options/uc3.json ./output/samples/u3-output.json
    ```
    
- **Use Case 4 (UC4):** Augment an existing data holder structure by adding additional customer profiles to enhance your existing dataset.
    
    ```bash
    testdata generate ./samples/options/uc4.json ./samples/output/u4-output.json
    ```
    
- **Use Case 5 (UC5):** Augment an existing data file by adding additional holders without altering existing data from the input file.
    
    ```bash
    testdata generate ./samples/options/uc5.json ./samples/output/u5-output.json
    ```
    
- **Use Case 6 (UC6):** Create a dataset that includes a mix of valid and intentionally invalid customer data to test system robustness.
    
    ```bash
    testdata generate ./samples/options/uc6.json ./samples/output/u6-output.json
    ```
    
## Data Generation Process

The data generator utilises one or more data factories and creates data by executing the individual factories. The options file drives the behaviour of the data generation.

### Data Factories

Data factories are modular components within the CLI that generate specific data structures:

- **Valid Data Factories**: Located in **`src/factories`**, these are grouped by sector (banking, energy, etc.) and generate synthetic data compliant with CDR standards.
- **Invalid Data Factories**: Found in **`src/factories/invalid-factories`**, these are used for generating synthetic data that deliberately includes errors for testing error handling.

### Configuration via Options File

The options file is crucial for directing the data generation process. It details which factories to execute and the order and parameters for execution, adhering to a schema defined in **`src/logic/options.ts`**.

## Local Setup and Customisation

### Prerequisites

Before you begin, ensure you have the following installed:

- Git, for cloning the repository.
- [Node.js](https://nodejs.org/en/). (***Note:** This demo project was tested with NodeJS v18.12.1.*)
- npm (Node Package Manager) - **included with Node.js installation**.

### Installation

1. Create a fork of this repository. To do this, click the "Fork" button on the top right corner of this page. 
2. After forking the repository, clone it to your local machine. You can do this by running the following command in your terminal or command prompt:
    
    ```bash
    git clone https://github.com/your-username/project-name.git
    ```
    
    Replace **`your-username`** with your GitHub username and **`project-name`** with the name of your repository.
    
3. Once the repository is cloned, navigate to the project directory by running:
    
    ```bash
    cd project-name
    ```
    
    Replace **`project-name`** with the name of the repository.
    

### Build

To build the repository and use the library without installing it globally:

1. Customise the project as needed for your specific use case.
2. Install libraries `npm install`
3. Build `npm run build`
4. Use npm link `npm link`

### Testing

To test your changes:

1. Run `npm run test`

## Contribution Process

We welcome contributions from the community! If you'd like to contribute to this project, please follow these simple steps:

1. Create a new branch for your work from the `master` branch:
    
    ```bash
    git checkout -b feature/your-feature-name
    ```
    
2. Begin making your changes or contributions.
3. Follow the instructions in the project repository to run and test your changes locally.
4. Commit your changes with clear and concise commit messages.
5. Push your changes to your forked repository.
6. Open a pull request (PR) using the `master` branch in the [original repository](https://github.com/ConsumerDataStandardsAustralia/testdata-cli) as the destination branch. Include a detailed description of your changes and the problem you are addressing.
7. Engage in the discussion on your PR and make any necessary adjustments based on feedback from maintainers and other contributors.
8. Once your PR is approved and all tests pass, it will be merged into the project.

*Note: Please ensure your contributions align with our project's objectives and [guidelines](https://www.notion.so/Contribution-Guidelines-8b99d030fea946668fbc75444197e68b?pvs=21).*

## Reporting Issues

Encountered an issue? We're here to help. Please visit our [issue reporting guidelines]((https://d61cds.notion.site/Issue-Reporting-Guidelines-71a329a0658c4b69a232eab95822509b?pvs=4) for submitting an issue.

## Stay Updated

Join our newsletter to receive the latest updates, release notes, and alerts. [Subscribe here](https://consumerdatastandards.us18.list-manage.com/subscribe?u=fb3bcb1ec5662d9767ab3c414&id=a4414b3906).

## License

The artefact is released under the [MIT License](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE), which allows the community to use and modify it freely.

## Disclaimer

The artefacts in this repository are offered without warranty or liability, in accordance with the [MIT licence.](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE)

[The Data Standards Body](https://consumerdatastandards.gov.au/about) (DSB) develops these artefacts in the course of its work, in order to perform quality assurance on the Australian Consumer Data Right Standards (Data Standards).

The DSB makes this repository, and its artefacts, public [on a non-commercial basis](https://github.com/ConsumerDataStandardsAustralia/java-artefacts/blob/master/LICENSE) in the interest of supporting the participants in the CDR ecosystem.

The resources of the DSB are primarily directed towards assisting the [Data Standards Chair](https://consumerdatastandards.gov.au/about/) for [developing the Data Standards](https://github.com/ConsumerDataStandardsAustralia/standards).

Consequently, the development work provided on the artefacts in this repository is on a best-effort basis, and the DSB acknowledges the use of these tools alone is not sufficient for, nor should they be relied upon with respect to [accreditation](https://www.accc.gov.au/focus-areas/consumer-data-right-cdr-0/cdr-draft-accreditation-guidelines), conformance, or compliance purposes.