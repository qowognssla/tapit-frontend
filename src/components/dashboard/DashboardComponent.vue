<template>
  <div class="p-6 bg-white shadow rounded-lg relative space-y-6">
    <div class="flex justify-between items-center">
      <input
        v-model="keyword"
        type="text"
        placeholder="Search stores..."
        class="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
      />
      <button
        @click="showAddModal = true"
        class="ml-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
      >
        Add Store
      </button>
    </div>

    <div class="overflow-x-auto rounded-lg shadow bg-white">
      <table class="min-w-full text-sm whitespace-nowrap">
        <thead class="bg-gray-50 text-gray-700 border-b text-xs uppercase">
          <tr>
            <th
              class="px-4 py-2 min-w-[100px] text-center cursor-pointer"
              @click="setSort('storeId')"
            >
              ID
            </th>
            <th class="px-4 py-2 min-w-[120px] text-center cursor-pointer" @click="setSort('name')">
              Name
            </th>
            <th
              class="px-4 py-2 min-w-[120px] text-center cursor-pointer"
              @click="setSort('owner')"
            >
              Owner
            </th>
            <th class="px-4 py-2 min-w-[150px] text-center">Managers</th>
            <th class="px-4 py-2 min-w-[120px] text-center">Phone</th>
            <th class="px-4 py-2 min-w-[150px] text-center">Address</th>
            <th class="px-4 py-2 min-w-[100px] text-center">Status</th>
            <th class="px-4 py-2 min-w-[130px] text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="store in filtered"
            :key="store._id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-4 py-2">{{ store.storeId }}</td>
            <td class="px-4 py-2">{{ store.name }}</td>
            <td class="px-4 py-2">{{ store.owner }}</td>
            <td class="px-4 py-2">
              {{ store.managers?.map((m) => m.name).join(', ') || '-' }}
            </td>
            <td class="px-4 py-2">{{ store.phone || '-' }}</td>
            <td class="px-4 py-2">{{ store.address || '-' }}</td>
            <td class="px-4 py-2">{{ store.status }}</td>
            <td class="px-4 py-2 space-x-2">
              <button class="px-2 py-1 bg-blue-500 text-white rounded" @click="editStore(store)">
                Edit
              </button>
              <button
                class="px-2 py-1 bg-red-500 text-white rounded"
                @click="removeStore(store._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <EditStoreModal v-if="editTarget" :store="editTarget" @close="editTarget = null" />

    <!-- Add Modal -->
    <AddStoreModal v-if="showAddModal" @close="showAddModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMerchantStore } from '@/stores/merchant'
import type { StoreDTO } from '@/stores/merchant'

import AddStoreModal from '@/components/dashboard/AddStoreModal.vue'
import EditStoreModal from '@/components/dashboard/EditStoreModal.vue'

const merchantStore = useMerchantStore()
const keyword = ref('')
const selectedSortField = ref<'name' | 'storeId' | 'owner'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
const showAddModal = ref(false)
// ❗ editTarget을 StoreDTO|null로 선언
const editTarget = ref<StoreDTO | null>(null)

onMounted(() => {
  merchantStore.fetchAll()
})

const filtered = computed(() => {
  let arr = [...merchantStore.list]
  if (keyword.value) {
    const term = keyword.value.toLowerCase()
    arr = arr.filter((s) =>
      (s[selectedSortField.value] ?? '').toString().toLowerCase().includes(term),
    )
  }
  return arr.sort((a, b) => {
    const av = (a[selectedSortField.value] ?? '').toString().toLowerCase()
    const bv = (b[selectedSortField.value] ?? '').toString().toLowerCase()
    return sortOrder.value === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })
})

function setSort(field: typeof selectedSortField.value) {
  if (selectedSortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    selectedSortField.value = field
    sortOrder.value = 'asc'
  }
}

// ❗ 모달 오픈
function editStore(store: StoreDTO) {
  editTarget.value = store
}

// ❗ 삭제 후 fetchAll() 호출
async function removeStore(id: string) {
  if (confirm('Are you sure you want to delete this store? ')) {
    await merchantStore.removeOne(id)
    await merchantStore.fetchAll()
  }
}
</script>

<style scoped>
.table th {
  cursor: pointer;
}
</style>
