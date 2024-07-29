import { ClassValidatorFields } from "../../domain/validators/class-validator-fields";
import { FieldsErrors } from "../../domain/validators/validator-fields-interface";
import { EntityValidationError } from "../../domain/validators/validation.error";

type Expected = | {
    validator: ClassValidatorFields<any>; data: any
} | (() => any)
expect.extend({
    containsErrorMessage(expected: Expected, received: FieldsErrors){
        if (typeof expected === 'function'){
            try {
                expected();
                return isValid();
            } catch (e) {
                const error = e as EntityValidationError
                return assertContainsErrorsMessages(error.error, received)
            }
        } else {
            const {validator, data} = expected;
            const validated = validator.validate(data)

            if(validated){
                return isValid();
            }
            return assertContainsErrorsMessages(validator.errors, received)

        }
    },
})


function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors){
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

    return isMatch
    ? {pass: true, message: () => ""}
    : {
        pass: false,
        message: () => 
            `The validation errors note contains ${JSON.stringify(
                received
            )}. Current: ${JSON.stringify(expected)}`
    }
}

function isValid() {
    return {pass: true, message: () => ""}
}
