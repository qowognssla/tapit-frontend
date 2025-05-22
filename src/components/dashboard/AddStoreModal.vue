<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
    <div class="absolute inset-0 bg-black opacity-25"></div>

    <div class="bg-white rounded-lg max-w-lg w-full mx-4 p-6 shadow-lg z-10">
      <h2 class="text-xl font-semibold mb-4">Add New Store</h2>
      <form @submit.prevent="confirm" class="space-y-3">
        <input
          v-model="form.storeId"
          type="text"
          placeholder="Store ID"
          class="w-full border rounded px-3 py-2"
          required
        />
        <input
          v-model="form.name"
          type="text"
          placeholder="Name"
          class="w-full border rounded px-3 py-2"
          required
        />
        <input
          v-model="form.owner"
          type="text"
          placeholder="Owner"
          class="w-full border rounded px-3 py-2"
          required
        />
        <input
          v-model="form.phone"
          type="text"
          placeholder="Phone"
          class="w-full border rounded px-3 py-2"
        />
        <input
          v-model="form.address"
          type="text"
          placeholder="Address"
          class="w-full border rounded px-3 py-2"
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="w-full border rounded px-3 py-2"
          required
        />

        <select v-model="form.status" class="w-full border rounded px-3 py-2">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="dormant">Dormant</option>
          <option value="terminated">Terminated</option>
        </select>

        <div class="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useMerchantStore } from '@/stores/merchant'
import type { StoreDTO } from '@/stores/merchant'

const emit = defineEmits(['close'])
const merchantStore = useMerchantStore()

const form = reactive<Partial<StoreDTO> & { password: string }>({
  storeId: '',
  name: '',
  owner: '',
  phone: '',
  address: '',
  password: '',
})

async function confirm() {
  await merchantStore.addOne({ ...form })
  emit('close')
}
</script>
