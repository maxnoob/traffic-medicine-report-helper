<template>
    <FormCard>
      <h4 class="py-2">Hörvermögen</h4>
  
      <div class="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="hearingaid_checkbox"
          v-model="hearing.aid_present"
        />
        <label class="form-check-label" for="hearingaid_checkbox">Hörhilfe vorhanden</label>
      </div>
  
      <div v-if="hearing.aid_present">
        <div>
          <label>Hörhilfe bei Untersuchung:</label>
          <RadioInputGroup
        v-model="hearing.aidOption"
        vertical
        name="hearing_aidOption"
        :options="hearing_aidOption"
          />
            </div>
      </div>
        <!-- Conditionally show three radio buttons when "Cochlea Implantat" is selected -->
        <div v-if="hearing.aidOption === 'cochlea_implantat'">
          <!-- Your additional radio buttons go here -->
          <div class="d-flex py-2">
            <label>Seite:</label>
            <RadioInputGroup
              v-model="hearing.placement"
              name="placement"
              :options="placement"
            />
          </div>
        </div>
  
  
        <div v-if="hearing.aidOption === 'hoergeraet'">
          <!-- Your additional radio buttons go here -->
          <div class="d-flex py-2">
            <label>Seite:</label>
            <RadioInputGroup
              v-model="hearing.placement"
              name="placement"
              :options="placement"
            />
          </div>
  
      </div>
  
      <div class="py-2">
          <label>Konversationssprache 3m beidseits:</label>
          <RadioInputGroup
              v-model="hearing.conversation_3m"
              name="conversation_3m"
              :options="conversation_3m"
            />
          </div>
  
  
       <!-- Options when Conversation 3m is not possible -->
       <div v-if="hearing.conversation_3m === 'impossible'">
            <div>
              <label>Weber Test:</label>
      <RadioInputGroup
        v-model="hearing.weberTest"
        vertical
        name="weberTest"
        :options="weberTest_Options"
      />
    </div>
            <div>
              <label>Rinne Test:</label>
      <RadioInputGroup
        v-model="hearing.rinneTest"
        vertical
        name="rinneTest"
        :options="rinneTest_Options"
      />
    </div>
    
          </div>
  
    </FormCard>
  </template>
  
  <script setup>
  import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
  import { onMounted, ref, watch } from "vue";
  import persistToLocalStorage from "@/utils/persistToLocalStorage";
  import FormCard from "./FormCard.vue";
import RadioInputGroupColumn from "./InputComponents/RadioInputGroupColumn.vue";
  
  const hearing_aidOption = [
  { label: "Hörgerät", value: "hoergeraet" },
    { label: "Cochlea Implantat", value: "cochlea_implantat" },
  ];
  
  const placement = [
    { label: "rechts", value: "rechts" },
    { label: "links", value: "links" },  // Fix: Correct 'links' value
    { label: "beidseitig", value: "beidseitig" },
  ];
  
  const conversation_3m = [
    { label: "möglich", value: "possible" },
    { label: "nicht möglich", value: "impossible" },
  ];
  
  const weberTest_Options = [
    { label: "Mittig", value: "mittig" },
    { label: "Rechts lateral", value: "rechts_lateral" },
    { label: "Links lateral", value: "links_lateral" }, 
  ];
  
  const rinneTest_Options = [
    { label: "positiv rechts", value: "positiv_rechts" },
    { label: "negativ rechts", value: "negativ_rechts" },
    { label: "positiv links", value: "positiv_links" }, 
    { label: "negativ links", value: "negativ_links" }, 
  
  
  ];
  
  
  
  const hearing = ref({
    aid_present: false,
    aidOption: "",
    placement: "",
    weberTest: "",
    conversation_3m: "",
  });
  
  onMounted(() => persistToLocalStorage(hearing, "hearing"));
  watch(
    hearing,
    () => {
      console.log("watcher triggered");
      localStorage.setItem("hearing", JSON.stringify(hearing.value));
    },
    { deep: true },
    { immediate: true }
  );
  </script>
  
  <style scoped>
  /* Your styles go here */
  </style>