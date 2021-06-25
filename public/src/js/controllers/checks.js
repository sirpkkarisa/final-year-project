main.controllers.login = {
    checkRangeConstraint: function(input) {
        // This method checks for special characters withing the input values. If present,
        // it returns a `RangeConstraintViolation Error`
        const hasSpecialCharacter = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input);
        if(hasSpecialCharacter) {
            return new RangeConstraintViolation();
        }
        return new NoConstraintViolation();
    },
    checkMandatoryConstraint: function(input) {
        // Check if the input is empty
        // `MandatoryConstraintViolation`
        
        if(typeof(input) === 'string' && input.trim().length === 0) {
            return new MandatoryConstraintViolation('Username/Password cannot be Empty');
        }
        return new NoConstraintViolation();
    }
};
