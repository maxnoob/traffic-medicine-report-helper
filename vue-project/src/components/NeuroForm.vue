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
    <h6 class="py-2">Vibrationssinn</h6>
      <div class="grid-container">
        <label>Fingerknöchel:</label>
  <div class="grid-item">
      <input
        type="text"
        placeholder="rechts"
        v-model="neuro.vibration_wrist_re"
      />
    </div>
    <div class="grid-item">
      <input
        type="text"
        placeholder="links"
        v-model="neuro.vibration_wrist_li"
      />
    </div>
    </div>

    <div class="grid-container">
        <label>Aussenknöchel:</label>
  <div class="grid-item">
      <input
      type="text"
        placeholder="rechts"
        v-model="neuro.vibration_ankle_re"
        @keyup="check_bigtoeNeeded()"
      />
    </div>
    <div class="grid-item">
      <input
        type="text"
        placeholder="links"
        v-model="neuro.vibration_ankle_li"
        @keyup="check_bigtoeNeeded()"
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

    <div>
      <label class="def-label">Oberflächensensibilität:</label>
      <RadioInputGroup
        name="sensibility"
        v-model="neuro.sensibility"
        :options="erhalten_nichterhaltenOptions"
      />
    </div>

    Reflexe
    <div class="row d-inline-flex">
      <div class="slider-container">
        <div class="slider-pair">
          <label>PSR:</label>
          <input
            type="range"
            v-model="neuro.psr"
            min="0"
            max="4"
            step="1"
            @input="psr_change()"
          />
          <span>{{ psr_conv }}</span>
        </div>

        <div class="slider-pair">
          <label>BSR:</label>
          <input
            type="range"
            v-model="neuro.bsr"
            min="0"
            max="4"
            step="1"
            @input="bsr_change()"
          />
          <span>{{ bsr_conv }}</span>
        </div>
      </div>

      <div class="slider-container">
        <div class="slider-pair">
          <label>ASR:</label>
          <input
            type="range"
            v-model="neuro.asr"
            min="0"
            max="4"
            step="1"
            @input="asr_change()"
          />
          <span>{{ asr_conv }}</span>
        </div>
        <div class="slider-pair">
          <label>TSR:</label>
          <input
            type="range"
            v-model="neuro.tsr"
            min="0"
            max="4"
            step="1"
            @input="tsr_change()"
          />
          <span>{{ tsr_conv }}</span>
        </div>
      </div>
    </div>

    <div class="form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="asymm_checkbox"
        v-model="neuro.asymm_reflex"
      />
      <label class="form-check-label" for="asymm_checkbox"
        >asymmetrische Reflexe</label
      >
    </div>
    <div v-if="neuro.asymm_reflex">
      <label for="additionalInfo">Beschreibung der Assymetrie:</label>
      <Input
        type="text"
        placeholder="Beschreibung"
        v-model="neuro.asymm_beschreibung"
        />
      </div>


    <label class="def-label">Kraft Extremitäten:</label>
    <RadioInputGroup
      name="force"
      v-model="neuro.force"
      :options="nichteingeschr_eingeschrOptions"
    />

    <div>
      <label class="def-label">Romberg</label>
      <input
        type="range"
        v-model="neuro.romberg_test"
        min="0"
        max="4"
        step="1"
        @input="romberg_change()"
      />
      <span>{{ romberg_conv }}</span>
    </div>

    <div>
      
      <label>Unterberger</label>
      <RadioInputGroup name="unterberger" v-model="neuro.unterberger_test" />
    </div>
    <CheckboxInput
      name="unterberger_abnorm"
      v-model="neuro.unterberger_abnorm"
      label="weitere Auffälligkeiten"
    />
    <div v-if="neuro.unterberger_abnorm">
      <CheckboxInput
        name="unterberger_arm_re"
        v-model="neuro.unterberger_arm_re"
        label="Absinken/Pronation rechts"
      />
      <CheckboxInput
        name="unterberger_arm_li"
        v-model="neuro.unterberger_arm_li"
        label="Absinken/Pronation links"
      />
      <!-- TODO Arrange stuff not ugly! -->
      <CheckboxInput
        name="unterberger_rotation"
        v-model="neuro.unterberger_rotation"
        label="Drehung"
      />
      <div v-if="neuro.unterberger_rotation">
        um
        <input
          type="text"
          placeholder="°"
          v-model="neuro.unterberger_rotation_degrees"
        />
        Grad nach
        <input
          type="text"
          placeholder="#"
          v-model="neuro.unterberger_rotation_steps"
        />
        Schritten
      </div>
    </div>

    <div>
      <label class="def-label">Strichgang</label>
      <RadioInputGroup
        name="line_walk"
        v-model="neuro.line_walk"
        :options="sicherSchwankendOptions"
      />
    </div>
    <div>
      <label class="def-label">Finger-Nase-Probe</label>
      <RadioInputGroup name="fnp" v-model="neuro.fnp" :options="fnpOptions" />
    </div>

    <div>
      <label class="def-label">Tremor</label>
      <RadioInputGroup
      name="tremor"
        v-model="neuro.tremor"
        :options="nichtVorhanden_vorhandenOptions"
      />
      <div v-if="tremor==='present'">
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
    <div>
      <label class="def-label">Diadochokinese</label>
      <RadioInputGroup
        name="diadocho"
        v-model="neuro.diadochokinesis"
        :options="diadochoOptions"
      />
    </div>
    <div>
      <label class="def-label">Gang</label>
      <RadioInputGroup
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
// import { formToJSON } from "axios";
//import TextInput from "./InputComponents/TextInput.vue";
// import SliderInput from "./InputComponents/SliderInput.vue";

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
  { label: "erhalten", value: "erhalten" },
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
const gangOptions = [
  "nicht geprüft",
  "sicher",
  "leicht schwankend",
  "stark schwankend",
  "unmöglich",
];

const romberg_conv = ref("nicht geprüft");
function romberg_change() {
  romberg_conv.value = gangOptions[neuro.value.romberg_test];
}

const sicherSchwankendOptions = [
  { label: "sicher", value: "sicher" },
  { label: "leicht schwankend", value: "l_schwankend" },
  { label: "stark schwankend", value: "s_schwankend" },
  { label: "unmöglich", value: "unmoeglich" },
];

// für Reflex-Sliders
const reflOptions = ["nicht geprüft", "-", "+", "++", "+++"];

const bsr_conv = ref("nicht geprüft");
function bsr_change() {
  bsr_conv.value = reflOptions[neuro.value.bsr];
}
const psr_conv = ref("nicht geprüft");
function psr_change() {
  psr_conv.value = reflOptions[neuro.value.psr];
}
const tsr_conv = ref("nicht geprüft");
function tsr_change() {
  tsr_conv.value = reflOptions[neuro.value.tsr];
}
const asr_conv = ref("nicht geprüft");
function asr_change() {
  asr_conv.value = reflOptions[neuro.value.asr];
}

let bigtoeAppear = ref(false); // use ref to make stuff reactive!!
// if the sense of vibration is less than 6 on either foot, display further exam options
function check_bigtoeNeeded() {
  let regex = new RegExp("^[0-5]{1}$");
  let vib_re = neuro.value.vibration_ankle_re;
  let vib_li = neuro.value.vibration_ankle_li;
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

// TODO: daten zu unterberger verschachteln
const neuro = ref({
  speech: "",
  vibration_wrist_re: "",
  vibration_wrist_li: "",
  vibration_ankle_re: "",
  vibration_ankle_li: "",
  bigtoe: "",
  sensibility: "",
  bsr: 0,
  psr: 0,
  asr: 0,
  tsr: 0,
  reflexes_symm: true,
  strength_extremities: null,
  romberg_test: "",
  unterberger_test: "",
  unterberger_abnorm: false,
  unterberger_rotation: false,
  unterberger_rotation_degrees: "",
  unterberger_rotation_steps: "",
  unterberger_arm_re: false,
  unterberger_arm_rli: false,
  line_walk: "",
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
    wernicke_mann: false
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
.grid-container {
  display: grid;
  grid-template-columns: 10rem 10rem 10rem;
  padding: 1px;
}

.grid-item {
  text-align:start;
}
.def-label {
  width: 200px;
}
</style>
