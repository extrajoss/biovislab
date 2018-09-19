import rpc from '../modules/rpc'
import publications from '../../static/data/Publications.json'
import projects from '../../static/data/Projects.json'
import people from '../../static/data/People.json'

const cardGalleryCache = {
  state: {
    publications,
    people,
    projects
  },
  getters: {
    publications: state => state.publications,
    people: state => state.people,
    projects: state => state.projects
  },
  mutations: {
    Set_Publications: (state, publications) => {
      state.publications = publications
    },
    Set_Projects: (state, projects) => {
      state.projects = projects
    },
    Set_People: (state, people) => {
      state.people = people
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

export default cardGalleryCache
