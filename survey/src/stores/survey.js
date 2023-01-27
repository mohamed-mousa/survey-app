import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import router from "@/router/index";
import api from '@/axios'

export const useSurveyStore = defineStore("survey", () => {
  const surveys = reactive([
    {
      id: 1,
      title: "title title title title",
      slug: "slug-slug-slug-slug-slug-slug-slug",
      status: "draft",
      image: "https://api.lorem.space/image/book?w=400&h=400&hash=rg3pak4w",
      description:
        "description description description description description description description description",
      created_at: "2021-10-20",
      updated_at: "2021-10-20",
      expire_at: "2021-10-30",
      questions: [
        {
          id: 11,
          type: "select",
          question: "question question question question?",
          description: null,
          data: {
            options: [
              {
                uuid: "f613e1ad-7941-4750-b271-77a1fb2dc6f9",
                text: "option 1",
              },
              {
                uuid: "32769efb-2b6b-4c2f-9c94-9d183fc3c374",
                text: "option 2",
              },
              {
                uuid: "3a70e5c3-a7b1-4c9b-b878-d1f349e0c673",
                text: "option 3",
              },
              {
                uuid: "81ca3a97-f705-4656-b370-0158ac8017ee",
                text: "option 4",
              },
            ],
          },
        },
        {
          id: 12,
          type: "checkbox",
          question: "question question question question?",
          description:
            "description description description description description description",
          data: {
            options: [
              {
                uuid: "f86363bf-8b6a-4f5f-bfe1-1b1b53fd5b3a",
                text: "option 1",
              },
              {
                uuid: "4955e15c-3687-48f2-801c-0208512a953e",
                text: "option 2",
              },
              {
                uuid: "5ee90a29-f7df-4349-bfdc-d8ac2e007c1e",
                text: "option 3",
              },
              {
                uuid: "0f490c35-c805-48b0-aeec-f65238ae68cc",
                text: "option 4",
              },
            ],
          },
        },
        {
          id: 13,
          type: "radio",
          question: "question question question question?",
          description:
            "description description description description description description",
          data: {
            options: [
              {
                uuid: "80fc5776-c67d-445c-b0df-ea63091966b4",
                text: "option 1",
              },
              {
                uuid: "59895704-784e-4a82-8af5-ebaa8c28b3c6",
                text: "option 2",
              },
              {
                uuid: "2347e881-c4ef-4b84-a4a0-ed7f4579ec78",
                text: "option 3",
              },
              {
                uuid: "5c04f4a4-b3bf-408c-b7ff-06c6bd121af7",
                text: "option 4",
              },
            ],
          },
        },
        {
          id: 14,
          type: "text",
          question: "question question question question?",
          description: null,
          data: {},
        },
        {
          id: 15,
          type: "textarea",
          question: "question question question question?",
          description: null,
          data: {},
        },
      ],
    },
    {
      id: 2,
      title: "title title title title",
      slug: "slug-slug-slug-slug-slug-slug-slug",
      status: "draft",
      image: "https://api.lorem.space/image/car?w=400&h=400&hash=3ppze4xh",
      description:
        "description description description description description description description description",
      created_at: "2021-10-20",
      updated_at: "2021-10-20",
      expire_at: "2021-10-30",
      questions: [],
    },
    {
      id: 3,
      title: "title title title title",
      slug: "slug-slug-slug-slug-slug-slug-slug",
      status: "active",
      image: "https://api.lorem.space/image/movie?w=400&h=400&hash=xf7bmfns",
      description:
        "description description description description description description description description",
      created_at: "2021-10-20",
      updated_at: "2021-10-20",
      expire_at: "2021-10-30",
      questions: [],
    },
  ]);

  const questionTypes = ["text", "textarea", "select", "radio", "checkbox"];

  async function saveSurvey(survey) {
    let response;
    if (survey.id) {
      response = await api.put(`survey/${survey.id}`, survey)
      surveys = response.data.data
    } else {
      response = await api.post('survey', survey)
      surveys = surveys.map((s) => {
        if (s.id === survey.data.id) {
          return survey.data
        }
        return s
      })
    }

    router.push({ name: "Show", params: { id: response.data.data.id } })


  }

  return { surveys, questionTypes, saveSurvey };
});
