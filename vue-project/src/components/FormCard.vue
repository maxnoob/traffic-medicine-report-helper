
<template>
     <form @submit.prevent class="shadow p-3 mb-4 bg-white rounded px-4 cstm_card ">
        <!-- without @submit.prevent the page will reload after every button clicked-->
        <slot></slot>
        <!-- <slot> is placeholder for content -->
     </form>
</template>
<slot></slot>
<style scoped>
.cstm_card {
   margin-right: 2.5rem;
   max-width: 80rem;
}

</style>
 