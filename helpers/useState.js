const useState = initialState => {
  let state = initialState || undefined
  const setState = newValue => {
    state = newValue
  }

  return [state, setState]
}

module.exports = useState
