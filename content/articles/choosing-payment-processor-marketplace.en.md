---
lang: en
slug: choosing-payment-processor-marketplace
originalPath: https://www.belighted.com/blog/choosing-payment-processor-marketplace
title: Choosing a payment processor for your marketplace
author: Nicolas Jacobeus
description: Payment processing is one of the big questions for a new or growing
  marketplace.  Consider these factors to see which payment processor fits your
  marketplace model best. See why we chose Stripe Connect for a marketplace
  client recently.
image: ./images/woman-typing-credit-card-number-for-online-shopping.jpg
date: 1514764800000
tags:
  - label: Product development / Continuous Development
    value: product-development-continuous-development
status: published
---
When you set up your marketplace, you need to figure out how money is going to exchange hands. This usually involves funds moving between buyers and sellers with some amount to you for providing the platform, for a three-part transaction. 

The transferring of money is heavily regulated and can also be a source of friction for your marketplace users. You want to get the choice right from the start. The marketplace [Listminut](https://www.belighted.com/case-studies/listminut-increases-their-product-development-speed-by-90-with-belighted) came to us wanting to speed up development, improve conversions and expand into France. Our work also involved changing from a payment gateway to a more marketplace-friendly payment processor. Stripe Connect provided a great solution.

[![You have a Software Idea but can't code?](/images/legacy-cta/CmbFPGk6QWSw4YLsAxURq.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/370139d4-de4e-4110-9c62-c564f92ccfd5)

Let’s take a look at some things you need to consider when choosing a payment processor for your marketplace.

Risks of traditional banking solutions for marketplaces
-------------------------------------------------------

New marketplace developers may look to integrate with banks using a payment gateway like authorize.net or PayPal. At first, it could appear a good solution. But as you look closer, you will see several issues that will grow as your platform grows.

### Resource intensive, error prone

The handling of marketplace payments can be quite cumbersome. Consider this scenario, which could easily occur in a number of European countries. The marketplace sets up multiple bank accounts and a payment gateway. The user sends payment and the funds go to a special bank account first. Then the marketplace manually transfers a cut to its own bank account and the remainder to the seller’s bank account. Looking only at the effort required, you can see that time required to service the payments and human error from the manual process will eventually outpace any benefits.

### Regulatory risks

Regulations can be a major pain point for marketplaces. Money remittance is heavily regulated by EU and national laws and watched over by financial industry authorities. With the introduction of the second Payment Services Directive or PSD2, a marketplace will have to obtain a payments license from a regulator if it wishes to receive the payments that flow from buyers to sellers. Marketplaces that do not comply could face hefty fines or be shut down. Frankly, you don’t want to have to spend precious time dealing with legal issues such as this as a new marketplace - you want to concentrate on growing your users and transactions.

### Responsibility for data

If you are accepting payments and then passing along money, you will be privy to a lot of sensitive banking data. This carries more responsibility for you and greater risk for people who use your platform, since their financial data then becomes something you have to handle. The EU General Data Protection Regulation (GDPR) calls for strict compliance under the threat of hefty fines. You will most certainly need to take steps to comply regardless, but handling banking data means you will need to dedicate even more resources to protecting that data.

Why we like Stripe Connect for marketplace payments
---------------------------------------------------

[Stripe Connect](https://stripe.com/connect) is a payment processing service highly targeted to marketplaces. It handles the transaction for you, so your marketplace does not have to take possession of funds that flow between merchants and buyers.

Stripe Connect has been focusing on helping marketplaces sign up sellers easily, one of the most important issues you’ll face as you seek to get your marketplace off the ground. The company offers payment routing infrastructure for different kinds of payment flows to serve the new types of marketplaces emerging.

*   One to one
*   One to many
*   Many to many
*   Holding funds
*   Account debits (soon)

Using Stripe Connect as a payment processor lets you get your marketplace up and running much more quickly than using a payment gateway. It is highly customizable and functions in 25+ countries. Stripe also manages compliance burdens to simplify your tax reporting, sanctions screening and e-money authorization.

Millions of sellers (drivers, couriers, caregivers, barbers, etc.) work on platforms powered by Stripe Connect. Some well-known marketplaces using Stripe Connect for their payments include Kickstarter, Lyft, Instacart, Shopify, Jinn, and TaskRabbit. Listminut is also listed among [marketplace use cases](https://stripe.com/connect/use-cases) by Stripe.

Stripe alternatives for marketplace payment processing
------------------------------------------------------

To find the most appropriate payment processor for your marketplace, you’ll want to consider several factors. Stripe Connect may not always be the answer, especially if you operate hyper-locally.

Stripe offers excellent documentation for developers, but it is not available in every language. For example, though available in English and French, it’s not yet available in Dutch. That said, Stripe does a great job responding to support requests. It’s easy for a tech team to implement, customize and maintain.

Another potential drawback to consider is the delay in receiving funds - usually 7 days plus any third-party bank delays. This is for fraud avoidance. A bank transfer might give you the funds quicker if all the parties are using the same bank. Additionally, Stripe limits the amount of money transferred from the platform to the seller to 10%, which can impact the handling of promotion codes.

Here are a few points below to help you think through your payment processor needs. Our senior staff can also consult on your choices for payment processors in a [Scoping Workshop](https://www.belighted.com/scoping-workshop).

### Integration with your country’s banking system

Investigate how well equipped the provider is in the countries where you’re doing business. Some systems work only with the American banking system. Others that boast an international presence may not be set up as well locally as they may appear at first glance.

### Support in your target languages

Make sure the provider offers the languages you will need. If you’re operating in Europe, some of the USA-based providers may not offer all the languages you would like. This may affect the users, who will prefer a checkout page in their own language, as well as your development team who will rely on the payment processor’s documentation to implement the system for you.

### Acceptance of users’ preferred payment methods

Ensure the provider supports your users’ preferred payment methods. Ecommerce News [points out](https://ecommercenews.eu/online-payment-methods-europe/) that “When it comes to paying for the goods they have ordered online, shoppers in Europe globally prefer to pay through digital wallets, such as PayPal and Alipay. Visa and Mastercard are also very popular, followed by domestic bank credit and debit cards… But also here, there are many big differences among the countries. For example, in the Netherlands the credit card isn’t very popular, because 84 percent of the Dutch use the national payment method iDeal for online purchases.” Know your users, and make sure your chosen payment processor can deliver.

### Support for your type of transactions

Check out the types of transactions the payment processor does best. Some marketplace payment systems may be optimal for ecommerce transactions while others are targeting another model, such as crowdfunding or payment for services.

### Fee structure

Get familiar with the numbers. A fairly standard processing fee is 2.9% + $0.30 per transaction. However, there are usually more fees involved beyond this. It gets even more complicated when you start to look at tiers triggered by volume of transactions, how refunds are handled, whether or not the payment processor charges monthly fees, and so on.

### Long-term reliability

Ensure the company is here to stay. You might find a local provider that knows the ins and outs of your country’s banking system and does a good job with all the local banking APIs. But if they are relatively unproven or can’t scale to a profitable size, you run the risk of hooking up with a provider that could be out of business in a couple years.

Payment processors operate on thin margins that need large volumes to be profitable as a business. The payments platform Balanced is an example of one that shut down after realizing it couldn’t reach a profitable scale, [transitioning its marketplace customers to Stripe](https://techcrunch.com/2015/03/13/balanced-is-closing-its-marketplace-payment-platform-in-90-days-strikes-transition-deal-with-rival-stripe/).

Alternatives to Stripe Connect
------------------------------

Here are some other potential alternatives you can consider for your marketplace:

Braintree

Klarna

Trustly

Skrill

Mollie

2Checkout

WePay

BlueSnap

Adyen

Sparrow

Dwolla

Splash

MangoPay

As a development company that works with new and growing marketplace apps, we appreciate that Stripe Connect lets us handle implementation and setup quickly and effectively, reducing risk for marketplaces like [Listminut](https://www.belighted.com/blog/when-a-project-goes-international).

[Talk to us today](https://www.belighted.com/contact) about the payments processor solution that will work best for your marketplace.

 [![You have a software idea but can't code?](/images/legacy-cta/2r_muYcfC0X7-yUFIS_kd.png)](https://cta-redirect.hubspot.com/cta/redirect/1684659/2a757af5-8c70-4e5b-bd84-3e0c399fa61d)