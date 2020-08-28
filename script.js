function convert(){
	// Pull filled Data
	var firstName = document.getElementById("fname").value
	var lastName = document.getElementById("sname").value
	if(document.getElementById('male').checked) {
		sex = document.getElementById('male').value
	} else if (document.getElementById('female').checked ) {
		sex = document.getElementById('female').value
	}
	var issueingState = document.getElementById("istate").value.toUpperCase();
	var nationality = document.getElementById("national").value.toUpperCase();
	var extraInfo = document.getElementById("einfo").value
	var pasportNumber = document.getElementById("pnum").value
	var dob = convertDates(document.getElementById("dob").value)
	var expirationDate = convertDates(document.getElementById("expire").value)
	// Name Manipulation
	var firstName = firstName.toUpperCase().replace(/'/g,'').replace(/[.*+?^${}()|[\]\\\s]/g,'<')
	var lastName = lastName.toUpperCase().replace(/'/g,'').replace(/[.*+?^${}()|[\]\\\s]/g,'<')


	// Calculations Passport Number
	var pnCalc1 = isPassportNumber(pasportNumber[0]) * 7
	var pnCalc2 = isPassportNumber(pasportNumber[1]) * 3
	var pnCalc3 = isPassportNumber(pasportNumber[2]) * 1
	var pnCalc4 = isPassportNumber(pasportNumber[3]) * 7
	var pnCalc5 = isPassportNumber(pasportNumber[4]) * 3
	var pnCalc6 = isPassportNumber(pasportNumber[5]) * 1
	var pnCalc7 = isPassportNumber(pasportNumber[6]) * 7
	var pnCalc8 = isPassportNumber(pasportNumber[7]) * 3
	var pnCalc9 = isPassportNumber(pasportNumber[8]) * 1
	var pnTotalCalc = pnCalc1 + pnCalc2 + pnCalc3 + pnCalc4 + pnCalc5 + pnCalc6 + pnCalc7 + pnCalc8 + pnCalc9
	var pnTotalCalcLast = String(pnTotalCalc)[String(pnTotalCalc).length - 1]

	// Calculations Date of Birth
	var dob = String(dob).replace(/-/g ,'').replace(/\//g , '')
	var dobCalc1 = dob[0] * 7
	var dobCalc2 = dob[1] * 3
	var dobCalc3 = dob[2] * 1
	var dobCalc4 = dob[3] * 7
	var dobCalc5 = dob[4] * 3
	var dobCalc6 = dob[5] * 1
	var dobTotalCalc = (dobCalc1 + dobCalc2 + dobCalc3 + dobCalc4 + dobCalc5 + dobCalc6 ) / 10
	var dobTotalCalcLast = String(dobTotalCalc)[String(dobTotalCalc).length - 1]

	// Calculations Expiration Date
	var expirationDate = String(expirationDate).replace(/-/g,'').replace(/\//g , '')
	var exCalc1 = expirationDate[0] * 7
	var exCalc2 = expirationDate[1] * 3
	var exCalc3 = expirationDate[2] * 1
	var exCalc4 = expirationDate[3] * 7
	var exCalc5 = expirationDate[4] * 3
	var exCalc6 = expirationDate[5] * 1
	var exCalcTotal = (exCalc1 + exCalc2 + exCalc3 + exCalc4 + exCalc5 + exCalc6 ) / 10 
	var exCalcTotalLast = String(exCalcTotal)[String(exCalcTotal).length - 1]

	// Final Calcuations
	var finalCalc = (parseFloat(pnTotalCalc) + parseFloat(pnTotalCalcLast) + parseFloat(dobTotalCalc) + parseFloat(dobTotalCalcLast) + parseFloat(exCalcTotal) + parseFloat(exCalcTotalLast)) 
	var finalCalcLast = String(finalCalc)[String(finalCalc).length - 1]

	// Final Output of MRZ
	var output = 'P<' + issueingState.toUpperCase() + lastName + '<' + firstName  + '<<<<<<<' + 
	'\n' + pasportNumber.toUpperCase() + pnCalc9 + pnTotalCalcLast + nationality + dob + dobTotalCalcLast + sex + expirationDate + exCalcTotalLast + '<<<<<<<' + finalCalcLast
	var mrzElement = document.getElementById("mrz");
	mrzElement.value= output;
}



function convertDates(date){
		return date[2] + date[3] + date[5] + date[6] + date[8] + date[9] 
}



function isPassportNumber(number) {
	if(Number.isNaN( parseInt(number) ) == false ) {
		return number
	}  else {
		return number.toLowerCase().charCodeAt(0) - 97 + 1 + 9
	}
}





function validateLetters(id){
	var element = document.getElementById(id);
	let matchLetters = /^[A-z]{3}$/
	textEntered =  document.getElementById(id).value 
	if (matchLetters.test(textEntered)){
		element.style.border = '1px solid #767676'
	} else {
		element.style.border =  '2px solid #FF0000'
	}

}