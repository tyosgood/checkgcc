function getGCC(){
let site = document.getElementById("site").value
fetch('https://login.windows.net/'+site+'/.well-known/openid-configuration')
    // Handle success
    //.then(response => render(response))
    .then(response => response.json())  // convert to json
    .then(json => render(json, site))   //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

function render(response, site){
    
    document.getElementById("result_title").innerHTML = "Results for "+site
    document.getElementById("dod_logo").style.display = "none";
    document.getElementById("fedramp_logo").style.display = "none";
    if (response.error){
         document.getElementById("parsed_response").innerHTML = "Error: "+response.error
         document.getElementById("response_detail").innerHTML = response.error_description
    }
    else if (response.tenant_region_sub_scope === undefined ){
        document.getElementById("parsed_response").innerHTML = "Not GCC / FedRAMP"
        document.getElementById("response_detail").innerHTML = site+" is not a GCC / FedRAMP tenant. It is a commercial tenant in the "+ response.tenant_region_scope +" region."
    }
    else if (response.tenant_region_sub_scope == 'GCC'){
        document.getElementById("parsed_response").innerHTML = "GCC Moderate / FedRAMP Moderate"
        document.getElementById("response_detail").innerHTML = site+" is a GCC Moderate / FedRAMP Moderate tenant."
        document.getElementById("fedramp_logo").style.display = "block";
    }
    else if (response.tenant_region_sub_scope == 'DODCON'){
        document.getElementById("parsed_response").innerHTML = "GCC High / FedRAMP High"
        document.getElementById("response_detail").innerHTML = site+" is a GCC High / FedRAMP High tenant."
        document.getElementById("fedramp_logo").style.display = "block";
    }
    else if (response.tenant_region_sub_scope == 'DOD'){
        document.getElementById("parsed_response").innerHTML = "Department of Defense (DoD)"
        document.getElementById("response_detail").innerHTML = site+" is a Department of Defense (DoD) tenant."
        document.getElementById("dod_logo").style.display = "block";
    }
    else{
        document.getElementById("parsed_response").innerHTML = "Unknown"
        document.getElementById("response_detail").innerHTML = site+" is an unknown type tenant - check details."
    }
   
    document.getElementById("results").style.display = "block";

    //document.getElementById("parsed_response").innerHTML += "<h2> Region: "+ response.tenant_region_scope +"</h2><BR><h2> Region Sub Scope:"+response.tenant_region_sub_scope+"</h2>";
    document.getElementById("raw_json").innerHTML = "<pre>"+JSON.stringify(response, null, 2) +"</pre>"
    document.getElementById("json_toggle").style.display = "block";


}
