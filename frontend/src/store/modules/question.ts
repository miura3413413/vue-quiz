import dummydata from "@/assets/data/dummyData.json";
import Dummydata from "@/dummydata";

interface State {
  data: Dummydata[],
  questionCount: number,
  answer: number[]

}

const state = () => {
  return {
    data: dummydata,
    questionCount: 0,
    answer: []
  }
}

const getters = {
  getData(state: State) {
    return {
      data: state.data,
      questionCount: state.questionCount,
      answer: state.answer
    }
  }
}

const mutations = {
  incrementCount(state: State) {
    state.questionCount += 1
  },
  resetCount(state: State) {
    state.questionCount = 0
  },
  pushAnswer(state: State, payload: number) {
    console.log("called")
    console.log(state.answer)
    state.answer.push(payload)
  },
  resetAnswer(state: State) {
    state.answer = []
  }
}

const question = {
  namespaced: true, // 忘れずに
  state,
  getters,
  mutations
}

export default question