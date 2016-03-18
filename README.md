> Hey there! So you want to build your own Simple Data Pipe connector? [Start here](https://github.com/ibm-cds-labs/simple-data-pipe-connector-template/wiki/How-to-build-a-Simple-Data-Pipe-connector-using-this-template).

***


# Simple Data Pipe connector boilerplate for slack.com

This [Simple Data Pipe](https://developer.ibm.com/clouddataservices/simple-data-pipe/) boilerplate connector has been customized for [slack.com](http://www.slack.com) OAuth access. You can build your own special purpose connector by implementing the `getSlackDataSetList` and `fetchRecords` functions in `lib/index.js` to fetch the desired data from specific slack domains and optionally enrich it.
### Pre-requisites

##### General 
 A valid slack user id is required to use this connector.

##### Deploy the Simple Data Pipe

 [Deploy the Simple Data Pipe in Bluemix](https://github.com/ibm-cds-labs/simple-data-pipe) using the Deploy to Bluemix button or manually.

##### Services

This connector does not require any additional Bluemix service.

##### Install the Simple Data Pipe boilerplate connector for Slack

  When you [follow these steps to install this connector](https://github.com/ibm-cds-labs/simple-data-pipe/wiki/Installing-a-Simple-Data-Pipe-Connector), add the following line to the dependencies list in the `package.json` file: 

> BETA ONLY
```
"simple-data-pipe-connector-oauth-slack": "https://github.com/ibm-cds-labs/simple-data-pipe-connector-oauth-slack.git#pp_validation"
```

##### Enable OAuth support and collect connectivity information

 You need to register the Simple Data Pipe application before you can use this connector to load data.
 
  * TODO? Yup!

### Using the Simple Data Pipe connector boilerplate for slack.com

To configure and run a pipe

1. Open the Simple Data Pipe web console.
2. Select __Create A New Pipe__.
3. Select __Slack OAuth Data Source__ for the __Type__ when creating a new pipe.  
4. In the _Connect_ page, enter the _application id_ and _secret_ from the Slack application settings page.
5. When prompted, select the appropriate Slack team and authorize the Simple Data Pipe application to access it.
6. Select a channel (or All channels) from which to load messages.
7. Schedule or run the data pipe now.

#### License 

Copyright [2016] IBM Cloud Data Services

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
