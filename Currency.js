function createTag(element, elementClass="",elementID=""){
    var tag = document.createElement(element);
    if(elementClass !== "")
    tag.setAttribute("class",elementClass);
    if(elementID !== "")
    tag.setAttribute("id",elementID);
    return tag;
}
async function callapi(){
    var resp = await fetch("https://v6.exchangerate-api.com/v6/74c180a08b30aa1bd7fb0dd5/codes");
    var data = await resp.json();   
    var currency = document.getElementById("currency");
    var currency1= document.getElementById("currency1");
    for(var i in data.supported_codes){
        var option = createTag("option","","option");
        option.setAttribute("value",data.supported_codes[i][0]);
        var option1 = createTag("option","","option1");
        option1.setAttribute("value",data.supported_codes[i][0]);
        option.innerHTML = `${data.supported_codes[i][0]} - ${data.supported_codes[i][1]}`;
        option1.innerHTML = `${data.supported_codes[i][0]} - ${data.supported_codes[i][1]}`;
        currency.append(option);
        currency1.append(option1);
    }
}

async function convertrate(){
    var fromcurr = document.querySelectorAll("#option");
    var fromcurrency="";
    var tocurr = document.querySelectorAll("#option1");
    var fromcurrency="";
    var amount = document.getElementById("amount").value;
    for(var i in fromcurr){
        if(fromcurr[i].selected){
            fromcurrency=fromcurr[i].value;
            break;
        }
    }
    for(var i in tocurr){
        if(tocurr[i].selected){
            tocurrency=tocurr[i].value;
            break;
        }
    }
    if(amount&&fromcurrency&&tocurrency){
        var res = await fetch(`https://v6.exchangerate-api.com/v6/74c180a08b30aa1bd7fb0dd5/pair/${fromcurrency}/${tocurrency}`);
        var items = await res.json();
        var conversion = items.conversion_rate;
        var result= (amount*conversion).toFixed(4);
        var update = document.getElementById("results");
        update.innerHTML = result;
    }
    else{
        alert("Please fill in all the details!");
    }
}
