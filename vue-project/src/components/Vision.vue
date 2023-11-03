<template>
    <form @submit.prevent> <!-- without @submit.prevent the page will reload after every button clicked-->

        <h4 class="py-2">Sehvermögen</h4>

        <input type="checkbox" v-model="vision.aid_present"> Sehhilfe vorhanden

        <div class="row d-inline-flex py-2">
            <label>Visus unkorrigiert:</label>
            <div class="row">
                <div class="col">
                    <input type="text" placeholder="rechts" v-model="vision.uncorr_re">
                </div>
                <div class="col">
                    <input type="text" placeholder="links" v-model="vision.uncorr_li" style="margin-left: -60px; margin-right: 50px;">
                </div>
            </div>
        </div>

        <div v-if="vision.aid_present" id="vision_corrected" class="row d-inline-flex py-2 vision_extended">
            <div class="col">
                <label>Visus korrigiert:</label>
            <div class="row">
                <div class="col">
                    <input type="text" placeholder="rechts" v-model="vision.corr_re">
                </div>
            </div>
            <div class="col">
                <input type="text" placeholder="links" v-model="vision.corr_li" >
            </div>
            </div>
        </div>
        <select v-model="vision_corr_re">
            <option value="na"></option>
            <option value=1>1</option>
            <option value=1.25>1.25</option>
        </select>
        <div class="row py-2">
            <div id="vis_field"></div>
        </div>

        <div class="row py-2">
            <div id="pupil"></div>
        </div>

        <div class="row py-2">
            <div id="nystag"></div>
        </div>

        <div class="row py-2">
            <div id="eye_motility"></div>
        </div>

        <div class="row py-2">
            <div id="lang_stereo"></div>
        </div>

    </form>

</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
    const vision = ref({uncorr_re: "", uncorr_li: "", aid_present: false})
/* populate fields with stored data */
    onMounted(() => 
        vision.value = JSON.parse(localStorage.getItem('vision')) || JSON.stringify(this.vision.value)
    ) // TODO: throws "Uncaught TypeError" after emptied field, but still works...
    /* use watch to retain inputted data via localStorage */
    watch(vision, () => {
        console.log("watcher triggered");
        localStorage.setItem('vision', JSON.stringify(vision.value));
            }, { deep: true }, { immediate: true }
        )
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=text] {
    width:80px;
}

</style>