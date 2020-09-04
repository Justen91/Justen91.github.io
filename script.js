function convert(){
	// Pull filled Data
	var firstName = document.getElementById("fname").value
	var lastName = document.getElementById("sname").value
	var sex = '';
	if(document.getElementById('male').checked) {
		sex = document.getElementById('male').value
	} else if (document.getElementById('female').checked ) {
		sex = document.getElementById('female').value
	}
	var issuingState = document.getElementById("istate").value.toUpperCase();
	var nationality = document.getElementById("national").value.toUpperCase();
	var extraInfo = document.getElementById("einfo").value
	var pasportNumber = document.getElementById("pnum").value
	var dob = convertDates(document.getElementById("dob").value)
	var expirationDate = convertDates(document.getElementById("expire").value)


	// Error validation, check if info is correctly filled out
	var errors = []
	var nonErrors = []
	if (firstName.length == 0 ) { errors.push( document.getElementById("fname") )									} else { nonErrors.push( document.getElementById("fname") )}
	if (lastName.length == 0 ) { errors.push( document.getElementById("sname") )									} else { nonErrors.push( document.getElementById("sname") )}
	if (sex.length == 0 ) { errors.push( document.getElementById("gender") )										} else { nonErrors.push( document.getElementById("istate") )}
	if (issuingState.length < 3 || issuingState.length > 3 ) { errors.push( document.getElementById("istate") )		} else { nonErrors.push( document.getElementById("national") )}
	if (nationality.length < 3 || nationality.length > 3) { errors.push( document.getElementById("national") )		} else { nonErrors.push( document.getElementById("pnum") )}
	if (pasportNumber.length < 7 || nationality.length > 9) { errors.push( document.getElementById("pnum") )		} else { nonErrors.push( document.getElementById("pnum") )}
	if (isNaN(dob) == true ) { errors.push( document.getElementById("dob") )										} else { nonErrors.push( document.getElementById("dob") )}
	if (isNaN(expirationDate) == true ) { errors.push( document.getElementById("expire") )							} else { nonErrors.push( ocument.getElementById("expire") )}


	console.log(errors)
	console.log(nonErrors)

	for (var i=0;i<nonErrors.length;i++){
		nonErrors[i].classList.remove("input_error");
		console.log(nonErrors[i])
	}

	for (var i=0;i<errors.length;i++){
		errors[i].classList.add("input_error");
	}	

	if(errors.length >= 1) {
		document.getElementById("mrz").value = "Errors found.\nPlease correct the issues above";
		return null
	}



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
	var nameOutput = lastName + '<' + firstName
	nameOutput = lengthStringValidation(nameOutput,39)

		// Extra Info
	var extraInfoOutput = extraInfo
	extraInfoOutput = lengthStringValidation(extraInfoOutput,14)

		// Passport Number
	var pasportNumberOutput = pasportNumber
	pasportNumberOutput = lengthStringValidation(pasportNumberOutput,9)


	// Final Output of MRZ
	var output = 'P<' + issuingState.toUpperCase() + nameOutput + '\n' + 
		pasportNumberOutput.toUpperCase() + pnTotalCalcLast + nationality + dob + dobTotalCalcLast + sex + expirationDate + exTotalCalcLast + extraInfoOutput.toUpperCase() + infoTotalCalcLast +finalTotalCalcLast
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


function lengthStringValidation(string, length) {
	var stringOutput = string
		while (stringOutput.length > length) {
		stringOutput = stringOutput.slice(0, -1);
	}
	while (stringOutput.length < length) {
		stringOutput = stringOutput + '<'
	}
	return stringOutput
}









function autocomplete(inp,arr){
	var currentFocus;
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		a = document.createElement("DIV");
      	a.setAttribute("id", this.id + "autocomplete-list");
      	a.setAttribute("class", "autocomplete-items");
      	this.parentNode.appendChild(a);
      	for (i = 0; i < arr.length; i++) {
      		if (arr[i]['alpha-3'].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
      			b = document.createElement("DIV");
		        /*make the matching letters bold:*/
		        b.innerHTML = "<strong>" + arr[i]['alpha-3'].substr(0, val.length) + "</strong>";
		        b.innerHTML += arr[i]['alpha-3'].substr(val.length);
		        var span = document.createElement("span");
		        var nameCountry = '';
		        if (arr[i]['name'].length <= 17) {
		        	nameCountry = arr[i]['name']
		        } else {
		        	nameCountry = arr[i]['name'].substr(0,17) + '..'
		        }
  				var spanNode = document.createTextNode('('+nameCountry+')');
		        span.setAttribute("class", "full_country");
		        span.appendChild(spanNode);
		        b.appendChild(span);
		        b.innerHTML += "<input type='hidden' value='" + arr[i]['alpha-3'] + "'>";
		        b.addEventListener("click", function(e) {
		            inp.value = this.getElementsByTagName("input")[0].value;
		            closeAllLists();
		          });
		          a.appendChild(b);

		          // Outside Box Click
		        window.addEventListener('click', function(e){   
				if (!inp.contains(e.target)){
					closeAllLists();}
				});
      		}
      	}
	});

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

}



var copyTextRunning = false 
function copyText(){
  var copyText = document.getElementById("mrz");
  copyText.select();
  document.execCommand("copy");


  if (copyTextRunning) {return  null}
  copyTextRunning = true
  previous_text = document.getElementById("copy_text")
  if(previous_text !== null){
  	previous_text.remove();
  }

  button = document.getElementById("copy_button")
  div = document.createElement('div');
  div.setAttribute("id","copy_text")
  div.style.opacity = 0;
  text = document.createTextNode('MRZ Code Copied!')
  div.appendChild(text);
  setTimeout(function(){ div.style.opacity = 1; }, 10);
  button.parentNode.insertBefore(div, button.nextSibling);
  setTimeout(function(){ div.style.opacity = 0; copyTextRunning=false }, 2500);
}


