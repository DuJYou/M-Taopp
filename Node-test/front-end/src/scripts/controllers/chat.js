import chatView from '../views/chat.art'

  export const list = async (req, res, next) => {
    res.render(chatView())
  }