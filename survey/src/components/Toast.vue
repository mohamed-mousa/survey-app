<template>
<div v-if="message" 
:class="{'bg-teal-100 border-teal-500 text-teal-900' : type === 'success', 'bg-red-100 border-red-500 text-red-900' : type === 'error' }"  
class=" border-t-4 rounded-b px-4 py-3 shadow-sm" role="alert">
  <div class="flex">
    <div class="py-1">

    <svg v-if="type === 'error'" class="stroke-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>


    <svg v-if="type === 'success'" class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
  <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
</svg>


    </div>
    <div>
      <p class="text-sm">{{message}}</p>
    </div>
  </div>
</div>
</template>

<script setup>
  const props = defineProps({
    message: String,
    type: String
  });
</script>
