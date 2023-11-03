<template>
    <form @submit.prevent> <!-- without @submit.prevent the page will reload after every button clicked-->
        <h4 class="py-2">Neuro</h4>
       
    </form>

</template>


<script setup>
// access specific value with "vitals.value.[specificvalue]"
import { onMounted, ref, watch } from 'vue';
    const neuro = ref({
            bloodpressure_sys: "",
            bloodpressure_dia: "",
            pulse: '',
            puls_reg:  false,
            height: '',
            weight: '',
            az: true,
            bmi: null
        })

    /* populate fields with stored data */
    onMounted(() => 
        neuro.value = JSON.parse(localStorage.getItem('neuro')) || JSON.stringify(this.vitals.value)
    ) // TODO: throws "Uncaught TypeError" after emptied field, but still works...
    /* use watch to retain inputted data via localStorage */
    watch(neuro, () => {
        console.log("watcher triggered");
        localStorage.setItem('vitals', JSON.stringify(vitals.value));
            }, { deep: true }, { immediate: true }
        )


        
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=text] {
    width:80px;
}

</style>