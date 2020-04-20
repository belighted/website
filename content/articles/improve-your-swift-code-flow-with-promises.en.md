---
lang: en
slug: improve-your-swift-code-flow-with-promises
originalPath: https://www.belighted.com/blog/improve-your-swift-code-flow-with-promises
title: Improve your Swift code flow with promises
author: Michaël A.
description: In this article, I'll talk about the callback syntax. When an
  asynchronous method finishes, it calls back its caller for the next step of
  the process. In terms of sustainability, this approach presents some
  weaknesses as the global logic is spread among the code. PromiseKit proposes
  an interesting alternative inspired from JavaScript.
image: ./images/promisekit-blogpost-img.png
date: 1420070400000
tags:
  - label: Under the hood
    value: under-the-hood
status: published
---
The feeling of smoothness given by an application is something that matters for users. Apple has perfectly understood this point and brings useful tools to ease the life of developers: multi-threading, Grand Central Dispatch, callbacks, delegates... These techniques are helpful to set up asynchronous processes and keep the main thread available for the interfaces and user interactions.

The callback syntax
-------------------

When an asynchronous method finishes, it calls back its caller for the next step of the process. In terms of sustainability, this approach presents some weaknesses as the global logic is spread among the code. PromiseKit proposes an interesting alternative inspired from JavaScript. For a few years now, JavaScript has been enriched with the concept of _promise_ to represent the result of an asynchronous operation. Promise substitutes callback.

PromiseKit is a framework, supporting both Objective-C and Swift, that brings Promise concept to your iOS code. But there is more to it than just changing the syntax in your code. The use of promise gives the opportunity to reduce code complexity.

> PromiseKit is not just a promises implementation, it is also a collection of helper functions that make the typical asynchronous patterns we use as iOS developers delightful too.

I'll give an example to show how the use of promises helped me in an iOS project. Imagine an application that contains establishments providing services to population to be displayed on a map. Establishments and services should be downloaded on a regular basis and stored with CoreData.

The implementation
------------------

First, let's write a service that will be in charge of synchronizing the data. We'll first synchronized the services, that is referential data to create the relationship in the database.

    class SyncService: NSObject {
      func syncDataFromServer() {
        self.syncServices().then {_ in
           return self.syncEstablishments()
        }.then { _ in
           // send a notification via GCD
           NSNotificationCenter.defaultCenter().postNotificationName(ServerSynchronisationDone, object: nil, userInfo: nil)
        }
      }
    

  
All the business logic is encompassed in this single method. The app will fetch and save the services. When this operation will successfully finish, then it will synchronize the establishments. When the whole processing is done, I often use the GCD to send a completion notification. I find this solution really elegant and easy to notify the current view controller (whatever it is).

Let's write some code to detail for example how the method syncServices can look like. Having a look at the method syncServices you can understand what is going on :

> *   Get the last update date,
> *   Get the data from the server,
> *   Map the results to a managed object (if successful)
> *   Save the results into CoreData

Both fetching results on HTTP or saving records in CoreData are asynchronous processes. They are good candidates to write as promise.

    extension SyncService{
        func syncServices() -> Promise<[Service]> {
            let lastServiceUpdateDate = PersistenceManager.sharedInstance.getLastUpdatedService()
            return fetchPromise = self.fetchServicesFromDate(lastService!.updatedAt).then {
                jsonResult in self.parseServicesJson(jsonResult)
            }.then {
                serviceMaps in self.storeServiceInCoreData(serviceMaps)
            }
        }
        func fetchServicesFromDate(fromDate: NSDate?) -> Promise<AnyObject>{
            return Promise { fulfill, reject in
                Alamofire.request(...).responseJSON{ response in
                    let serverResponse = response.response
                        if(serverResponse?.statusCode < 200 || serverResponse?.statusCode > 299) {
                        let error = NSError(domain: "http", code: 123, userInfo: ["errorDescription":"Server answers with a wrong status."])
                        reject(error)
                    }
    
                    if let JSON = response.result.value {
                        fulfill(JSON)
                    }
                }
            }
        }
        func parseServicesJson(json: AnyObject) -> Promise<[ServiceMap]> {
          ...
        }
         func storeServiceInCoreData(results: [ServiceMap]) -> Promise<[Service]> {
    
            return Promise { fulfill, reject in
                var services = [Service]()
                CDK.performBlockOnBackgroundContext({ context in
                do {
                        ...
                        return .SaveToPersistentStore
                    }
                    catch {
                        let error = NSError()
                        reject(error)
                    }
                    }, completionHandler: { result in
                        fulfill(services)
                    }
                )
            }
        }
    }
    

To learn more
-------------

*   **[PromiseKit's documentation](https://promisekit.org/)**
*   **[PromiseKit's github](https://github.com/mxcl/PromiseKit)**

[![New Call-to-action](https://no-cache.hubspot.com/cta/default/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/fb3606cc-cc1b-47d0-ae85-2c9f69837fe2)