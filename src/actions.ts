import type { ModuleInstance } from './main.js'
import timestring from 'timestring'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		trigger: {
			name: 'Trigger',
			options: [
				{
					id: 'category',
					type: 'textinput',
					label: 'Category',
					regex: '/[a-z0-9]+/',
					default: 'main',
				},
				{
					id: 'triggerLink',
					type: 'textinput',
					label: 'Trigger',
					regex: '/[a-z0-9]+/',
				},
				{
					id: 'expire',
					type: 'textinput',
					label: 'Expires in',
					default: '5m',
				}
			],
			callback: async (event) => {
				self.log('debug', `Triggering for category ${event.options.category}, trigger link ${event.options.triggerLink}, expire ${event.options.expire}`)
				const formattedTime = event.options.expire ? Date.now() + timestring(`${event.options.expire}`, "millisecond") : undefined
				self.log('debug', `Raw time to expire: ${formattedTime}`)
				const response = await fetch(`https://${self.config.host}/api/set/trigger`, {
					method: 'POST',
					headers: {
						'Authorization': self.config.apiKey,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						category: event.options.category,
						expiresAt: formattedTime,
						trigger: event.options.triggerLink
					})
				})
				if (!response.ok) {
					self.log('error', 'Failed to trigger link')
					self.log('error', await response.text())
				} else {
					self.log('debug', 'Trigger set successfully')
				}
			},
		},
		clear: {
			name: 'Clear Trigger',
			options: [
				{
					id: 'category',
					type: 'textinput',
					label: 'Category',
					regex: '/[a-z0-9]+/',
					default: 'main',
				},
			],
			callback: async (event) => {
				const response = await fetch(`https://${self.config.host}/api/set/trigger`, {
					method: 'POST',
					headers: {
						'Authorization': self.config.apiKey,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						category: event.options.category,
					})
				})
				if (!response.ok) {
					self.log('error', 'Failed to trigger link')
					self.log('error', await response.text())
				} else {
					self.log('debug', 'Trigger cleared successfully')
				}
			},
		},
	})
}
