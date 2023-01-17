<script setup>
import authHeader from "@/components/AuthHeader.vue";
import { computed } from "vue";
import { useSurveyStore } from "@/stores/survey";
const store = useSurveyStore();
const surveys = computed(() => store.surveys);

function deleteSurvey(survey) {
  if (confirm("You want to delete this survey")) {
    console.log("🚀 ~ file: Surveys.vue:9 ~ deleteSurvey ~ survey", survey);
  }
}
</script>
<template>
  <auth-header>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1
          class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-300"
        >
          Survey
        </h1>
        <router-link
          :to="{ name: 'Create' }"
          class="bg-emerald-500 py-2 px-3 rounded-md hover:bg-emerald-600 text-white"
        >
          <fa icon="plus" />

          Add new survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-col-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
      <div
        class="border bg-white dark:bg-slate-800 dark:border-slate-800 hover:bg-gray-50 md:flex md:justify-start p-3 rounded-lg shadow-sm relative"
        v-for="survey in surveys"
        :key="survey.id"
      >
        <img
          class="md:w-48 md:h-auto rounded-md md:mr-3"
          :src="survey.image"
          :alt="survey.title"
        />
        <div>
          <div class="flex justify-between items-center">
            <span>
              <span class="text-slate-900 dark:text-slate-300">{{
                survey.created_at
              }}</span>
            </span>
            <span
              class="rounded-md px-2 py-1 capitalize z-10 text-sm inline-block my-3 md:my-0"
              :class="
                survey.status === 'active'
                  ? 'bg-green-200 text-green-500'
                  : 'bg-red-200 text-red-500'
              "
            >
              {{ survey.status }}
            </span>
          </div>
          <h2
            class="text-2xl md:mt-3 text-slate-900 dark:text-slate-300 capitalize"
          >
            {{ survey.title }}
          </h2>
          <p class="text-1xl my-3 text-slate-900 dark:text-slate-300">
            {{ survey.description }}
          </p>
          <div class="text-slate-900 dark:text-slate-300 mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 inline-block mr-2 fill-slate-600 dark:fill-slate-300"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="capitalize mr-2">expire at</span>
            <span class="font-bold">{{ survey.created_at }}</span>
          </div>
          <div>
            <router-link
              :to="{ name: 'Show', params: { id: survey.id } }"
              class="bg-blue-600 mr-4 rounded-md text-white hover:bg-blue-700 px-4 py-2"
            >
              <fa icon="fas fa-edit" class="text-lg" />
            </router-link>

            <button
              @click="deleteSurvey(survey.id)"
              class="bg-red-600 rounded-md text-white hover:bg-red-700 px-4 py-2"
            >
              <fa icon="fas fa-trash-alt" class="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </auth-header>
</template>
