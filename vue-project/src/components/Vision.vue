<template>
    <form @submit.prevent> <!-- without @submit.prevent the page will reload after every button clicked-->

        <h4 class="py-2">Sehvermögen</h4>

        <input type="checkbox" v-model="vision_aid_present"> Sehhilfe vorhanden

        <div class="row d-inline-flex py-2">
            <label>Visus unkorrigiert:</label>
            <div class="row">
                <div class="col">
                    <input type="text" placeholder="rechts" v-model="bloodpressure_sys">
                </div>
                <div class="col">
                    <input type="text" placeholder="links" v-model="bloodpressure_dia" style="margin-left: -60px; margin-right: 50px;">
                </div>
            </div>
        </div>

        <div v-if="vision_aid_present" id="vision_corrected" class="row d-inline-flex py-2 vision_extended">
            <div class="col">
                <label>Visus korrigiert:</label>
            <div class="row">
                <div class="col">
                    <input type="text" placeholder="rechts" v-model="bloodpressure_sys">
                </div>
            </div>
            <div class="col">
                <input type="text" placeholder="links" v-model="bloodpressure_dia" >
            </div>
            </div>
        </div>

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

<script>
import { ref } from 'vue';
export default {
    data() {
        return {
            vision_aid_present: false
        }
    }
}
</script>

<script setup>




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=text] {
    width:80px;
}
/*   form {
    max-width: 420px;
    margin: 30px auto; /* centers */
    /*background: transparent;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
 */

</style>