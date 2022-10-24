import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { GetNotificationsReturnType, TestsReturnType, SetTestsParam, Test } from "../../utils";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Test"],

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

        getTest: builder.query<Test, String>({
            query: (name) => `/get-test/${name}`,
            providesTags: (result) => [{ type: "Test", id: result?.name }],
        }),

        setTests: builder.mutation<void | { error: String }, SetTestsParam>({
            query: (body) => ({
                url: "/set-tests",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Test"]
        }),

        getNotifications: builder.mutation<GetNotificationsReturnType, void>({
            query: () => "/get-notifications",
            invalidatesTags: (result, error, body) => {
                if (result?.testsToReload.length) return ["Test"];

                return [];
            }
        })
    })
});

export const {
    useLaunchTestsMutation,
    useGetTestQuery,
    useGetTestsQuery,
    useSetTestsMutation,
    useGetNotificationsMutation
} = apiSlice