import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
    Test,
    BaseTest,
    AddStepType,
    SetTestsParam,
    TestsReturnType,
    GetLastStepIdReturnType,
    GetNotificationsReturnType,
    Step,
} from "../../utils";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Test", "StepId"],

    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),

    endpoints: builder => ({
        launchTests: builder.mutation<Test[], void>({
            query: () => ({
                url: "/launch-tests",
                method: "POST",
            })
        }),

        getTests: builder.query<TestsReturnType, void>({
            query: () => `/get-tests`,
            providesTags: ["Test"],
        }),

        getTest: builder.query<Test, string>({
            query: (name) => `/get-test/${name}`,
            providesTags: (result) => [{ type: "Test", id: result?.name }],
        }),

        setTests: builder.mutation<void | { error: string }, SetTestsParam>({
            query: (body) => ({
                url: "/set-tests",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Test", "StepId"]
        }),

        createTest: builder.mutation<void, BaseTest>({
            query: (body) => ({
                url: "/create-test",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Test", "StepId"],
        }),

        deleteTest: builder.mutation<void, { name: string }>({
            query: (body) => ({
                url: "/delete-test",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Test", "StepId"],
        }),

        getNotifications: builder.mutation<GetNotificationsReturnType, void>({
            query: () => "/get-notifications",
            invalidatesTags: (result, error, body) => {
                if (result?.testsToReload.length) return ["Test"];

                return [];
            }
        }),

        updateOrCreateStep: builder.mutation<void, AddStepType>({
            query: (body) => ({
                url: "/set-step",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Test", "StepId"],
        }),

        reorderSteps: builder.mutation<void, Step[]>({
            query: (body) => ({
                url: "/reorder-steps",
                method: "PUT",
                body,
            }),
        }),

        deleteStep: builder.mutation<void, { id: number }>({
            query: (body) => ({
                url: "/delete-step",
                method: "DELETE",
                body,
            }),
            invalidatesTags: ["Test", "StepId"],
        }),

        getLastStepId: builder.query<GetLastStepIdReturnType, void>({
            query: () => "/get-last-step-id",
            providesTags: ["StepId"],
        }),
    })
});

export const {
    useGetTestQuery,
    useGetTestsQuery,
    useGetLastStepIdQuery,

    useSetTestsMutation,
    useCreateTestMutation,
    useDeleteStepMutation,
    useDeleteTestMutation,
    useLaunchTestsMutation,
    useReorderStepsMutation,
    useGetNotificationsMutation,
    useUpdateOrCreateStepMutation,
} = apiSlice