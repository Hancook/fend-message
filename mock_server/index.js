const {registerRoutes} = require('./utils')
const BASE_PATH_V1 = '/api/'

registerRoutes(BASE_PATH_V1, require('./route_v1/auth'))
registerRoutes(BASE_PATH_V1, require('./route_v1/sign'))
registerRoutes(BASE_PATH_V1, require('./route_v1/forum'))
registerRoutes(BASE_PATH_V1, require('./route_v1/message'))
registerRoutes(BASE_PATH_V1, require('./route_v1/course'))





