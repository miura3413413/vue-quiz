import { createStore } from 'vuex'

import user from "./modules/user";
import question from "./modules/question";
export default createStore({
  modules: {
    user,
    question
  }
})
