const isValidMobilePhone = (mobileNumber) => {
  // Regex to check valid
  // International Phone Numbers
  let regex = new RegExp(
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
  );

  // if mobileNumber
  // is empty return false
  if (mobileNumber == null) {
    return false;
  }

  // Return true if the mobileNumber
  // matched the ReGex

  if (regex.test(mobileNumber) === true) {
    return true;
  } else {
    return false;
  }
};

const passwordOption = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
};

const passwordError = `Your password is not strong enough,It should be minimum ${
  passwordOption.minLength
} characters long, atleast ${passwordOption.minLowercase} lowercase ${
  passwordOption.minLowercase > 1 ? "characters" : "character"
},atleast ${passwordOption.minNumbers} ${
  passwordOption.minNumbers > 1 ? "numbers" : "number"
}, atleast ${passwordOption.minSymbols} ${
  passwordOption.minSymbols > 1 ? "symbols" : "symbol"
} and atleast ${passwordOption.minUppercase} uppercase ${
  passwordOption.minUppercase > 1 ? "characters" : "character"
}`;

module.exports = {
  isValidMobilePhone,
  passwordOption,
  passwordError,
};
