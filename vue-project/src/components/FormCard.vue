
<template>
     <form @submit.prevent class="shadow p-3 mb-5 bg-white rounded px-4">
        <!-- without @submit.prevent the page will reload after every button clicked-->
        <slot></slot>
        <!-- <slot> is placeholder for content -->
     </form>
</template>
<slot></slot>