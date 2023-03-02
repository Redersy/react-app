import compose from 'compose-function'
import withQuery from './with-query'

const withProviders = compose(withQuery)

export default withProviders
