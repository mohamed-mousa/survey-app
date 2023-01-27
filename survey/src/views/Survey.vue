<script setup>
import authHeader from "@/components/AuthHeader.vue";
import QuestionEditor from "@/components/editor/QuestionEditor.vue";
import { useRoute } from "vue-router";
import router from "@/router/index";
import { useSurveyStore } from "@/stores/survey";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const store = useSurveyStore();
const route = useRoute();
const survey = ref({
  title: "",
  status: false,
  image: null,
  description: null,
  expire_at: null,
  questions: [],
});

if (route.params.id) {
  survey.value = store.surveys.find((s) => s.id == route.params.id);
}

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  };

  survey.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  survey.value.questions = survey.value.questions.filter((q) => q !== question);
}

function questionChange(question) {
  survey.value.questions = survey.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

function saveSurvey() {
  store.saveSurvey(survey.value);
}
</script>
<template>
  <auth-header>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1
          class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-300"
        >
          {{ survey.id ? survey.title : "Create a survey" }}
        </h1>
      </div>
    </template>

    <!-- <pre class="bg-white space-y-6 p-6 shadow rounded-md mb-8">
      {{ survey }}
    </pre> -->
    <form @submit.prevent="saveSurvey">
      <div class="sm:overflow-hidden">
        <!-- survey fields -->
        <div class="shadow sm:rounded-md sm:overflow-hidden mb-8">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <!-- image -->
            <div>
              <label class="mt-1 flex items-center">
                <img
                  :src="survey.image"
                  :alt="survey.title"
                  v-if="survey.image"
                  class="w-64 h-48 object-cover"
                />
                <div v-else>
                  <label class="block text-sm font-medium text-gray-700"
                    >Photo</label
                  >
                  <div class="mt-1 flex items-center">
                    <span
                      class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100"
                    >
                      <svg
                        class="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                    <button
                      type="button"
                      class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative"
                    >
                      <input
                        type="file"
                        class="absolute inset-0 cursor-pointer opacity-0"
                      />
                      Change
                    </button>
                  </div>
                </div>
              </label>
            </div>
            <!-- image -->

            <!-- title -->
            <div class="col-span-6 sm:col-span-3">
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Tile</label
              >
              <input
                type="text"
                name="title"
                id="title"
                autocomplete="title"
                v-model="survey.title"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <!-- title -->

            <!-- description -->
            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
              >
              <div class="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  v-model="survey.description"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <!-- description -->

            <!-- expire date -->
            <div class="col-span-6 sm:col-span-3">
              <label
                for="expire_at"
                class="block text-sm font-medium text-gray-700"
                >Expire date</label
              >
              <input
                type="date"
                name="expire_at"
                id="expire_at"
                autocomplete="expire_at"
                v-model="survey.expire_at"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <!-- expire date -->

            <!-- status -->
            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input
                  id="status"
                  name="status"
                  v-model="survey.status"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium text-gray-700"
                  >Active</label
                >
              </div>
            </div>
            <!-- status -->
          </div>
        </div>

        <!-- questions  -->
        <div>
          <div
            class="px-4 py-5 bg-white space-y-6 sm:p-6 shadow sm:rounded-md sm:overflow-hidden mb-4"
          >
            <h3
              class="text-2xl font-semibold flex items-center justify-between"
            >
              Questions
              <button
                type="button"
                class="flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 items-center text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <fa icon="plus" class="me-2" />
                Add Question
              </button>
            </h3>
          </div>

          <div class="text-center to-gray-600" v-if="!survey.questions.length">
            You don't have any Questions created
          </div>

          <div v-for="(question, index) in survey.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div>
        </div>

        <!-- Save -->
        <div class="bg-gray-50 py-3 text-right">
          <button
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Survey
          </button>
        </div>
      </div>
    </form>
  </auth-header>
</template>
