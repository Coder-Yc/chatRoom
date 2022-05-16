class LocalCatch {
  setCatch(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCatch(key) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
}

export default new LocalCatch()
