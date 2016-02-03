//-------------------------------------------------------------------------------
// Copyright IBM Corp. 2015
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//-------------------------------------------------------------------------------

'use strict';

var request = require("request");
var _ = require("lodash");
var async = require("async");
var pipesSDK = require('simple-data-pipe-sdk');
var connectorExt = pipesSDK.connectorExt;
var pipesDb = pipesSDK.pipesDb;
var cloudant = pipesSDK.cloudant;
var moment = require("moment");

var concurrency = 20;	//Async queue concurrency
/**
 * Pipes Connector for slack
 */
function slackConnector( parentDirPath ){
	//Call constructor from super class
	connectorExt.call(this, "slack", "Slack", {
		copyToDashDb: false,
		extraRequiredFields: null,
		useOAuth: false,
		useCustomTables: true,
		recreateTargetDb: true	//Preserve target db as we want to accumulate training data
	});
	
	this.getTablePrefix = function(){
		return "slack";
	}
	
	this.getCloudantDbName = function(pipe, table){
		return pipe.name + "_slack_" + table.labelPlural;
	}
	
	this.channels = [];
	
	/**
	 * getTables: return Array of table objects: {name:'XXXX', labelPlural: 'XXXX}
	 */
	this.getTables = function(){
		var tables = [
	        {name : null, labelPlural : 'All Channels and DMs'}
        ];
		_.forEach(this.channels, function(channel){
			tables.push({
				name: channel.id,
				labelPlural: channel.name
			})
		});
		return tables;
	}
	
	var superConnectDataSource = this.connectDataSource;		
	this.connectDataSource = function( req, res, pipeId, url, callback ){	
		pipesDb.getPipe( pipeId, function( err, pipe ){
			if ( err ){
				return callback(err);
			}
			request.get("https://slack.com/api/channels.list?token=" + pipe.slackToken, {"json":true}, function(err, response, body ){
				if ( err || body.error ){
					console.log("Unable to fetch list of channels: ", err || body.error );
					return callback(err);
				}
				this.channels = body.channels;
				if ( !_.isArray(this.channels) ){
					return callback("Invalid results from slacks channels list api: ", body);
				}
				
				//Return super implementation
				console.log("Calling superConnectDataSource");
				return superConnectDataSource.call(this, req, res, pipeId, url, callback);
			}.bind(this));
		}.bind(this));
	}

	this.fetchRecords = function( table, pushRecordFn, done, pipeRunStep, pipeRunStats, logger, pipe, pipeRunner ){		
		console.log("Processing table: ", table);
		request.get("https://slack.com/api/channels.history?token=" + pipe.slackToken + "&channel=" + table.name + "&count=1000", {"json":true}, function(err, response, body){
			if ( err || body.error ){
				return done(err);
			}
			if ( !_.isArray(body.messages)){
				return done("Invalid results from channel history api");
			}
			pushRecordFn(body.messages);
			return done();
		});
	};
}

//Extend event Emitter
require('util').inherits(slackConnector, connectorExt);

module.exports = new slackConnector();