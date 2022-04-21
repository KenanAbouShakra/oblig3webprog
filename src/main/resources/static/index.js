$(function () {
    hentAlle();
})

function kjopbillett() {
    let bol = true;
    const billett = {
        film: $("#velgFilm").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonNr").val(),
        epost: $("#epost").val()
    }
    if (billett.film === "") {
        $("#nullFilm").html(" Må velge en film");
        bol = false;
    } else {
        $("#nullFilm").html("");
    }
    if (billett.antall === "") {
        $("#nullAntall").html(" Må skrive noe inn i antall");
        bol = false;
    } else {
        $("#nullAntall").html("");
    }
    if (billett.fornavn === "") {
        bol = false;
        $("#nullFornavn").html(" Må skrive noe inn i fornavn");
    } else {
        $("#nullFornavn").html("");
    }
    if (billett.etternavn === "") {
        bol = false;
        $("#nullEtternavn").html(" Må skrive noe inn i etternavn");
    } else {
        $("#nullEtternavn").html("");
    }
    if (billett.telefonnr === "") {
        bol = false;
        $("#nullTelefonnr").html(" Må skrive noe inn i telefonnr");
    } else if (isNaN(billett.telefonnr)) {
        bol = false;
        $("#telefonNr").val("");
        $("#nullTelefonnr").html(" Må skrive riktig telefonummer inn i telefonnr");
    } else {
        $("#nullTelefonnr").html("");
    }
    if (billett.epost === "") {
        bol = false;
        $("#nullEpost").html(" Må skrive noe inn i epost");
    } else {
        $("#nullEpost").html("")
    }
    if (bol) {
        $.post("/lagre", billett, function () {
            hentAlle();
        });
        $("#velgFilm").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonNr").val("");
        $("#epost").val("");

    }
}

function hentAlle() {
    $.get("/hentAlle", function (data) {
        formaterData(data);
    });
}

function formaterData(billetter) {
    let ut = "<table><tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Telefonnr</th>" +
        "<th>Epost</th>" +
        "</tr>";
    for (const billett of billetter) {
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td><td>" + billett.etternavn +
            "</td><td>" + billett.telefonnr +
            "</td><td>" + billett.epost + "</td></tr>";
    }
    ut += "</table>"
    $("#output").html(ut);
}

function slett() {
    $.get("/slettAlle", function () {
        hentAlle();
    });
    $("#velgFilm").val("");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonNr").val("");
    $("#epost").val("");

    $("#nullFilm").html("");
    $("#nullAntall").html("");
    $("#nullFornavn").html("");
    $("#nullEtternavn").html("");
    $("#nullTelefonnr").html("");
    $("#nullEpost").html("");
    $("#output").html("");
}