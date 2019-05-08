export function clone<T>(val: T, depth: number = 5): T | null {
	if (typeof val !== 'object') {
		return val
	}
	if (val === null) {
		return null
	}
	const clonedObject: any = Array.isArray(val) ? [] : {}
	for (const key in val) {
		clonedObject[key] = depth <= 1 ? val[key] : clone(val[key], depth - 1)
	}
	return clonedObject as T
}
