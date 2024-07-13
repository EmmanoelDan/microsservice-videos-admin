import { InvalidUuidError, Uuid } from "../uuid.vo"
import {validate as uuidValidade} from "uuid"

describe('Uuid unit tests', () => {
    const validadeSpy = jest.spyOn(Uuid.prototype as any, 'validate')
    test('should throw error when uuid is invalid', () => {
        expect(() => {
            new Uuid("invalid-uuid");
        }).toThrowError(new InvalidUuidError());
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    })

    test('should creat a valid uuid', () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(uuidValidade(uuid.id)).toBe(true);
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    })

    test('should accept uuid valid', () => {
        const uuid = new Uuid("123e4567-e89b-12d3-a456-426655440000");
        expect(uuid.id).toBe("123e4567-e89b-12d3-a456-426655440000");
        expect(validadeSpy).toHaveBeenCalledTimes(1);
    })
})