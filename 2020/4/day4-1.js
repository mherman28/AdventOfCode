const fs = require('fs');

class Passport {
    isValid() {
        return !!this.byr && !!this.iyr && !!this.eyr && !!this.hgt
            && !!this.hcl && !!this.ecl && !!this.pid
    }
}

try {
    const data = fs.readFileSync('input', 'utf8');
    const fileRows = data.split('\n');
    const result = processFileRows(fileRows);
    console.info('Result: ' + result);
} catch (e) {
    console.error('Error:', e.stack);
}

function deserializePassport(serializedPassport) {
    const fields = serializedPassport.split(" ");
    const passport = new Passport();
    fields.forEach(field => {
       const [key, value] = field.split(":");
       passport[key] = value;
    });
    return passport;
}

function processFileRows(rows) {
    const passports = [];
    let passportRows = [];
    for (let i=0; i < rows.length+1; i++) {
        if (i >= rows.length || rows[i].length === 0) {
            passports.push(deserializePassport(passportRows.join(" ")));
            passportRows.length = 0;
        } else {
            passportRows.push(rows[i]);
        }
    }

    return passports.filter(passport => passport.isValid()).length;
}