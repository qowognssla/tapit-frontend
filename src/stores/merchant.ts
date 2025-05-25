import { defineStore } from 'pinia'
import axios from 'axios'

export interface StoreDTO {
  _id: string
  storeId: string
  name: string
  owner: string
  managers: { _id: string; name: string }[]
  phone?: string
  address?: string
  memo?: string
  status: 'active' | 'inactive' | 'dormant' | 'terminated'
}

export const useMerchantStore = defineStore('merchant', {
  state: () => ({
    list: [] as StoreDTO[],
  }),

  actions: {
    async fetchAll() {
      try {
        const res = await axios.get('http://localhost:5000/api/stores')
        this.list = res.data
      } catch (error) {
        console.error('Failed to fetch stores:', error)
      }
    },

    async addOne(payload: Partial<StoreDTO>) {
      try {
        const res = await axios.post('http://localhost:5000/api/stores', payload)
        this.list.push(res.data)
      } catch (error) {
        console.error('Failed to add store:', error)
      }
    },

    async updateOne(id: string, payload: Partial<StoreDTO>) {
      try {
        const res = await axios.put(`http://localhost:5000/api/stores/${id}`, payload)
        const index = this.list.findIndex((s) => s._id === id)
        if (index !== -1) this.list[index] = res.data
      } catch (error) {
        console.error('Failed to update store:', error)
      }
    },

    async removeOne(id: string) {
      try {
        await axios.delete(`http://localhost:5000/api/stores/${id}`)
        this.list = this.list.filter((s) => s._id !== id)
      } catch (error) {
        console.error('Failed to delete store:', error)
      }
    },
  },
})
