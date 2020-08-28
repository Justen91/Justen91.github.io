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
	var pnArray = [];
	for (var i=0 ; i < String(pasportNumber).length;i++) { 
		pnArray.push( parseInt( isPassportNumber( String(pasportNumber)[i] )) ) 
	}
	var pnTotalArray = checkDigit(pnArray);
	var pnTotalCalc = addArray(pnTotalArray)
	var pnTotalCalcLast = String(pnTotalCalc)[String(pnTotalCalc).length - 1]


	// Calculations Date of Birth
	var dob = String(dob).replace(/-/g ,'').replace(/\//g , '')
	var dobArray = [];
	for (var i=0 ; i < String(dob).length;i++) { 
		dobArray.push( parseInt(  String(dob)[i] ) ) 
	}
	var dobTotalArray = checkDigit(dobArray);
	var dobTotalCalc = addArray(dobTotalArray)
	var dobTotalCalcLast = String(dobTotalCalc)[String(dobTotalCalc).length - 1]



	// Calculations Expiration Date
	var expirationDate = String(expirationDate).replace(/-/g ,'').replace(/\//g , '')
	var exArray = [];
	for (var i=0 ; i < String(expirationDate).length;i++) { 
		exArray.push( parseInt(  String(expirationDate)[i] ) ) 
	}
	var exTotalArray = checkDigit(exArray);
	var exTotalCalc = addArray(exTotalArray)
	var exTotalCalcLast = String(exTotalCalc)[String(exTotalCalc).length - 1]


	// Calculations Extra Info
	var infoArray = [];
	for (var i=0 ; i < String(extraInfo).length;i++) { 
		infoArray.push( parseInt( isPassportNumber( String(extraInfo)[i] )) ) 
	}
	var infoTotalArray = checkDigit(infoArray);
	var infoTotalCalc = addArray(infoTotalArray)
	var infoTotalCalcLast = String(infoTotalCalc)[String(infoTotalCalc).length - 1]



	// Final Calculations
	var finalString = String(pasportNumber) + String(pnTotalCalcLast) + String(dob) + String(dobTotalCalcLast) + String(expirationDate) + String(exTotalCalcLast) + String(extraInfo) + String(infoTotalCalcLast)
	var finalArray = [];
	for (var i=0 ; i < String(finalString).length;i++) { 
		finalArray.push( parseInt( isPassportNumber( String(finalString)[i] )) ) 
	}
	var finalTotalArray = checkDigit(finalArray);
	var finalTotalCalc = addArray(finalTotalArray)
	var finalTotalCalcLast = String(finalTotalCalc)[String(finalTotalCalc).length - 1]




	// Determining Length 
		// Name
	nameOutput = lastName + '<' + firstName
	while (nameOutput.length > 39) {
		nameOutput = nameOutput.slice(0, -1);
	}

	while (nameOutput.length < 39) {
		nameOutput = nameOutput + '<'
	}

		// Extra Info
	extraInfoOutput = extraInfo
	while (extraInfoOutput.length > 14) {
		extraInfoOutput = extraInfoOutput.slice(0, -1);
	}

	while (extraInfoOutput.length < 14) {
		extraInfoOutput = extraInfoOutput + '<'
	}



	// Final Output of MRZ
	var output = 'P<' + issueingState.toUpperCase() + nameOutput + '\n' + 
		pasportNumber.toUpperCase() + pnTotalCalcLast + nationality + dob + dobTotalCalcLast + sex + expirationDate + exTotalCalcLast + extraInfoOutput.toUpperCase() + infoTotalCalcLast +finalTotalCalcLast
	var mrzElement = document.getElementById("mrz");
	mrzElement.value= output;


}



function convertDates(date){
		return date[2] + date[3] + date[5] + date[6] + date[8] + date[9] 
}



function isPassportNumber(number) {
	if (number == undefined ) {
		return '0'
	} else if(Number.isNaN( parseInt(number) ) == false ) {
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



function checkDigit(arrayList){
	var outputArray = [];
	for (var i = 0; i < arrayList.length; i++) {
		if (i % 3 == 2) {
			outputArray.push ( arrayList[i] * 1)
		} else if ( i % 3 == 1) {
			outputArray.push ( arrayList[i] * 3)
		} else {
			outputArray.push ( arrayList[i] * 7)
		}
	}
	return outputArray
}



function addArray(arrayList) {
	var output = 0; 
	for (var i = 0; i< arrayList.length ; i++) {
		output = output + arrayList[i]
	}
	return output;
}