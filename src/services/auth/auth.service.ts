import {
  LoginArgs,
  RecoverPasswordArgs,
  ResendCheckEmailArgs,
  SignUpArgs,
  User,
} from '@/services/auth'
import { baseApi } from '@/services/baseApi'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      checkEmail: builder.mutation<void, { code: string }>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/verify-email',
        }),
      }),
      createAccessToken: builder.mutation<void, void>({
        query: () => ({ method: 'POST', url: '/v1/auth/refresh-token' }),
      }),
      getMe: builder.query<User | undefined, void>({
        providesTags: ['Me'],
        query: () => '/v1/auth/me',
      }),
      login: builder.mutation<void, LoginArgs>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        query: () => ({ method: 'POST', url: '/v1/auth/logout' }),
      }),
      recoverPassword: builder.mutation<void, RecoverPasswordArgs>({
        query: args => ({ body: args, method: 'POST', url: '/v1/auth/recover-password' }),
      }),
      resendCheckEmail: builder.mutation<void, ResendCheckEmailArgs>({
        query: args => ({ body: args, method: 'POST', url: '/v1/auth/resend-verification-email' }),
      }),
      resetPassword: builder.mutation<void, { password: string; token: string }>({
        query: ({ password, token }) => ({
          body: { password },
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }),
      }),
      signUp: builder.mutation<User, SignUpArgs>({
        query: args => ({ body: args, method: 'POST', url: '/v1/auth/sign-up' }),
      }),
      updateProfile: builder.mutation<User, FormData>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'PATCH',
          url: '/v1/auth/me',
        }),
      }),
    }
  },
})

export const {
  useCheckEmailMutation,
  useCreateAccessTokenMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRecoverPasswordMutation,
  useResendCheckEmailMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
} = authService
