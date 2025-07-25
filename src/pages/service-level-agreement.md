# Business Service Level Agreement

## 1. Storacha Service Level Agreement ("SLA").

Storacha, Inc. ("Company") commits to provide a level of service for Storacha Customers demonstrating:

1.1 99.9% Uptime. The Upload Service will upload Customer Content at least 99.9% of the time and the Read Service will serve Customer Content at least 99.9% of the time, subject to Section 4.

1.2 Upload Size Limit. Individual uploads to the Upload Service may encounter issues if they are over 750GB.

1.3 Tier-Based Size Limit. Individual uploads are subject to size limits based on Customer’s chosen pricing tier as described in the Pricing page available at <https://storacha.network/#pricing>.

## 2. Definitions.

2.1 "Claim" means a claim submitted by Customer to Company pursuant to this SLA that a Service Level has not been met and that a Service Discount may be due to Customer.

2.2 "Customer" refers to the organization that has purchased and explicitly enabled Services from Company.

2.3 "Customer Content" means any files, software, scripts, multimedia images, graphics, audio, video, text, data or other objects (a) available via a public IPFS gateway and requested for caching by Customer; (b) originating or transmitted from any device or website owned or operated by Customer and routed to, passed through and/or stored on or within the Company’s network or (c) otherwise transmitted or routed using the Services.

2.4 "Customer Planned Downtime" is downtime specified by the Customer that is to be excluded from any calculation of an Outage Period. This would apply to any time when the Customer has requested access to Services suspended from their environment.

2.5 "Force Majeure" refers to any downtime minutes that are the result of events or conditions beyond Company’s reasonable control. Such events might include but are not limited to any acts of common enemy, the elements, earthquakes, floods, fires, epidemics, and inability to secure products or services from other persons or entities.

2.6 "Incident" means any set of circumstances resulting in a failure to meet a Service Level.

2.7 "Outage Period" is equal to the number of downtime minutes resulting from an Unscheduled Service Outage.

2.8 “Peered” means a persisted connection between peers configured on IPFS.

2.9 "Services" means, collectively, the Upload Service and the Read Service.

2.10 “Upload Service” refers to uploads through the website, client, and CLI for supported file types and sizes as defined by the docs available at https://docs.storacha.network/.

2.11 “Read Service” refers to reading successfully uploaded data, using its CID, over https://storacha.link, https://w3s.link or via Bitswap using IPFS nodes peered with Storacha nodes.

2.12 "Service Level" means standards Company chooses to adhere to and by which it measures the level of service it provides as specifically set forth below.

2.13 "Unscheduled Service Outage" are those interruptions to the Services that have not been previously communicated to the Customer and that result in the Customer’s application being unavailable to its customers or users. Unscheduled Service Outages exclude downtime minutes resulting from Customer Planned Downtime, downtime caused by Force Majeure, or interruptions due to the SLA Exclusions in Section 4.1.

## 3. SLA Exclusions.

3.1 This SLA and any applicable Service Levels do not apply to any storage, performance or availability issues:

(a) Due to factors outside Company’s reasonable control;

(b) That resulted from Customer’s or third party hardware or software;

(c) That resulted from actions or inactions of Customer or third parties;

(d) Caused by Customer’s use of the Services after Company advised Customer to modify its use of the Services, if Customer did not modify its use as advised;

(e) During beta and trial Services (as determined by Company);

(f) Attributable to the acts or omissions of Customer or Customer’s employees, agents, contractors, or vendors, or anyone gaining access to Company’s Services by means of Customer’s Authorized Users’ accounts or equipment;

(g) Caused by timeouts caused by tooling used by the Customer;

(i) Caused by Customer attempting to upload files via the storacha.network website;

(j) Due to failures of infrastructure used to read data from Storacha, including inaccessibility of public gateways;

(k) That resulted from Customer’s use of gateways not peered with Storacha (i.e., not listed on <https://github.com/storacha/hoverboard#peer-address>);

(l) That resulted from a brief delay in data availability on IPFS following initial data upload and indexing.

## 4. Methodology.

4.1 Company is not responsible for comprehensive monitoring of Customer Content; this responsibility lies with Customer. If requested by Company, Customer shall provide data on Customer’s reported Outage Periods as determined by any commercially reasonable independent measurement system used by the Customer.
