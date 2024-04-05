export function getElementProperty(el: HTMLElement, prop: string) {
	const value = getComputedStyle(el).getPropertyValue(prop);
	return value;
}
