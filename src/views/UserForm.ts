import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:.set-random-age': this.onRandomAgeButtonClick,
			'click:.set-name': this.onSetNameButtonClick,
			'click:.save-model': this.onSaveClick,
		}
	}

	onSaveClick = (): void => {
		this.model.save();
	}

	onRandomAgeButtonClick = (): void => {
		this.model.setRandomAge();
	}

	onSetNameButtonClick = (): void => {
		const input: HTMLInputElement | null = this.parent.querySelector('[name="name"]');

		if (input) {
			const name = input.value;

			this.model.set({ name });
		} else {
			throw new Error('Input element not found.')
		}
	}

	template(): string {
		return `
			<div>
				<input type="text" value="${this.model.get('name')}" name="name" />
				<button class="set-name">Set Name</button>
				<button class="set-random-age">Set Random Age</button>
				<button class="save-model">Save</button>
			</div>
		`;
	}
}
