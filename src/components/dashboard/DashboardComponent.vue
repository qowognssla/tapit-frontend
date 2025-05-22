<template>
  <div class="p-6 bg-white shadow rounded-lg relative">
    <div class="flex justify-between items-center">
      <input
        v-model="keyword"
        type="text"
        placeholder="Search stores..."
        class="input input-bordered"
      />
      <button @click="showAddModal = true" class="btn btn-primary">Add Store</button>
    </div>

    <table class="table w-full">
      <thead>
        <tr>
          <th @click="setSort('storeId')">ID</th>
          <th @click="setSort('name')">Name</th>
          <th @click="setSort('owner')">Owner</th>
          <th>Managers</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="store in filtered" :key="store._id">
          <td>{{ store.storeId }}</td>
          <td>{{ store.name }}</td>
          <td>{{ store.owner }}</td>
          <td>{{ store.managers?.map((m) => m.name).join(', ') || '-' }}</td>
          <td>{{ store.phone || '-' }}</td>
          <td>{{ store.address || '-' }}</td>
          <td>{{ store.status }}</td>
          <td>
            <button class="btn btn-sm" @click="editStore(store)">Edit</button>
            <button class="btn btn-sm btn-error" @click="removeStore(store._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AddStoreModal v-if="showAddModal" @close="showAddModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMerchantStore } from '@/stores/merchant.ts'
import type { StoreDTO } from '@/stores/merchant.ts'

import AddStoreModal from '@/components/dashboard/AddStoreModal.vue'

const merchantStore = useMerchantStore()
const keyword = ref('')
const selectedSortField = ref<'name' | 'storeId' | 'owner'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
const showAddModal = ref(false)

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

function editStore(store: StoreDTO) {
  // TODO: Open edit modal
  console.log('Edit store:', store)
}

function removeStore(id: string) {
  merchantStore.removeOne(id)
}
</script>

<style scoped>
.table th {
  cursor: pointer;
}
</style>
