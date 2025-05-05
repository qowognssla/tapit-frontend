<template>
  <form>
    <div>
      <label class="block mb-2 text-indigo-500" for="username">Username</label>
      <input
        class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
        type="text"
        name="username"
      />
    </div>
    <div>
      <label class="block mb-2 text-indigo-500" for="password">Password</label>
      <input
        class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
        type="password"
        name="password"
      />
    </div>
    <div>
      <input
        class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
        type="submit"
      />
    </div>
  </form>
  <footer>
    <router-link class="text-indigo-700 hover:text-pink-700 text-sm float-left" to="/find">
      Forgot Password?
    </router-link>
    <a class="text-indigo-700 hover:text-pink-700 text-sm float-right" href="#">Create Account</a>
  </footer>
</template>
