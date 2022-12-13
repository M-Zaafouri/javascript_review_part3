function userForm() {
    let lname = document.getElementById('lname').value;
    let fname = document.getElementById('fname').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('Address').value;
    let city = document.getElementById('City').value;
    let province = document.getElementById('Province').value;
    let membership;

    if (document.getElementById('Premium').checked) {
        membership = document.getElementById('Premium').value;
    } else {
        if (document.getElementById('Standard').checked) {
            membership = document.getElementById('Standard').value;
        }
    else if (document.getElementById('Basic').checked) {
        membership = document.getElementById('Basic').value;
    }
    }

    if (document.getElementById("p-output") == null) {
        let p = document.createElement('p');
        p.id = "p-output";
        p.innerHTML = "<br>" + 'Full Name: ' +lname + ' ' +  fname + "<br>" + 'Email: ' + email +   "<br>" + 'Address: ' + address + "<br>" + 'City: ' + city + "<br>" + 'Province: ' +province+ "<br>" + 'Membership: ' +membership;
        document.getElementById('output').appendChild(p);
    } else {
        document.getElementById('p-output').innerHTML= "<br>" + 'Full Name: ' +lname + ' ' +  fname + "<br>" + 'Email: ' + email +   "<br>" + 'Address: ' + address + "<br>" + 'City: ' + city + "<br>" + 'Province: ' +province+ "<br>" + 'Membership: ' +membership;
    }
}

if (document.location.pathname.endsWith("excel.html")) {
    document.getElementById("Phnumber").addEventListener("keydown", function (event) { if (event.key === "Enter") MyExcelFuns() })
}

/*this function turns the typed string into an array of numbers*/

function StringtoArray(Phnumber) {
    let numberStr = document.getElementById(Phnumber).value
    let numberArr = numberStr.split(" ")
    let numbers = []
    numberArr.forEach(element => {
        if (element != null && element !== "") {
            let number = Number(element)
            if (!isNaN(number)) {
                numbers.push(number)
            }
        }
    })
    return numbers;
}

function IsValid(Phnumber) {
    let inputStr = document.getElementById(Phnumber).value
    let inputArr = inputStr.split("")
    let regexArray = ['0','1','2','3','4','5','6','7','8','9',' ','.',',']

    inputArr.forEach(character => {
        if (!matchInArray(character, regexArray)) {
            return false
        }
    })

    let numbers = StringtoArray(Phnumber)
    return numbers.length > 0;
}

/* this function wil be used to detect which calculation we will be doing*/
function MyExcelFuns() {

    if (IsValid('Phnumber')) {
        resetErrorsExcel()

        let nbr = StringtoArray('Phnumber')
        let result

        if (document.getElementById("AutoSum").checked) {
            result = autoSum(nbr)
        } else if (document.getElementById("Average").checked) {
            result = average(nbr)
        } else if (document.getElementById("Max").checked) {
            result = max(nbr)
        } else if (document.getElementById("Min").checked) {
            result = min(nbr)
        } else {
            result = "No option was picked"
        }
        document.getElementById("Result").value = result
    } else {
        displayErrorsExcel()
    }
}
function IsValidDisplay(Phnumber) {
    if (IsValid(Phnumber)) {
        resetErrorsExcel()
    } else {
        displayErrorsExcel()
    }
}


function matchInArray(string, array) {

    for (let i = 0; i < array.length; i++) {
        if (string.match(array[i])) {
            return true
        }
    }
    return false
}

/*Here we check if the user inputs valid numbers*/
function displayErrorsExcel() {
    document.getElementById("Phnumber").classList.add("error-input")
    document.getElementById("Result").value = "Please put a valid input"
}

function resetErrorsExcel() {
    document.getElementById("Phnumber").classList.remove("error-input")
}


/* After this point we will write the functions used for the 4 different calculations*/



function autoSum(array) {
    let sum = 0
    array.forEach(element => {
        sum = sum+element
    });
    return sum
}



function average(array) {
    let sum = 0
    let length = 0
    array.forEach(element => {
        sum = sum + element
        length++
    });
    return sum/length
}



function max(array) {
    return Math.max(...array)
}



function min(array) {
    return Math.min(...array)
}
