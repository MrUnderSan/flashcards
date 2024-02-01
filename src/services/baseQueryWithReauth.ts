// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { Mutex } from 'async-mutex'

import { baseQuery } from './baseQuery'

// create a new mutex
const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        // try to get a new token
        const refreshResult = await baseQuery(
          { method: 'POST', url: '/v1/auth/refresh-token' },
          api,
          extraOptions
        )

        if (refreshResult.meta?.response?.status === 204) {
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          // await router.navigate(ROUTES.signIn)
          // toast.error('You are not authorized')
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
