const fs = require('fs');

class Passport {

    isValid() {
        try {
            return this.hasValidByr() && this.hasValidEcl() && this.hasValidEyr() && this.hasValidHcl()
                && this.hasValidIyr() && this.hasValidHgt() && this.hasValidPid();
        } catch(e) {
            return false;
        }
    }

    hasValidByr() {
        return !!this.byr && 1920 <= parseInt(this.byr) && parseInt(this.byr) <= 2002;
    }

    hasValidIyr() {
        return !!this.iyr && 2010 <= parseInt(this.iyr) && parseInt(this.iyr) <= 2020;
    }

    hasValidEyr() {
        return !!this.eyr && 2020 <= parseInt(this.eyr) && parseInt(this.eyr) <= 2030;
    }

    hasValidHgt() {
        if (!this.hgt) {
            return false;
        }
        const matches = this.hgt.match(/^(\d+)(cm|in)$/);
        if (!matches) {
            return false;
        } else if (matches[2] === 'cm') {
            return 150 <= matches[1] && matches[1] <= 193;
        } else {
            return 59 <= matches[1] && matches[1] <= 76;
        }
    }

    hasValidHcl() {
        return !!this.hcl && this.hcl.match(/^#[0-9a-f]{6}$/);
    }

    hasValidEcl() {
        return !!this.ecl && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(this.ecl);
    }

    hasValidPid() {
        return !!this.pid && this.pid.match(/^[0-9]{9}$/);
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