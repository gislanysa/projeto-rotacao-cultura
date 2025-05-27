const mode = ["nome-email", "data-senha"];
let mode_aux = mode[0];

function nextForm()
{
    mode_aux = mode[1];

    const form1 = document.getElementById("form-inicial");
    form1.classList.remove("form-inicial");
    form1.classList.add("form-inicial-parse");

    const form2 = document.getElementById("form-final");
    form2.classList.remove("form-secun-backward");
    form2.classList.add("form-secun");
}

function backForm()
{
    mode_aux = mode[0];
    
    const form1 = document.getElementById("form-inicial");
    form1.classList.remove("form-inicial-parse");
    form1.classList.add("form-inicial");

    const form2 = document.getElementById("form-final");
    form2.classList.remove("form-secun");
    form2.classList.add("form-secun-backward");
}