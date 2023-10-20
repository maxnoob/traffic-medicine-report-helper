$(document).ready(function() {

/* import $ from ‘jquery’; */
    // -------------------------- Create sliders-------------------------------------

    const psrSlider = document.getElementById('psrSlider');
    const bsrSlider = document.getElementById('bsrSlider');
    const asrSlider = document.getElementById('asrSlider');
    const tsrSlider = document.getElementById('tsrSlider');
    const psrValue = document.getElementById('psrValue');
    const bsrValue = document.getElementById('bsrValue');
    const asrValue = document.getElementById('asrValue');
    const tsrValue = document.getElementById('tsrValue');
    const psrLabels = ["-", "-/+", "+", "++", "+++"];
    const bsrLabels = ["-", "-/+", "+", "++", "+++"];
    const asrLabels = ["-", "-/+", "+", "++", "+++"];
    const tsrLabels = ["-", "-/+", "+", "++", "+++"];
    
    // Event-Listener for changes in the slider value
    psrSlider.addEventListener('input', function() {
    const value = psrSlider.value;
    psrValue.textContent = psrLabels[parseInt(value) + 3]; // Adjust index
        });
    bsrSlider.addEventListener('input', function() {
    const value = bsrSlider.value;
    bsrValue.textContent = bsrLabels[parseInt(value) + 3]; // Adjust index
        });
    asrSlider.addEventListener('input', function() {
    const value = asrSlider.value;
    asrValue.textContent = asrLabels[parseInt(value) + 3]; // Adjust index
        });
    tsrSlider.addEventListener('input', function() {
    const value = tsrSlider.value;
    tsrValue.textContent = tsrLabels[parseInt(value) + 3]; // Adjust index
        });

    // -------------------------- Create radio buttons -------------------------------------
    // Generate the radio buttons for gender      
    const genders = ['m', 'f'];
    const gender = document.querySelector("#gender"); // maps to html object
    gender.innerHTML = `<label>Geschlecht:</label>`
    gender.innerHTML += genders.map((gender) => `<div>
            <input type="radio" name="gender" value="${gender}" id="${gender}_input" ">
                <label for="${gender}">${gender}</label>
        </div>`).join(' ');

    // Generate the radio buttons for 'Sehvermögen' - Doppelbilder
    const cb_double_vision = document.querySelector("#double_vision");
    cb_double_vision.innerHTML = `<label>Doppelbilder:</label>
        <input type="radio" name="double_vision" value="nein" id="double_vision_nein"> nein \u00A0\u00A0\u00A0
        <input type="radio" name="double_vision" value="ja" id="double_vision_ja"> ja`;

        
    // Generate the radio buttons for general condition
    const az = document.querySelector("#az"); // maps to html object
    az.innerHTML = `<label>Allgemeinzustand:</label> <div>
            <input type="radio" name="az" value="erhalten" id="erhalten" checked="true"">
            <label for="erhalten">erhalten</label>
        </div>
        <div>
            <input type="radio" name="az" value="reduziert" id="reduziert"">
            <label for="reduziert">reduziert</label>
        </div>`

    // Generate the radio buttons for hearing aid
    const h_aid = document.querySelector("#h_aid"); // maps to html object
    h_aid.innerHTML = `<label>Hörgerät:\u00A0\u00A0</label> 
            <input type="radio" name="h_aid" value="rechts" id="rechts" checked="true"">
            <label for="rechts">rechts</label>
            <input type="radio" name="h_aid" value="links" id="links"">
            <label for="links">links</label>
        <input type="radio" name="h_aid" value="beidseits" id="beidseits"">
        <label for="beidseits">beidseits</label>`
        
    // Generate the radio buttons for visual field       
    const vis_field_degrees = {120: '≥ 120 Grad', 140: '≥ 140 Grad', 'nev': 'nicht erfüllt (horizontale Ausdehnung < 120 Grad)'};
    const vis_field = document.querySelector("#vis_field"); // maps to html object
    vis_field.innerHTML = `<label>Horizontales Gesichtsfeld:</label>`
    for (var x in vis_field_degrees) {
        vis_field.innerHTML += `<div>
            <input type="radio" name="vis_field" value="${x}" id="${x}" ">
            <label for="${x}">${vis_field_degrees[x]}</label>
        </div>`
    }

    // Generate the radio buttons for general condition
    const bigtoe = document.querySelector("#bigtoe"); // maps to html object
    bigtoe.innerHTML = `<label>Lagesinn Grosszehe:</label> <div>
            <input type="radio" name="bigtoe" value="erhalten" id="erhalten" ">
            <label for="erhalten">erhalten</label>
        </div>
        <div>
            <input type="radio" name="bigtoe" value="nicht erhalten" id="nicht erhalten"">
            <label for="nicht erhalten">nicht erhalten</label>
        </div>`

    // Radio buttons for vision aid
    const vision_aid = document.querySelector("#vision_aid"); // maps to html object
    vision_aid.innerHTML = `<label>Sehhilfe:</label> <div>
            <input type="radio" name="vision_aid" value="Brille" id="Brille" ">
            <label for="Brille">Brille</label>
        </div>
        <div>
            <input type="radio" name="vision_aid" value="Kontaktlinsen" id="Kontaktlinsen"">
            <label for="Kontaktlinsen">Kontaktlinsen</label>
        </div>`

    // Radio buttons for nystagmus
    const nystag = document.querySelector("#nystag");
    nystag.innerHTML = `<label>Nystagmus:\u00A0\u00A0</label> 
        <input type="radio" name="nystag" value="nein" id="nystag_nein"> nein \u00A0\u00A0\u00A0
        <input type="radio" name="nystag" value="ja" id="nystag_ja"> ja`;

    // Radio buttons for eye motility
    const eye_motility = document.querySelector("#eye_motility");
    eye_motility.innerHTML = `<label>Augenmotilität:\u00A0\u00A0</label> 
        <input type="radio" name="eye_motility" value="erhalten" id="eye_motility_erh"> erhalten \u00A0\u00A0\u00A0
        <input type="radio" name="eye_motility" value="gestört" id="eye_motility_gest"> gestört`;
 

    // Radio buttons for lang-stereo-test
    const lang_stereo = document.querySelector("#lang_stereo");
    lang_stereo.innerHTML = `<label>Lang-Stereo-Test:\u00A0\u00A0</label> 
        <input type="radio" name="lang_stereo" value="positiv" id="lang_stereo_pos"> positiv \u00A0\u00A0\u00A0
        <input type="radio" name="lang_stereo" value="negativ" id="lang_stereo_neg"> negativ`;

    // Radio buttons for heart auscultation
    const heart_auscultation = document.querySelector("#heart_auscultation");
    heart_auscultation.innerHTML = `<label>Herztöne, Herzgeräusche:\u00A0\u00A0</label> 
        <input type="radio" name="heart_auscultation" value="normal" id="heart_auscultation_normal"> normal, keine \u00A0\u00A0\u00A0
        <input type="radio" name="heart_auscultation" value="auffällig" id="heart_auscultation_sus"> auffällig`;

    // Radio buttons for lang-stereo-test
    const carotis = document.querySelector("#carotis");
    carotis.innerHTML = `<label>Strömungsgeräusche über den Karotiden:\u00A0\u00A0</label> 
        <input type="radio" name="carotis" value="keine" id="carotis_keine"> keine \u00A0\u00A0\u00A0
        <input type="radio" name="carotis" value="negativ" id="carotis_vorhanden"> vorhanden`;

   // Radio buttons for substances
   const foetor = document.querySelector("#foetor");
   foetor.innerHTML = `<label>Foetor aethylicus:\u00A0\u00A0</label> 
   <input type="radio" name="foetor" value="ja" id="foetor_ja"> ja \u00A0\u00A0\u00A0
       <input type="radio" name="foetor" value="nein" id="foetor_nein"> nein`;
   const face_erythem = document.querySelector("#face_erythem");
   face_erythem.innerHTML = `<label>Gesichtserythem:\u00A0\u00A0</label> 
   <input type="radio" name="face_erythem" value="ja" id="face_erythem_ja"> ja \u00A0\u00A0\u00A0
       <input type="radio" name="foetor" value="nein" id="face_erythem_nein"> nein`;
    const spider_naevi = document.querySelector("#spider_naevi");
    spider_naevi.innerHTML = `<label>Spider naevi:\u00A0\u00A0</label> 
    <input type="radio" name="spider_naevi" value="ja" id="spider_naevi_ja"> ja \u00A0\u00A0\u00A0
        <input type="radio" name="spider_naevi" value="nein" id="spider_naevi_nein"> nein`;
    const marks = document.querySelector("#marks");
    marks.innerHTML = `<label>Einstichstelle:\u00A0\u00A0</label> 
    <input type="radio" name="marks" value="ja" id="marks_ja"> ja \u00A0\u00A0\u00A0
        <input type="radio" name="marks" value="nein" id="marks_nein"> nein`;
    const ikterus = document.querySelector("#ikterus");
    ikterus.innerHTML = `<label>Ikterus:\u00A0\u00A0</label> 
    <input type="radio" name="ikterus" value="ja" id="ikterus_ja"> ja \u00A0\u00A0\u00A0
        <input type="radio" name="ikterus" value="nein" id="ikterus_nein"> nein`;
    const palmar_erythem = document.querySelector("#palmar_erythem");
    palmar_erythem.innerHTML = `<label>Palmarerythem:\u00A0\u00A0</label> 
    <input type="radio" name="palmar" value="ja" id="palmar_ja"> ja \u00A0\u00A0\u00A0
        <input type="radio" name="palmar" value="nein" id="palmar_nein"> nein`;
    const septum = document.querySelector("#septum");
    septum.innerHTML = `<label>Nasenscheidewand:\u00A0\u00A0</label> 
    <input type="radio" name="septum" value="ja" id="septum_ja"> ja \u00A0\u00A0\u00A0
        <input type="radio" name="septum" value="nein" id="septum_nein"> nein`;
    const scar_road = document.querySelector("#scar_road");
    scar_road.innerHTML = `<label>Narbenstrasse:\u00A0\u00A0</label> 
    <input type="radio" name="scar_road" value="ja" id="scar_road_ja"> ja \u00A0\u00A0\u00A0
        <input type="radio" name="scar_road" value="nein" id="scar_road_nein"> nein`;

    // Radio buttons for brain functionality
    const neurocognitivity = document.querySelector("#neurocognitivity");
    neurocognitivity.innerHTML = `<label>Neurokognitiv unauffällig:\u00A0\u00A0</label> 
    <input type="radio" name="neurocognitivity" value="ja" id="neurocognitivity_ja"> ja \u00A0\u00A0\u00A0
       <input type="radio" name="neurocognitivity" value="nein" id="neurocognitivity_nein"> nein (neuropsychologische Kurztests durchführen)`;
    const mini_mental = document.querySelector("#mini_mental");
    mini_mental.innerHTML = `<label>Mini-Mental-Test:\u00A0\u00A0</label> 
    <input type="radio" name="mini_mental" value="nein" id="mini_mental_nein"> nein \u00A0\u00A0\u00A0
        <input type="radio" name="mini_mental" value="ja" id="mini_mental_ja"> ja (siehe beiliegendes Formular)`;
    const clock_test = document.querySelector("#clock_test");        
    clock_test.innerHTML = `<label>Uhren-Test:\u00A0\u00A0</label> 
        <input type="radio" name="clock_test" value="nein" id="clock_test_nein"> nein \u00A0\u00A0\u00A0
        <input type="radio" name="clock_test" value="ja" id="clock_test_ja"> ja (siehe beiliegendes Formular)`;
    const trail_test = document.querySelector("#trail_test");        
    trail_test.innerHTML = `<label>Trail-Making-Test:\u00A0\u00A0</label> 
    <input type="radio" name="trail_test" value="nein" id="trail_test_nein"> nein \u00A0\u00A0\u00A0
        <input type="radio" name="trail_test" value="ja" id="trail_test_ja"> ja (siehe beiliegendes Formular)`;
    
    // -------------------------- Create checkboxes -------------------------------------
    const cb_measured = document.querySelector("#measured");
    cb_measured.innerHTML = '<input type="checkbox" id="cb_measured"> gemessen';
    const cb_pulse_reg = document.querySelector("#pulse_reg");
    cb_pulse_reg.innerHTML = '<input type="checkbox" id="cb_pulse_reg"> regelm.';
    const cb_hearing_3m = document.querySelector("#hearing_3m");
    cb_hearing_3m.innerHTML = '<label>Konversationssprache:\u00A0\u00A0</label> <input type="checkbox" id="cb_hearing_3m"> 3 m beidseits';
    const cb_weber_rinne = document.querySelector("#weber_rinne");
    cb_weber_rinne.innerHTML = '<input type="checkbox" id="cb_weber_rinne"> Weber- und Rinne-Test durchgeführt';
    const cb_vision_aid_present = document.querySelector("#vision_aid_present");
    cb_vision_aid_present.innerHTML = '<input type="checkbox" id="cb_vision_aid_present"> Sehhilfe vorhanden';
    const cb_heart_device = document.querySelector("#cb_heart_device");
    cb_heart_device.innerHTML = '<label>Kardiale Devices:\u00A0\u00A0</label> <input type="checkbox" id="pacemaker"> Pacemaker <input type="checkbox" id="icd"> ICD <input type="checkbox" id="crt_d"> CRT-D';
    const cb_diabetic_device = document.querySelector("#cb_diabetic_device");
    cb_diabetic_device.innerHTML = '<label>Diabetes-Devices:\u00A0\u00A0</label> <input type="checkbox" id="cgm"> CGM <input type="checkbox" id="fmg"> FMG <input type="checkbox" id="pump"> Pumpe'; 
    const cb_weber = document.querySelector("#weber");
    cb_weber.innerHTML = '<label>Weber-Test:\u00A0\u00A0\u00A0</label><input type="checkbox" id="cb_weber_mittig"> mittig \u00A0\u00A0\u00A0<input type="checkbox" id="cb_weber_re"> rechts lateralisiert\u00A0\u00A0\u00A0 <input type="checkbox" id="cb_weber_li"> links lateralisiert';
    
    // Generate Rinne boxes (TODO: create loop)
    const cb_rinne = document.querySelector("#rinne");
    cb_rinne.innerHTML = '<label>Rinne-Test:\u00A0\u00A0\u00A0</label><input type="checkbox" id="cb_rinne_pos_re"> positiv rechts \u00A0\u00A0\u00A0<input type="checkbox" id="cb_rinne_neg_re"> negativ rechts \u00A0\u00A0\u00A0<input type="checkbox" id="cb_rinne_pos_li"> positiv links \u00A0\u00A0\u00A0<input type="checkbox" id="cb_rinne_neg_li"> negativ links';

    
    // ---------------------------- Create input fields --------------------------------
    // Birthday input field
    const birthdate_field = document.querySelector('#birthdate')
    birthdate_field.innerHTML = '<div class="field"><label for="birthdate">Geburtsdatum:</label><input type="date" class="form-control" id="birthdate_input" name="birthdate"></input></div>';
    document.getElementById("birthdate_input").addEventListener('change', calcAge); // TODO only display age if date within range -> REGEX
    let calculated_age;
    function calcAge() {
        const age_field = document.querySelector('#age')
        calculated_age = getAge(document.getElementById("birthdate_input").value);
        age_field.innerHTML = calculated_age + " Jahre"
    }
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age + "";
    }

    // Create input fields for age etc. Changes the html, but needs object with corresponding ID in html-file.
    function createNumfield (fieldname, label, placeholder) {
        const name = "#" + fieldname;
        const field = document.querySelector(name)
        field.innerHTML = '<div class="field"> <label for="' + fieldname + '">' + label + '</label> <input class="form-control" type="text" id="' + fieldname + '_input" name="' + fieldname + '" placeholder="' + placeholder + '" "/> <small></small></div>';
    }

    function createNumfieldVib (fieldname, label, placeholder) {
        const name = "#" + fieldname;
        const field = document.querySelector(name)
        field.innerHTML = '<div class="field"> <label for="' + fieldname + '">' + label + '</label> <input class="form-control" type="text" id="' + fieldname + '_input" name="' + fieldname + '" placeholder="' + placeholder + '" "/><small></small></div>';
    }

    // Feld für Alter
    //createNumfield("age","Alter: ", "Jahre")
    // Felder für Blutdruck
    createNumfield("bp_sys", "Blutdruck: ", "systolisch mmHg")
    createNumfield("bp_dia", "", "diastolisch mmHg")
    // Feld für Puls
    createNumfield("pulse", "Puls: ", "Schl./min")
    // Feld für Grösse       
    createNumfield("height", "Grösse: ", "cm")
    // Feld für Gewicht
    createNumfield("weight", "Gewicht: ", "kg")
    // Feld für Lebergrösse
    createNumfield("liver","Leber u. RB in MCL: ", "cm")
    // Feld für Pupille
    createNumfield("pupil","Pupillen: ", "mm")
    // Felder für Visus
    createNumfield("vis_uncorr_re", "Visus unkorrigiert: ", "rechts")
    createNumfield("vis_uncorr_li", "", "links")
    createNumfield("vis_corr_re", "Visus korrigiert: ", "rechts")
    createNumfield("vis_corr_li", "", "links")
    // Felder für Vibrationssinn
    createNumfieldVib("vib_thumb_re", "Vibrationssinn Fingerknöchel: ", "rechts")
    createNumfield("vib_thumb_li", "", "links")
    createNumfield("vib_ankle_re", "Vibrationssinn Aussenknöchel: ", "rechts")
    createNumfield("vib_ankle_li", "", "links")

    // -------------------------- Calculate BMI --------------------------------------------------
    // Add button and event listener for BMI calculation
    // Get values after click on button
    let btn_bmi = document.getElementById("btn_bmi"); // maps to button in html-file
    btn_bmi.addEventListener("click", bmi_clicked, false);

    // Calculate BMI
    function calcBMI(weight, height) {
        let bmi = (weight / (height/100)**2).toPrecision(3);
        return bmi
    }

    function bmi_clicked() {
        let weight = document.getElementById("weight_input").value;
        let height = document.getElementById("height_input").value;
        let bmi = calcBMI(weight, height);
        console.log(isNaN(weight));
        let regex = new RegExp("^[0-9]{2,3}$");
        if (weight.match(regex) && height.match(regex)){
            document.querySelector('#bmi').innerHTML = bmi + " kg/m<sup>2</sup> (Norm: 18.5 - 25)";
        }
        else {
            alert("Zur BMI-Berechnung Grösse und Gewicht angeben (Zahlen 10-999)")
        }
    }

    // ---------------------- Extend form if vision aid present -------------------------------------------
    const vision_aid_input = document.querySelector('#cb_vision_aid_present');
    vision_aid_input.addEventListener('change', visionAidOptionsAppear);

    // shows vision options and corrected vision fields
    function visionAidOptionsAppear() {
        let cb_vision_aid = document.getElementById("cb_vision_aid_present").checked;
        let vision_corrected = document.getElementById("vision_corrected");
        console.log(vision_corrected)
        let vision_extended = document.getElementsByClassName("vision_extended");
        if (cb_vision_aid == true) {    // show extended fields/elements and all their child elements
            for (const x of vision_extended) {
                x.style.display = 'block'
                for (const y of x.children) {
                    y.style.display = 'block'
                }
            }
        }
        else {
            for (const x of vision_extended) {
                x.style.display = 'none'
                for (const y of x.children) {
                    y.style.display = 'none'
                }
            }
        }
    }

    // ---------------------- Check if vibration needs further exmination --------------------------
    const vib_ankle_re = document.querySelector('#vib_ankle_re');
    const vib_ankle_li = document.querySelector('#vib_ankle_li');
    vib_ankle_re.addEventListener('keyup', bigtoeAppear);
    vib_ankle_li.addEventListener('keyup', bigtoeAppear);

    function bigtoeAppear () {
        let ankle_re = document.getElementById("vib_ankle_re_input").value;
        let ankle_li = document.getElementById("vib_ankle_li_input").value;
        console.log(ankle_re)
        console.log(ankle_li)
        let regex = new RegExp("^[0-5]{1}$");
        if (ankle_re.match(regex) || ankle_li.match(regex)) {
            bigtoe.style.display = 'block';
        }
        if ((ankle_re > 5) && (ankle_li > 5)) {
            bigtoe.style.display = 'none';
        }
    }

    // ---------------------- Display Weber- & Rinne-Test -------------------------------------------
    const weber_rinne_input = document.querySelector('#cb_weber_rinne');
    weber_rinne_input.addEventListener('change', weberRinneAppear);

    function weberRinneAppear() {
        let cb_weber_rinne = document.getElementById("cb_weber_rinne").checked;
        if (cb_weber_rinne == true) {
            cb_weber.style.display = 'block';
            cb_rinne.style.display = 'block';
        }
        else {
            cb_weber.style.display = 'none';
            cb_rinne.style.display = 'none';
        }
    }

    // ----------------------- Save & retrieve data to / from localStorage for persistence --------------------
    // Make data persist even if page reloads
    populateInputFields();
    visionAidOptionsAppear()
    weberRinneAppear();
    setTextField();
    
    
    // Add an event listener for keyup event on all input & change on radio buttons
    const inputs = document.getElementsByTagName('input');
    for(const x of inputs){
        if (x.type == "radio" || x.type === "checkbox") {
            x.addEventListener('change', saveValue);
        }
        else {
            x.addEventListener('keyup', saveValue);
        }
    }  

    // Add event listener for editing generated text
    output.addEventListener('keyup', saveValue);

    // Save value to localStorage
    function saveValue() {
        console.log("change/keyup event triggered")
        var id = this.id;  // get the sender's id to save it 
        let val = "";
        if (this.type == "radio") {
            val = this.checked; // get status of current radio button
            let radio_group = this.name;
            var ele = document.getElementsByName(radio_group); // get all radio buttons from that group
            for (i = 0; i < ele.length; i++) {
                if (ele[i] != this) {  // unchecks all other radio buttons in localStorage of same group
                    ele[i].checked = false;
                    localStorage.setItem(ele[i].id, false);
                }
            }
        }
        else if (this.type == "checkbox") {
            val = this.checked; // get status of current radio button
        }
        else if (id == 'output'){
            val = this.innerText; // to store the generated text
        }
        else {
            val = this.value; // get the value
        }
        console.log(val)
        localStorage.setItem(id, val); // Every time user writing something, the localStorage's value will override
    }

    // Populate input fields with data from localStorage 
    function populateInputFields() {
        var ele = document.getElementsByTagName('input');
        console.log(ele);
        for (i = 0; i < ele.length; i++) {
            console.log(ele[i].id)
            if (ele[i].type == "radio") {
                if (getSavedValue(ele[i].id) == 'true') {
                    document.getElementById(ele[i].id).checked = true;
                }
            }
            else if(ele[i].type == "checkbox") {
                if (getSavedValue(ele[i].id) == 'true'){
                    document.getElementById(ele[i].id).checked = true;
                }
                else {
                    document.getElementById(ele[i].id).checked = false;
                }
            }
            else {
                document.getElementById(ele[i].id).value = getSavedValue(ele[i].id);
            }
        }
    }

    function setTextField() {
        output.innerText = getSavedValue('output');
    }

    //get the saved value function - return the value of "v" from localStorage. 
    function getSavedValue(v) {
        if (!localStorage.getItem(v)) {
            return "";// You can change this to your defualt value. 
        }
        return localStorage.getItem(v);
    }

    // --------------------------------- Deleting user input -------------------------------------
    function clear_btn_clicked() {
        if (confirm("Alle erfassten Werte sicher löschen? \nKlicke auf \"Abbrechen\" um die Werte zu behalten. \nKlicke auf \"OK\" um alle erfassten Werte zu löschen.")){
            clearInputFields();
            location.reload(); // reloads the page the get the default checked boxes
        }
    }

    // Delete values in input fields and unchecks radio buttons
    function clearInputFields() {
        var ele = document.getElementsByTagName('input');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].type == "radio" || ele[i].type == "checkbox") {
                ele[i].checked = false;
            }
            else {
                document.getElementById(ele[i].id).value = "";
            }
        }
        localStorage.clear() // Deletes all data local storage
        document.querySelector('#output').innerText = ""; // Deletes generated text
        document.querySelector('#btn_download').style.display = 'none'; // Hides download button
        document.querySelector('#btn_copy').style.display = 'none'; // Hides copy button
    }

    // Deselect specific radio buttons
    let btn_cardio_clear = document.getElementById("btn_cardio_clear"); // maps to button in html-file
    btn_cardio_clear.addEventListener("click", clear_cardio_btn_clicked, false);
    function deselectRadioButtons(radioGroupName) {
        var ele = document.getElementsByName(radioGroupName);
        for (i = 0; i < ele.length; i++) {
            ele[i].checked = false;
            }
        }

    function clear_cardio_btn_clicked() {
        if (confirm("Auswahl in \"Kardiopulmonal\" aufheben?")) {
            deselectRadioButtons("heart_auscultation");
            deselectRadioButtons("carotis")
        }
    }

    /* old way of creating Numfield before function; stays for learning purposes
    const bp_sys = document.querySelector("#bp_sys");
    bp_sys.innerHTML = '<div class="field"><label for="bp_sys">Blutdruck: </label><input type="text" id="bp_sys" name="bp_sys" placeholder="systolisch" /> <small></small></div>';
    */ 

    function values_btn_clicked() {
        const values = ["age", "bp_sys", "bp_dia", "pulse"];
        let returned_values = "";
        console.log("clicked. getting values for " + values)
        for (const x of values) {
            let value = getValue(x)
            returned_values += (value + " / ") 
        }
        document.querySelector('#output').innerText = returned_values;
    }

    // -------------------------- Event handlers for all buttons ----------------------------------
    // Get values after click on button
    let btn_values = document.getElementById("btn_values"); // maps to button in html-file
    btn_values.addEventListener("click", values_btn_clicked, false);

    // Generate text after click on button
    let btn_text = document.getElementById("btn_text"); // maps to button in html-file
    btn_text.addEventListener("click", text_btn_clicked, false);

    // Clear all input after click on button
    let btn_clear = document.getElementById("btn_clear"); // maps to button in html-file
    btn_clear.addEventListener("click", clear_btn_clicked, false);

    // Download generated text after click on button
    let btn_download = document.getElementById("btn_download"); // maps to button in html-file
    btn_download.addEventListener("click", downloadFile, false);

    // Copy generated text after click on button
    let btn_copy = document.getElementById("btn_copy"); // maps to button in html-file
    btn_copy.addEventListener("click", copyText, false);

    // ----------------------- Retrieve values from user input -----------------------------------------
    // Retrieve value that user typed in text field
    function getValue (fieldname) {
        let value = document.querySelector(`#${fieldname}_input`).value // looks for e.g. #age_input
        console.log("got value " + value + " for field " + fieldname) // for debugging
        return value;
    }

    // Returns a json/dict with all checked values
    function getCheckedRadioButtonValues () {
        var checked_buttons = {};
        var ele = document.getElementsByTagName('input');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].type == "radio") {
                if (ele[i].checked) {
                    checked_buttons[ele[i].name] = ele[i].value
                };
            }
        }
        return checked_buttons;
    }

    // ---------------------------------- Generate text ------------------------------------------------------
    let outputEdited = false;
    // Handles text button logic; catches if user previously did changes to generated text
    function text_btn_clicked() {
        if (inputValidation()) {
            if (outputEdited == true) {
                if (confirm("Der Text wurde bearbeitet. Wirklich neuen Text generieren?\n\nKlicke auf \"OK\" um den Text neu zu generieren. Änderungen gehen verloren.\nKlicke auf \"Abbrechen\" um den geänderten Text zu behalten.")) {
                    generateText()
                }
            }
            else {
                generateText()
            }
        }
    }

    // Checks if one of the radio buttons of a group is checked
    function inputValidation() {
        if (getCheckedRadioButtonValues().gender === undefined) {
            alert("Geschlecht auswählen");
            return false;
        }
        return true;
    }

    // Gets through all input fields and stores ID & VALUES or values of CHECKED buttons in dictionary
    function createDictOfInputValues() {
        var input_dict = {};
        var ele = document.getElementsByTagName('input');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].type == "text") {
                input_dict[ele[i].id] = ele[i].value
            }
            if (ele[i].type == "radio") {
                if (ele[i].checked) {
                    input_dict[ele[i].name] = ele[i].value
                }
            }
            if (ele[i].type == "checkbox") {
                    input_dict[ele[i].id] = ele[i].checked;
            }
        }
        return input_dict;
    }

    // Generates plain text with the inputted information
    function generateText() {
        outputEdited = false;
        let input_dict = createDictOfInputValues();
        console.log(input_dict);
        radio_buttons = getCheckedRadioButtonValues();
        // Checks BMI
        let bmi_phrase = "normalem";
        let bmi = calcBMI(input_dict.weight_input, input_dict.height_input);
        if (bmi > 25) {
            bmi_phrase = "übergewichtigem";
        }
        if (bmi < 18.5) {
            bmi_phrase = "untergewichtigem";
        }
        let measured_phrase = "";
        console.log(radio_buttons) // for debugging
        console.log(radio_buttons.gender) // for debugging
        console.log(radio_buttons.vis_field)
        const m_phrases = ["ein", "alter", "Mann", "der Explorand"];
        const f_phrases = ["eine", "alte", "Frau", "die Explorandin"];
        let phrases = "";
        // Checks value from radio button to use corresponding gendering
        if (radio_buttons.gender == 'm') {
            phrases = m_phrases;
            measured_phrase = "(Angaben des Exploranden)";
        }
        else {
            phrases = f_phrases;
            measured_phrase = "(Angaben der Explorandin)";
        }
        // Checks general condition
        let az_phrase = "gutem";
        console.log(radio_buttons.az)
        if (radio_buttons.az == 'reduziert') {
            az_phrase = "reduziertem"
        }
        // Checks if weight & height were measured
        if (input_dict.cb_measured === true) {
            measured_phrase = "(gemessen mit Bekleidung, ohne Schuhe)"
        }

        // Checks bloodpressure
        let bp_phrase = "nicht erhöht";
        let bp_no_rest = "";
        if ((input_dict.bp_sys_input > 140) || (input_dict.bp_dia_input > 90)) {
            bp_phrase = "erhöht";
            bp_no_rest = ", keine Ruheblutdruckmessung";
        }
        if ((input_dict.bp_sys_input < 100) || (input_dict.bp_dia_input < 60)) {
            bp_phrase = "erniedrigt";
        }

        // Checks pulse
        let pulse_phrase = "";
        if (input_dict.pulse_input > 100) {
            pulse_phrase = "beschleunigt und "
        }
        if (input_dict.pulse_input < 60) {
            pulse_phrase = "verlangsamt und "
        }
        if (input_dict.cb_pulse_reg === true) {
            pulse_phrase += "regelmässig"
        }
        else {
            pulse_phrase += "unregelmässig [Schlagmuster beschreiben]"
        }

        // Checks visual field
        let vis_field_phrase = " In der fingerperimetrischen Prüfung des Gesichtsfeldes fallen keine Ausfälle auf, die horizontale Ausdehnung ist ≥ ";
        if (radio_buttons.vis_field == 120) {
            vis_field_phrase += "120°."
        }
        if (radio_buttons.vis_field == 140) {
            vis_field_phrase += "140°."
        }
        if (radio_buttons.vis_field == 'nev'){
            vis_field_phrase = " Das Gesichtfeld ist in der fingerperimetrischen Prüfung nicht normal, die horizontale Ausdehnung beträgt < 120°."
        }

        // Check if vision aid used
        let vision_corr_phrase = "";
        let vision_aid_type = "";
        if (input_dict.cb_vision_aid_present === true) {
            if (radio_buttons.vision_aid == "Brille") {
                vision_aid_type = "eigener Brille"
            }
            else {
                vision_aid_type = "eigenen Kontaktlinsen"
            }
            vision_corr_phrase = `, korrigiert mit ${vision_aid_type} rechts ${input_dict.vis_corr_re_input} und links ${input_dict.vis_corr_li_input}`;
        }

        // Nystagmus
        let nystag_phrase = "";
        if (radio_buttons.nystag == "nein") {
            nystag_phrase = ", ein Augenzittern (Nystagmus) nicht festzustellen";
        }
        if (radio_buttons.nystag == "ja") {
            nystag_phrase = ", ein Augenzittern (Nystagmus) ist feststellbar [BESCHREIBEN]";
        }

        // Eye motility
        let eye_motiliy_phrase = " erhalten";
        if (radio_buttons.eye_motility == "gestört") {
            eye_motiliy_phrase = " nicht erhalten [BESCHREIBEN]"
        }

        // Lang-Stereo-Test
        let lang_test_phrase = "";
        if (radio_buttons.lang_stereo == "positiv") {
            lang_test_phrase = "Der Lang-Stereotest II ist positiv.";
        }
        if (radio_buttons.lang_stereo == "negativ") {
            lang_test_phrase = "Der Lang-Stereotest II ist negativ.";
        }

        // Checks if Weber- & Rinne performed
        let weber_rinne_phrase = "";
        if (input_dict.cb_weber_rinne === true) {
            weber_rinne_phrase = " Der Weber-Test ist zentriert, der Rinne-Test positiv (Gehörprüfungen)."
        }

        // Heart auscultation
        let heart_auscultation_phrase = "";
        if (radio_buttons.heart_auscultation == "normal") {
            heart_auscultation_phrase = "Bei der Auskultation des Herzens finden sich reine Herztöne und keine Herzgeräusche. "
        }
        if (radio_buttons.heart_auscultation == "auffällig") {
            heart_auscultation_phrase = "Bei der Auskultation des Herzens findet sich [BESCHREIBEN] reine Herztöne und keine Herzgeräusche. "
        }

        // Carotis
        let carotis_phrase = "";
        if (radio_buttons.carotis == "keine") {
            carotis_phrase = "Auskultatorisch werden über den Karotiden keine pathologischen Geräusche festgestellt."
        }
        if (radio_buttons.carotis == "vorhanden") {
            carotis_phrase = "Auskultatorisch werden über den Karotiden pathologische Geräusche festgestellt [BESCHREIBEN]."
        }

        // const status_text_test = 
        // `Es präsentiert sich ${phrases[0]} ${input_dict.age_input} Jahre ${phrases[1]} ${phrases[2]} in ${az_phrase} Allgemein- und ${bmi_phrase} Ernährungszustand. 
        // Körpergrösse ${input_dict.height_input} cm, Gewicht ${input_dict.weight_input} kg ${measured_phrase}. Das Gesichtsfeld beträgt ≥ ${radio_buttons.vis_field}`;

        const status_einleitung = `Bei der körperlichen Untersuchung zeigt sich ${phrases[0]} zum Begutachtungszeitpunkt ${calculated_age} Jahre\
         ${phrases[1]} ${phrases[2]} in ${az_phrase} Allgemein- und ${bmi_phrase} Ernährungszustand. Körpergrösse ca. ${input_dict.height_input} cm, Körpergewicht \
         ca. ${input_dict.weight_input} kg ${measured_phrase}. `

        const status_psychostatus = `Das Bewusstsein ist klar, die Orientierung in allen vier Qualitäten erhalten. \
        Auffassung und Konzentration erscheinen nicht vermindert. Der Gedankengang weist keine inhaltlichen und/oder formalen Störungen auf. \
        Es finden sich keine Hinweise auf ein psychotisches Erleben. Im Affekt ist ${phrases[3]} situationsadäquat und gut schwingungsfähig. \
        Antrieb und Psychomotorik sind nicht gestört.`

        const status_vitals = `\nDer Blutdruck ist ${bp_phrase} (${input_dict.bp_sys_input} / ${input_dict.bp_dia_input} mmHg, Normbereich 100–140/60–90 mmHg${bp_no_rest}), \
        der Puls ${pulse_phrase} (Pulsfrequenz ${input_dict.pulse_input} Schläge/min, Normbereich 60–100 Schläge/min). \
        ${heart_auscultation_phrase}Zeichen einer Herzschwäche fallen nicht auf. \
        ${carotis_phrase} \
        Über allen Lungenfeldern können vesikuläre Atemgeräusche ohne Nebengeräusche auskultiert werden. Palpatorisch ist die Leber nicht vergrössert und nicht druckschmerzhaft. \
        In der Kratzauskultation ragt die Leber in der Medioklavikularlinie bis etwa ${input_dict.liver_input} cm unter den Rippenbogen. `

        const status_vision = `Es liegt kein Herabhängen der Augenlider vor (Ptose). \
        Die Pupillen sind seitengleich, messen ca. ${input_dict.pupil_input} mm im Durchmesser und reagieren direkt und konsensuell prompt auf Lichtreize. \
        Die Augenbeweglichkeit ist${eye_motiliy_phrase}${nystag_phrase}. \
        Der Visus beträgt unkorrigiert rechts ${input_dict.vis_uncorr_re_input} und links ${input_dict.vis_uncorr_li_input}${vision_corr_phrase}. \
        ${lang_test_phrase} ${vis_field_phrase}`

        const status_hearing = ` Eine Einschränkung des Hörvermögens fällt im Gespräch nicht auf.${weber_rinne_phrase}`

        // Sense of vibration
        let vibration_phrase = "";
        let vib_thumb = "";
        if (input_dict.vib_thumb_re_input || input_dict.vib_thumb_li_input) {
            if (input_dict.vib_thumb_re_input == input_dict.vib_thumb_li_input) {
            vib_thumb = `über beiden Daumengrundgelenken ${input_dict.vib_thumb_re_input}/8 und `;
            }
            else {
                vib_thumb = `über dem Daumengrundgelenk rechts ${input_dict.vib_thumb_re_input}/8 und links ${input_dict.vib_thumb_li_input}/8 sowie `
            }
        }
        if (input_dict.vib_ankle_re_input || input_dict.vib_ankle_li_input) {
            if (input_dict.vib_ankle_re_input == input_dict.vib_ankle_li_input) {
            vibration_phrase = `Der Vibrationssinn beträgt ${vib_thumb}über beiden Aussenknöcheln ${input_dict.vib_ankle_re_input}/8.`;
            }
            else {
                vibration_phrase = `Der Vibrationssinn beträgt ${vib_thumb}über dem Aussenknöchel rechts ${input_dict.vib_ankle_re_input}/8 und links ${input_dict.vib_ankle_li_input}/8.`;
            }
        }
        if (radio_buttons.bigtoe == 'erhalten') {
            vibration_phrase += " Der Lagesinn der Grosszehen ist beidseits erhalten."
        }
        if (radio_buttons.bigtoe == 'nicht erhalten') {
            vibration_phrase += " Der Lagesinn der Grosszehen ist nicht erhalten."
        }

        const status_neurology = ` Sensibilität und geprüfte Motorik (grobe Kraft) weisen keine verkehrsrelevanten funktionellen Defizite auf. \
        ${vibration_phrase} \
        Die geprüften Muskelreflexe sind an den oberen Extremitäten seitengleich schwach, an den unteren Extremitäten symmetrisch lebhaft auslösbar. \
        Beim Unterberger-Tretversuch erfolgt keine Drehung. Beim Romberg-Test kann keine Fallneigung und kein Schwanken festgestellt werden. \
        Die Diadochokinese der Hände ist flüssig und zügig. Die Finger-Nase-Probe ist rasch und zielgenau. Es ist kein Tremor feststellbar. \
        Der Strichgang ist sicher und flüssig. Der Bewegungsumfang der Halswirbelsäule ist nicht eingeschränkt, ebenso zeigt der übrige Bewegungsapparat \
        keine verkehrsrelevanten Einschränkungen. `

        const status_stigmata = `Es finden sich keine Alkohol- und/oder Drogenstigmata.`

        const status_text = status_einleitung + status_psychostatus + status_vitals + status_vision + status_hearing + status_neurology + status_stigmata;
        const output = document.querySelector('#output');
        output.innerText = status_text;
        output.setAttribute("contenteditable",true);
        output.addEventListener('keyup', function(){outputEdited = true});
        const download_btn = document.querySelector('#btn_download');
        download_btn.style.display = 'block';
        const copy_btn = document.querySelector('#btn_copy');
        copy_btn.style.display = 'block';
        output.scrollIntoView({behavior: "smooth"});
    }

    // Copy text to clipboard
    function copyText() {
        const content = document.querySelector('#output').innerText;
        // navigator.clipboard.writeText(content);
        try {
            navigator.clipboard.writeText(content);
            showSnackbarMessage("Text kopiert!");
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    function showSnackbarMessage(text) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
        // Set text of snackbar
        x.innerText = text;
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }

    //  // Copy text to clipboard TODO: figure out if better to do async version of this
    // const copyText = async () => {
    //     const content = document.querySelector('#output').innerText;
    //     // navigator.clipboard.writeText(content);
    //     try {
    //         await navigator.clipboard.writeText(content);
    //         console.log('Content copied to clipboard');
    //     } catch (err) {
    //         console.error('Failed to copy: ', err);
    //     }
    // }

    // Allows user to download the text as txt-file
    function downloadFile() {
        const link = document.createElement("a");
        const content = document.querySelector('#output').innerText;
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "documentation.txt";
        link.click();
        URL.revokeObjectURL(link.href);
     };

})