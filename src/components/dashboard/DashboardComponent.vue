<template>
  <div class="p-6 bg-white shadow rounded-lg relative">
    <!-- 필터, 정렬 & 추가 버튼 (Grid 레이아웃) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- 1열: 정렬 및 검색 기준 + 추가 -->
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <label class="font-medium text-gray-700">정렬 및 검색 기준</label>
          <select
            v-model="selectedSortField"
            class="block w-40 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name">가맹점</option>
            <option value="id">아이디</option>
            <option value="phone">전화번호</option>
            <option value="manager">관리인</option>
          </select>
        </div>
        <button
          @click="promptAdd"
          class="self-start mt-2 px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
        >
          추가
        </button>
      </div>

      <!-- 2~3열: 검색창 + 검색 버튼 + 정렬 토글 -->
      <div class="flex items-center gap-2 md:col-span-2 justify-end">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="검색어 입력"
          class="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          @click="applyFilter"
          class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          검색
        </button>
        <button
          @click="toggleSortOrder"
          class="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200"
        >
          <span v-if="sortOrder === 'asc'">▲ 오름차순</span>
          <span v-else>▼ 내림차순</span>
        </button>
      </div>
    </div>

    <!-- 데이터 테이블 -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">No</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              가맹점
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              아이디
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              전화번호
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">사장</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              관리인
            </th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">관리</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">비고</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(store, idx) in sortedAndFiltered" :key="store.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-900 text-center">{{ idx + 1 }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ store.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ store.id }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ store.phone }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ store.owner }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ store.manager }}</td>
            <td class="px-6 py-4 text-center">
              <span
                v-if="store.status === 'Active'"
                class="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
                >Active</span
              >
              <span
                v-else-if="store.status === 'Deactive'"
                class="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800"
                >Deactive</span
              >
              <span
                v-else
                class="px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"
                >Pending</span
              >
            </td>
            <td class="px-6 py-4 text-center space-x-2">
              <button
                @click="promptEdit(store)"
                class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                @click="promptDelete(store)"
                class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Delete
              </button>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ store.memo }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div
      v-if="storeToDelete"
      class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur"
    >
      <div class="absolute inset-0 bg-black opacity-25"></div>
      <div class="bg-white rounded-lg max-w-md mx-4 p-6 shadow-lg z-10">
        <div class="flex items-center space-x-4 mb-4">
          <div
            class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300"
          >
            ⚠️
          </div>
          <div>
            <h3 class="text-lg font-bold">삭제 확인</h3>
            <p class="mt-1 text-gray-700">
              "{{ storeToDelete.name }}"을(를) 정말 삭제하시겠습니까?
            </p>
          </div>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            @click="cancelDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            취소
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            삭제
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Dialog -->
    <div
      v-if="editStoreData"
      class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur"
    >
      <div class="absolute inset-0 bg-black opacity-25"></div>
      <div class="bg-white rounded-lg max-w-lg w-full mx-4 p-6 shadow-lg z-10">
        <h3 class="text-xl font-bold mb-4">가맹점 정보 수정</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-800">가맹점</label>
            <input
              v-model="editStoreData.name"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">아이디</label>
            <input
              v-model="editStoreData.id"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">전화번호</label>
            <input
              v-model="editStoreData.phone"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">사장</label>
            <input
              v-model="editStoreData.owner"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">관리인</label>
            <input
              v-model="editStoreData.manager"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">비고</label>
            <input
              v-model="editStoreData.memo"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-2">
          <button
            @click="cancelEdit"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            취소
          </button>
          <button
            @click="confirmEdit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            수정
          </button>
        </div>
      </div>
    </div>

    <!-- Add Dialog -->
    <div
      v-if="addStoreData"
      class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur"
    >
      <div class="absolute inset-0 bg-black opacity-25"></div>
      <div class="bg-white rounded-lg max-w-lg w-full mx-4 p-6 shadow-lg z-10">
        <h3 class="text-xl font-bold mb-4">가맹점 추가</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-800">가맹점</label>
            <input
              v-model="addStoreData.name"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">아이디</label>
            <input
              v-model="addStoreData.id"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">전화번호</label>
            <input
              v-model="addStoreData.phone"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">사장</label>
            <input
              v-model="addStoreData.owner"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">관리인</label>
            <input
              v-model="addStoreData.manager"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-800">비고</label>
            <input
              v-model="addStoreData.memo"
              class="mt-1 w-full px-3 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-2">
          <button
            @click="cancelAdd"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            취소
          </button>
          <button
            @click="confirmAdd"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Store {
  id: string
  name: string
  phone: string
  owner: string
  manager: string
  memo: string
  status: 'Active' | 'Deactive' | 'Pending'
}

// 초기 데이터
const rawStores: Omit<Store, 'status'>[] = [
  {
    id: 'qowognssla1',
    name: '구로_1',
    phone: '010-5020-7777',
    owner: '김덕순',
    manager: '배재훈',
    memo: '',
  },
  {
    id: 'qowognssla2',
    name: '광명_2',
    phone: '010-5020-7777',
    owner: '조용필',
    manager: '배재훈',
    memo: '',
  },
  {
    id: 'qowognssla3',
    name: '용인_3',
    phone: '010-5020-7777',
    owner: '곽지쭈',
    manager: '정민호',
    memo: '',
  },
  {
    id: 'qowognssla4',
    name: '서울_4',
    phone: '010-5020-7777',
    owner: '사쿠라',
    manager: '정민호',
    memo: '',
  },
  {
    id: 'qowognssla5',
    name: '부산_2',
    phone: '010-5020-7777',
    owner: '밍밍키',
    manager: '김아무개',
    memo: '',
  },
]
const statuses = ['Active', 'Deactive', 'Pending'] as const

const stores = ref<Store[]>(
  rawStores.map((s) => ({ ...s, status: statuses[Math.floor(Math.random() * statuses.length)] })),
)
const storeToDelete = ref<Store | null>(null)
const editStoreData = ref<Store | null>(null)
const addStoreData = ref<Store | null>(null)

// 정렬용
const selectedSortField = ref<keyof Store>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')

// 검색용
const searchKeyword = ref('')
const appliedSearchField = ref<keyof Store>('name')
const appliedSearchTerm = ref('')

// 검색 적용
function applyFilter() {
  appliedSearchField.value = selectedSortField.value
  appliedSearchTerm.value = searchKeyword.value.trim()
}

// 정렬 토글
function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// Delete
function promptDelete(store: Store) {
  storeToDelete.value = store
}
function confirmDelete() {
  if (!storeToDelete.value) return
  stores.value = stores.value.filter((s) => s.id !== storeToDelete.value!.id)
  storeToDelete.value = null
}
function cancelDelete() {
  storeToDelete.value = null
}

// Edit
function promptEdit(store: Store) {
  editStoreData.value = { ...store }
}
function confirmEdit() {
  if (!editStoreData.value) return
  const idx = stores.value.findIndex((s) => s.id === editStoreData.value!.id)
  if (idx !== -1) stores.value[idx] = { ...editStoreData.value! }
  editStoreData.value = null
}
function cancelEdit() {
  editStoreData.value = null
}

// Add
function promptAdd() {
  addStoreData.value = {
    id: '',
    name: '',
    phone: '',
    owner: '',
    manager: '',
    memo: '',
    status: 'Active',
  }
}
function confirmAdd() {
  if (!addStoreData.value) return
  stores.value.push({ ...addStoreData.value! })
  addStoreData.value = null
}
function cancelAdd() {
  addStoreData.value = null
}

// computed: 검색 후 정렬
const sortedAndFiltered = computed(() => {
  let arr = [...stores.value]
  if (appliedSearchTerm.value) {
    const term = appliedSearchTerm.value.toLowerCase()
    arr = arr.filter((x) => String(x[appliedSearchField.value]).toLowerCase().includes(term))
  }
  arr.sort((a, b) => {
    const aV = String(a[selectedSortField.value]).toLowerCase()
    const bV = String(b[selectedSortField.value]).toLowerCase()
    if (aV < bV) return sortOrder.value === 'asc' ? -1 : 1
    if (aV > bV) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
  return arr
})
</script>

<style scoped>
/* 필요 시 추가 커스터마이징이 있으면 여기에 작성하세요 */
</style>
