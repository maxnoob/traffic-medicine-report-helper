
<template>
     <form @submit.prevent class="shadow p-3 mb-4 rounded px-4 cstm-card card-color-bright">
        <!-- without @submit.prevent the page will reload after every button clicked-->
        <slot></slot>
        <!-- <slot> is placeholder for content -->
     </form>
</template>

<slot></slot>

<script setup>
function changeColor() {
// TODO: implement changing of card background to card-color-dark when toggled in app.vue
}
</script>

<style scoped>
.cstm-card {
   margin-right: 2.5rem;
   max-width: 80rem;
}

.card-color-bright {
   background-color: white;
}

.card-color-dark {
   background-color: #121212;
}

</style>
 