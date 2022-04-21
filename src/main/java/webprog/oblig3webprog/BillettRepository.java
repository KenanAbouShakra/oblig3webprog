package webprog.oblig3webprog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Repository
public class BillettRepository {
    @Autowired
    private JdbcTemplate db;

    public void lagreBillett(Billett b) {
        String sql = "INSERT INTO Billetter(film, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, b.getFilm(), b.getAntall(), b.getFornavn(), b.getEtternavn(), b.getTelefonnr(), b.getEpost());
    }
    class BilletterComparator implements Comparator<Billett> {
        @Override
        public int compare(Billett b1, Billett b2) {
            int diff = b1.getEtternavn().compareTo(b2.getEtternavn());
            if (diff == 0) {
                diff = b1.getFornavn().compareTo(b2.getFornavn());
            }
            return diff;
        }
    }
    public List<Billett> hentBillettene() {
        String sql = "SELECT * FROM Billetter ORDER BY etternavn";
        List<Billett> allebillettene = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        allebillettene.sort(new BilletterComparator());
        return allebillettene;
    }

    public void slettAlleBillettene() {
        String sql = "DELETE FROM Billetter";
        db.update(sql);
    }
}

