import { Callback } from '../../../types';

const SOURCES_LIMIT = 10;

function getElement<T extends Element>(selector: string, type: { new (): T }): T {
    const element = document.querySelector(selector);
    if (!(element instanceof type)) throw new Error(`Element '${selector}' not found`);
    return element;
}

class SourcesPanel {
    private readonly panel = getElement('#sources-panel', HTMLElement);
    private readonly form = getElement('.sources-panel__form', HTMLFormElement);
    private readonly counter = getElement('.sources-panel__chosen', HTMLElement);
    private readonly openButton = getElement('.sources-button', HTMLButtonElement);
    private readonly closeButton = getElement('.sources-panel__close', HTMLButtonElement);
    private readonly clearButton = getElement('.sources-panel__clear', HTMLButtonElement);
    private readonly submitButton = getElement('.sources-panel__form [type="submit"]', HTMLButtonElement);
    private savedIds: string[] = [];
    private submitCallback: Callback<string[]> = () => {};

    constructor() {
        this.openButton.addEventListener('click', () => this.open());
        this.closeButton.addEventListener('click', () => this.close(false));
        this.clearButton.addEventListener('click', () => this.clear());
        this.form.addEventListener('change', () => this.update());
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.close(true);
            this.submitCallback(this.getSelected());
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.panel.hidden) this.close(false);
        });
    }

    public onSubmit(callback: Callback<string[]>): void {
        this.submitCallback = callback;
    }

    public select(ids: ReadonlyArray<string>): void {
        this.inputs.forEach((input) => {
            input.checked = ids.includes(this.getId(input));
        });
        this.update();
    }

    private open(): void {
        this.savedIds = this.getSelected();
        this.panel.hidden = false;
        document.body.style.overflow = 'hidden';
        this.update();
        this.closeButton.focus();
    }

    private close(apply: boolean): void {
        if (!apply) this.select(this.savedIds);
        this.panel.hidden = true;
        document.body.style.overflow = '';
        this.openButton.focus();
    }

    private clear(): void {
        this.inputs.forEach((input) => {
            input.checked = false;
        });
        this.update();
    }

    private update(): void {
        const count = this.getSelected().length;
        this.counter.textContent = String(count);
        this.inputs.forEach((input) => {
            input.disabled = !input.checked && count >= SOURCES_LIMIT;
        });
        this.submitButton.disabled = count === 0;
    }

    private getSelected(): string[] {
        return this.inputs.filter((input) => input.checked).map((input) => this.getId(input));
    }

    private getId(input: HTMLInputElement): string {
        return input.closest('.source__item')?.getAttribute('data-source-id') ?? '';
    }

    private get inputs(): HTMLInputElement[] {
        return Array.from(this.form.querySelectorAll('.source__item-input')).filter(
            (element): element is HTMLInputElement => element instanceof HTMLInputElement
        );
    }
}

export default SourcesPanel;
