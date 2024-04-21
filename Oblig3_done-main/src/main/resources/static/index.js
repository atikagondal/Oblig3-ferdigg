$(document).ready(function () {
    // Endre kjøp-knappens tekst og legg til en ny hendelseslytter for å utføre oppdateringen
    $("#kjopBillettBtn").click(function () {
        // Nullstill feilmelding før hver ny sjekk
        feilmelding = 0;
        // Sjekk alle inputfelter før kjøp av billett
        sjekkfornavn();
        sjekketternavn();
        sjekkAntall();
        sjekkTlf();
        sjekkEpost();
        sjekkfilm();
        kjopBillett();
    });

    // Legg til klikkfunksjon for slett alle billetter-knappen
    $("#slettAlleBiletterBtn").click(function () {
        slettAlleBilletter();
    });

    // Når siden lastes inn på nytt, slett alle billetter fra serveren
    slettAlleBilletter();
});


function visAlleBilletter() {
    // Utfør AJAX-forespørsel for å hente alle billetter
    $.get("/visAlle", function (data) {
        // Når dataene er mottatt, formater dem og vis dem på siden
        formaterBilletter(data);
    });
}

function slettAlleBilletter() {
    // Utfør AJAX-forespørsel for å slette alle billetter
    $.post("/slettAlle", function () {
        // Når alle billetter er slettet, oppdater listen over billetter
        TomUtAlleBilletter();
        visAlleBilletter();
    });
}

function TomUtAlleBilletter() {
    $("#film").val("Velg film her");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val(""); // Endret fra "#tlf" til "#telefonnr"
    $("#epost").val("");
}

function formaterBilletter(Billetter) {
    let ut = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th></th></tr>";
    for (let enbillett of Billetter) {
        ut += "<tr>";
        ut += "<td>" + enbillett.film + "</td><td>" + enbillett.antall + "</td><td>" + enbillett.fornavn + "</td><td>" + enbillett.etternavn + "</td><td>" + enbillett.telefonnr + "</td><td>" + enbillett.epost + "</td>";
        ut += "<td><button type='button' onclick='slettBillett(" + enbillett.id + ")'>Slett</button></td>";
        ut += "<td><button type='button' onclick='oppdaterBillett(" + enbillett.id + ")'>Oppdater</button></td>";
        ut += "</tr>";
        // console.log(enbillett.billettid)
    }

    // Oppdater HTML-elementet med ID-en "output" med den genererte tabellen
    $("#output").html(ut);
    TomUtAlleBilletter();
}

function slettBillett(id) {
    $.post(`/sletten/${id}`, function () {
        // Når alle billetter er slettet, oppdater listen over billetter
        visAlleBilletter();
    });
}

function oppdaterBillett(id) {
    // Send GET-forespørsel for å hente billetten med riktig ID
    $.get("/oppdater/" + id, function (data) {
        // Når dataen er mottatt, send den til serveren for oppdatering
        $.ajax({
            url: '/oppdater' + id, // inkluder ID-en i URL-en for PUT-forespørselen
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data), // Send hele billetten som JSON-data
            success: function (response) {
                // Behandle suksessresponsen her
                visAlleBilletter();
            },
            error: function (xhr, textStatus, errorThrown) {
                // Behandle feilen her
                console.error('Feil ved oppdatering av billett:', errorThrown);
            }
        });
    });
}

//Input valideringer
function sjekkfornavn() {
    let fornavn = $("#fornavn").val();
    if (fornavn === "" || !isNaN(fornavn)) {
        $("#feilFornavn").html("Skriv inn et fornavn hvis tomt");
        $("#fornavn").val("");
        feilmelding++;
    } else {
        $("#feilFornavn").html("");
    }
}

function sjekketternavn() {
    let etternavn = $("#etternavn").val();
    if (etternavn === "" || !isNaN(etternavn)) {
        $("#feilEtternavn").html("Skriv inn et etternavn hvis tomt");
        $("#etternavn").val("");
        feilmelding++;
    } else {
        $("#feilEtternavn").html("");
    }
}

function sjekkAntall() {
    let antall = $("#antall").val();
    if (antall <= 0 || isNaN(Number(antall))) {
        $("#feilAntall").html("Skriv inn antall hvis tomt eller bokstaver");
        $("#antall").val("");
        feilmelding++;
    } else {
        $("#feilAntall").html("");
    }
}

function sjekkTlf() {
    let telefonnr = $("#telefonnr").val();
    let telefonRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (!telefonnr || !telefonRegex.test(telefonnr)) {
        $("#feilTelefonnr").html("Skriv inn et gyldig telefonnummer");
        $("#telefonnr").val(""); // Tøm feltet
        feilmelding++;
    } else {
        $("#feilTelefonnr").html("");
    }
}

function sjekkEpost() {
    let epost = $("#epost").val();
    let epostRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!epost || !epostRegex.test(epost)) {
        $("#feilEpost").html("Skriv inn en gyldig epostadresse");
        $("#epost").val(""); // Tøm feltet
        feilmelding++;
    } else {
        $("#feilEpost").html("");
    }
}

function sjekkfilm() {
    let film = $("#film").val();
    if (film === "Velg film her") {
        $("#feilValg").html("Velg en film");
        feilmelding++;
    } else {
        $("#feilValg").html("");
    }
}

function kjopBillett() {
    // Sjekk om det er feil før kjøp av billett
    if (feilmelding === 0) {
        let etternavn = $("#etternavn").val();
        let fornavn = $("#fornavn").val();
        let antall = $("#antall").val();
        let telefonnr = $("#telefonnr").val();
        let film = $("#film").val();
        let epost = $("#epost").val();

        // Lag en Billett-objekt
        const Billett = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefonnr: telefonnr,
            epost: epost
        };
        /*
                $.post("/oppdater",Billett, function () {
                    // Når alle billetter er slettet, oppdater listen over billetter
                    visAlleBilletter();
                });

         */


        // Utfør AJAX-postforespørsel for å kjøpe billett
        $.post("/lagre", Billett, function () {
            // Når billetten er kjøpt, oppdater listen over billetter
            visAlleBilletter();
        });

        /*Funksjon for å slette en enkelt billett
        function slettBillett(billettId) {
            $.post("/slett", { billettId: billettId }, function () {
                visAlleBilletter(); // Oppdater listen etter sletting
            });
        }

        // Funksjon for å oppdatere en billett
        function oppdaterBillett(billettId) {
            visAlleBilletter();
        }

         */


    }
}
