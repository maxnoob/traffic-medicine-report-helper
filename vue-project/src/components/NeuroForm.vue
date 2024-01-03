<template>
  <FormCard>
    <h4 class="py-2">Neurologie</h4>

    <div class="d-flex py-2">
      <label class="def-label">Sprache:</label>
      <RadioInputGroupColumn
        v-model="neuro.speech"
        name="speech"
        :options="auffaellig_unauffaelligOptions"
      />
    </div>

    <div v-if="neuro.speech == 'auffaellig'">
      <RadioInputGroup
        v-model="neuro.speech_extended"
        name="speech_extended"
        :options="speech_extendedOptions"
      />
    </div>

    <h6 class="py-2" style="background-color: aliceblue">Reflexe</h6>
    <div class="twoByTwo">
      <div>
        <SliderInput
          label="PSR:"
          v-model="neuro.reflexes.psr"
          :options="reflOptions"
        />
      </div>
      <div>
        <SliderInput
          label="ASR:"
          v-model="neuro.reflexes.asr"
          :options="reflOptions"
        />
      </div>

      <div class="twoByTwo">
        <div>
          <SliderInput
            label="BSR:"
            v-model="neuro.reflexes.bsr"
            :options="reflOptions"
          />
        </div>
        <div>
          <SliderInput
            label="TSR:"
            v-model="neuro.reflexes.tsr"
            :options="reflOptions"
          />
        </div>
      </div>
    </div>

    <div class="form-check">
      <CheckboxInput
        type="checkbox"
        class="form-check-input"
        id="asymm_checkbox"
        v-model="neuro.reflexes.asymm"
        label="asymmetrische Reflexe"
        name="asymm"
      />
    </div>
    <div v-if="neuro.reflexes.asymm">
      <label for="additionalInfo">Beschreibung der Asymmetrie:</label>
      <input
        type="text"
        placeholder="Beschreibung"
        v-model="neuro.reflexes.asymm_beschreibung"
      />
    </div>

    <h6 class="py-2" style="background-color: aliceblue">Vibrationssinn</h6>
    <div class="grid-container">
      <label>Fingerknöchel:</label>
      <div class="grid-item" style="background-color: unset">
        <input
          type="text"
          placeholder="rechts"
          v-model="neuro.vibration.wrist_re"
          class="value_input"
        />
      </div>
      <div class="grid-item" style="background-color: unset">
        <input
          type="text"
          placeholder="links"
          v-model="neuro.vibration.wrist_li"
          class="value_input"
        />
      </div>
    </div>

    <div class="grid-container">
      <label>Aussenknöchel:</label>
      <div class="grid-item" style="background-color: unset">
        <input
          type="text"
          placeholder="rechts"
          v-model="neuro.vibration.ankle_re"
          @keyup="check_bigtoeNeeded()"
          class="value_input"
        />
      </div>
      <div class="grid-item" style="background-color: unset">
        <input
          type="text"
          placeholder="links"
          v-model="neuro.vibration.ankle_li"
          @keyup="check_bigtoeNeeded()"
          class="value_input"
        />
      </div>
    </div>
    <div v-if="bigtoeAppear">
      <label class="def-label">Lagensinn Grosszehe:</label>
      <RadioInputGroup
        name="bigtoe"
        v-model="neuro.bigtoe"
        :options="erhalten_nichterhaltenOptions"
      />
    </div>

    <div class="d-flex py-2" style="background-color: aliceblue">
      <label class="def-label">Oberflächensensibilität:</label>
      <RadioInputGroupColumn
        name="sensibility"
        v-model="neuro.sensibility"
        :options="erhalten_nichterhaltenOptions"
      />
    </div>

    <div class="d-flex py-2">
      <label class="def-label">Kraft Extremitäten:</label>
      <RadioInputGroup
        name="force"
        v-model="neuro.force"
        :options="nichteingeschr_eingeschrOptions"
      />
    </div>
    <div class="threeCols" style="background-color: aliceblue">
      <label>Romberg:</label>
      <SliderInput
        v-model="neuro.romberg_test"
        :options="gaitOptions"
        style="width: 80%"
      />
    </div>

    <div class="threeCols">
      <label>Unterberger:</label>
      <SliderInput
        v-model="neuro.unterberger.test"
        :options="gaitOptions"
        style="width: 80%"
      />
    </div>
    <div class="twoCols">
      <div />
      <div>
        <CheckboxInput
          name="unterberger_abnorm"
          v-model="neuro.unterberger.abnorm"
          label="Unterberger auffällig"
        />
      </div>
    </div>
    <div v-if="neuro.unterberger.abnorm">
      <CheckboxInput
        name="unterberger_arm_re"
        v-model="neuro.unterberger.arm_re"
        label="Absinken/Pronation rechts"
      />
      <CheckboxInput
        name="unterberger_arm_li"
        v-model="neuro.unterberger.arm_li"
        label="Absinken/Pronation links"
      />
      <!-- TODO Arrange stuff not ugly! -->
      <CheckboxInput
        name="unterberger_rotation"
        v-model="neuro.unterberger.rotation"
        label="Drehung"
      />
      <div v-if="neuro.unterberger.rotation" class="d-inline-flex">
        um
        <ValueInput
          type="text"
          placeholder="°"
          v-model="neuro.unterberger.rotation_degrees"
        />
        Grad nach
        <ValueInput
          type="text"
          placeholder="#"
          v-model="neuro.unterberger.rotation_steps"
        />
        Schritten
      </div>
    </div>

    <div class="threeCols" style="background-color: aliceblue">
      <label class="def-label">Strichgang:</label>
      <SliderInput
        v-model="neuro.line_walk"
        :options="gaitOptions"
        style="width: 80%"
      />
      <!-- <RadioInputGroup
        name="line_walk"
        v-model="neuro.line_walk"
        :options="sicherSchwankendOptions"
      /> -->
    </div>
    <div class="d-flex py-2">
      <label class="def-label">Finger-Nase-Probe:</label>
      <RadioInputGroupColumn
        name="fnp"
        v-model="neuro.fnp"
        :options="fnpOptions"
      />
    </div>

    <div class="d-flex py-2" style="background-color: aliceblue">
      <label class="def-label">Tremor:</label>
      <RadioInputGroupColumn
        name="tremor"
        v-model="neuro.tremor"
        :options="nichtVorhanden_vorhandenOptions"
      />
      <div v-if="tremor === 'present'">
        <CheckboxInput
          v-model="neuro.restingtremor"
          :value="false"
          label="Ruhetremor"
          name="tremor"
        />
        <CheckboxInput
          v-model="neuro.intentiontremor"
          :value="false"
          label="Intentionstremor"
          name="tremor"
        />
      </div>
      <div>
        <div v-if="neuro.restingtremor || neuro.intentiontremor">
          <RadioInputGroup
            name="tremor"
            v-model="neuro.tremor"
            :options="tremorOptions"
          />
        </div>
      </div>
    </div>
    <div class="d-flex py-2">
      <label class="def-label">Diadochokinese:</label>
      <RadioInputGroupColumn
        name="diadocho"
        v-model="neuro.diadochokinesis"
        :options="erhalten_nichterhaltenOptions"
      />
    </div>
    <div v-if="neuro.diadochokinesis != '' && neuro.diadochokinesis !='erhalten'">
      <RadioInputGroupColumn
        name="diadocho"
        v-model="neuro.diadochokinesis"
        :options="diadochoOptions"
      />
    </div>
    <div class="d-flex py-2" style="background-color: aliceblue">
      <label class="def-label">Gang:</label>
      <RadioInputGroupColumn
        name="gait"
        v-model="neuro.gait.abnorm"
        :options="auffaellig_unauffaelligOptions"
      />
    </div>
    <div v-if="neuro.gait.abnorm == 'auffaellig'">
      <div>
        <CheckboxInput
          v-model="neuro.gait.schwankend"
          :value="false"
          label="schwankend"
          name="gang"
        />
        <CheckboxInput
          v-model="neuro.gait.kleinschrittig"
          :value="false"
          label="kleinschrittig"
          name="gang"
        />
        <CheckboxInput
          v-model="neuro.gait.trendelenburg"
          :value="false"
          label="Trendelenburg-Hinken"
          name="gang"
        />
        <CheckboxInput
          v-model="neuro.gait.steppergang"
          :value="false"
          label="Steppergang"
          name="gang"
        />
        <CheckboxInput
          v-model="neuro.gait.ataktisch"
          :value="false"
          label="ataktisch"
          name="gang"
        />
      </div>
      <CheckboxInput
        v-model="neuro.gait.spastisch"
        :value="false"
        label="spastisch"
        name="gang"
      />
      <CheckboxInput
        v-model="neuro.gait.wernicke_mann"
        :value="false"
        label="Wernicke-Mann-Gang"
        name="gang"
      />
    </div>
  </FormCard>
</template>

<script setup>
// access specific value with "vitals.value.[specificvalue]"
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import CheckboxInput from "./InputComponents/CheckboxInput.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";
import RadioInputGroupColumn from "./InputComponents/RadioInputGroupColumn.vue";
import ValueInput from "./InputComponents/ValueInput.vue";
//import TextInput from "./InputComponents/TextInput.vue";
import SliderInput from "./InputComponents/SliderInput.vue";

const auffaellig_unauffaelligOptions = [
  { label: "unauffällig", value: "unauffaellig" },
  { label: "auffällig", value: "auffaellig" },
];

const nichtVorhanden_vorhandenOptions = [
  { label: "nicht vorhanden", value: "not" },
  { label: "vorhanden", value: "present" },
];

const speech_extendedOptions = [
  { label: "lallend", value: "lallend" },
  { label: "verwaschen", value: "verwaschen" },
  { label: "dysarthrisch", value: "dysarth" },
];

const erhalten_nichterhaltenOptions = [
  { label: "erhalten", value: "erhalten" },
  { label: "nicht erhalten", value: "nicht_erhalten" },
];

const nichteingeschr_eingeschrOptions = [
  { label: "nicht eingeschränkt", value: "nicht_eingeschraenkt" },
  { label: "eingeschränkt", value: "eingeschraenkt" },
];

const diadochoOptions = [
  { label: "Dysdiadochokinese", value: "disdiadochokinesis" },
  { label: "Bradydiadochokinese", value: "bradydiadochokinesis" },
  { label: "Adiadochokinese", value: "adiadochokinesis" },
];

const tremorOptions = [
  { label: "feinschlägig", value: "fein" },
  { label: "mittelschlägig", value: "mittel" },
  { label: "grobschlägig", value: "grob" },
];

const fnpOptions = [
  { label: "sicher", value: "sicher" },
  { label: "unpräzise", value: "unpraezise" },
];

// für Gang-Sliders
const gaitOptions = [
  "nicht geprüft",
  "sicher",
  "leicht schwankend",
  "stark schwankend",
  "unmöglich",
];

/* const sicherSchwankendOptions = [
  { label: "sicher", value: "sicher" },
  { label: "leicht schwankend", value: "l_schwankend" },
  { label: "stark schwankend", value: "s_schwankend" },
  { label: "unmöglich", value: "unmoeglich" },
]; */

// für Reflex-Sliders
const reflOptions = ["nicht geprüft", "-", "+", "++", "+++"];

let bigtoeAppear = ref(false); // use ref to make stuff reactive!!
// if the sense of vibration is less than 6 on either foot, display further exam options
function check_bigtoeNeeded() {
  let regex = new RegExp("^[0-5]{1}$");
  let vib_re = neuro.value.vibration.ankle_re;
  let vib_li = neuro.value.vibration.ankle_li;
  console.log("re: " + vib_re + "; li: " + vib_li);
  if (vib_re > 5 && vib_li > 5) {
    bigtoeAppear.value = false;
    return;
  }
  if (vib_re.match(regex) || vib_li.match(regex)) {
    bigtoeAppear.value = true;
    return;
  }
  bigtoeAppear.value = false;
  return;
}

const neuro = ref({
  speech: "",
  vibration: {
    wrist_re: "",
    wrist_li: "",
    ankle_re: "",
    ankle_li: "",
  },
  bigtoe: "",
  sensibility: "",
  reflexes: {
    bsr: 0,
    psr: 0,
    asr: 0,
    tsr: 0,
    asymm: false,
    asymm_beschreibung: "",
  },
  strength_extremities: null,
  romberg_test: 0,
  unterberger: {
    test: 0,
    abnorm: false,
    rotation: false,
    rotation_degrees: "",
    rotation_steps: "",
    arm_re: false,
    arm_rli: false,
  },
  line_walk: 0,
  finger_nose: "",
  tremor: "",
  diadochokinesis: "",
  gait: {
    abnorm: false,
    schwankend: false,
    kleinschrittig: false,
    trendelenburg: false,
    steppergang: false,
    ataktisch: false,
    spastisch: false,
    wernicke_mann: false,
  },
});

/* populate fields with stored data */
onMounted(() => persistToLocalStorage(neuro, "neuro"));
/* use watch to retain inputted data via localStorage */
watch(
  neuro,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("neuro", JSON.stringify(neuro.value));
  },
  { deep: true },
  { immediate: true }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.threeCols {
  display: grid;
  grid-template-columns: 12rem 10rem 10rem;
  gap: 0.5rem;
  padding: 1px;
}
.twoCols {
  display: grid;
  grid-template-columns: 12rem 30rem;
  gap: 0.5rem;
  padding: 1px;
}

.twoByTwo {
  display: grid;
  grid-template-columns: 18rem 18rem;
  grid-template-rows: auto;
  gap: 0.5rem;
  padding: 1px;
}

.value_input {
  width: 100px;
  height: 40px;
  border-style: solid;
  border-width: 0.1cap;
  border-radius: 5px;
  border-color: lightgray;
}
.grid-container {
  display: grid;
  grid-template-columns: 10rem 10rem 10rem;
  padding: 1px;
}

.grid-item {
  text-align: start;
  border: 0;
}
.def-label {
  width: 200px;
}
</style>
