<template>
  <FormCard>

    <h4 class="py-2">organische bedingte Hirnleistungsstörung</h4>

    <div>
      <label>Kognition:</label>
      <RadioInputGroup
        v-model="kognition.kognitiv"
        vertical
        name="kognitiv"
        :options="nichtauffaellig_auffaelligOptions"
      />
    </div>

    <div v-if="kognition.kognitiv == 'auffaellig'">
      <input type="text" v-model="kognition.description" />
      </div>

      <CheckboxInput
        v-model="kognition.mms.performed"
        :value="false"
        label="Mini-Mental-State-Test"
      />

      <input
        v-if="kognition.mms.performed"
        type="text"
        placeholder="Resultat Mini-Mental-State-Test"
        v-model="kognition.mms.score"
      />

      <CheckboxInput
        v-model="kognition.ut.performed"
        :value="false"
        label="Uhrentest"
      />

      <input
        v-if="kognition.ut.performed"
        type="text"
        placeholder="Resultat Uhrentest"
        v-model="kognition.ut.score"
      />

      <CheckboxInput
        v-model="kognition.tmt.performed"
        :value="false"
        label="Trail-Making-Test"
      />
      <input
        v-if="kognition.tmt.performed"
        type="text"
        placeholder="Resultat Trail-Making-Test Teil A"
        v-model="kognition.tmt.tmt_a_score"
      />
      <input
        v-if="kognition.tmt.performed"
        type="text"
        placeholder="Resultat Trail-Making-Test Teil B"
        v-model="kognition.tmt.tmt_b_score"
      />
      <CheckboxInput
        v-model="kognition.neglect.performed"
        :value="false"
        label="Neglect-Test"
      />
      <input
        v-if="kognition.neglect.performed"
        type="text"
        placeholder="Resultat Neglect-Test"
        v-model="kognition.neglect.score"
      />
</FormCard>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage.js";
import CheckboxInput from "./InputComponents/CheckboxInput.vue";
import FormCard from "./FormCard.vue";

const nichtauffaellig_auffaelligOptions = [
  { label: "nicht auffällig", value: "nicht_auffaellig" },
  { label: "auffällig", value: "auffaellig" },
];

const kognition = ref({
  kognitiv: "",
  description: "",
  mms: { performed: false, score: "" },
  ut: { performed: false, score: "" },
  tmt: { performed: false, score_tmt_a: "", score_tmt_b: "" },
  neglect: { performed: false, score: "" },
});
/* populate fields with stored data */
onMounted(() => persistToLocalStorage(kognition, "kognition"));
/* use watch to retain inputted data via localStorage */
watch(
  kognition,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("kognition", JSON.stringify(kognition.value));
  },
  { deep: true },
  { immediate: true }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


label {
  margin-left: 6px;
}
</style>
