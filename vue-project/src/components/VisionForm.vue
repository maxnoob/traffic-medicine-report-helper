<template>
  <FormCard>
    

    <h4 class="py-2">Sehvermögen</h4>

    <div class="form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="visionaid_checkbox"
        v-model="vision.aid_present"
      />
      <label class="form-check-label" for="visionaid_checkbox"
        >Sehhilfe vorhanden</label
      >
    </div>

    <div v-if="vision.aid_present">
      <label>Sehhilfe bei Untersuchung:</label>
      <div>
        <input
          type="radio"
          class="form-check-input"
          name="vision_aid"
          value="brille"
          id="Brille"
          v-model="vision.aid"
        />
        <label class="form-check-label" for="Brille">Brille</label>
      </div>
      <div>
        <input
          type="radio"
          class="form-check-input"
          name="vision_aid"
          value="linsen"
          id="Kontaktlinsen"
          v-model="vision.aid"
        />
        <label class="form-check-label" for="Kontaktlinsen"
          >Kontaktlinsen</label
        >
      </div>
    </div>

    <div class="row py-2 d-inline-flex">
      <label>Visus unkorrigiert:</label>
      <div class="col">
        <!-- old freetext input: <input type="text" placeholder="rechts" v-model="vision.uncorr_re" /> -->
        <!-- new dropdown input: right -->
        <select
          v-model="vision.uncorr_re"
          class="form-select form-select-sm vision_input"
        >
          <option value="" selected disabled>rechts</option>
          <option
            v-for="option in vision_options"
            v-bind:key="option.text"
            v-bind:value="option.value"
            placeholder="rechts"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="col">
        <!--   old freetext input:        <input
            type="text"
            placeholder="links"
            v-model="vision.uncorr_li"
            style="margin-left: -60px; margin-right: 50px"
          /> -->
        <!-- new dropdown input: left -->
        <select
          v-model="vision.uncorr_li"
          class="form-select form-select-sm vision_input"
        >
          <option value="" selected disabled>links</option>
          <option
            v-for="option in vision_options"
            :key="option.text"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>

    <!-- div that appears of vision aid is present -->
    <div v-if="vision.aid_present" id="vision_corrected" class="d-inline-flex">
      <div class="row d-inline-flex">
        <label>Visus korrigiert:</label>
        <div class="col">
          <select
            v-model="vision.corr_re"
            class="form-select form-select-sm vision_input"
          >
            <option value="" selected disabled>rechts</option>
            <option
              v-for="option in vision_options"
              :key="option.text"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="col">
          <select
            v-model="vision.corr_li"
            class="form-select form-select-sm vision_input"
          >
            <option value="" selected disabled>links</option>
            <option
              v-for="option in vision_options"
              :key="option.text"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="row py-2 px-2">
      <label>Horizontales Gesichtsfeld</label>
      <div v-for="option in vis_field_degrees" :key="option.text">
        <input
          type="radio"
          name="vis_field"
          :value="option.value"
          v-model="vision.vis_field_degrees"
          class="d-inline-flex"
        />
        <label for="option">{{ option.text }}</label>
      </div>
    </div>

    
    <div class="d-flex py-2 " style="background-color: aliceblue;">
     <div class="def-label">
      <label>Pupillenöffnung:</label>
    </div>
      <select
        v-model="vision.pupils"
        class="form-select form-select-sm vision_input"
        
      >
        <option value="" selected disabled>mm</option>
        <option
          v-for="option in pupil_options"
          :key="option.text"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>


    <div class="d-flex py-2">
        <label class="def-label">Nystagmus:</label>
        <RadioInputGroupColumn
          v-model="vision.nystag"
          name="nystag"
          :options="nein_jaOptions"
        />
      </div>


    <div class="d-flex py-2" style="background-color: aliceblue">
        <label class="def-label">Doppelbilder:</label>
        <RadioInputGroupColumn
          v-model="vision.double"
          name="doppelbilder"
          :options="nein_jaOptions"
        />
      </div>

    <div class="d-flex py-2">
    <label class="def-label">Lang-Stereo-Test:</label>
    <RadioInputGroupColumn
      v-model="vision.stereo"
      name="stereo"
      :options="pos_negOptions"
    />
    <div v-if="vision.stereo=='neg'"><input type="text" placeholder="Beschreibung des Befundes" v-model="vision.bemerkung" />
    </div>
  </div>

    <div class="d-flex py-2" style="background-color: aliceblue">
      <label class="def-label">Augenmotilität:</label>
      <RadioInputGroupColumn
        v-model="vision.eye_motility"
        name="eye_motility"
        :options="erhalten_gestoertOptions"
      />
    </div>

    <div class="d-flex py-2">
    <label class="def-label">Dämmerungssehen:</label>
    <RadioInputGroupColumn
      v-model="vision.daemmerung"
      name="daemmerung"
      :options="erhalten_gestoertOptions"
    />
  </div>

    <div class="d-flex py-2" style="background-color: aliceblue">
      <label class="def-label">Blendempfindlichkeit:</label>
      <RadioInputGroupColumn
        v-model="vision.blend"
        name="blend"
        :options="nichterhoeht_erhoehtOptions"
      />
    </div>
  </FormCard>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroupColumn from "./InputComponents/RadioInputGroupColumn.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";

/* provides options for the vision input fields */
const vision_options = [
  { text: "", value: "" },
  { text: "< 0.1", value: "below 0.1" },
  { text: "0.1", value: 0.1 },
  { text: "0.2", value: 0.2 },
  { text: "0.3", value: 0.3 },
  { text: "0.4", value: 0.4 },
  { text: "0.5", value: 0.5 },
  { text: "0.6", value: 0.6 },
  { text: "0.63", value: 0.63 },
  { text: "0.7", value: 0.7 },
  { text: "0.8", value: 0.8 },
  { text: "0.84", value: 0.84 },
  { text: "0.9", value: 0.9 },
  { text: "1.0", value: 1.0 },
  { text: "1.25", value: 1.25 },
];

const vis_field_degrees = [
  { text: "≥ 120 Grad", value: 120 },
  { text: "≥ 140 Grad", value: 140 },
  { text: "nicht erfüllt (horizontale Ausdehnung < 120 Grad)", value: "nef" },
];

const pupil_options = [
  { text: "", value: "" },
  { text: "1", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 },
  { text: "6", value: 6 },
  { text: "7", value: 7 },
  { text: "8", value: 8 },
];

const nein_jaOptions = [
  { label: "nein", value: "nein" },
  { label: "ja", value: "ja" },
];

const pos_negOptions = [
  { label: "positiv", value: "pos" },
  { label: "negativ", value: "neg" },
];

const erhalten_gestoertOptions = [
  { label: "erhalten", value: "erhalten" },
  { label: "gestört", value: "gestoert" },
];

const nichterhoeht_erhoehtOptions = [
  { label: "nicht erhöht", value: "nicht_erhoeht" },
  { label: "erhöht", value: "erhoeht" },
];

const vision = ref({
  uncorr_re: "",
  uncorr_li: "",
  aid_present: false,
  aid: "",
  vis_field_degrees: "",
  nystag: "",
  eye_motility: "",
  double: "",
  stereo: "",
  daemmerung: "",
  blend: "",
  bemerkung: ""
});
/* populate fields with stored data */
onMounted(
  () => persistToLocalStorage (vision, "vision")
);
/* use watch to retain inputted data via localStorage */
watch(
  vision,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("vision", JSON.stringify(vision.value));
  },
  { deep: true },
  { immediate: true }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="text"] {
  width: 80px;
}

.vision_input {
  width: 90px;
  text-align: center;
}
.def-label {
  width: 200px;
}
label, select {
  margin-left: 6px;
}
</style>
