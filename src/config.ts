import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	apiKey: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target Domain',
			width: 8,
			regex: Regex.HOSTNAME,
			default: "tap.fbcgulfport.org"
		},
		{
			type: 'textinput',
			id: 'apiKey',
			label: 'API Key',
			width: 8,
		},
	]
}
