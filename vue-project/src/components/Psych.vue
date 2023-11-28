<template>
    <FormCard>
      <h4 class="py-2">Psychische Störungen</h4>
  
      <div class="py-2">
        <label>psychisch:</label>
        <div>
          <input
            type="radio"
            id="nicht_auffaellig"
            value="nicht_auffaellig"
            v-model="psych.condition"
          />
          <label for="nicht_auffaellig">Nicht auffällig</label>
        </div>
  
        <div>
          <input
            type="radio"
            id="auffaellig"
            value="auffaellig"
            v-model="psych.condition"
          />
          <label for="auffaellig">Auffällig</label>
        </div>
      </div>
  
      <!-- Additional text field displayed when "Auffällig" is selected -->
      <div v-if="psych.condition === 'auffaellig'" class="py-2">
        <label for="additionalInfo">weitere Angaben:</label>
        <input
          type="text"
          id="additionalInfo"
          v-model="psych.info"
        />
      </div>
    </FormCard>
  </template>
  
  <script setup>

  import { onMounted, ref, watch } from "vue";
  import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
  import persistToLocalStorage from "@/utils/persistToLocalStorage";
  import FormCard from "./FormCard.vue";
  
  const psych = ref({
    condition: null,
    info: '',
  });

onMounted(
    () => persistToLocalStorage(psych, "psych")
    );

watch(
  psych,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("psych", JSON.stringify(psych.value));
  },
  { deep: true },
  { immediate: true }
);
</script>

  