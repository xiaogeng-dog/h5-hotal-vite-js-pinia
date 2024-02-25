import { getDetailInfos } from '@/services/modules/detail'
import { defineStore } from 'pinia'

const useDetailStore = defineStore('detail', {
  state: () => ({
    houseId: 0,
    infos: {}
  }),
  actions: {
    async fetchDetailInfosData() {
      if (this.houseId === 0) return
      const res = await getDetailInfos(this.houseId)
      this.infos = res.data
    }
  }
})

export default useDetailStore
