import { ValueObject } from "../value-objects";

class StringValueObject extends ValueObject {
    constructor(readonly value: string) {
        super();
    }
}

class ComplexValueObject extends ValueObject {
    constructor(readonly prop1: string, readonly prop2: number) {
        super();
    }
}
describe('ValueObject', () => {
    test('should be equal', () => {
        const valueObject1 = new StringValueObject('test');
        const valueObject2 = new StringValueObject('test');
        expect(valueObject1.equals(valueObject2)).toBeTruthy();

        const complexValueObject1 = new ComplexValueObject('test', 1);
        const complexValueObject2 = new ComplexValueObject('test', 1);
        expect(complexValueObject1.equals(complexValueObject2)).toBeTruthy();
    })

    test('should be not equal', () => {
        const valueObject1 = new StringValueObject('test');
        const valueObject2 = new StringValueObject('test2');

        const complexValueObject1 = new ComplexValueObject('test', 1);
        const complexValueObject2 = new ComplexValueObject('test', 2);
        expect(complexValueObject1.equals(complexValueObject2)).toBeFalsy();
        
        expect(valueObject1.equals(valueObject2)).toBeFalsy();
    })
})