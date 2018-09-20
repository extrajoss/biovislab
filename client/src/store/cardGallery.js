import rpc from '../modules/rpc'
import Publications from '../../static/data/Publications.json'
import Projects from '../../static/data/Projects.json'
import People from '../../static/data/People.json'

const cardGallery = {
  state: {
    Publications,
    People,
    Projects
  },
  getters: {
    Publications: state => state.Publications,
    People: state => state.People,
    Projects: state => state.Projects
  },
  mutations: {
    Set_Publications: (state, Publications) => {
      state.Publications = Publications
    },
    Set_Projects: (state, Projects) => {
      state.Projects = Projects
    },
    Set_People: (state, People) => {
      state.People = People
    }
  },
  actions: {
    async getCards ({
      commit,
      state
    }, title) {
      let response = await rpc.rpcRun('publicGetCards', {
        'sheetTitle': title
      })
      let cards = response.result
      if (cards) {
        commit(`Set_${title}`, cards)
        return cards
      }
      return false
    }
  }
}

export default cardGallery
