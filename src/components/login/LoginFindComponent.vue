<template>
  <main id="content" role="main" class="w-full max-w-md mx-auto p-1 rounded-xl shadow-2xl">
    <div class="mt-7 bg-white">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800">비밀번호를 잊으셨나요?</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            비밀번호를 아시나요?
            <RouterLink
              to="/login"
              class="text-blue-600 decoration-2 hover:underline font-medium"
              href="#"
            >
              Login here
            </RouterLink>
          </p>
        </div>

        <div class="mt-5">
          <form>
            <div class="grid gap-y-4">
              <div>
                <label for="email" class="block text-sm font-bold ml-1 mb-2">Email</label>
                <div class="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm dark:text-white"
                    required
                    aria-describedby="email-error"
                  />
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">
                  Please include a valid email address so we can get back to you
                </p>
              </div>
              <button
                type="submit"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-slate-700 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                비민번호 초기화
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <p
      class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700"
    >
      <!--
      <a
        class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
        href="#"
      >
        Contact us!
      </a>
      -->
    </p>
  </main>
</template>
