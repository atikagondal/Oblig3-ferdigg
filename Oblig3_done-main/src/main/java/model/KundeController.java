package model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class KundeController {

    @Autowired
    Repositorie rep;

    @PostMapping("/lagre")
    public void lagreKunde(Kunde kunde) {
        rep.lagreKunde(kunde);
    }

    @GetMapping("/visAlle")
    public List<Kunde> visAlle() {
        return rep.visAlleBilletter();
    }

    @PostMapping("/slettAlle")
    public void slettAlle() {
        rep.slettAlle();
    }

    @PostMapping("/sletten/{id}")
    public void sletten(@PathVariable int id) {
        rep.slett(id);

    }
    /*
    @PutMapping("/oppdater")
    public String oppdaterBillett(Kunde kunde){
//       billett billett =(student.getId());
//        stud.setName(student.getName());
//        stud.setUniversity(student.getUniversity());
//        stud.setAge(student.getAge());
        Repositorie.oppdaterBillett(kunde);
        return "updated";
    }

     */
}

/*
    @PutMapping("/oppdater/{id}")
    public String oppdaterBillett(Kunde kunde) {
        int rowsAffected = rep.oppdaterBillett(kunde);
        if (rowsAffected > 0) {
            return "updated";
        } else {
            return "update_failed";
        }
    }
}

 */


/*int rowsAffected = rep.oppdater(kunde);:
 Her utfører vi oppdateringsforespørselen til databasen gjennom rep.oppdater(kunde);.
 Metoden oppdater i Repositorie-klassen vil returnere antallet rader som ble påvirket av oppdateringsforespørselen.
 Dette antallet vil bli lagret i variabelen rowsAffected.
if (rowsAffected > 0) { return "updated"; }: Her sjekker vi om rowsAffected er større enn null.
 Dette betyr at en eller flere rader ble oppdatert i databasen.
 Hvis dette er tilfelle, returnerer vi strengen "updated" som respons.
 Dette indikerer at oppdateringen var vellykket.
I korte trekk: Hvis oppdateringsforespørselen lykkes,
 vil vi returnere "updated" som respons. Hvis ikke, vil vi håndtere det på en annen måte,
 for eksempel ved å returnere en feilmelding.
*/