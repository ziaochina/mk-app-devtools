import { config, start, componentFactory } from 'mk-meta-engine'
import * as mkComponents from 'mk-component'
import myConfig  from './config'

import mk_app_devtools_modify_meta from './apps/mk-app-devtools/apps/mk-app-devtools-modify-meta/index.js'
import mk_app_devtools_test from './apps/mk-app-devtools/apps/mk-app-devtools-test/index.js'
import mk_app_devtools from './apps/mk-app-devtools/index.js'

const apps = {
		
	[mk_app_devtools_modify_meta.name]: mk_app_devtools_modify_meta,	
	[mk_app_devtools_test.name]: mk_app_devtools_test,	
	[mk_app_devtools.name]: mk_app_devtools,
}

apps.config = (options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key])
				}
			}
		})
	})
}

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	
start()