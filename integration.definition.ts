import { IntegrationDefinition } from '@botpress/sdk'
import { 
	actions, channels, events,
	configuration, states, user } from './src/definitions'
import { INTEGRATION_NAME } from './src/const';

export default new IntegrationDefinition({
	actions,
	channels,
	events,
	configuration,
	description: 'Allows two-way communication between the Lush Digital Estate and Botpress.',
	icon: 'icon.svg',
	//readme: 'hub.md',
	states,
	user,
	name: INTEGRATION_NAME,
	version: '0.0.1'
})
