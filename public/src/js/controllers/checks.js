main.controllers.login = {
    checkLogRangeConstraint: function(input) {
        // This method checks for special characters withing the input values. If present,
        // it returns a `RangeConstraintViolation Error`
        const hasSpecialCharacter = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input);
        if(hasSpecialCharacter) {
            return new RangeConstraintViolation();
        }
        return new NoConstraintViolation();
    },
    checkLogMandatoryConstraint: function(input) {
        // Check if the input is empty
        // `MandatoryConstraintViolation`
        
        if(typeof(input) === 'string' && input.trim().length === 0) {
            return new MandatoryConstraintViolation('Username/Password cannot be Empty');
        }
        return new NoConstraintViolation();
    }
};

main.controllers.newUser = {
    checkNewRangeConstraint: function(input) {
        // This method checks for special characters withing the input values. If present,
        // it returns a `RangeConstraintViolation Error`
        const hasSpecialCharacter = !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input);
        if(hasSpecialCharacter) {
            return new RangeConstraintViolation('Name must not contain special characters!');
        }
        return new NoConstraintViolation();
    },
    checkNewMandatoryConstraint: function(input) {
        // Check if the input is empty
        // `MandatoryConstraintViolation`
        
        if(typeof(input) === 'string' && input.trim().length === 0) {
            return new MandatoryConstraintViolation('Name cannot be Empty');
        }
        return new NoConstraintViolation();
    },
    checkNewPatternConstraint: function(input) {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const regNoRegex = null;
        const empNoRegex = null
        if(!emailRegex.test(input)) {
            return new PatternConstraintViolation(`Wrong ${input.tag} pattern!`);
        }
        return new NoConstraintViolation();
    },
    checkNewIntervalConstraint: function(input) {
        if(input.tag === 'name' && input.value.trim().length < 2) {
            return new IntervalConstraintViolation(`Name is too short`);
        } else if(input.tag === 'name' && input.value.trim().length > 30) {
            return new IntervalConstraintViolation('Name is too long');
        }
        return new NoConstraintViolation();
    }
}