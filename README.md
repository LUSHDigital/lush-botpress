# Botpress x Lush

## What's this?

A Botpress integration which helps Botpress link to Lush services (specifically the Wyvern supergraph). [Botpress have some docs which are worth reading](https://botpress.com/docs/integration/concepts/overview/).

## What's an integration?

Glad you asked, a Botpress integration is a way for code to define things in Botpress Studio. For example, the Actions become cards which can be attached to a node in Botpress. Events can be treated as external triggers which can be attached to nodes too. 

The config is what is ingested when you install the app, e.g. a field that someone can add some data to when they install the integration to their bot. Actions can take structured input but I haven't really worked out how that works yet.

At its core an integration is a way to orchestrate a webhook with various actions. It's worth noting that there is only one (1) webhook URL per integration. In the future if we have Saleor and another system calling the same integration we just need to make sure to handle it.

## What does this integration do?

### Config
- App token

### Actions
- getCustomerOrders ⏳
- getBasket ⏳
- getProducts ⏳
- getProductVariants ⏳
- addToBasket ⏳
- removeFromBasket ⏳
- updateQuantity ⏳
- upsertShippingAddress ⏳
- upsertBillingAddress ⏳

### Events
- checkoutPaid ⏳
- checkoutUpdated ⏳
- productCreated ⏳
- productUpdated ⏳

## How does this integration work?

Great question. The integration is deployed with `bp deploy` from their own CLI program which combines everything into a single JS file. From this Botpress reads the integration.definition file to work out what the integration name, icon, and what the integration does. As such the definitions are highly structured with schemas but also allows a fair amount of flexibility as to what things are called.

This is where it reads the configuration and works out what to ask when the integration is installed to the bot.

src/index actually instantiates the integration. It calls the register function to do what it needs to do, in our case it creates the webhook in Saleor using the App token from the config step.

Each time the webhook is called the request is passed to the aptly named 'handler' function. Here we verify the signature from Saleor and can then dispatch events and messages. For example, if we receive a 'checkout updated' event we need a way to pass that to the correct person. This is done by using consistent user IDs and 'channels'. 

I don't understand channels yet but when I do I'll try to update this.

## Developing it

While developing with `bp dev` it generates a bunch of internal files in the .botpress folder (similar to how Next.js has a .next folder). Among other things this defines the types for the integration, I found sometimes it can get a bit out-of-sync and needs `bp gen` to be run manually to update typings.

`bp dev` does some clever stuff, it essentially acts like `ngrok` or `wrangler tail` by tunneling and forwarding requests from a public endpoint to your computer.

