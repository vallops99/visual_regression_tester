import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { GetNotificationsReturnType, TestsReturnType, SetTestsParam, Test } from "../../utils";

export const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ["Tests"],

    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    endpoints: builder => ({
        launchTests: builder.mutation<Test[], void>({
            query: () => ({
                url: "/launch-tests",
                method: "POST",
            })
        }),

        getTest: builder.query<TestsReturnType, void>({
            query: () => `/get-test`,
            providesTags: ["Tests"],
        }),

        getTestByName: builder.query<Test, String>({
            query: (name) => `/get-test/${name}`,
            providesTags: ["Tests"]
        }),

        setTests: builder.mutation<void | { error: String }, SetTestsParam>({
            query: (body) => ({
                url: "/set-tests",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Tests"],
        }),

        getNotifications: builder.mutation<GetNotificationsReturnType, void>({
            query: () => "/get-notifications",
            invalidatesTags: (result) => {
                if (result?.areTestsDone) {
                    return ["Tests"];
                }
                return [];
            }
        })
    })
});

export const {
    useLaunchTestsMutation,
    useGetTestQuery,
    useGetTestByNameQuery,
    useSetTestsMutation,
    useGetNotificationsMutation
} = apiSlice