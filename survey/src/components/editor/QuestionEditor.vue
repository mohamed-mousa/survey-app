<script setup>
import { ref, computed } from "vue";
import { useSurveyStore } from "@/stores/survey";

const store = useSurveyStore();
const questionTypes = computed(() => store.questionTypes);

const props = defineProps({
  question: Object,
  index: Number,
});

const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

const survey = ref(JSON.parse(JSON.stringify(props.question)));

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function shouldHaveOptions() {
  return ["select", "radio", "checkbox"].includes(survey.value.type);
}

function getOptions() {
  return survey.value.data.options;
}

function setOptions(options) {
  survey.value.data.options = options;
}

function addOption() {
  setOptions([...getOptions(), { uuid: uuidv4(), text: "" }]);
  dataChange();
}

function removeOption(op) {
  setOptions(getOptions().filter((opt) => opt !== op));
  dataChange();
}

function typeChange() {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
}

function dataChange() {
  const data = JSON.parse(JSON.stringify(survey.value));
  if (!shouldHaveOptions()) {
    delete data.data.options;
  }
}
</script>
<template>
  <div
    class="px-4 py-5 mb-3 bg-white space-y-6 sm:p-6 shadow sm:rounded-md sm:overflow-hidden"
  >
    <!-- question index -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-bold">{{ index + 1 }}. {{ survey.question }}</h3>
      <div class="flex items-center">
        <!-- add new question -->
        <button
          type="button"
          @click="addQuestion"
          class="flex justify-center rounded-md border border-transparent bg-neutral-600 py-1 px-2 items-center text-sm font-medium text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 me-3 focus:ring-neutral-500 focus:ring-offset-2"
        >
          <fa icon="plus" class="me-2" />
          Add
        </button>
        <!-- add new question -->

        <!-- delete question -->
        <button
          type="button"
          @click="addQuestion"
          class="flex justify-center rounded-md border border-transparent bg-red-600 py-1 px-2 items-center text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <fa icon="trash-alt" class="me-2" />
          Delete
        </button>
        <!-- delete question -->
      </div>
    </div>
    <!-- question index -->

    <div class="grid gap-3 grid-cols-12">
      <!-- question -->
      <div class="mt-3 col-span-9">
        <label
          :for="'question_text_' + survey.data"
          class="block text-sm font-medium text-gray-700"
          >Question Text</label
        >
        <input
          type="text"
          :name="'question_text_' + survey.data"
          :id="'question_text_' + survey.data"
          autocomplete="title"
          @change="dataChange"
          v-model="survey.data"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <!-- question -->

      <!-- question type -->
      <div class="mt-3 col-span-3">
        <label
          for="question_type"
          class="block text-sm font-medium text-gray-700"
          >Select Question Type</label
        >
        <select
          id="question_type"
          name="question_type"
          @change="typeChange"
          v-model="survey.type"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          <option
            v-for="questionType in questionTypes"
            :key="questionType"
            :value="questionType"
          >
            {{ upperCaseFirst(questionType) }}
          </option>
        </select>
      </div>
      <!-- question type -->
    </div>

    <!-- question description -->
    <div class="mt-3 col-span-9">
      <label
        :for="'question_description_' + survey.id"
        class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <div class="mt-1">
        <textarea
          :id="'question_description_' + survey.id"
          :name="'question_description_' + survey.id"
          rows="3"
          @change="dataChange"
          v-model="survey.description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
    </div>
    <!-- question description -->

    <!-- data -->
    <div>
      <div v-if="shouldHaveOptions()" class="mt-2">
        <h4
          class="text-sm font-semibold mb-1 flex justify-between items-center"
        >
          Options
          <button
            type="button"
            @click="addOption()"
            class="flex justify-center rounded-md border border-transparent bg-neutral-600 py-1 px-2 items-center text-sm font-medium text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 ms-3 focus:ring-neutral-500 focus:ring-offset-2"
          >
            <fa icon="plus" class="me-2" />
            Add Options
          </button>
        </h4>

        <div
          v-if="!survey.data.options.length"
          class="text-center to-gray-600 py-3"
        >
          You don't have any Options created
        </div>
        <div
          v-else
          v-for="(option, index) in survey.data.options"
          :key="option.uuid"
          class="flex items-center mb-1"
        >
          <span class="w-6 text-sm">{{ index + 1 }}</span>
          <input
            type="text"
            v-model="option.text"
            @change="dataChange"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <!-- delete question -->
          <button
            type="button"
            @click="removeOption(option)"
            class="flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-2 items-center font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ms-3"
          >
            <fa icon="trash-alt" />
          </button>
          <!-- delete question -->
        </div>
      </div>
    </div>
    <!-- data -->
  </div>
</template>
