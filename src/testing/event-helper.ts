export const eventHelper = {
    raiseClick: raiseClick,
    raiseInput: raiseInput,
    raiseKeydown: raiseKeydown
};

function raiseClick(element: HTMLElement) {
    element.click();
}

function raiseInput(input: HTMLInputElement, value: string) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
}

function raiseKeydown(input: HTMLInputElement, code: string) {
    input.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        code: code
    }));
}
