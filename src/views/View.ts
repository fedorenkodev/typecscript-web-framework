import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
	regions: { [key: string]: Element } = {};

	constructor(public parent: Element, public model: T) {
		this.bindModel();
	}

	bindModel(): void {
		this.model.addListener('change', this.render.bind(this));
	}

	bindEvents(fragment: DocumentFragment): void {
		const eventsMap = this.eventsMap();

		for (let eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(':');

			fragment.querySelectorAll(selector).forEach(element => {
				element.addEventListener(eventName, eventsMap[eventKey]);
			})
		}
	}

	regionsMap(): { [key: string]: string } {
		return {
		}
	}

	eventsMap(): { [key: string]: () => void } {
		return {
		}
	}

	mapRegions(fragment: DocumentFragment): void {
		const regionsMap = this.regionsMap();

		for(let key in regionsMap) {
			const selector = regionsMap[key];

			const element = fragment.querySelector(selector);

			if (element) {
				this.regions[key] = element;
			}
		}
	}

	onRender(): void {

	}

	render(): void {
		this.parent.innerHTML = '';

		const template = document.createElement('template');
		template.innerHTML = this.template();

		this.bindEvents(template.content);
		this.mapRegions(template.content);

		this.onRender();

		this.parent.append(template.content);
	}

	abstract template(): string
}
