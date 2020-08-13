export const eventHelper = {
    raiseClick,
    raiseInput,
    raiseKeydown,
    raiseKeyup,
    raise
};

function raiseClick(element: HTMLElement): void {
    element.click();
}

function raiseInput(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input'));
}

function raiseKeydown(input: HTMLInputElement, code: string): void {
    input.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        code
    }));
}

function raiseKeyup(input: HTMLInputElement, code: string): void {
    input.dispatchEvent(new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        code
    }));
}

function raise(element: HTMLElement, event: Event): void {
    element.dispatchEvent(event);
}
