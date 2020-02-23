const middleware = {}

middleware['authenticated'] = require('..\\resources\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['notAuthenticated'] = require('..\\resources\\middleware\\notAuthenticated.js')
middleware['notAuthenticated'] = middleware['notAuthenticated'].default || middleware['notAuthenticated']

export default middleware
