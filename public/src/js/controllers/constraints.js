/*
	class definitions for constraint classes
*/
//NoConstraintViolation class
class NoConstraintViolation {
	constructor() {
		return;
	}
}
//RangeConstraint class
class RangeConstraintViolation {
	constructor(message) {
		throw `RangeError: ${message}`;
	}
}
//PatternConstraint class
class PatternConstraintViolation {
	constructor(message) {
		throw `PatternError: ${message}`;
	}
}
//IntervalConstraint class
class IntervalConstraintViolation {
	constructor(message) {
		throw `IntervalError: ${message}`;
	}
}
//MandatoryValueConstraintViolation class
class MandatoryConstraintViolation {
	constructor(message) {
		throw `MandatoryError: ${message}`;
	}
}
//UniquenessConstraintViolation class
class UniquenessConstraintViolation {
	constructor(message) {
		throw `UniqueError: ${message}`;
	}
}
//RefferentialConstraintViolation class
class RefferentialConstraintViolation {
	constructor(message) {
		throw `RefferrenceError: ${message}`;
	}
}
//CardinalityConstraintViolation class
class CardinalityConstraintViolation {
	constructor(message) {
		throw `CardinalityError: ${message}`;
	}
}
//LengthConstraintViolation class
class LengthConstraintViolation {
	constructor(message) {
		throw `LengthError: ${message}`;
	}
}
//FrozenConstraintViolation class(for ineditable values)
class FrozenConstraintViolation {
	constructor(message) {
		throw `WriteError: ${message}`;
	}
}
