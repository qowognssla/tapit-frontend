<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur">
    <div class="bg-white rounded-lg shadow max-w-md w-full p-6">
      <h2 class="text-xl font-semibold mb-4">Edit Store</h2>
      <form @submit.prevent="confirm" class="space-y-3">
        <div>
          <label class="block text-sm font-medium">Store ID</label>
          <input
            v-model="form.storeId"
            type="text"
            class="w-full border rounded px-3 py-2"
            disabled
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Name</label>
          <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label class="block text-sm font-medium">Owner</label>
          <input
            v-model="form.owner"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium">Phone</label>
          <input v-model="form.phone" type="text" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium">Address</label>
          <input v-model="form.address" type="text" class="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label class="block text-sm font-medium">Status</label>
          <select v-model="form.status" class="w-full border rounded px-3 py-2">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="dormant">Dormant</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
        <div class="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useMerchantStore } from '@/stores/merchant'
import type { StoreDTO } from '@/stores/merchant'

const props = defineProps<{ store: StoreDTO }>()
const emit = defineEmits(['close'])

const merchantStore = useMerchantStore()

// form 초기화
const form = reactive<Partial<StoreDTO>>({
  storeId: props.store.storeId,
  name: props.store.name,
  owner: props.store.owner,
  phone: props.store.phone,
  address: props.store.address,
  status: props.store.status,
})

// props 변경 감지
watch(
  () => props.store,
  (s) => {
    form.storeId = s.storeId
    form.name = s.name
    form.owner = s.owner
    form.phone = s.phone
    form.address = s.address
    form.status = s.status
  },
)

async function confirm() {
  await merchantStore.updateOne(props.store._id, form)
  await merchantStore.fetchAll()
  emit('close')
}
</script>
