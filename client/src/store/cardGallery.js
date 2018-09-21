import rpc from '../modules/rpc'

const cardGallery = {
  state: {
    Publications: false,
    People: false,
    Projects: false
  },
  getters: {
    Publications: state => state.Publications,
    People: state => state.People,
    Projects: state => state.Projects,
    Cards: state => title => state[title]
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
    },
    Set_Cards: (state, {
      Cards,
      Title
    }) => {
      state[Title] = Cards
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
    },
    async getCache ({
      commit,
      state
    }, title) {
      if (state[title]) {
        console.log(`state for ${title} already set`, state[title])
        return false
      }
      let response = await rpc.rpcRun('publicGetCardsCache', {
        'sheetTitle': title
      })
      let cards = response.result
      console.log(`state for ${title} retrieved`, cards)
      if (cards) {
        commit(`Set_${title}`, cards)
        return cards
      }
      return false
    }
  }
}

export default cardGallery
