import { logger } from '../common/logger'
import { ComponentType } from '../common/constant'
import { isUndefined } from '../common/utils'
import { ImageComponentNeedArguments } from '../common/constant'

export function ImageComponent(options) {
	ImageComponentNeedArguments.forEach(_ => {
		if (isUndefined(options[_])) {
			logger.warn(`图片组件需要参数 ${_}`)
		}
	})
	return function(coreOptions, loader) {
		return Object.assign({}, coreOptions, options, {
				componentType: ComponentType.Image,
				getImage() {
					const image = loader._res.images[options.scope]
					if(!image) {
						logger.warn(`未找到该scope: ${options.scope}的图片资源,请检查scope`)
					}
					return image
				}
			}
		)
	}
}

