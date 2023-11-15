<template>
    <form @submit.prevent class="shadow p-3 mb-5 bg-white rounded px-4">
      <!-- without @submit.prevent the page will reload after every button clicked-->
  
      <h4 class="py-2">Atem- und Bauchorganerkrankungen</h4>
  
      <RadioInputGroup
        v-model="airway_intestine.problem"
        name="problem"
        :options="nichtvorhanden_vorhandenOptions"
      />
  
      <div v-if="airway_intestine.problem == 'vorhanden'">
        <Input type="text" v-model="airway_intestine.description"/>
      </div>
  
    </form>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from "vue";
  import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
  
  
  const nichtvorhanden_vorhandenOptions = [
    { label: "nicht vorhanden", value: "nichtvorhanden" },
    { label: "vorhanden", value: "vorhanden" },
  ];
  
  
  const airway_intestine = ref({
    problem: "",
    description: "",
  });
  /* populate fields with stored data */
  onMounted(
    () =>
      (airway_intestine.value =
        JSON.parse(localStorage.getItem("airway_intestine")) ||
        JSON.stringify(this.airway_intestine.value))
  ); // TODO: throws "Uncaught TypeError" after emptied field, but still works...
  /* use watch to retain inputted data via localStorage */
  watch(
    airway_intestine,
    () => {
      console.log("watcher triggered");
      localStorage.setItem("airway_intestine", JSON.stringify(airway_intestine.value));
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
  
  
  label {
    margin-left: 6px;
  }
  </style>